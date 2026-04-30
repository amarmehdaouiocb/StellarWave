/**
 * Helper qui rend le composant <AuditReportDocument /> en Buffer Node.js.
 * Le buffer est ensuite attaché à l'email Resend.
 */
import { renderToBuffer } from "@react-pdf/renderer";
import { AuditReportDocument, type AuditReportProps } from "./report-pdf";

export async function renderAuditPdf(
  props: AuditReportProps,
): Promise<Buffer> {
  const buffer = await renderToBuffer(AuditReportDocument(props));
  return buffer;
}
