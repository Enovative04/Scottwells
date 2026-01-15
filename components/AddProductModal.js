
import React, { useState, useRef } from 'react';
import { CATEGORIES, CURRENCY } from '../constants.js';

const AddProductModal = ({ isOpen, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
    status: 'Available',
    tags: []
  });

  if (!isOpen) return null;

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image_url: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.name || !formData.price || !formData.description || formData.tags.length === 0) {
      setError('Please fill in all required fields and select at least one tag.');
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      const newProduct = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        price: parseFloat(formData.price),
        image_url: formData.image_url || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800'
      };
      onSuccess(newProduct);
      setIsSubmitting(false);
      onClose();
      setFormData({ name: '', price: '', description: '', image_url: '', status: 'Available', tags: [] });
    }, 1200);
  };

  const toggleTag = (tag) => {
    if (tag === 'All') return;
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
    }));
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">Add New Product</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[85vh] overflow-y-auto no-scrollbar">
          {error && <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded-xl font-semibold flex items-start gap-3"><span>{error}</span></div>}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Product Name</label>
            <input type="text" required className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-slate-900 font-medium transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Price ({CURRENCY})</label>
              <input type="number" required className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-slate-900 font-medium transition-all" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Status</label>
              <select className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-slate-900 font-bold transition-all appearance-none cursor-pointer" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Tags</label>
            <div className="flex flex-wrap gap-2 pt-1">
              {CATEGORIES.filter(c => c !== 'All').map(category => (
                <button key={category} type="button" onClick={() => toggleTag(category)} className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border-2 ${formData.tags.includes(category) ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'}`}>{category}</button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Product Image</label>
            <div onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} onClick={() => fileInputRef.current?.click()} className={`relative h-44 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${isDragging ? 'border-slate-900 bg-slate-100' : formData.image_url ? 'border-emerald-600 bg-emerald-50' : 'border-slate-300 bg-slate-50'}`}>
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" accept="image/*" />
              {formData.image_url ? <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover rounded-xl" /> : <p className="text-sm font-bold text-slate-900">Drop image or click to upload</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Description</label>
            <textarea required rows={3} className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-slate-900 font-medium transition-all resize-none" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all disabled:opacity-50 mt-4 flex items-center justify-center gap-3">
            {isSubmitting ? 'Publishing...' : 'Post to Catalog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
