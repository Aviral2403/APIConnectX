import React, { useState } from 'react';
import {
  Copy,
  Search,
  Globe,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';

const UserResponse = () => {
  const [activeTab, setActiveTab] = useState('body');
  const [viewMode, setViewMode] = useState('pretty');

  const responseData = {
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith123@examplw.com",
    createdAt: "2025-01-18T09:41:19.301Z"
  };

  const formatValue = (value) => {
    if (typeof value === 'string') {
      return `"${value}"`;
    }
    return value;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-black text-gray-200 p-2 sm:p-4 rounded-lg text-sm sm:text-base">
      {/* Top Status Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 bg-gray-900 p-2 sm:p-3 rounded-t-lg space-y-2 sm:space-y-0">
        <div className="flex flex-wrap items-center gap-2">
          <Globe className="text-green-500" size={18} />
          <span>Status: </span>
          <span className="text-green-500">200 OK</span>
          <span className="hidden sm:inline text-gray-500">|</span>
          <span>Time: 179 ms</span>
          <span className="hidden sm:inline text-gray-500">|</span>
          <span>Size: 465 B</span>
        </div>
        <div className="flex items-center space-x-3">
          <Copy size={18} className="cursor-pointer hover:text-gray-400" />
          <LayoutGrid size={18} className="cursor-pointer hover:text-gray-400" />
        </div>
      </div>

      {/* Tabs - Scrollable on mobile */}
      <div className="overflow-x-auto">
        <div className="flex border-b border-gray-700 mb-4 min-w-max">
          {['Body', 'Cookies', 'Headers (11)', 'Test Results'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-3 sm:px-4 py-2 whitespace-nowrap ${
                activeTab === tab.toLowerCase() ? 'border-b-2 border-green-500' : ''
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* View Options */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4">
        <div className="flex bg-gray-900 rounded w-full sm:w-auto">
          {['Pretty', 'Raw', 'Preview'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode.toLowerCase())}
              className={`px-3 sm:px-4 py-1 rounded flex-1 sm:flex-none ${
                viewMode === mode.toLowerCase() ? 'bg-gray-700' : ''
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
        <button className="flex items-center space-x-1 bg-gray-700 px-3 py-1 rounded w-full sm:w-auto justify-center">
          <span>JSON</span>
          <ChevronDown size={16} />
        </button>
        <div className="relative w-full sm:w-auto sm:ml-auto">
          <Search size={18} className="absolute left-3 top-1.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-900 pl-10 pr-4 py-1 rounded border border-gray-700 focus:outline-none focus:border-gray-600"
          />
        </div>
      </div>

      {/* Response Content */}
      <div className="bg-gray-900 p-2 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto">
        <div className="space-y-2 min-w-max">
          {Object.entries(responseData).map(([key, value], index) => (
            <div key={index} className="flex flex-col space-y-1">
              <div className="flex items-start space-x-2">
                <span className="text-blue-400">"</span>
                <span className="text-blue-400">{key}</span>
                <span className="text-blue-400">"</span>
                <span className="text-gray-500">:</span>
                <span className={typeof value === 'string' ? 'text-green-400' : 'text-orange-400'}>
                  {formatValue(value)}
                </span>
                {index < Object.entries(responseData).length - 1 && (
                  <span className="text-gray-500">,</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserResponse;