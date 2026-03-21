export default function Discord() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="max-w-2xl w-full px-6 py-16 text-center slide-in">
        <h1 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Join onze Discord!
        </h1>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-12 rounded-2xl border border-purple-500/30 group-hover:border-purple-500/60 transition space-y-8">
            <div className="text-8xl group-hover:scale-110 transition transform duration-300">💬</div>
            <p className="text-xl text-slate-300 leading-relaxed">
              Sluit je aan bij onze Discord community en chat met andere spelers!
            </p>

            <div className="bg-purple-500/10 border border-purple-500/30 p-6 rounded-lg text-left">
              <p className="text-slate-300 font-semibold mb-3">Op onze Discord kun je:</p>
              <ul className="space-y-2 text-slate-400">
                <li>✅ Chat met andere spelers</li>
                <li>✅ Updates krijgen over events</li>
                <li>✅ Vragen stellen aan staff</li>
                <li>✅ Vrienden maken</li>
                <li>✅ Je feedback geven over de server</li>
              </ul>
            </div>

            <a
              href="https://discord.gg/aquaworld"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block px-10 py-4 font-bold text-lg rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-700 group-hover:to-purple-700 transition duration-300"></div>
              <div className="absolute inset-0.5 bg-slate-900 rounded-[10px]"></div>
              <span className="relative text-purple-300 group-hover:text-purple-200 transition flex items-center justify-center space-x-2">
                <span>Discord openen</span>
                <span>→</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
