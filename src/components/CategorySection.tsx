import React from 'react';
import { Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { Category } from '../types/dashboard';
import WidgetCard from './WidgetCard';

interface CategorySectionProps {
  category: Category;
  isExpanded: boolean;
  onToggleExpand: (categoryId: string) => void;
  onRemoveWidget: (widgetId: string) => void;
  onAddWidget: () => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  isExpanded,
  onToggleExpand,
  onRemoveWidget,
  onAddWidget
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onToggleExpand(category.id)}
          className="flex items-center text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
        >
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 mr-2" />
          ) : (
            <ChevronRight className="w-5 h-5 mr-2" />
          )}
          {category.name}
        </button>
        
        <button
          onClick={onAddWidget}
          className="flex items-center px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Widget
        </button>
      </div>
      
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.widgets.map((widget) => (
            <WidgetCard
              key={widget.id}
              widget={widget}
              onRemove={onRemoveWidget}
            />
          ))}
          
          {category.widgets.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No widgets in this category. Click "Add Widget" to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategorySection;