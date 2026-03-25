"use client"

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar({ pageMap, currentLocale }) {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()

    useEffect(() => setMounted(true), [])

    if (!mounted) return (
        <aside className="w-64 border-r border-slate-100/40 h-[calc(100vh-3.5rem)] sticky top-14 bg-white dark:bg-[#09090b] dark:border-zinc-900/40" />
    )

    return (
        <aside className="w-64 lg:w-[280px] border-r border-slate-100/40 h-[calc(100vh-3.5rem)] sticky top-14 flex flex-col bg-white dark:bg-[#09090b] dark:border-zinc-900/40 transition-colors duration-300">
            <nav className="flex-1 overflow-y-auto px-6 py-12 space-y-2 scrollbar-thin">
                {pageMap?.map((item) => (
                    <SidebarItem key={item.route || item.name} item={item} pathname={pathname} depth={0} />
                ))}
            </nav>

            <div className="p-4 mx-6 mb-6 border-t border-slate-100/50 dark:border-zinc-900/50">
                <button
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-zinc-100 transition-all px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-900/50 w-full group"
                >
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-900 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20 transition-colors">
                        {resolvedTheme === 'dark' ? <MoonIcon className="w-3 h-3" /> : <SunIcon className="w-3 h-3" />}
                    </div>
                    <span className="capitalize tracking-tight">{resolvedTheme} Appearance</span>
                </button>
            </div>
        </aside>
    )
}

function SidebarItem({ item, pathname, depth }) {
    const [isExpanded, setIsExpanded] = useState(true)
    const isActive = pathname === item.route || pathname.startsWith(item.route + '/')
    const isDirectActive = pathname === item.route

    if (item.kind === 'Folder') {
        return (
            <div className="space-y-1">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-lg transition-all group ${
                        depth === 0 ? 'text-slate-900 dark:text-zinc-100' : 'text-slate-600 dark:text-zinc-400'
                    } hover:bg-slate-50/50 dark:hover:bg-zinc-900/30`}
                >
                    <div className="flex items-center gap-2.5 truncate">
                        <span className={`truncate ${depth === 0 ? 'uppercase tracking-widest text-[10px] opacity-70 font-bold' : 'text-xs'}`}>
                            {item.title || item.name}
                        </span>
                    </div>
                    <ChevronIcon className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
                {isExpanded && (
                    <div className={`mt-1 space-y-1 ${depth === 0 ? 'ml-0' : 'ml-4 border-l border-slate-100 dark:border-zinc-900 pl-3'}`}>
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
                className={`flex items-center px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-300 ${
                    isDirectActive
                    ? 'sidebar-link-active'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-900/30'
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>
    )
}

function MoonIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    )
}

function SunIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
    )
}
