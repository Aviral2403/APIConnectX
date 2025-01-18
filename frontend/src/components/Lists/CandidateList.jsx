/* eslint-disable react/prop-types */
function CandidateList({ candidates }) {
    if (!candidates.length) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No candidates found.</p>
        </div>
      )
    }
  
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {candidates.map((candidate) => (
          <div
            key={candidate._id}
            className=" p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-blue-100"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {candidate.first_name} {candidate.last_name}
            </h3>
            <p className="text-gray-600 mt-1">{candidate.email}</p>
            <p className="text-sm text-gray-500 mt-2">
              Added: {new Date(candidate.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    )
  }
  
  export default CandidateList