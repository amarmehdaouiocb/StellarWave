/**
 * Notifications Slack pour le pipeline d'audit.
 * Utilise SLACK_WEBHOOK_URL si défini, sinon log uniquement.
 */

export type AlertSeverity = "info" | "warning" | "high" | "critical";

const SEVERITY_COLOR: Record<AlertSeverity, string> = {
  info: "#38bdf8",
  warning: "#f59e0b",
  high: "#ef6c4a",
  critical: "#dc2626",
};

const SEVERITY_EMOJI: Record<AlertSeverity, string> = {
  info: "ℹ️",
  warning: "⚠️",
  high: "🔥",
  critical: "🚨",
};

export type AlertContext = Record<string, string | number | boolean | null>;

export type AlertOptions = {
  severity: AlertSeverity;
  title: string;
  context?: AlertContext;
};

export async function notifySlack({
  severity,
  title,
  context,
}: AlertOptions): Promise<void> {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    console.log(`[Alert ${severity}] ${title}`, context ?? {});
    return;
  }

  const fields = context
    ? Object.entries(context).map(([k, v]) => ({
        type: "mrkdwn",
        text: `*${k}* : ${v ?? "—"}`,
      }))
    : [];

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `${SEVERITY_EMOJI[severity]} ${title}`,
        attachments: [
          {
            color: SEVERITY_COLOR[severity],
            blocks: [
              {
                type: "header",
                text: {
                  type: "plain_text",
                  text: `${SEVERITY_EMOJI[severity]} ${title}`,
                  emoji: true,
                },
              },
              ...(fields.length > 0
                ? [{ type: "section", fields: fields.slice(0, 10) }]
                : []),
              {
                type: "context",
                elements: [
                  {
                    type: "mrkdwn",
                    text: `_Audit pipeline · ${new Date().toISOString()}_`,
                  },
                ],
              },
            ],
          },
        ],
      }),
      signal: AbortSignal.timeout(5_000),
    });
  } catch (err) {
    console.error("[Alert] Slack notification failed:", err);
  }
}
