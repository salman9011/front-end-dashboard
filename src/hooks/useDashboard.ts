import { useState, useEffect } from 'react';
import { DashboardData, Widget, Category } from '../types/dashboard';
import { initialDashboardData } from '../data/dashboardData';

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(() => {
    const saved = localStorage.getItem('dashboardData');
    return saved ? JSON.parse(saved) : initialDashboardData;
  });

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(dashboardData.categories.map(cat => cat.id))
  );

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
  }, [dashboardData]);

  const addWidget = (name: string, text: string, categoryId: string, type: string) => {
    const newWidget: Widget = {
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      text,
      type: type as Widget['type'],
      categoryId,
      data: generateMockData(type as Widget['type'])
    };

    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, newWidget] }
          : category
      )
    }));
  };

  const removeWidget = (widgetId: string) => {
    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget => widget.id !== widgetId)
      }))
    }));
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const generateMockData = (type: Widget['type']) => {
    switch (type) {
      case 'donut':
        return { total: Math.floor(Math.random() * 10) + 1, connected: Math.floor(Math.random() * 5) + 1 };
      case 'chart':
        return {
          failed: Math.floor(Math.random() * 100),
          warning: Math.floor(Math.random() * 100),
          passed: Math.floor(Math.random() * 1000),
          total: Math.floor(Math.random() * 1200) + 100
        };
      case 'progress':
        return {
          critical: Math.floor(Math.random() * 10),
          high: Math.floor(Math.random() * 50),
          medium: Math.floor(Math.random() * 100),
          low: Math.floor(Math.random() * 200),
          total: Math.floor(Math.random() * 500) + 100
        };
      default:
        return { value: 'Sample data for new widget' };
    }
  };

  const filteredCategories = dashboardData.categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    searchTerm === '' || category.widgets.length > 0
  );

  return {
    dashboardData: { categories: filteredCategories },
    expandedCategories,
    searchTerm,
    setSearchTerm,
    addWidget,
    removeWidget,
    toggleCategoryExpansion
  };
};