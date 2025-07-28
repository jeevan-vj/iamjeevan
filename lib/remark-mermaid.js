import visit from 'unist-util-visit'

const remarkMermaid = () => {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'mermaid') {
        console.log('Found mermaid code block:', node.value)
        
        // Convert mermaid code block to a div with special attributes
        const htmlNode = {
          type: 'html',
          value: `<div class="mermaid-wrapper" data-mermaid="${encodeURIComponent(node.value)}"></div>`,
        }
        
        console.log('Converted to HTML node:', htmlNode)
        parent.children[index] = htmlNode
      }
    })
  }
}

export default remarkMermaid
