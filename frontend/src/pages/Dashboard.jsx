import { useState, useEffect } from 'react';
import { getCandidates } from '../services/api';
import CandidateForm from '../components/Forms/CandidateForm';
import CandidateList from '../components/Lists/CandidateList';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import ApiKeyDisplay from '../components/Hide/apiKeyDisplay';
import Loader from '../components/Loader/Loader';

function Dashboard() {
  const { user } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = localStorage.getItem('apiKey');

  const fetchCandidates = async () => {
    try {
      const data = await getCandidates();
      setCandidates(data);
    } catch (error) {
      toast.error('Failed to fetch candidates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader/></div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome, {user?.firstName}!
        </h1>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-gray-600 mb-2">Your API Key:</p>
          <ApiKeyDisplay apiKey={apiKey} />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Add New Candidate
          </h2>
          <CandidateForm onCandidateAdded={fetchCandidates} />
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Candidates
          </h2>
          <CandidateList candidates={candidates} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;