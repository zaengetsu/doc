import { getPageMap } from 'nextra/page-map'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { Inter } from 'next/font/google'
import './global.css'
import themeConfig from '../../theme.config'
import { Providers } from '../components/Providers'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children }) {
    const pageMap = await getPageMap()

    return (
        <html lang="en" dir="ltr" suppressHydrationWarning className={inter.className}>
            <body className="antialiased bg-white text-stone-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50">
                <Providers>
                    <Navbar logo={themeConfig.logo} />
                    <div className="flex min-h-screen">
                        <Sidebar pageMap={pageMap} />
                        <div className="flex-1 flex justify-center">
                            <div className="w-full max-w-[1400px] flex">
                                <main className="flex-1 min-w-0 px-8 py-10">
                                    <article className="prose prose-slate">
                                        {children}
                                    </article>

                                    <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between text-sm">
                                        <span className="text-slate-500 italic">Last updated on December 2, 2022</span>
                                    </div>
                                </main>
                                {/* Table of Contents Placeholder */}
                                <aside className="toc-container">
                                    <h4 className="font-bold text-slate-900 mb-4">On This Page</h4>
                                    <nav className="space-y-3">
                                        {/* In a real scenario, we would parse headers here */}
                                        <a href="#" className="toc-link toc-link-active">What is Nextra?</a>
                                        <a href="#" className="toc-link">Documentation</a>
                                    </nav>
                                </aside>
                            </div>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    )
}
