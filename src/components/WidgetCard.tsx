import React from 'react';
import { X, BarChart3, PieChart, TrendingUp, Activity } from 'lucide-react';
import { Widget } from '../types/dashboard';

interface WidgetCardProps {
  widget: Widget;
  onRemove: (widgetId: string) => void;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ widget, onRemove }) => {
  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'donut':
        return (
          <div className="flex items-center justify-center h-32">
            <div className="relative w-24 h-24">
              <div className="w-24 h-24 rounded-full border-8 border-blue-200 border-t-blue-600 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-700">{widget.data?.connected || 0}</span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm text-gray-600">Connected ({widget.data?.connected || 0})</div>
              <div className="text-sm text-gray-600">Not Connected ({(widget.data?.total || 0) - (widget.data?.connected || 0)})</div>
            </div>
          </div>
        );
      
      case 'chart':
        return (
          <div className="flex items-center justify-center h-32">
            <div className="relative w-24 h-24">
              <div className="w-24 h-24 rounded-full border-8 border-green-200 border-t-green-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-700">{widget.data?.total || 0}</span>
              </div>
            </div>
            <div className="ml-4 space-y-1">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                <span className="text-sm">Failed ({widget.data?.failed || 0})</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                <span className="text-sm">Warning ({widget.data?.warning || 0})</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span className="text-sm">Passed ({widget.data?.passed || 0})</span>
              </div>
            </div>
          </div>
        );
      
      case 'progress':
        return (
          <div className="h-32">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Critical: {widget.data?.critical || 0}</span>
                <span>High: {widget.data?.high || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 to-green-500 h-3 rounded-full" style={{width: '75%'}}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Medium: {widget.data?.medium || 0}</span>
                <span>Low: {widget.data?.low || 0}</span>
              </div>
            </div>
          </div>
        );
      
      case 'metric':
      default:
        return (
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">{widget.data?.value || widget.text}</p>
            </div>
          </div>
        );
    }
  };

  const getWidgetIcon = () => {
    switch (widget.type) {
      case 'chart':
      case 'donut':
        return <PieChart className="w-4 h-4" />;
      case 'progress':
        return <BarChart3 className="w-4 h-4" />;
      case 'metric':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 relative group hover:shadow-lg transition-shadow">
      <button
        onClick={() => onRemove(widget.id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 hover:bg-red-200 rounded-full p-1"
      >
        <X className="w-4 h-4 text-red-600" />
      </button>
      
      <div className="flex items-center mb-3">
        {getWidgetIcon()}
        <h3 className="font-semibold text-gray-800 ml-2 text-sm">{widget.name}</h3>
      </div>
      
      {renderWidgetContent()}
    </div>
  );
};

export default WidgetCard;