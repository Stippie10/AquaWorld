import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-gradient-to-b from-slate-900 to-slate-950 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              <Image
                src="/AquaWorld_Transparant.png"
                alt="AquaWorld logo"
                width={32}
                height={32}
                className="inline-block mr-2 align-middle"
              />
              AquaWorld
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Een prachtige Minecraft server vol avontuur, vriendschappen en epische momenten. Sluit je vandaag aan!
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-300 mb-4 uppercase text-sm tracking-wide">Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="/" className="hover:text-cyan-400 transition">Home</a></li>
              <li><a href="/blog" className="hover:text-cyan-400 transition">Blog</a></li>
              <li><a href="/staff" className="hover:text-cyan-400 transition">Staff Team</a></li>
              <li><a href="/about" className="hover:text-cyan-400 transition">Over Ons</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-300 mb-4 uppercase text-sm tracking-wide">Community</h4>
            <a 
              href="https://discord.gg/aquaworld"
              className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-bold transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>💬 Join Discord</span>
              <span>→</span>
            </a>
          </div>
        </div>
        <div className="border-t border-slate-700/50 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            &copy; 2026 AquaWorld. Alle rechten voorbehouden. ⚔️
          </p>
        </div>
      </div>
    </footer>
  );
}
