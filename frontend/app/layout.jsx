import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'EventHire — Post a Hiring Requirement',
  description: 'Hire event planners, performers, and crew for your next event. Post your requirement in minutes.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-purple-50">
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 left-0 -z-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 -z-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Header */}
        <header className="sticky top-4 z-50 mx-4 max-w-5xl md:mx-auto bg-surface/70 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl">
          <div className="px-5 h-16 flex items-center justify-between">
            <a href="/" className="font-heading font-bold text-2xl text-primary tracking-tight flex items-center gap-1">
              🎉 Event<span className="text-accent">Hire</span>
            </a>
            <a
              href="/post"
              className="bg-gradient-to-r from-accent to-purple-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Post a Requirement
            </a>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-8 md:py-12 relative z-10">
          {children}
        </main>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              borderRadius: '10px',
              border: '1px solid #E5E4E0',
            },
            success: {
              iconTheme: { primary: '#22C55E', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#EF4444', secondary: '#fff' },
            },
          }}
        />
      </body>
    </html>
  )
}
