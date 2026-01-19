// src/common/Empty.jsx
import React from 'react';
import { PackageSearch } from 'lucide-react';

const Empty = ({ query }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <div className="bg-slate-50 p-6 rounded-full mb-6">
      <PackageSearch className="text-slate-400 w-16 h-16" />
    </div>
    <h2 className="text-3xl font-bold text-slate-800 mb-2">No Products Found</h2>
    <p className="text-slate-500 text-lg">
      {query ? `We couldn't find anything matching "${query}"` : "Our inventory is currently empty. Check back soon!"}
    </p>
  </div>
);

export default Empty;