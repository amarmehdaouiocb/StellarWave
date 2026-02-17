import { notFound } from "next/navigation";
import { detectTheme, getTheme } from "@/lib/preview-themes";
import {
  resolveTemplate,
  getAlternateTemplates,
  getDefaultThemeForTemplate,
  getTemplateLabel,
} from "@/lib/template-registry";
import { PreviewClient } from "@/components/preview/PreviewClient";
import type { Prospect, TemplateVariant } from "@/lib/preview-types";
import type { Metadata } from "next";
import "./preview.css";

async function getProspect(id: string): Promise<Prospect | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
  if (!url || !key) return null;

  const res = await fetch(
    `${url}/rest/v1/prospects?id=eq.${id}&select=*`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data[0] || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const prospect = await getProspect(id);
  if (!prospect) return { title: "Preview introuvable" };

  return {
    title: `${prospect.nom} — Votre site web par Facilsite`,
    description: `Aperçu du site web professionnel de ${prospect.nom}, ${prospect.ville}`,
  };
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prospect = await getProspect(id);
  if (!prospect) notFound();

  const theme = detectTheme(prospect.type_commerce, prospect.recherche);
  const template = resolveTemplate(theme.key);

  const typeLabel = prospect.recherche
    .replace(new RegExp(prospect.ville, "i"), "")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());

  // Résoudre aboutText côté serveur (les fonctions ne sont pas sérialisables pour le client)
  // Prioriser description_google si disponible, sinon fallback sur la fonction thème
  const aboutText = prospect.description_google
    ? prospect.description_google
    : theme.aboutText(prospect.nom, prospect.ville, prospect.nb_avis);

  const serializableTheme = {
    ...theme,
    aboutText,
  };

  // ── Résoudre les 3 variants (principal + 2 alternates) ──
  const alternates = getAlternateTemplates(template);
  const variants: TemplateVariant[] = [
    {
      template,
      theme: serializableTheme,
      label: getTemplateLabel(template),
      isPrimary: true,
    },
    ...alternates.map((altTemplate) => {
      const altTheme = getTheme(getDefaultThemeForTemplate(altTemplate));
      const altAboutText = prospect.description_google
        ? prospect.description_google
        : altTheme.aboutText(prospect.nom, prospect.ville, prospect.nb_avis);
      return {
        template: altTemplate,
        theme: { ...altTheme, aboutText: altAboutText },
        label: getTemplateLabel(altTemplate),
        isPrimary: false,
      } satisfies TemplateVariant;
    }),
  ];

  return (
    <PreviewClient
      prospect={prospect}
      theme={serializableTheme}
      template={template}
      typeLabel={typeLabel}
      variants={variants}
    />
  );
}
