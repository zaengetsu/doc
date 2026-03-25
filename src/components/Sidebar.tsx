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
        <aside className="w-64 border-r border-slate-200/60 h-[calc(100vh-4rem)] sticky top-16 bg-white dark:bg-zinc-950 dark:border-zinc-800/60" />
    )

    return (
        <aside className="w-64 lg:w-72 border-r border-slate-200/60 h-[calc(100vh-4rem)] sticky top-16 flex flex-col bg-white dark:bg-zinc-950 dark:border-zinc-800/60 transition-colors duration-300">
            <nav className="flex-1 overflow-y-auto px-4 lg:px-6 py-10 space-y-1.5 scrollbar-thin">
                {pageMap?.map((item) => (
                    <SidebarItem key={item.route || item.name} item={item} pathname={pathname} depth={0} />
                ))}
            </nav>

            <div className="p-4 border-t border-slate-200/60 dark:border-zinc-800/60">
                <button
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    className="flex items-center gap-3 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-zinc-100 transition-all px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-900 w-full group"
                >
                    <div className="p-1 rounded-md bg-slate-100 dark:bg-zinc-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                        {resolvedTheme === 'dark' ? <MoonIcon className="w-3.5 h-3.5" /> : <SunIcon className="w-3.5 h-3.5" />}
                    </div>
                    <span className="capitalize">{resolvedTheme} Mode</span>
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
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-xl transition-all group ${
                        depth === 0 ? 'text-slate-900 dark:text-zinc-100' : 'text-slate-600 dark:text-zinc-400'
                    } hover:bg-slate-50 dark:hover:bg-zinc-900/50`}
                >
                    <div className="flex items-center gap-2.5 truncate">
                        {depth === 0 && <FolderIcon className="w-4 h-4 text-slate-400" />}
                        <span className="truncate uppercase tracking-wider text-[11px] font-bold opacity-80">{item.title || item.name}</span>
                    </div>
                    <ChevronIcon className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
                {isExpanded && (
                    <div className="ml-3.5 border-l border-slate-100 dark:border-zinc-900 pl-2.5 mt-1 space-y-1">
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
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isDirectActive
                    ? 'text-blue-600 bg-blue-50/50 dark:text-blue-400 dark:bg-blue-500/10 ring-1 ring-blue-500/10 shadow-sm shadow-blue-500/5'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-900/50'
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

function FolderIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
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
