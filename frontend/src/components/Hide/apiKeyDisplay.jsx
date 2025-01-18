/* eslint-disable react/prop-types */
import { useState } from "react";
import { Eye, EyeOff, Copy } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ApiKeyDisplay = ({ apiKey }) => {
  const [showKey, setShowKey] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey || "").then(() => {
      toast.success("API key copied to clipboard!", {
        duration: 2000,
        position: "bottom-center",
      });
    });
  };

  return (
    <div className="relative">
      {/* Toast container for notifications */}
      <Toaster />
      <div className="flex items-center bg-blue-50 p-3 rounded border border-blue-500 border-1">
        {/* Display API key */}
        <code className="flex-1 text-sm break-all">
          {showKey ? apiKey : "•".repeat(Math.min(40, apiKey?.length || 0))}
        </code>

        {/* Show/Hide button */}
        <button
          onClick={() => setShowKey(!showKey)}
          className="ml-2 p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-blue-200 transition-colors"
          aria-label={showKey ? "Hide API key" : "Show API key"}
        >
          {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="ml-2 p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-blue-200 transition-colors"
          aria-label="Copy API key"
        >
          <Copy size={20} />
        </button>
      </div>
    </div>
  );
};

export default ApiKeyDisplay;
