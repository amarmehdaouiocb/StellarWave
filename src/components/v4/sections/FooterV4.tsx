import React from "react";

export function FooterV4() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] py-20 relative overflow-hidden">
      <div className="v4-container relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
        
        <div>
          <h2 className="font-editorial text-6xl md:text-8xl italic opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-pointer">
            Stellar.
          </h2>
          <p className="font-mono text-xs mt-6 text-zinc-500">
            © {new Date().getFullYear()} STELLAR WAVE.<br/>
            ALL RIGHTS RESERVED.
          </p>
        </div>

        <div className="flex gap-16 text-sm font-sans">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[#E0FF31] mb-2">SOCIALS</span>
            <a href="#" className="hover:text-white text-zinc-400 transition-colors">Twitter ↗</a>
            <a href="#" className="hover:text-white text-zinc-400 transition-colors">LinkedIn ↗</a>
            <a href="#" className="hover:text-white text-zinc-400 transition-colors">Instagram ↗</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[#E0FF31] mb-2">OFFICE</span>
            <span className="text-zinc-400">Paris, France<br/>Remote Worldwide</span>
            <a href="mailto:contact@stellarwave.fr" className="hover:text-white transition-colors mt-2 underline decoration-white/20 underline-offset-4">contact@stellarwave.fr</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
