import React, { useState } from 'react';
import { LayoutDashboard, Plus, RefreshCw } from 'lucide-react';
import CategorySection from './components/CategorySection';
import AddWidgetModal from './components/AddWidgetModal';
import SearchBar from './components/SearchBar';
import { useDashboard } from './hooks/useDashboard';

function App() {
  const {
    dashboardData,
    expandedCategories,
    searchTerm,
    setSearchTerm,
    addWidget,
    removeWidget,
    toggleCategoryExpansion
  } = useDashboard();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryForAdd, setSelectedCategoryForAdd] = useState<string>('');

  const handleAddWidget = (categoryId?: string) => {
    setSelectedCategoryForAdd(categoryId || '');
    setIsModalOpen(true);
  };

  const handleConfirmAddWidget = (name: string, text: string, categoryId: string, type: string) => {
    addWidget(name, text, categoryId, type);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <LayoutDashboard className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleAddWidget()}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Widget
              </button>
              
              <button
                onClick={refreshPage}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        {dashboardData.categories.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No widgets found matching "{searchTerm}"</div>
            <button
              onClick={() => setSearchTerm('')}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Clear search
            </button>
          </div>
        )}
        
        {dashboardData.categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            isExpanded={expandedCategories.has(category.id)}
            onToggleExpand={toggleCategoryExpansion}
            onRemoveWidget={removeWidget}
            onAddWidget={() => handleAddWidget(category.id)}
          />
        ))}
        
        {dashboardData.categories.length === 0 && !searchTerm && (
          <div className="text-center py-12">
            <LayoutDashboard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first widget</p>
            <button
              onClick={() => handleAddWidget()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Widget
            </button>
          </div>
        )}
      </main>

      {/* Add Widget Modal */}
      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={dashboardData.categories}
        onAddWidget={handleConfirmAddWidget}
      />
    </div>
  );
}

export default App;