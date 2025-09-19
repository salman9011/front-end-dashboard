import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Category } from '../types/dashboard';

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onAddWidget: (name: string, text: string, categoryId: string, type: string) => void;
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({
  isOpen,
  onClose,
  categories,
  onAddWidget
}) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('metric');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (widgetName && widgetText && selectedCategory) {
      onAddWidget(widgetName, widgetText, selectedCategory, selectedType);
      setWidgetName('');
      setWidgetText('');
      setSelectedCategory('');
      setSelectedType('metric');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
          <h2 className="text-lg font-semibold">Add Widget</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-gray-600 mb-4 text-sm">
            Personalise your dashboard by adding the following widget
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Widget Name
              </label>
              <input
                type="text"
                value={widgetName}
                onChange={(e) => setWidgetName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter widget name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Widget Text
              </label>
              <textarea
                value={widgetText}
                onChange={(e) => setWidgetText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter widget description"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Widget Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="metric">Metric</option>
                <option value="chart">Chart</option>
                <option value="donut">Donut Chart</option>
                <option value="progress">Progress Bar</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWidgetModal;