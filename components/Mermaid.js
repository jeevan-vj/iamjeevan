import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

// Initialize Mermaid globally
mermaid.initialize({ 
  startOnLoad: false, 
  theme: 'default',
  securityLevel: 'loose',
})

const Mermaid = ({ children, className = '' }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && children) {
      const renderChart = async () => {
        try {
          const id = `mermaid-${Math.random().toString(36).substring(2)}`
          const { svg } = await mermaid.render(id, children)
          ref.current.innerHTML = svg
        } catch (error) {
          console.error('Mermaid rendering error:', error)
          ref.current.innerHTML = `
            <div class="text-red-500 p-4 border border-red-300 rounded bg-red-50">
              <strong>Mermaid Error:</strong> Failed to render diagram
              <pre class="mt-2 text-sm whitespace-pre-wrap">${error.message}</pre>
            </div>
          `
        }
      }
      renderChart()
    }
  }, [children])

  return (
    <div 
      ref={ref}
      className={`mermaid-diagram my-6 text-center ${className}`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px'
      }}
    />
  )
}

export default Mermaid
