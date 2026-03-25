"use client"

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar({ pageMap }) {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()

    useEffect(() => setMounted(true), [])

    // Extract locale from pathname (e.g., /en/advanced -> en)
    const segments = pathname.split('/')
    const currentLocale = ['en', 'fr'].includes(segments[1]) ? segments[1] : 'en'

    // Filter pageMap for the current locale
    const localePageMap = pageMap?.find(item => item.name === currentLocale)?.children || []

    if (!mounted) return (
        <aside className="w-64 border-r border-slate-100 h-[calc(100vh-4rem)] sticky top-16 bg-white dark:bg-[#0a0a0a] dark:border-zinc-800" />
    )

    return (
        <aside className="w-64 border-r border-slate-100 h-[calc(100vh-4rem)] sticky top-16 flex flex-col bg-white dark:bg-[#0a0a0a] dark:border-zinc-900 transition-colors duration-300">
            <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-1">
                {localePageMap?.map((item) => (
                    <SidebarItem key={item.route || item.name} item={item} pathname={pathname} depth={0} />
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100 dark:border-zinc-900">
                <button
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-zinc-100 transition-colors px-2 py-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-zinc-900 w-full"
                >
                    {resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
                    <span className="capitalize">{resolvedTheme}</span>
                </button>
            </div>
        </aside>
    )
}

function SidebarItem({ item, pathname, depth }) {
    const [isExpanded, setIsExpanded] = useState(true)
    const isActive = pathname === item.route

    if (item.kind === 'Folder') {
        return (
            <div className="space-y-1">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors group ${depth === 0 ? 'text-slate-900 dark:text-zinc-100' : 'text-slate-600 dark:text-zinc-400'
                        } hover:bg-slate-50 dark:hover:bg-zinc-900`}
                >
                    <span className="truncate">{item.title || item.name}</span>
                    <ChevronIcon className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
                {isExpanded && (
                    <div className="ml-4 border-l border-slate-100 dark:border-zinc-900 pl-1 space-y-1">
                        {item.children?.map((child) => (
                            <SidebarItem
                                key={child.route || child.name}
                                item={child}
                                pathname={pathname}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        )
    }

    if (item.kind === 'MdxPage' || item.route) {
        return (
            <Link
                href={item.route || '#'}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${isActive
                    ? 'sidebar-link-active'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-900'
                    }`}
            >
                {item.title || item.name}
            </Link>
        )
    }

    return null
}

function ChevronIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>
    )
}

function MoonIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    )
}

function SunIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
    )
}
