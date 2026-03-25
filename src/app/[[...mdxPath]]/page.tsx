import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { notFound } from 'next/navigation'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export default async function Page(props) {
    const params = await props.params
    const mdxPath = params.mdxPath ?? []

    // Extract locale and path
    const hasLocale = ['en', 'fr'].includes(mdxPath[0])
    const locale = hasLocale ? mdxPath[0] : 'en'
    const actualPath = hasLocale ? mdxPath.slice(1) : mdxPath

    // Guard against static assets being caught by the catch-all route
    const lastSegment = mdxPath[mdxPath.length - 1]
    if (lastSegment?.includes('.')) {
        notFound()
    }

    try {
        const { default: MDXPage, toc, metadata } = await importPage(actualPath, locale)
        return <MDXPage {...props} />
    } catch (e) {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Nextra error:', e)
        }
        notFound()
    }
}
