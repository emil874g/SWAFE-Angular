// ssr-demo.component.ts
// Q3: Component explaining SSR concepts

import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ssr-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ssr-demo.component.html',
  styleUrls: ['./ssr-demo.component.scss']
})
export class SsrDemoComponent implements OnInit {
  isBrowser: boolean;
  private platformId = inject(PLATFORM_ID);

  codeExample = `import { isPlatformBrowser } from '@angular/common';

isBrowser = isPlatformBrowser(this.platformId);

if (this.isBrowser) {
  // Browser-only code (window, localStorage, etc.)
}`.trim();

  constructor() {
    // Check if running in browser or server
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Browser-only code should be guarded
    if (this.isBrowser) {
      console.log('Running in browser');
      // Safe to use browser APIs here
      // window, document, localStorage, etc.
    } else {
      console.log('Running on server');
      // Server-side logic
    }
  }
}

/**
 * SSR Key Concepts:
 *
 * 1. Why SSR?
 *    - Better SEO (search engines see content)
 *    - Faster initial page load
 *    - Social media preview cards work
 *    - Better accessibility
 *
 * 2. How to Enable SSR?
 *    ng add @angular/ssr
 *
 * 3. Important Considerations:
 *    - No window/document on server
 *    - No localStorage/sessionStorage on server
 *    - Use isPlatformBrowser() to check environment
 *    - Use TransferState to share data between server/browser
 *
 * 4. SSR vs CSR:
 *    - CSR: Client-Side Rendering (traditional SPA)
 *    - SSR: Server-Side Rendering (pre-rendered HTML)
 *    - Angular supports both + hybrid approaches
 *
 * 5. When to Use SSR?
 *    - Public-facing websites
 *    - Content-heavy sites
 *    - Sites needing good SEO
 *    - E-commerce sites
 *
 * When NOT to use SSR?
 *    - Admin dashboards (behind authentication)
 *    - Internal tools
 *    - Real-time apps (most logic in browser anyway)
 */
