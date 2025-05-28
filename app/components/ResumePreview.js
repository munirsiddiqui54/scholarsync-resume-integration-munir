// /components/ResumePreview.js
"use client";
import { useSelector } from 'react-redux';

export default function ResumePreview() {
  const { data } = useSelector((state) => state.resume);
  
  if (!data) {
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
        <div className="text-gray-400 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">Resume preview will appear here</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-blue-900 mb-4">Resume Preview</h2>
      <div className="space-y-3">
        <div className="bg-blue-50 rounded-lg p-3">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Contact</span>
          <p className="text-sm text-gray-700 mt-1">{data.contact?.linkedin || 'N/A'}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Education</span>
          <p className="text-sm text-gray-700 mt-1">{data.education || 'N/A'}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Experience</span>
          <p className="text-sm text-gray-700 mt-1">{data.experience || 'N/A'}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Skills</span>
          <div className="flex flex-wrap gap-1 mt-2">
            {data.skills?.map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                {skill}
              </span>
            )) || <span className="text-sm text-gray-700">N/A</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
