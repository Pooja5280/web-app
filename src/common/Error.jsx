import React from 'react';
import { AlertCircle } from 'lucide-react';

const Error = ({ statusCode, message }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <div className="bg-red-50 p-6 rounded-full mb-6">
      <AlertCircle className="text-red-500 w-16 h-16" />
    </div>
    <h2 className="text-4xl font-black text-slate-900 mb-4">
      {statusCode === 404 ? "Oops! 404 Error" : `Error ${statusCode || '500'}`}
    </h2>
    <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">
      {message || "We're having trouble reaching the Luxora servers. Please check your connection or try again later."}
    </p>
    <button 
      onClick={() => window.location.reload()}
      className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all active:scale-95"
    >
      Retry Request
    </button>
  </div>
);

export default Error;