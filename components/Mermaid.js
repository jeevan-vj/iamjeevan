import { useEffect, useRef, useState } from 'react'

const Mermaid = ({ children, className = '' }) => {
  const ref = useRef(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !ref.current || !children) return

    const renderChart = async () => {
      try {
        const mermaid = (await import('mermaid')).default
        
        // Initialize Mermaid
        mermaid.initialize({ 
          startOnLoad: false, 
          theme: 'default',
          securityLevel: 'loose',
        })

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
  }, [isClient, children])

  if (!isClient) {
    return <div>Loading diagram...</div>
  }

  return (
    <div 
      ref={ref}
      className={`mermaid-diagram my-6 text-center ${className}`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        padding: '20px'
      }}
    />
  )
}

export default Mermaid
