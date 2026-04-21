import "@/styles/v4.css";
import { geistSans, geistMono, playfair } from "./fonts";

export default function V4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased bg-[#050505] text-[#ededed]`}>
      {children}
    </div>
  );
}
