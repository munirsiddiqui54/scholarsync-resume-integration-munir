// /components/ProjectSuggestions.js
"use client";
import { useDispatch, useSelector } from 'react-redux';

export default function ProjectSuggestions() {
  const dispatch = useDispatch();
  const { suggestions, loading } = useSelector((state) => state.projects);

  
  return (
    <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-blue-900">Project Suggestions</h2>
        </div>
        
        <button 
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin"></div>
              Generating...
            </span>
          ) : 'Get Suggestions'}
        </button>
      </div>
      
      {suggestions?.length > 0 ? (
        <div className="space-y-3">
          {suggestions.map((proj, index) => (
            <div key={index} className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-200 hover:bg-purple-100 transition-colors">
              <h3 className="font-medium text-purple-900">{proj.title}</h3>
              {proj.description && (
                <p className="text-sm text-purple-700 mt-1">{proj.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin"></div>
              Loading...
        </span>
      )}
    </div>
  );
}