export default function About() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="slide-in">
          <h1 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Over AquaWorld
          </h1>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-10 rounded-2xl border border-slate-700/50 group-hover:border-cyan-500/50 transition space-y-6 text-slate-300">
              <p className="text-lg leading-relaxed">
                Welkom op onze Over Ons pagina! Hier vertellen we je meer over AquaWorld
                en waarom je bij ons server zou moeten spelen.
              </p>
              <p className="text-lg leading-relaxed">
                AquaWorld is een gezellige en welkomende Minecraft server met een vriendelijke 
                community. We geloven dat Minecraft het meest leuk is wanneer je speelt met anderen.
              </p>
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-6 rounded-lg">
                <p className="text-sm text-slate-400 italic">
                  💡 Tip: Dit gedeelte kan door de admin bewerkt worden via het Admin Panel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
