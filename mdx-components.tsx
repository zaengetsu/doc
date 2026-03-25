import { Callout, Card, Steps } from './src/components/MDXComponents'

export function useMDXComponents(components) {
  return {
    Callout,
    Card,
    Steps,
    ...components,
  }
}
