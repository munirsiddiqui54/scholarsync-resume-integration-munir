"use client";
import { useSelector } from 'react-redux';

export default function ScholarProfile() {
  const { data } = useSelector((state) => state.scholar);
  
  if (!data) {
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
        <div className="text-gray-400 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">Scholar profile will appear here</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-blue-900 mb-4">Scholar Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
          <div className="text-green-600 font-bold text-xl">{data.citations || 0}</div>
          <div>
            <p className="text-xs font-medium text-green-600 uppercase tracking-wide">Citations</p>
            <p className="text-sm text-gray-600">Total citations</p>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3">
          <span className="text-xs font-medium text-green-600 uppercase tracking-wide mb-2 block">Research Interests</span>
          <div className="flex flex-wrap gap-2">
            {data.interests?.map((interest, index) => (
              <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                {interest}
              </span>
            )) || <span className="text-sm text-gray-700">N/A</span>}
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3">
          <span className="text-xs font-medium text-green-600 uppercase tracking-wide mb-2 block">Recent Papers</span>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {data.papers?.slice(0, 3).map((title, index) => (
              <div key={index} className="text-sm text-gray-700 p-2 bg-white rounded border-l-2 border-green-200">
                {title}
              </div>
            )) || <span className="text-sm text-gray-700">N/A</span>}
          </div>
        </div>
      </div>
    </div>
  );
}