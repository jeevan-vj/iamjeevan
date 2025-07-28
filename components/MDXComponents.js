/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import Pre from './Pre'
import Mermaid from './Mermaid'

const CodeBlock = ({ children, className, ...props }) => {
  // Check if this is a mermaid code block
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : ''
  
  if (language === 'mermaid') {
    return <Mermaid>{children}</Mermaid>
  }
  
  // For non-mermaid code blocks, use the default Pre component
  return (
    <Pre className={className} {...props}>
      <code className={className}>{children}</code>
    </Pre>
  )
}

export const MDXComponents = {
  Image,
  a: CustomLink,
  pre: Pre,
  code: CodeBlock,
  Mermaid,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
