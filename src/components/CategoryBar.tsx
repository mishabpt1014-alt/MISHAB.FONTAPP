import React from 'react';
import { CATEGORIES } from '../data/fontsData';
import { CategoryType } from '../types';

interface CategoryBarProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-1">
      <div className="flex items-center gap-2 min-w-max">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = categoryCounts[cat] || 0;

          return (
            <button
              key={cat}
              id={`cat-btn-${cat.toLowerCase()}`}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                isSelected
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 ring-2 ring-rose-500/20'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/90 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <span>{cat}</span>
              {count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                    isSelected
                      ? 'bg-white/25 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
