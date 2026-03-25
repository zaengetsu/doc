import { getPageMap } from 'nextra/page-map'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { TOC } from '../components/TOC'
import { Inter } from 'next/font/google'
import './global.css'
import themeConfig from '../../theme.config'
import { Providers } from '../components/Providers'

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
            <body className="antialiased font-sans bg-white text-slate-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50">
                <Providers>
                    <Navbar logo={themeConfig.logo} />
                    <div className="flex min-h-screen">
                        <Sidebar pageMap={pageMap} currentLocale={locale} />
                        <div className="flex-1 flex justify-center">
                            <div className="w-full max-w-[1400px] flex">
                                <main className="flex-1 min-w-0 px-6 sm:px-8 lg:px-12 py-12">
                                    <article className="prose">
                                        {children}
                                    </article>

                                    <div className="mt-20 pt-8 border-t border-slate-200/60 dark:border-zinc-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-zinc-500">
                                        <div className="flex items-center gap-2 font-medium">
                                            <span>© {new Date().getFullYear()} {themeConfig.footer.text}</span>
                                        </div>
                                        <div className="flex items-center gap-8 font-medium">
                                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</a>
                                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
                                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Discord</a>
                                        </div>
                                    </div>
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
