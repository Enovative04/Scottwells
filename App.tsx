
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import FilterBar from './components/FilterBar.tsx';
import ProductCard from './components/ProductCard.tsx';
import Footer from './components/Footer.tsx';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import AddProductModal from './components/AddProductModal.tsx';
import ProductDetailsModal from './components/ProductDetailsModal.tsx';
import LoginModal from './components/LoginModal.tsx';
import { supabase } from './supabase.ts';
import { Product, Category } from './types.ts';

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

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc]">
      <Navbar 
        onNavigate={setCurrentView} 
        onOpenAddModal={() => setIsModalOpen(true)}
        currentView={currentView} 
        isAdmin={isAdmin}
      />
      
      <main className="flex-grow">
        {currentView === 'About' ? (
          <About />
        ) : currentView === 'Contact' ? (
          <Contact />
        ) : (
          <>
            <div className="sticky top-16 z-40 shadow-sm">
              <FilterBar 
                activeFilter={activeFilter} 
                onFilterChange={setActiveFilter} 
              />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
              <div className="max-w-3xl">
                {isAdmin && (
                  <div className="inline-block px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                    Admin Active
                  </div>
                )}
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tighter">
                  SMART <br />
                  ALTERNATIVES <br />
                  <span className="text-slate-300">TO BUYING NEW.</span>
                </h2>
                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                  Every item is meticulously tested, restored, and certified to ensure you get peak performance at a fraction of the cost.
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin"></div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id}
                      product={product} 
                      isAdmin={isAdmin} 
                      onDelete={deleteProduct} 
                      onClick={setSelectedProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 border-2 border-dashed border-slate-100 rounded-[3rem]">
                  <h3 className="text-xl font-black text-slate-900 uppercase">No items found</h3>
                </div>
              )}
            </div>
          </>
        )}
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
