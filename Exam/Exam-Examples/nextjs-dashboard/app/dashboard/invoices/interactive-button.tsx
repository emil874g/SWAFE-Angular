'use client'; // CONCEPT: Client Component
// This directive tells Next.js to render this component on the client-side (browser).
// It enables interactivity (hooks like useState, useEffect, onClick).

import { useState } from 'react';

export default function InteractiveButton() {
  const [count, setCount] = useState(0);

  return (
    <button 
      className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      onClick={() => setCount(count + 1)}
    >
      Clicked {count} times (Client Interaction)
    </button>
  );
}
