// /app/MainPage.js
"use client";
import { useState, useEffect } from "react";
import ResumeUploader from "./components/ResumeUploader";
import ScholarProfileInput from "./components/ScholarProfileInput";
import ResumePreview from "./components/ResumePreview";
import ScholarProfile from "./components/ScholarProfile";
import ProjectSuggestions from "./components/ProjectSuggestion";
import { fetchProjectSuggestions } from "./redux/projectSlice";
import { useDispatch } from "react-redux";

export default function MainPage() {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [scholarProfileFilled, setScholarProfileFilled] = useState(false);

  const steps = [
    { id: 1, title: "Upload Resume" },
    { id: 2, title: "Scholar Profile" },
    { id: 3, title: "Review & Preview" },
    { id: 4, title: "Get Suggestions" },
  ];

  // Mock function to simulate step completion - you'll replace this with actual logic
  const handleStepComplete = (stepId) => {
    setCompletedSteps((prev) => new Set([...prev, stepId]));
    if (stepId === currentStep && stepId < steps.length) {
      setCurrentStep(stepId + 1);
    }
  };

  // Mock functions to simulate resume upload and scholar profile completion
  const handleResumeUpload = () => {
    setResumeUploaded(true);
  };

  const handleScholarProfileComplete = () => {
    setScholarProfileFilled(true);
  };

  const ProgressBar = () => (
    <div className="w-full bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-blue-900">Your Progress</h2>
        <span className="text-sm text-blue-600 font-medium">
          Step {currentStep} of {steps.length}
        </span>
      </div>

      {/* Progress Line */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  completedSteps.has(step.id)
                    ? "bg-blue-600 text-white"
                    : step.id === currentStep
                      ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                {completedSteps.has(step.id) ? "✓" : step.id}
              </div>
              <div className="text-center mt-2">
                <div
                  className={`text-xs font-medium ${
                    step.id <= currentStep ? "text-blue-900" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connecting Line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 -z-0">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-10 px-4 md:px-10">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      <div className="max-w-6xl mx-auto space-y-10">
        <ProgressBar />

        {/* Current Step Content */}
        <div className="transition-all duration-500 ease-in-out">
          {currentStep === 1 && (
            <div>
              {/* Grid layout for desktop, stack on mobile */}
              <div
                className={`grid grid-cols-1 gap-6 ${resumeUploaded ? "md:grid-cols-2" : ""}`}
              >
                <div className="space-y-4">
                  <ResumeUploader onUpload={handleResumeUpload} />
                </div>

                {/* Resume Preview - shows after upload */}
                {resumeUploaded && (
                  <div className="bg-blue-50 rounded-lg p-4 animate-fadeIn">
                    <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Resume Preview
                    </h4>
                    <ResumePreview />
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  disabled
                  className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-medium cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => handleStepComplete(1)}
                  disabled={!resumeUploaded}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    resumeUploaded
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              {/* Grid layout for desktop, stack on mobile */}
              <div
                className={`grid grid-cols-1 gap-6 ${scholarProfileFilled ? "md:grid-cols-2" : ""}`}
              >
                <div className="space-y-4">
                  <ScholarProfileInput
                    onComplete={handleScholarProfileComplete}
                  />
                </div>

                {/* Scholar Profile Preview - shows after filling */}
                {scholarProfileFilled && (
                  <div className="bg-blue-50 rounded-lg p-4 animate-fadeIn">
                    <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Scholar Profile Preview
                    </h4>
                    <ScholarProfile />
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => handleStepComplete(2)}
                  disabled={!scholarProfileFilled}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    scholarProfileFilled
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResumePreview /> <ScholarProfile />
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => {
                    handleStepComplete(3);
                    dispatch(fetchProjectSuggestions());
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Generate Suggestions →
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <ProjectSuggestions />
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setResumeUploaded(false);
                    setScholarProfileFilled(false);
                    setCompletedSteps(new Set());
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
