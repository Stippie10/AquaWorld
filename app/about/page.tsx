import Link from 'next/link';

const values = [
  {
    icon: '🌊',
    title: 'Community First',
    desc: 'Bij AquaWorld staat de speler centraal. We bouwen een plek waar iedereen zich thuis voelt, van beginner tot veteran.',
  },
  {
    icon: '⚔️',
    title: 'Spannend Gameplay',
    desc: 'Van survival en bouwen tot events en mini-games — er is altijd wel iets leuks te doen op onze server.',
  },
  {
    icon: '🛡️',
    title: 'Veilige Omgeving',
    desc: 'Ons ervaren staff team zorgt 24/7 voor een respectvolle en veilige spelomgeving voor alle spelers.',
  },
  {
    icon: '🚀',
    title: 'Altijd in Ontwikkeling',
    desc: 'We luisteren naar onze community en voegen regelmatig nieuwe content, features en verbeteringen toe.',
  },
];

const stats = [
  { value: '500+', label: 'Geregistreerde Spelers' },
  { value: '24/7', label: 'Online & Beschikbaar' },
  { value: '10+', label: 'Staff Leden' },
  { value: '2023', label: 'Opgericht' },
];

export default function About() {
  return (
    <div className="min-h-screen pt-20">

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center slide-in">
        <h1 className="text-6xl md:text-7xl font-black mb-6 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight">
          Over AquaWorld
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Wij zijn meer dan een Minecraft server — we zijn een hechte community van spelers die samen avontuur beleven.
        </p>
      </div>

      {/* Story */}
      <div className="max-w-5xl mx-auto px-6 mb-20 slide-in">
        <div className="relative group">
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-linear-to-br from-slate-800 to-slate-900 p-10 rounded-2xl border border-slate-700/50 group-hover:border-cyan-500/50 transition space-y-5 text-slate-300">
            <h2 className="text-3xl font-black bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Ons Verhaal
            </h2>
            <p className="text-lg leading-relaxed">
              AquaWorld werd opgericht met één doel: een plek creëren waar Minecraft-spelers écht kunnen genieten van
              het spel zonder stress of toxiciteit. Wat begon als een klein privéservertje tussen vrienden groeide al
              snel uit tot een bloeiende community.
            </p>
            <p className="text-lg leading-relaxed">
              We geloven dat Minecraft het leukst is wanneer je het samen speelt. Daarom investeren we constant in
              betere servers, nieuwe gamemodi en een actief en betrokken staff team dat voor iedereen klaarstaat.
            </p>
            <p className="text-lg leading-relaxed">
              Of je nu wilt bouwen, overleven, battles aangaan of gewoon wilt chillen met anderen — bij AquaWorld is
              iedereen welkom.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-6 mb-20 slide-in">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500 to-purple-600 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-linear-to-br from-slate-800/80 to-slate-900/80 p-6 rounded-xl border border-slate-700/50 group-hover:border-cyan-500/50 transition text-center">
                <p className="text-4xl font-black bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400 font-semibold uppercase tracking-wide">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-4xl font-black text-center mb-12 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent slide-in">
          Onze Waarden
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((item, idx) => (
            <div key={idx} className="group slide-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="relative h-full">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500 to-purple-600 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative h-full bg-linear-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 group-hover:border-cyan-500/50 transition duration-300">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition transform duration-300">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 mb-24 text-center slide-in">
        <div className="relative group">
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-linear-to-br from-slate-800 to-slate-900 p-12 rounded-2xl border border-cyan-500/30 hover:border-cyan-500/60 transition">
            <h2 className="text-4xl font-black mb-4 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Klaar om mee te doen?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Sluit je aan bij onze community en begin vandaag nog jouw avontuur op AquaWorld!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/discord"
                className="px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white hover:scale-105 transition transform shadow-lg hover:shadow-cyan-500/25"
              >
                💬 Join Discord
              </Link>
              <Link
                href="/staff"
                className="px-8 py-4 bg-linear-to-br from-slate-700 to-slate-800 rounded-xl font-bold text-slate-200 border border-slate-600 hover:border-cyan-500/50 hover:scale-105 transition transform"
              >
                👥 Bekijk ons Team
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
