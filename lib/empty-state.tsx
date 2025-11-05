export function EmptyState() {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center mt-10 flex flex-col justify-center min-h-[400px] md:min-h-[680px]">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg 
            className="w-10 h-10 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Results Yet
        </h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Fill in the form and click &ldquo; Validate Idea &ldquo; to see your Central Idea analysis.
        </p>
      </div>
    );
  }