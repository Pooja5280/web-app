import React from 'react';

const Header = ({ view, setView, scrollToFooter }) => {
  return (
    <header className="bg-[#0f172a] text-white py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
        <div className="bg-blue-600 px-3 py-1 rounded-lg font-bold text-2xl">L</div>
        <span className="text-2xl font-bold tracking-tight">Luxora</span>
      </div>
      <nav className="hidden md:flex gap-8 items-center text-gray-300">
        <button 
          onClick={() => setView('home')} 
          className={`hover:text-white ${view === 'home' ? 'text-orange-500 border-b-2 border-orange-500' : ''}`}
        >Home</button>
        <button 
          onClick={() => setView('products')} 
          className={`hover:text-white ${view === 'products' ? 'text-orange-500 border-b-2 border-orange-500' : ''}`}
        >Products</button>
        <button className="hover:text-white">About</button>
        <button onClick={scrollToFooter} className="hover:text-white">Contact</button>
      </nav>
      <button className="bg-[#f0653d] hover:bg-orange-700 px-6 py-2 rounded-xl font-bold transition">Get Started</button>
    </header>
  );
};

export default Header;