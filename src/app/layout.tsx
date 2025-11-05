import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://acker-group.com'),
  title: {
    default: 'Acker Group SA | Holding Company in South Africa - Technology, Real Estate & Hospitality',
    template: '%s | Acker Group SA'
  },
  description: 'Acker Group SA (Pty) Ltd is a private holding company in South Africa managing diversified investments across technology innovation, real estate & construction, and hospitality sectors. Building excellence through strategic leadership.',
  authors: [{ name: 'Acker Group SA (Pty) Ltd' }],
  creator: 'Acker Group SA (Pty) Ltd',
  publisher: 'Acker Group SA (Pty) Ltd',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://acker-group.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://acker-group.com',
    siteName: 'Acker Group SA',
    title: 'Acker Group SA | Holding Company in South Africa',
    description: 'Private holding company managing diversified investments across technology, real estate & construction, and hospitality in South Africa.',
    images: [
      {
        url: '/logo.png',
        width: 1920,
        height: 1080,
        alt: 'Acker Group SA Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acker Group SA | Holding Company in South Africa',
    description: 'Private holding company managing diversified investments across technology, real estate & construction, and hospitality.',
    images: ['/logo.png'],
  },
  category: 'business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Light / Dark mode favicons (media queries are not consistently supported by all browsers) */}
  <link rel="icon" href="/favicon-light.png" type="image/png" media="(prefers-color-scheme: light)" />
  <link rel="icon" href="/favicon-dark.png" type="image/png" media="(prefers-color-scheme: dark)" />
  {/* Fallback for browsers that don't support media on icons */}
  <link rel="icon" href="/favicon-light.png" />
        {/*
          Inline script: ensure correct favicon is used on page load and when the
          user's color-scheme preference changes. This makes the switch work
          even in browsers that ignore media on icon links.
        */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try{
              var light = '/favicon-light.png';
              var dark = '/favicon-dark.png';

              function removeUnmanagedIcons(){
                Array.from(document.querySelectorAll('link[rel~="icon"]')).forEach(function(n){
                  if(!n.hasAttribute('data-theme')){
                    n.parentNode && n.parentNode.removeChild(n);
                  }
                });
              }

              function setIcon(href){
                var el = document.querySelector('link[rel="icon"][data-theme="auto"]');
                if(!el){
                  el = document.createElement('link');
                  el.setAttribute('rel','icon');
                  el.setAttribute('data-theme','auto');
                  document.head.appendChild(el);
                }
                if(el.getAttribute('href') !== href){ el.setAttribute('href', href); }
              }

              var mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
              function update(){
                var useDark = mq ? mq.matches : false;
                setIcon(useDark ? dark : light);
              }

              // Initial cleanup and set
              removeUnmanagedIcons();
              update();

              // Observe head for new or modified icon links added later (e.g. during hydration)
              var head = document.head || document.getElementsByTagName('head')[0];
              if(head && window.MutationObserver){
                var mo = new MutationObserver(function(mutations){
                  mutations.forEach(function(m){
                    // handle added nodes
                    m.addedNodes && m.addedNodes.forEach(function(node){
                      if(node && node.nodeType === 1 && node.tagName.toLowerCase() === 'link'){
                        var rel = (node.getAttribute('rel') || '').toLowerCase();
                        if(rel.indexOf('icon') !== -1 && !node.hasAttribute('data-theme')){
                          node.parentNode && node.parentNode.removeChild(node);
                        }
                      }
                    });
                    // handle attribute changes on existing nodes (e.g., href changes)
                    if(m.type === 'attributes' && m.target && m.target.tagName && m.target.tagName.toLowerCase() === 'link'){
                      var t = m.target;
                      var relt = (t.getAttribute('rel') || '').toLowerCase();
                      if(relt.indexOf('icon') !== -1 && !t.hasAttribute('data-theme')){
                        t.parentNode && t.parentNode.removeChild(t);
                      }
                    }
                  });
                  // ensure our icon stays correct after mutations
                  update();
                });
                // observe child additions, subtree changes and attribute changes on links
                mo.observe(head, { childList: true, subtree: true, attributes: true, attributeFilter: ['rel','href'] });
              }

              if(mq && mq.addEventListener) mq.addEventListener('change', update);
              else if(mq && mq.addListener) mq.addListener(update);

              // Safety: re-run repeatedly for a short window to override any late scripts
              var retries = 0;
              var maxRetries = 20; // ~2 seconds at 100ms interval
              var interval = setInterval(function(){
                removeUnmanagedIcons();
                update();
                retries++;
                if(retries > maxRetries) clearInterval(interval);
              }, 100);
            }catch(e){ console.error('favicon switch error', e); }
          })();
        ` }} />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
