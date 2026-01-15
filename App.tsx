import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar.tsx';
import FilterBar from './components/FilterBar.tsx';
import ProductCard from './components/ProductCard.tsx';
import Footer from './components/Footer.tsx';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import ProductDetailsModal from './components/ProductDetailsModal.tsx';
import AddProductModal from './components/AddProductModal.tsx';
import LoginModal from './components/LoginModal.tsx';
import { Category, Product } from './types.ts';
import { BUSINESS_NAME } from './constants.ts';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Dell Latitude 7490',
    price: 3500,
    tags: ['Laptops', 'Electronics'],
    description: 'Core i7 8th Gen, 16GB RAM, 512GB SSD. Business class performance in a sleek portable chassis.',
    image_url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800',
    status: 'Available'
  },
  {
    id: '2',
    name: 'HP LaserJet Pro M404dn',
    price: 2800,
    tags: ['Printers'],
    description: 'High speed monochrome laser printer. Perfect for busy office environments with heavy workloads.',
    image_url: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800',
    status: 'Available'
  },
  {
    id: '3',
    name: 'MacBook Air M1 2020',
    price: 8500,
    tags: ['Laptops', 'Electronics'],
    description: 'Space Grey, 8GB RAM, 256GB SSD. Battery health at 98%. Pristine condition.',
    image_url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800',
    status: 'Available'
  },
  {
    id: '4',
    name: 'Samsung 65" QLED 4K',
    price: 7200,
    tags: ['Electronics', 'Appliances'],
    description: 'Vibrant colors and deep blacks. Smart TV features with original remote and stand.',
    image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800',
    status: 'Available'
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<'Home' | 'About' | 'Contact'>('Home');
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  
  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'All') return products;
    return products.filter(product => product.tags.includes(activeFilter));
  }, [activeFilter, products]);

  const handleProductAdded = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setIsAddModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Permanent Action: Are you sure you want to remove this item from the catalog?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      // Close modal if the deleted product was being viewed
      if (selectedProduct?.id === id) {
        setSelectedProduct(null);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc]">
      <Navbar 
        onNavigate={setView} 
        onOpenAddModal={() => setIsAddModalOpen(true)} 
        currentView={view}
        isAdmin={isAdmin}
      />
      
      <main className="flex-grow">
        {view === 'Home' && (
          <>
            <div className="sticky top-16 z-40 shadow-sm">
              <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
              <header className="mb-12 md:mb-20">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tighter uppercase">
                  SMART <br />
                  ALTERNATIVES <br />
                  <span className="text-slate-300">TO BUYING NEW.</span>
                </h2>
                <div className="h-1 w-20 bg-slate-900 rounded-full"></div>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    isAdmin={isAdmin}
                    onDelete={handleDeleteProduct}
                    onClick={setSelectedProduct}
                  />
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-slate-400 font-bold uppercase tracking-widest">No items found in this category.</p>
                </div>
              )}
            </div>
          </>
        )}

        {view === 'About' && <About />}
        {view === 'Contact' && <Contact />}
      </main>

      <Footer 
        isAdmin={isAdmin} 
        onToggleAdmin={() => isAdmin ? setIsAdmin(false) : setIsLoginModalOpen(true)} 
      />

      {/* Modals */}
      <ProductDetailsModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
      
      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleProductAdded}
      />

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => setIsAdmin(true)}
      />
    </div>
  );
};

export default App;