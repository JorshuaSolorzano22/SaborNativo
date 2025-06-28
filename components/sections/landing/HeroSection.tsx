const DecorativeImage = () => (
    <div className="relative w-80 h-80 opacity-30">
      <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="160" cy="280" rx="100" ry="30" fill="#DAD5CE" opacity="0.5" />
        <path d="M160 120C200 120 230 150 230 190V220C230 260 200 290 160 290C120 290 90 260 90 220V190C90 150 120 120 160 120Z" fill="#DAD5CE" opacity="0.8" />
        <path d="M210 140L250 100C254 96 260 96 264 100C268 104 268 110 264 114L224 154" stroke="#DAD5CE" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
        <circle cx="160" cy="200" r="40" fill="none" stroke="#DAD5CE" strokeWidth="2" opacity="0.4" />
        <circle cx="160" cy="200" r="25" fill="none" stroke="#DAD5CE" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
);

const HeroLogo = () => (
    <div className="mr-4">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 7 4 7 12C7 16 9 18 12 18C15 18 17 16 17 12C17 4 12 2 12 2Z" fill="#7A8751" />
        <path d="M12 18C12 18 8 16 8 12" stroke="#5C4A3B" strokeWidth="1" fill="none" />
      </svg>
    </div>
);

export function HeroSection() {
  return (
    <section id="inicio" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <HeroLogo />
              <div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight text-foreground">Sabor</h1>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight -mt-3 text-foreground">nativo</h1>
              </div>
            </div>
            <div>
              <p className="text-2xl md:text-3xl leading-relaxed font-bold max-w-lg mx-auto lg:mx-0 text-foreground">
                Sabores que nacen del alma de la cocina
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <DecorativeImage />
          </div>
        </div>
      </div>
    </section>
  );
}