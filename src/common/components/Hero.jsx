import React from 'react';

const Hero = ({ setView }) => (
  <section className="relative py-32 text-center px-4 bg-white min-h-screen flex flex-col justify-center items-center overflow-hidden">
    {/* Very subtle background depth */}
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 -z-10" />

    <div className="max-w-3xl mx-auto">
      <div className="inline-block border border-slate-200 text-slate-500 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-12">
        Established 2026 • Future Ready
      </div>
      
      <h2 className="text-4xl md:text-6xl font-light mb-8 leading-tight tracking-tight text-slate-900">
        Build Something <br /> 
        <span className="font-serif italic text-blue-600">Extraordinary</span>
      </h2>
      
      <p className="max-w-lg mx-auto text-slate-400 mb-12 text-sm md:text-base font-light leading-relaxed tracking-wide">
        We provide the architectural foundation for your digital ambitions. 
        Minimalist design meets powerful performance.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button 
          onClick={() => setView('products')} 
          className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest transition-all duration-500 hover:shadow-2xl active:scale-95"
        >
          EXPLORE COLLECTION
        </button>
        <button className="bg-transparent border border-slate-200 text-slate-900 px-8 py-3 rounded-full text-xs font-bold tracking-widest hover:bg-slate-50 transition-all">
          LEARN MORE
        </button>
      </div>
    </div>

    {/* Elegant minimalist scroll line */}
    <div className="absolute bottom-12 flex flex-col items-center gap-4">
        <div className="w-[1px] h-20 bg-gradient-to-b from-slate-200 to-transparent"></div>
    </div>
  </section>
);

export default Hero;