"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export function Navbar({ logo }) {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
            scrolled
            ? 'border-b border-slate-200/40 bg-white/70 backdrop-blur-2xl dark:border-zinc-800/40 dark:bg-zinc-950/70 shadow-sm'
            : 'border-b border-transparent bg-white/0'
        }`}>
            <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-[10px] transition-transform group-hover:scale-105">
                            {typeof logo === 'string' ? logo.charAt(0) : 'D'}
                        </div>
                        <span className="font-bold text-[15px] tracking-tight text-slate-900 dark:text-zinc-100">
                            {logo}
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-2">
                        <Link href="/en" className="navbar-link">Documentation</Link>
                        <Link href="/en/guides" className="navbar-link">Guides</Link>
                        <Link href="https://github.com" target="_blank" className="navbar-link flex items-center gap-1.5 group">
                            GitHub
                            <ExternalIcon className="w-3 h-3 text-slate-400 group-hover:text-slate-900 transition-colors" />
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-6">
                    <LocaleSwitcher />
                    <div className="hidden sm:block">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="h-8 w-40 lg:w-56 rounded-lg border border-slate-200 bg-slate-50/50 dark:bg-zinc-900/50 dark:border-zinc-800/50 pl-9 pr-12 text-xs transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 placeholder:text-slate-400"
                            />
                            <div className="absolute right-2 top-1.5 pointer-events-none">
                                <kbd className="hidden lg:flex h-5 select-none items-center gap-1 rounded border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-1.5 font-mono text-[9px] font-medium text-slate-400">
                                    <span className="text-[10px]">⌘</span>K
                                </kbd>
                            </div>
                        </div>
                    </div>
                    <Link href="https://github.com" target="_blank" className="text-slate-500 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-zinc-100 transition-colors">
                        <GitHubIcon className="w-4.5 h-4.5" />
                    </Link>
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
        <div className="flex items-center gap-1 p-1 bg-slate-100/50 dark:bg-zinc-900/50 border border-slate-200/20 dark:border-zinc-800/20 rounded-lg">
            {languages.map((lang) => {
                const isActive = currentLocale === lang.code
                const targetPath = pathname.startsWith(`/${currentLocale}`)
                    ? pathname.replace(`/${currentLocale}`, `/${lang.code}`)
                    : `/${lang.code}${pathname}`

                return (
                    <Link
                        key={lang.code}
                        href={targetPath}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all duration-300 ${isActive
                            ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
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

function SearchIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    )
}

function ExternalIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
    )
}

function GitHubIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    )
}
