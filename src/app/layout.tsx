import { getPageMap } from 'nextra/page-map'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { TOC } from '../components/TOC'
import { Inter } from 'next/font/google'
import './global.css'
import themeConfig from '../../theme.config'
import { Providers } from '../components/Providers'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default async function RootLayout({ children, params }) {
    const { mdxPath = [] } = await params
    const hasLocale = ['en', 'fr'].includes(mdxPath[0])
    const locale = hasLocale ? mdxPath[0] : 'en'

    const pageMap = await getPageMap(locale)

    return (
        <html lang={locale} dir="ltr" suppressHydrationWarning className={`${inter.variable}`}>
            <body className="antialiased font-sans bg-white text-slate-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-zinc-50">
                <Providers>
                    <Navbar logo={themeConfig.logo} />
                    <div className="flex min-h-screen">
                        <Sidebar pageMap={pageMap} currentLocale={locale} />
                        <div className="flex-1 flex justify-center">
                            <div className="w-full max-w-[1500px] flex">
                                <main className="flex-1 min-w-0 px-6 sm:px-8 lg:px-14 py-16">
                                    <article className="prose">
                                        {children}
                                    </article>

                                    <PageNavigation pageMap={pageMap} />

                                    <footer className="mt-32 pb-12 pt-10 border-t border-slate-100/50 dark:border-zinc-900/50 flex flex-col sm:flex-row justify-between items-center gap-6 text-[13px] text-slate-400 dark:text-zinc-500 font-medium">
                                        <div className="flex items-center gap-2">
                                            <span>© {new Date().getFullYear()} {themeConfig.footer.text}</span>
                                        </div>
                                        <div className="flex items-center gap-10">
                                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</a>
                                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
                                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Discord</a>
                                        </div>
                                    </footer>
                                </main>
                                <aside className="toc-container">
                                    <TOC />
                                </aside>
                            </div>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    )
}

function PageNavigation({ pageMap }) {
    // Basic implementation for demonstration
    return (
        <div className="mt-24 grid grid-cols-2 gap-6 pt-10 border-t border-slate-100/50 dark:border-zinc-900/50">
            <Link href="#" className="group flex flex-col items-start gap-2 p-4 rounded-2xl border border-slate-100/50 dark:border-zinc-900/50 hover:border-blue-500/20 transition-all">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-500 transition-colors">Previous</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-zinc-100">Getting Started</span>
            </Link>
            <Link href="#" className="group flex flex-col items-end gap-2 p-4 rounded-2xl border border-slate-100/50 dark:border-zinc-900/50 hover:border-blue-500/20 transition-all text-right">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-500 transition-colors">Next</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-zinc-100">API Overview</span>
            </Link>
        </div>
    )
}
