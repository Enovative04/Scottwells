
import React from 'react';
import { WHATSAPP_NUMBER, CURRENCY } from '../constants.js';

const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi Scottwells, I'm viewing the detailed page for "${product.name}" (${CURRENCY}${product.price.toLocaleString()}). I'd like to proceed with an inquiry.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const isSold = product.status === 'Sold';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row border border-slate-100">
        <div className="w-full md:w-3/5 bg-slate-50 relative overflow-hidden group">
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          <button onClick={onClose} className="absolute top-6 left-6 p-3 bg-white/90 backdrop-blur-md text-slate-900 rounded-2xl shadow-xl md:hidden z-10"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
          <div className="absolute top-6 left-6 hidden md:flex flex-wrap gap-2">
            {product.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-white/90 backdrop-blur-md text-[11px] font-black uppercase tracking-widest text-slate-900 rounded-xl shadow-lg">{tag}</span>
            ))}
          </div>
        </div>
        <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto no-scrollbar flex flex-col">
          <div className="hidden md:flex justify-end mb-8"><button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-4"><span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${isSold ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>{product.status}</span></div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">{product.name}</h2>
            <p className="text-4xl font-black text-slate-900 mb-8">{CURRENCY}{product.price.toLocaleString()}</p>
            <div className="space-y-6 mb-12">
              <div><h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Product Description</h4><p className="text-slate-600 leading-relaxed font-medium">{product.description}</p></div>
            </div>
          </div>
          <button onClick={handleWhatsAppOrder} disabled={isSold} className={`w-full py-5 rounded-2xl font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-3 ${isSold ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200 active:scale-95'}`}>Claim via WhatsApp</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
