import Link from 'next/link';
import { redirect } from 'next/navigation';


// This is a SERVER COMPONENT (default).
// It runs entirely on the backend before HTML is sent.
export default async function Page() {
  
  // TOPIC: AUTHENTICATION / NAVIGATION
  // Server-side check: simple logic to protect the route.
  const session = true; // Mock session check
  if (!session) {
    redirect('/login'); // Programmatic Server Navigation
  }

  // Simulate fetching data on the server
  await new Promise((resolve) => setTimeout(resolve, 100));

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <p className="mb-6">This content was rendered on the server.</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card example */}
        <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg">Quick Actions</h2>
          <p className="text-gray-600 text-sm mb-4">Navigate efficiently using &lt;Link&gt;</p>
          
          <div className="flex flex-col gap-2">
            {/* 
            
              We use <Link> for Client-Side Navigation.
              This swaps the page content instantly without a full browser refresh.
            */}
            <Link 
              href="/dashboard/customers" 
              className="text-blue-600 hover:underline"
            >
              Go to Customers
            </Link>
            
            <Link 
              href="/dashboard/invoices" 
              className="text-blue-600 hover:underline"
            >
              Go to Invoices
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}