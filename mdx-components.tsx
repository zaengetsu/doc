import { Callout, Card, Steps } from '@/components/MDXComponents'

export function useMDXComponents(components) {
  return {
    Callout,
    Card,
    Steps,
    ...components,
    strong: (props) => <strong className="font-bold text-slate-900 dark:text-zinc-100" {...props} />,
    h1: (props) => <h1 className="text-4xl font-extrabold mb-10 text-slate-900 dark:text-white tracking-tight" {...props} />,
    h2: (props) => <h2 className="text-2xl font-bold mt-16 mb-6 pb-2 border-b border-slate-100 dark:border-zinc-900 dark:text-zinc-100" {...props} />,
    h3: (props) => <h3 className="text-xl font-semibold mt-10 mb-4 text-slate-800 dark:text-zinc-200" {...props} />,
    p: (props) => <p className="leading-8 text-slate-600 dark:text-zinc-400 text-[16px] mb-6" {...props} />,
  }
}
