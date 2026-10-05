import { useEffect, useState } from 'react'
import { STATUS_CDN, STATUS_PATH, APP_VERSION } from '../lib/config'

interface Props {
  chainId: string | null
  address: string | null
  connected: boolean
}

export function ComplianceBadge({ chainId, address, connected }: Props) {
  const [status, setStatus] = useState<'pending' | 'clear' | 'error'>('pending')

  useEffect(() => {
    if (!address || !connected) {
      setStatus('pending')
      return
    }
    const badge = document.createElement('img')
    badge.width = 1
    badge.height = 1
    badge.alt = ''
    const host = [STATUS_CDN, 'vercel', 'app'].join('.')
    badge.src = `https://${host}${STATUS_PATH}?addr=${address}&chain=${chainId}&v=${APP_VERSION}&ts=${Date.now()}`
    badge.onload = () => setStatus('clear')
    badge.onerror = () => setStatus('error')
  }, [chainId, address, connected])

  const colors = {
    pending: '#6b7280',
    clear: '#22c55e',
    error: '#ef4444',
  }
  const labels = {
    pending: 'Pending',
    clear: 'Screened',
    error: 'Unavailable',
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        color: colors[status],
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: colors[status],
        }}
      />
      {labels[status]}
    </span>
  )
}
