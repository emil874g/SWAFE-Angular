// app/q9/ServerGraphqlDemo.tsx
export default async function ServerGraphqlDemo() {
  const query = `
    query {
      countries(filter: { code: { in: ["US", "CA", "MX"] } }) {
        name
      }
    }
  `;

  // Server Component Fetch
  // This happens on the server. The data is pre-rendered in the HTML.
  const res = await fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    cache: 'no-store' // Don't cache for this demo
  });

  const { data } = await res.json();

  return (
    <div className="p-4 border rounded bg-green-50 mt-4">
      <h4 className="font-bold text-green-700 mb-2">Server Component Result:</h4>
      <ul className="list-disc ml-5">
        {(data?.countries || []).map((c: any) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
