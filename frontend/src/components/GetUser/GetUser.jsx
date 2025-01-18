import { useState } from 'react';
import { ChevronDown, Eye} from 'lucide-react';

const GetUser = () => {
  const [endpoint, setEndpoint] = useState('http://your-domain/api/public/profile');
  const [activeTab, setActiveTab] = useState('headers');
  const [headers, setHeaders] = useState([
    { key: 'x-api-key', value: '<YOUR-API-KEY>', enabled: true },
    { key: '', value: '', enabled: false }
  ]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-black text-gray-200 p-2 sm:p-4 rounded-lg">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <span className="text-green-500 text-sm sm:text-base">APIConnectX</span>
          <span className="text-gray-500">/</span>
          <span className="text-sm sm:text-base">User Profile</span>
        </div>
      </div>

      {/* Request Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
        <div className="relative">
          <button className="w-full sm:w-auto flex items-center justify-between sm:justify-start space-x-2 bg-transparent border border-gray-700 px-3 py-1 rounded">
            <span className="text-green-500">{method}</span>
            <ChevronDown size={16} />
          </button>
        </div>
        <input
          type="text"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          className="flex-1 bg-transparent border border-gray-700 px-3 py-1 rounded text-sm sm:text-base"
        />
        <button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 px-6 py-1 rounded text-sm sm:text-base">
          Send
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-gray-700 mb-4 overflow-x-auto">
        {['Params', 'Authorization', 'Headers', 'Body'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-3 sm:px-4 py-2 text-sm sm:text-base whitespace-nowrap
              ${activeTab === tab.toLowerCase() ? 'border-b-2 border-green-500' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Headers Section */}
      {activeTab === 'headers' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-base sm:text-lg">Headers</h2>
            <button className="flex items-center space-x-1 bg-gray-800 px-2 py-1 rounded text-xs sm:text-sm">
              <Eye size={14} />
              <span>hidden</span>
            </button>
          </div>

          <div className="border border-gray-700 rounded overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="w-8 p-2"></th>
                  <th className="text-left p-2 text-sm sm:text-base">Key</th>
                  <th className="text-left p-2 text-sm sm:text-base">Value</th>
                </tr>
              </thead>
              <tbody>
                {headers.map((header, index) => (
                  <tr key={index} className="border-b border-gray-700 last:border-0">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={header.enabled}
                        onChange={(e) => {
                          const newHeaders = [...headers];
                          newHeaders[index].enabled = e.target.checked;
                          setHeaders(newHeaders);
                        }}
                        className="rounded border-gray-700"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={header.key}
                        placeholder="Key"
                        onChange={(e) => {
                          const newHeaders = [...headers];
                          newHeaders[index].key = e.target.value;
                          setHeaders(newHeaders);
                        }}
                        className="w-full bg-transparent text-sm sm:text-base"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={header.value}
                        placeholder="Value"
                        onChange={(e) => {
                          const newHeaders = [...headers];
                          newHeaders[index].value = e.target.value;
                          setHeaders(newHeaders);
                        }}
                        className="w-full bg-transparent text-sm sm:text-base"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetUser;