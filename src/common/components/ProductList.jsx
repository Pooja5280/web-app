import React, { useState } from 'react';
import { ShoppingCart, Star, Download, ChevronDown } from 'lucide-react';
import { Parser } from '@json2csv/plainjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // UPDATED: Import the function directly

const ProductList = ({ 
  loading, 
  currentItems, 
  products, // Full products list for export
  searchQuery, 
  setSearchQuery, 
  setSortOrder, 
  currentPage, 
  setCurrentPage, 
  totalPages 
}) => {
  const [showExportOptions, setShowExportOptions] = useState(false);

  // --- EXPORT LOGIC ---
  const handleExport = (type) => {
    setShowExportOptions(false);
    
    const dataToExport = products
      .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(p => ({
        ID: p.id,
        Title: p.title,
        Category: p.category,
        Price: `$${p.price}`,
        Rating: p.rating
      }));

    if (type === 'pdf') {
      try {
        const doc = new jsPDF();
        
        // Add Title
        doc.setFontSize(18);
        doc.text("Luxora Product Inventory", 14, 22);
        
        // UPDATED: Call autoTable as a function, passing 'doc' as the first argument
        autoTable(doc, {
          startY: 30,
          head: [['ID', 'Title', 'Category', 'Price', 'Rating']],
          body: dataToExport.map(item => Object.values(item)),
          headStyles: { fillColor: [37, 99, 235] }, // Professional Blue
          styles: { fontSize: 10 },
        });
        
        doc.save("Luxora_Products.pdf");
      } catch (err) {
        console.error('PDF Generation Error:', err);
        alert("Could not generate PDF. Check console for details.");
      }
    } else {
      // CSV and Excel logic
      try {
        const parser = new Parser();
        const csv = parser.parse(dataToExport);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Luxora_Products.${type === 'excel' ? 'xls' : 'csv'}`);
        link.click();
      } catch (err) {
        console.error('Export failed', err);
      }
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('prev-dots');
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 3) end = 4;
      if (currentPage >= totalPages - 2) start = totalPages - 3;
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('next-dots');
      pages.push(totalPages);
    }
    return pages;
  };

  const handlePageChange = (page) => {
    if (typeof page === 'number') setCurrentPage(page);
    else if (page === 'prev-dots') setCurrentPage(prev => Math.max(prev - 3, 1));
    else if (page === 'next-dots') setCurrentPage(prev => Math.min(prev + 3, totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="max-w-[1400px] mx-auto px-10 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="flex flex-1 items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-96">
            <input 
              type="text" 
              value={searchQuery}
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-medium text-sm"
            >
              <Download size={16} />
              Export
              <ChevronDown size={14} className={`transition-transform ${showExportOptions ? 'rotate-180' : ''}`} />
            </button>

            {showExportOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-[999] overflow-hidden">
                <button type="button" onClick={() => handleExport('csv')} className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2">📄 CSV File</button>
                <button type="button" onClick={() => handleExport('excel')} className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2">📊 Excel Sheet</button>
                <button type="button" onClick={() => handleExport('pdf')} className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 border-t border-gray-50">📕 PDF Document</button>
              </div>
            )}
          </div>
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
                    number === currentPage ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 
                    (number === 'prev-dots' || number === 'next-dots') ? 'text-gray-400 hover:text-blue-600 hover:bg-blue-50 cursor-pointer' : 
                    'text-gray-500 border border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  {typeof number === 'number' ? number : '...'}
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