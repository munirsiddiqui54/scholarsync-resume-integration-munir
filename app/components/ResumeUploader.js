"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumeData } from '../redux/resumeSlice';

export default function ResumeUploader({ onUpload }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { loading, data, error } = useSelector((state) => state.resume);
  const [previousDataExists, setPreviousDataExists] = useState(false);

  // Track when data is successfully fetched
  useEffect(() => {
    if (data && !loading && !error && !previousDataExists) {
      setPreviousDataExists(true);
      if (onUpload) {
        onUpload();
      }
    }
  }, [data, loading, error, onUpload, previousDataExists]);

  const handleUpload = () => {
    if (file) dispatch(fetchResumeData(file));
  };

  if(error) return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center gap-2 text-red-600">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <span className="font-medium">Upload Error</span>
      </div>
      <p className="text-red-600 text-sm mt-1">{error}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-blue-900">Upload Resume</h2>
        {data && (
          <div className="ml-auto flex items-center gap-2 text-green-600 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Uploaded Successfully</span>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 text-center hover:border-blue-300 transition-colors">
          <input 
            type="file" 
            accept=".pdf,.docx" 
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="resume-upload"
          />
          <label htmlFor="resume-upload" className="cursor-pointer">
            <div className="text-blue-600 mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-sm text-gray-600">
              {file ? file.name : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-gray-400 mt-1">PDF, DOCX up to 10MB</p>
          </label>
        </div>
        
        <button 
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin"></div>
              Uploading...
            </span>
          ) : data ? 'Upload Another Resume' : 'Parse Resume'}
        </button>
      </div>
    </div>
  );
}