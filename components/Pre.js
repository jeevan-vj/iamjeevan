import { useRef, useState } from 'react'

const Pre = ({ children }) => {
  const preRef = useRef(null)
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    const text = preRef.current?.innerText || ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      setCopied(false)
    }
  }

  return (
    <div className="code-block">
      <button type="button" className="copy-button" onClick={onCopy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre ref={preRef}>{children}</pre>
    </div>
  )
}

export default Pre
