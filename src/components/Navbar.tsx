"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar({ logo }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-slate-900">
                        {logo}
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/about" className="navbar-link">About</Link>
                        <Link href="https://nextra.site" target="_blank" className="navbar-link flex items-center gap-1">
                            Contact
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <LocaleSwitcher />
                    <div className="hidden sm:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                className="h-9 w-64 rounded-md border border-slate-200 bg-slate-50 dark:bg-zinc-900 dark:border-zinc-800 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <kbd className="absolute right-2 top-2 h-5 select-none rounded border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-1.5 font-mono text-[10px] font-medium text-slate-400">
                                ⌘ K
                            </kbd>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-500 ml-2">
                        <Link href="https://github.com" target="_blank" className="hover:text-slate-900">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </Link>
                        <Link href="https://discord.com" target="_blank" className="hover:text-slate-900">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

function LocaleSwitcher() {
    const pathname = usePathname()
    const segments = pathname.split('/')
    const currentLocale = ['en', 'fr'].includes(segments[1]) ? segments[1] : 'en'

    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'fr', label: 'FR' }
    ]

    return (
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-zinc-900 rounded-lg mr-2">
            {languages.map((lang) => {
                const isActive = currentLocale === lang.code
                // Simple regex to replace the locale segment
                const targetPath = pathname.startsWith(`/${currentLocale}`)
                    ? pathname.replace(`/${currentLocale}`, `/${lang.code}`)
                    : `/${lang.code}${pathname}`

                return (
                    <Link
                        key={lang.code}
                        href={targetPath}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all ${isActive
                            ? 'bg-white dark:bg-zinc-800 text-blue-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-zinc-100'
                            }`}
                    >
                        {lang.label}
                    </Link>
                )
            })}
        </div>
    )
}
