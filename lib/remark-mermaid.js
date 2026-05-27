import visit from 'unist-util-visit'

const remarkMermaid = () => (tree) => {
  visit(tree, 'code', (node, index, parent) => {
    if (node.lang !== 'mermaid') return

    parent.children[index] = {
      type: 'mdxJsxFlowElement',
      name: 'Mermaid',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'chart',
          value: node.value,
        },
      ],
      children: [],
      data: { _xdmExplicitJsx: true },
    }
  })
}

export default remarkMermaid
