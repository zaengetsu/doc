import { notFound } from 'next/navigation'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mb-6">Page Not Found</h2>
      <p className="text-slate-500 dark:text-zinc-400 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
      >
        Go back home
      </a>
    </div>
  )
}
