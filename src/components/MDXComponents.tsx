import React from 'react'

export function Callout({ children, type = 'default', emoji = '💡' }) {
    const types = {
        default: 'bg-blue-50/50 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/20 text-blue-900 dark:text-blue-300',
        error: 'bg-red-50/50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20 text-red-900 dark:text-red-300',
        warning: 'bg-amber-50/50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20 text-amber-900 dark:text-amber-300',
        success: 'bg-emerald-50/50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-300',
    }

    const icons = {
        default: '💡',
        error: '🚫',
        warning: '⚠️',
        success: '✅',
    }

    return (
        <div className={`my-6 flex gap-3 px-4 py-3 rounded-xl border ${types[type] || types.default}`}>
            <span className="text-xl select-none">{emoji || icons[type]}</span>
            <div className="flex-1 text-sm leading-relaxed font-medium">
                {children}
            </div>
        </div>
    )
}

export function Card({ title, children, href, icon }) {
    return (
        <a
            href={href}
            className="group block p-6 rounded-2xl border border-slate-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/30 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/30 transition-all duration-300 no-underline"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {icon || <DefaultIcon />}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-zinc-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h4>
            <p className="text-sm text-slate-500 dark:text-zinc-400 m-0 group-hover:text-slate-600 dark:group-hover:text-zinc-300 transition-colors leading-relaxed">
                {children}
            </p>
        </a>
    )
}

export function Steps({ children }) {
    return (
        <div className="steps-container ml-4 border-l border-slate-200/60 dark:border-zinc-800/60 pl-8 space-y-12 my-10 relative">
            {children}
        </div>
    )
}

function DefaultIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
    )
}
