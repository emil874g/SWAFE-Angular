// app/q9/ClientGraphqlDemo.tsx
'use client';

import { useState, useEffect } from 'react';

export default function ClientGraphqlDemo() {
  const [data, setData] = useState<{ countries: { name: string }[] } | null>(null);
  const [loading, setLoading] = useState(true);

  // We fetch from a public GraphQL API (Countries API)
  useEffect(() => {
    async function fetchData() {
      const query = `
        query {
          countries(filter: { code: { in: ["DK", "SE", "NO"] } }) {
            name
          }
        }
      `;

      try {
        const response = await fetch('https://countries.trevorblades.com/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });
        const json = await response.json();
        setData(json.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-gray-500">Loading client data...</p>;

  return (
    <div className="p-4 border rounded bg-blue-50">
      <h4 className="font-bold text-blue-700 mb-2">Client Component Result:</h4>
      <ul className="list-disc ml-5">
        {data?.countries.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
