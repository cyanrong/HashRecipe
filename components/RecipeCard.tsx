import React from 'react';
import { Clock, Flame, Heart, ChevronRight } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
  onClick: (recipe: Recipe) => void;
  labels: {
    kcal: string;
    min: string;
    viewDetails: string;
  };
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isLiked, onToggleLike, onClick, labels }) => {
  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => onClick(recipe)}>
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white text-sm font-mono truncate">{recipe.hashCode.substring(0, 20)}...</p>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleLike(recipe.id); }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${isLiked ? 'bg-red-50 text-red-500 shadow-sm' : 'bg-black/30 text-white hover:bg-white hover:text-red-500'}`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex gap-2 mb-3">
          {recipe.tags.map(tag => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 
          className="text-lg font-bold text-gray-900 mb-2 leading-tight cursor-pointer hover:text-brand-600 transition-colors line-clamp-2"
          onClick={() => onClick(recipe)}
        >
          {recipe.title}
        </h3>

        <div className="flex items-center gap-4 mt-auto text-gray-500 text-sm">
          <div className="flex items-center gap-1.5">
            <Flame size={14} className="text-orange-500" />
            <span>{recipe.calories} {labels.kcal}</span>
          </div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-blue-500" />
            <span>{recipe.timeMinutes}{labels.min}</span>
          </div>
        </div>
        
        <button 
          onClick={() => onClick(recipe)}
          className="w-full mt-4 flex items-center justify-center gap-1 text-xs font-semibold uppercase tracking-wider py-2.5 rounded-lg bg-gray-50 text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors"
        >
          {labels.viewDetails} <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};