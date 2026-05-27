/* eslint-disable react/display-name */
import { Children, isValidElement, useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import Pre from './Pre'
import Mermaid from './Mermaid'

const getLanguage = (className = '') => {
  const match = /language-(\w+)/.exec(className)
  return match ? match[1] : ''
}

const PreBlock = ({ children, ...props }) => {
  const child = Children.count(children) === 1 ? Children.only(children) : null

  if (isValidElement(child) && getLanguage(child.props?.className) === 'mermaid') {
    return <Mermaid>{child.props.children}</Mermaid>
  }

  return <Pre {...props}>{children}</Pre>
}

const CodeBlock = ({ children, className, ...props }) => {
  if (getLanguage(className) === 'mermaid') {
    return <code className={className} {...props}>{children}</code>
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

export const MDXComponents = {
  Image,
  a: CustomLink,
  pre: PreBlock,
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
