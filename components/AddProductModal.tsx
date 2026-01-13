
import React, { useState, useRef } from 'react';
import { supabase } from '../supabase';
import { CATEGORIES, CURRENCY } from '../constants';
import { Category } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
    status: 'Available' as 'Available' | 'Sold',
    tags: [] as Category[]
  });

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image_url: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.name || !formData.price || !formData.description || formData.tags.length === 0) {
      setError('Please fill in all required fields and select at least one tag.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from('products')
        .insert([{
          name: formData.name,
          price: parseFloat(formData.price),
          description: formData.description,
          image_url: formData.image_url || 'https://via.placeholder.com/600x400?text=No+Image',
          status: formData.status,
          tags: formData.tags
        }]);

      if (insertError) throw insertError;

      onSuccess();
      onClose();
      setFormData({
        name: '',
        price: '',
        description: '',
        image_url: '',
        status: 'Available',
        tags: []
      });
    } catch (err: any) {
      if (err.message?.includes('row-level security') || err.code === '42501') {
        setError('Database Error: Permission denied. You need to enable "Insert" access for public in your Supabase RLS policies.');
      } else {
        setError(err.message || 'An error occurred while saving the product.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tag: Category) => {
    if (tag === 'All') return;
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
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
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded-xl font-semibold flex items-start gap-3">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Product Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-slate-900 placeholder-slate-500 font-medium transition-all"
              placeholder="e.g. Dell Latitude 7490"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Price ({CURRENCY})</label>
              <input
                type="number"
                required
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-slate-900 placeholder-slate-500 font-medium transition-all"
                placeholder="250"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Status</label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-slate-900 font-bold transition-all appearance-none cursor-pointer"
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as 'Available' | 'Sold' })}
                >
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                </select>
                <svg className="w-5 h-5 text-slate-900 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Tags</label>
            <div className="flex flex-wrap gap-2 pt-1">
              {CATEGORIES.filter(c => c !== 'All').map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleTag(category)}
                  className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                    formData.tags.includes(category)
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500 hover:text-slate-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Product Image</label>
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative h-44 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
                isDragging 
                  ? 'border-slate-900 bg-slate-100 scale-[1.01]' 
                  : formData.image_url 
                    ? 'border-emerald-600 bg-emerald-50' 
                    : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-500'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} 
                className="hidden" 
                accept="image/*" 
              />
              
              {formData.image_url ? (
                <div className="absolute inset-0 p-2">
                  <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover rounded-xl shadow-md" />
                  <div className="absolute inset-0 bg-black/30 hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 hover:opacity-100 rounded-xl">
                    <p className="text-white text-xs font-bold uppercase tracking-widest">Replace Image</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 border border-slate-100">
                    <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold text-slate-900">Drop image or click to upload</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Recommended: Square Aspect Ratio</p>
                </>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Description</label>
            <textarea
              required
              rows={3}
              className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-slate-900 placeholder-slate-500 font-medium transition-all resize-none"
              placeholder="Describe the product condition, model, and key specs..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all disabled:opacity-50 active:scale-[0.98] mt-4 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                Publishing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                Post to Catalog
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
