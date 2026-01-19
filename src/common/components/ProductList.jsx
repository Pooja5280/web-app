import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';

const ProductList = ({ 
  loading, 
  currentItems, 
  searchQuery, 
  setSearchQuery, 
  setSortOrder, 
  currentPage, 
  setCurrentPage, 
  totalPages 
}) => {
  
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const handlePageChange = (page) => {
    if (typeof page === 'number') {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="max-w-[1400px] mx-auto px-10 py-12 min-h-screen">
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            value={searchQuery}
            placeholder="Search products..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
        <select 
          className="p-2 border border-gray-200 rounded-xl bg-white text-sm font-medium outline-none cursor-pointer"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-40">
           <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* PRODUCT GRID - Refined to match reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentItems.map((item) => (
              <div key={item.id} className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-6">
                  <img src={item.thumbnail} alt={item.title} className="object-contain h-full w-full hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">{item.category}</p>
                  <h3 className="text-base font-bold text-slate-800 mb-2 leading-tight line-clamp-2 h-10">{item.title}</h3>
                  
                  <div className="flex items-center gap-1 mb-4 text-xs text-gray-400">
                    <Star size={14} className="text-orange-500 fill-orange-500" />
                    <span className="font-bold text-slate-700">{item.rating || '4.5'}</span>
                    <span>(24 in stock)</span>
                  </div>

                  <div className="mt-auto">
                    <p className="text-2xl font-black text-blue-600 mb-4">${item.price}</p>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-95">
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PROFESSIONAL PAGINATION */}
          <div className="flex justify-center items-center mt-20 gap-4 text-sm">
            <button 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-all ${currentPage === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              ‹ Previous
            </button>

            <div className="flex gap-2">
              {getPageNumbers().map((number, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(number)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all font-bold ${
                    number === currentPage 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                    : number === '...' 
                      ? 'text-gray-400 cursor-default' 
                      : 'text-gray-500 border border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>

            <button 
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-all ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Next ›
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default ProductList;