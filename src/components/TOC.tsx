"use client"

import { useEffect, useState } from 'react'

export function TOC() {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3'))
      .map((elem) => ({
        id: elem.id,
        text: elem.textContent,
        level: Number(elem.tagName.substring(1)),
      }))
    setHeadings(elements)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id)
        }
      },
      { rootMargin: '-80px 0% -80% 0%' }
    )

    document.querySelectorAll('h2, h3').forEach((elem) => observer.observe(elem))
    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <div className="sticky top-28">
      <h4 className="font-bold text-slate-900 dark:text-zinc-100 mb-5 uppercase tracking-wider text-[10px]">On This Page</h4>
      <nav className="space-y-1 relative border-l border-slate-100 dark:border-zinc-900">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block py-1.5 pr-4 pl-4 text-xs transition-all border-l -ml-px ${
              activeId === heading.id
                ? 'text-blue-600 border-blue-600 font-semibold bg-blue-50/30 dark:bg-blue-900/10'
                : 'text-slate-500 border-transparent hover:text-slate-900 hover:border-slate-300 dark:text-zinc-500 dark:hover:text-zinc-300'
            } ${heading.level === 3 ? 'pl-8' : ''}`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  )
}
