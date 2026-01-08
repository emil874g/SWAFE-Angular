// CONCEPT: App Router
// The file path "app/dashboard/invoices/page.tsx" automatically maps to the URL "/dashboard/invoices".

import InteractiveButton from './interactive-button';

// CONCEPT: Server Component
// By default, pages in the "app" folder are Server Components.
// They run on the server, fetch data securely, and send HTML to the browser.
export default async function Page() {
  
  // CONCEPT: Authentication / Authorization (Mock)
  // We can check permissions right here on the server before rendering anything.
  const isLoggedIn = true; // Pretend this comes from a session check like `await getSession()`
  if (!isLoggedIn) {
     return <p className="text-red-500">Access Denied: You must be logged in.</p>;
  }

  // Mock Data Fetching (Server-side)
  // This happens fast on the server. The browser never sees this data fetching logic.
  const invoices = await new Promise((resolve) => 
    setTimeout(() => resolve(['Invoice #101', 'Invoice #102']), 100)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Invoices Page</h1>
      
      {/* Server Content */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h2 className="font-semibold">Server-Fetched Data:</h2>
        <ul>
          {(invoices as string[]).map((inv) => (
            <li key={inv} className="list-disc ml-5">{inv}</li>
          ))}
        </ul>
      </div>

      {/* CONCEPT: Mixing Components */}
      {/* We import the interactive Client Component into this Server Component. */}
      {/* The Server Component handles data, the Client Component handles the button click. */}
      <InteractiveButton />
    </div>
  );
}