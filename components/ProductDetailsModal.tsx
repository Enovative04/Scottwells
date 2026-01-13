
import React from 'react';
import { Product } from '../types';
import { WHATSAPP_NUMBER, CURRENCY } from '../constants';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
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
        
        {/* Image Section */}
        <div className="w-full md:w-3/5 bg-slate-50 relative overflow-hidden group">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 p-3 bg-white/90 backdrop-blur-md text-slate-900 rounded-2xl shadow-xl hover:bg-white transition-all md:hidden z-10"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="absolute top-6 left-6 hidden md:flex flex-wrap gap-2">
            {product.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-white/90 backdrop-blur-md text-[11px] font-black uppercase tracking-widest text-slate-900 rounded-xl shadow-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto no-scrollbar flex flex-col">
          <div className="hidden md:flex justify-end mb-8">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${isSold ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {product.status}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Restoration</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 leading-tight">
              {product.name}
            </h2>
            <p className="text-4xl font-black text-slate-900 mb-8 tracking-tighter">
              {CURRENCY}{product.price.toLocaleString()}
            </p>

            <div className="space-y-6 mb-12">
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Product Description</h4>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h5 className="text-[9px] font-black text-slate-400 uppercase mb-1">Authenticity</h5>
                  <p className="text-xs font-bold text-slate-900">100% Guaranteed</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h5 className="text-[9px] font-black text-slate-400 uppercase mb-1">Testing Status</h5>
                  <p className="text-xs font-bold text-slate-900">Fully Certified</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleWhatsAppOrder}
            disabled={isSold}
            className={`w-full py-5 rounded-2xl font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-3 ${
              isSold
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200 active:scale-95'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Claim via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
