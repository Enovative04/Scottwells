
import React from 'react';
import { WHATSAPP_NUMBER, CURRENCY } from '../constants.js';

const ProductCard = ({ product, isAdmin, onDelete, onClick }) => {
  const handleWhatsAppOrder = (e) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hi Scottwells, I'm interested in the "${product.name}" priced at ${CURRENCY}${product.price.toLocaleString()}. Is this still available?`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(product.id);
    }
  };

  const isSold = product.status === 'Sold';

  return (
    <div 
      onClick={() => onClick(product)}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer relative"
    >
      {isAdmin && (
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
          <button 
            onClick={handleDelete}
            title="Delete Product"
            className="p-2.5 bg-red-600 text-white rounded-xl shadow-xl hover:bg-red-700 transition-colors border border-red-500 active:scale-90"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}

      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.image_url || 'https://via.placeholder.com/600x400?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {product.tags?.map((tag) => (
            <span key={tag} className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-slate-800 rounded-md shadow-sm">
              {tag}
            </span>
          ))}
        </div>
        {isSold && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-slate-900 px-4 py-1.5 rounded-full text-xs font-black tracking-widest shadow-lg uppercase">SOLD OUT</span>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{product.name}</h3>
          <p className="text-lg font-black text-slate-900 ml-2">
            {CURRENCY}{product.price.toLocaleString()}
          </p>
        </div>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 h-10 leading-relaxed">{product.description}</p>
        <div className="mt-auto">
          <button
            onClick={handleWhatsAppOrder}
            disabled={isSold}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${isSold ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-100 active:scale-[0.98]'}`}
          >
            Inquire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
