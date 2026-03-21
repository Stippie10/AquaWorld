import Link from 'next/link';
import Image from 'next/image';

import { getStaff } from '@/lib/data';

export const revalidate = 30; // page will re-generate every 30 seconds

export default function Home() {
  // read synchronously on the server so the component can be server-rendered
  const { serverIp } = getStaff();
  const displayIp = serverIp && serverIp.trim() !== '' ? serverIp : 'Nog niet ingesteld';

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="space-y-6 slide-in">
          <div className="inline-block">
            <h1 className="text-7xl md:text-8xl font-black mb-4">
              <Image
                src="/AquaWorld_Transparant.png"
                alt="AquaWorld logo"
                width={128}
                height={128}
                className="mx-auto"
              />
            </h1>
          </div>
          <h1 className="text-6xl md:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Welkom bij AquaWorld</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
            De meest epische Minecraft server met een vriendelijke en actieve community
          </p>
        </div>
      </div>

      {/* Server IP Card */}
      <div className="max-w-4xl mx-auto px-6 mb-20 slide-in">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-12 rounded-2xl border border-cyan-500/30 hover:border-cyan-500/60 transition">
            <h2 className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Server Adres</h2>
            <p className="text-center text-5xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent select-all cursor-pointer hover:scale-105 transition transform">
              {displayIp}
            </p>
            {serverIp && serverIp.trim() !== '' ? (
              <p className="text-center text-sm text-slate-400 mt-4">💾 Klik om te selecteren</p>
            ) : (
              <p className="text-center text-sm text-yellow-300 mt-4">Server IP nog niet ingesteld - beheer in admin</p>
            )}
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '⚔️', title: 'Spannend Gameplay', desc: 'Ontdek avonturen, bouw geweldige structuren en maak vrienden' },
            { icon: '👥', title: 'Vriendelijke Community', desc: 'Speel samen met leuke en helpende spelers uit heel Nederland' },
            { icon: '🎁', title: 'Events & Rewards', desc: 'Neem deel aan events en win geweldige prijzen' },
          ].map((item, idx) => (
            <div key={idx} className="group slide-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 group-hover:border-cyan-500/50 transition duration-300">
                  <div className="text-6xl mb-4 group-hover:scale-125 transition transform duration-300">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="max-w-4xl mx-auto px-6 mb-20 text-center slide-in">
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/staff"
            className="group relative px-8 py-4 font-bold text-lg rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:from-cyan-600 group-hover:to-blue-700 transition duration-300"></div>
            <div className="absolute inset-0.5 bg-slate-900 rounded-[10px]"></div>
            <span className="relative text-cyan-400 group-hover:text-cyan-300 transition">👥 Ons Staff Team</span>
          </Link>
          <Link
            href="/discord"
            className="group relative px-8 py-4 font-bold text-lg rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:from-purple-700 group-hover:to-pink-700 transition duration-300"></div>
            <div className="absolute inset-0.5 bg-slate-900 rounded-[10px]"></div>
            <span className="relative text-purple-300 group-hover:text-purple-200 transition">💬 Join Discord</span>
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto px-6 mb-20 slide-in">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-10 rounded-2xl border border-slate-700/50 group-hover:border-cyan-500/50 transition">
            <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Over AquaWorld</h2>
            <p className="text-slate-300 mb-4 leading-relaxed text-lg">
              AquaWorld is een gezellige Minecraft server waar spelers zich veilig en welkom voelen.
              Wij hebben een sterke community, regelmatige events en een dedicated staff team.
            </p>
            <p className="text-slate-300 mb-6 leading-relaxed text-lg">
              Verbind je met de server en maak deel uit van ons epische avontuur! 🎮
            </p>
            <Link href="/about" className="inline-block text-cyan-400 hover:text-cyan-300 font-bold text-lg transition">
              Lees meer over ons →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
