// app/q9/q9-page.tsx
// Q9: GraphQL – principles, REST vs GraphQL, React vs Next fetching.

import React from 'react';
import ClientGraphqlDemo from './ClientGraphQLDemo';
import ServerGraphqlDemo from './ServerGraphqlDemo';

export default function Q9Page() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Question 9: GraphQL</h1>
        <p className="text-gray-500 mt-2">Principles, Comparisons, and Implementation Strategies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Principles of GraphQL */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
            <span className="bg-purple-100 p-1 rounded">1.</span> Principles
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-2">
              <span className="text-purple-500 font-bold">•</span>
              <span><strong>Type System:</strong> Strongly typed schema (Queries, Mutations).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-500 font-bold">•</span>
              <span><strong>Client-Driven:</strong> Client requests <em>exact</em> fields needed.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-500 font-bold">•</span>
              <span><strong>Single Endpoint:</strong> All requests go to <code>/graphql</code>.</span>
            </li>
          </ul>
        </section>

        {/* REST vs GraphQL */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
            <span className="bg-blue-100 p-1 rounded">2.</span> REST vs GraphQL
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span><strong>Efficiency:</strong> GraphQL avoids over/under-fetching.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span><strong>Architecture:</strong> Single flexible endpoint vs many Resource URLs.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span><strong>Caching:</strong> Harder in GraphQL (POST requests) vs Easy in REST (HTTP).</span>
            </li>
          </ul>
        </section>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 pt-6 border-t">Implementation Demos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* React-style client fetching */}
        <section className="flex flex-col h-full">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-blue-600 mb-1">A. Client-Side (React/SPA)</h3>
            <p className="text-sm text-gray-500">
              Fetches in browser after render. Needs <code>useEffect</code> & loading states. 
              Good for private, user-specific data.
            </p>
          </div>
          <div className="flex-grow p-4 bg-gray-50 rounded-lg border-2 border-dashed border-blue-200">
             <ClientGraphqlDemo />
          </div>
        </section>

        {/* Next.js Server Component fetching */}
        <section className="flex flex-col h-full">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-green-600 mb-1">B. Server-Side (Next.js)</h3>
            <p className="text-sm text-gray-500">
              Fetches on server before HTML is sent. Secure, fast, SEO-friendly.
              Good for public data.
            </p>
          </div>
          <div className="flex-grow p-4 bg-gray-50 rounded-lg border-2 border-dashed border-green-200">
             <ServerGraphqlDemo />
          </div>
        </section>
      </div>
    </div>
  );
}
