/* eslint-disable react/prop-types */
import { useState } from "react";
import { Copy, Eye, EyeOff} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";


const ApiDocs = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const apiKey = localStorage.getItem("apiKey") || "<YOUR-API-KEY>";

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success('API key copied to clipboard!', {
      duration: 2000,
      position: 'bottom-right',
      style: {
        background: '#fff',
        color: '#000',
      },
    });
  };

  const RequestExample = ({ method, url, description, exampleResponse, errorResponse }) => (
    <div className="space-y-4">
      {/* What this API does Section */}
      <div className="bg-gray-900 text-white rounded-lg">
        <div className="p-4">
          <h4 className="text-sm font-semibold mb-3 text-gray-400">
            What this Endpoint does?
          </h4>
          <div className="text-sm">
            {description}
          </div>
        </div>
      </div>

      {/* Request Method Section */}
      <div className="bg-gray-900 text-white rounded-lg">
        <div className="p-4">
          <h4 className="text-sm font-semibold mb-3 text-gray-400">
            Request Method
          </h4>
          <div className="font-mono text-sm">
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                method === "GET"
                  ? "bg-green-200 text-green-800"
                  : "bg-blue-200 text-blue-800"
              }`}
            >
              {method}
            </span>
          </div>
        </div>
      </div>

      {/* URL Section */}
      <div className="bg-gray-900 text-white rounded-lg">
        <div className="p-4">
          <h4 className="text-sm font-semibold mb-3 text-gray-400">
            Endpoint URL
          </h4>
          <div className="font-mono text-sm break-all">{url}</div>
        </div>
      </div>

      {/* Headers Section */}
      <div className="bg-gray-900 text-white rounded-lg">
        <div className="p-4">
          <h4 className="text-sm font-semibold mb-3 text-gray-400">Headers</h4>
          <div className="font-mono text-sm">
            <div className="flex flex-col sm:flex-row sm:flex-wrap">
              <span className="text-purple-400">x-api-key</span>
              <span className="text-gray-400 mx-2">:</span>
              <span className="text-green-400 break-all">YOUR-API-KEY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Example Response Section */}
      <div className="bg-gray-900 text-white rounded-lg">
        <div className="p-4">
          <h4 className="text-sm font-semibold mb-3 text-gray-400">
            Example Response
          </h4>
          <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-3 mb-3">
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded w-fit bg-green-200 text-green-800">
              Status: 200 OK
            </span>
            <span className="text-sm text-gray-400">
              <span className="mr-2">Time: 179ms</span>
              <br className="lg:hidden" /> Size: 465B
            </span>
          </div>
          <pre className="font-mono text-sm whitespace-pre-wrap text-green-400">
            {JSON.stringify(exampleResponse, null, 2)}
          </pre>
        </div>
      </div>

      {/* Error Handling Section */}
      <div className="bg-gray-900 text-white rounded-lg">
        <div className="p-4">
          <h4 className="text-sm font-semibold mb-3 text-gray-400">
            Error Handling
          </h4>
          <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-3 mb-3">
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded w-fit bg-red-200 text-red-800">
              Status: 401 Unauthorized
            </span>
            <span className="text-sm text-gray-400">
              <span className="mr-2">Time: 162ms</span>
              <br className="lg:hidden" /> Size: 387B
            </span>
          </div>
          <pre className="font-mono text-sm whitespace-pre-wrap text-red-400">
            {JSON.stringify(errorResponse, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );

  const profileExampleResponse = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    createdAt: "2025-01-18T09:41:19.301Z",
  };

  const profileErrorResponse = {
    error: "Invalid API key",
    message: "Please provide a valid API key in the x-api-key header",
    code: "AUTH_ERROR",
  };

  const candidatesExampleResponse = {
    candidates: [
      {
        firstName: "Alice",
        lastName: "Smith",
        email: "alicesmith@gmail.com",
        createdAt: "2025-01-18T09:41:19.301Z",
      },
      {
        firstName: "Alicia",
        lastName: "Devon",
        email: "aliciad@gmail.com",
        createdAt: "2025-01-18T09:41:19.301Z",
      },
    ],
  };

  const candidatesErrorResponse = {
    error: "Invalid API key",
    message: "Please provide a valid API key in the x-api-key header",
    code: "AUTH_ERROR",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 p-1 lg:p-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <section id="api-key">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Your API Key</h2>
                </div>
                <div className="p-4 flex items-center space-x-4 bg-blue-50">
                  <code className="flex-1 font-mono break-all">
                    {showApiKey ? apiKey : "••••••••••••••••"}
                  </code>
                  <button
                    className="rounded p-2 hover:bg-blue-200"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    className="hover:bg-blue-200 rounded p-2"
                    onClick={copyApiKey}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </section>

            <section id="getting-started">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Getting Started</h2>
                </div>
                <div className="p-4">
                  <p>
                    Each user receives a unique API key upon registration. This
                    key must be included in all API requests through the{" "}
                    <code>x-api-key</code> header.
                  </p>
                  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4">
                    <p>Keep your API key secure and never share it publicly.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="endpoints">
              <div className="rounded-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-lg font-semibold">Available Endpoints</h2>
                </div>
                <div className="p-4 space-y-8">
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">GET USER PROFILE</h3>
                    </div>
                    <div className="p-4">
                      <RequestExample
                        method="GET"
                        url="http://your-domain/api/public/profile"
                        description="This endpoint retrieves the complete profile information of the user associated with the provided API key. It returns detailed user data including first name, last name, email, and account creation date in JSON format. This is useful for displaying user information or verifying account details."
                        exampleResponse={profileExampleResponse}
                        errorResponse={profileErrorResponse}
                      />
                    </div>
                  </div>

                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">GET USER CANDIDATES</h3>
                    </div>
                    <div className="p-4">
                      <RequestExample
                        method="GET"
                        url="http://your-domain/api/public/candidates"
                        description="This endpoint retrieves all candidates associated with the user whose API key is being used. It returns a list of candidate profiles, each containing personal information such as first name, last name, email, and when they were added to the system. This is useful for managing and viewing all candidates linked to your account."
                        exampleResponse={candidatesExampleResponse}
                        errorResponse={candidatesErrorResponse}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="precautions">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Precautions</h2>
                </div>
                <div className="p-4 bg-blue-50">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Never expose your API key in client-side code or public
                      repositories
                    </li>
                    <li>
                      Implement rate limiting in your applications to avoid
                      hitting usage limits
                    </li>
                    <li>Keep your API key secure and rotate it periodically</li>
                    <li>
                      Monitor your API usage regularly for any suspicious
                      activity
                    </li>
                    <li>Handle API errors gracefully in your applications</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;