import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// Components inside the sub-folder
import Header from "./common/components/Header";
import Hero from "./common/components/Hero";
import Footer from "./common/components/Footer";
import ProductList from "./common/components/ProductList";

// Components directly inside the 'common' folder
import Error from "./common/Error";
import Empty from "./common/Empty";

const App = () => {
  const [view, setView] = useState('home');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const footerRef = useRef(null);

  useEffect(() => {
    if (view === 'products' && products.length === 0) {
      const fetchData = async () => {
        setLoading(true);
        setApiError(null); 
        try {
          // Fetching the full inventory of 100 products
          const res = await axios.get('https://dummyjson.com/products?limit=100');
          setProducts(res.data.products);
        } catch (err) {
          setApiError({
            message: err.message,
            code: err.response ? err.response.status : 500
          });
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [view, products.length]);

  // Handle filtering and sorting logic
  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

  // Calculate pagination values
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const scrollToFooter = () => footerRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Header view={view} setView={setView} scrollToFooter={scrollToFooter} />
      
      <div className="flex-grow">
        {view === 'home' ? (
          <Hero setView={setView} />
        ) : apiError ? (
          <Error statusCode={apiError.code} message={apiError.message} />
        ) : !loading && filteredProducts.length === 0 ? (
          <Empty query={searchQuery} />
        ) : (
          <ProductList 
            loading={loading}
            products={products} // CRITICAL: Passed full array for CSV/PDF export
            currentItems={currentItems}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSortOrder={setSortOrder}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>

      <Footer ref={footerRef} />
    </div>
  );
};

export default App;