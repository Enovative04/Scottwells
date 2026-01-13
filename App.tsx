
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import AddProductModal from './components/AddProductModal';
import ProductDetailsModal from './components/ProductDetailsModal';
import LoginModal from './components/LoginModal';
import { supabase } from './supabase';
import { Product, Category } from './types';

type View = 'Home' | 'About' | 'Contact';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('Home');
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchProducts();
    // Check if user was previously logged in (simple session check)
    const savedAdmin = localStorage.getItem('scottwells_admin');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setProducts(data || []);
    } catch (err: any) {
      console.error('Error fetching products:', err.message);
      setError('Failed to load products. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      alert(`Error deleting product: ${err.message}`);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    localStorage.setItem('scottwells_admin', 'true');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('scottwells_admin');
    setCurrentView('Home');
  };

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'All') return products;
    return products.filter((p) => p.tags?.includes(activeFilter));
  }, [activeFilter, products]);

  const renderContent = () => {
    switch (currentView) {
      case 'About':
        return <About />;
      case 'Contact':
        return <Contact />;
      default:
        return (
          <>
            {/* Filter Section */}
            <div className="sticky top-16 z-40 shadow-sm">
              <FilterBar 
                activeFilter={activeFilter} 
                onFilterChange={setActiveFilter} 
              />
            </div>

            {/* Hero / Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
              <div className="max-w-3xl">
                {isAdmin && (
                  <div className="inline-block px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-6 animate-bounce">
                    Admin Session Active
                  </div>
                )}
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tighter">
                  SMART <br />
                  ALTERNATIVES <br />
                  <span className="text-slate-300">TO BUYING NEW.</span>
                </h2>
                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                  Every item is meticulously tested, restored, and certified by our team to ensure you get peak performance at a fraction of the cost.
                </p>
              </div>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin"></div>
                  <p className="mt-4 text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Updating Catalog...</p>
                </div>
              ) : error ? (
                <div className="text-center py-20 bg-red-50 rounded-[2rem] border-2 border-dashed border-red-100">
                  <p className="text-red-500 font-bold mb-4">{error}</p>
                  <button 
                    onClick={fetchProducts}
                    className="px-8 py-3 bg-red-500 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-red-100"
                  >
                    Refresh Connection
                  </button>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both">
                      <ProductCard 
                        product={product} 
                        isAdmin={isAdmin} 
                        onDelete={deleteProduct} 
                        onClick={setSelectedProduct}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 border-2 border-dashed border-slate-100 rounded-[3rem]">
                  <div className="inline-block p-6 rounded-full bg-slate-50 mb-6">
                    <svg className="w-10 h-10 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">No items found</h3>
                  <p className="text-slate-400 font-medium">Try adjusting your filters or check back later.</p>
                  <button 
                    onClick={() => setActiveFilter('All')}
                    className="mt-8 px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all"
                  >
                    Reset Inventory
                  </button>
                </div>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc]">
      <Navbar 
        onNavigate={setCurrentView} 
        onOpenAddModal={() => setIsModalOpen(true)}
        currentView={currentView} 
        isAdmin={isAdmin}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer 
        isAdmin={isAdmin} 
        onToggleAdmin={() => isAdmin ? handleLogout() : setIsLoginModalOpen(true)} 
      />

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchProducts}
      />

      <ProductDetailsModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;
