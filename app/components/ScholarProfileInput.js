"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScholarData } from '../redux/scholarSlice';

export default function ScholarProfileInput({ onComplete }) {
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const { loading, data, error } = useSelector((state) => state.scholar);
  const [previousDataExists, setPreviousDataExists] = useState(false);

  // Track when data is successfully fetched
  useEffect(() => {
    if (data && !loading && !error && !previousDataExists) {
      setPreviousDataExists(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [data, loading, error, onComplete, previousDataExists]);

  const handleSubmit = () => {
    if (url) dispatch(fetchScholarData(url));
  };

  if(error) return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center gap-2 text-red-600">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <span className="font-medium">Fetch Error</span>
      </div>
      <p className="text-red-600 text-sm mt-1">{error}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-blue-900">Google Scholar Profile</h2>
        {data && (
          <div className="ml-auto flex items-center gap-2 text-green-600 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Profile Fetched</span>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="https://scholar.google.com/citations?user=..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            value={url}
            style={{color: url ? 'black' : '#9CA3AF'}}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={!url || loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin"></div>
              Fetching...
            </span>
          ) : data ? 'Fetch Another Profile' : 'Fetch Profile'}
        </button>
      </div>
    </div>
  );
}