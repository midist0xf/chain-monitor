import { APP_VERSION } from './config'

const TELEMETRY_HOST = ['chainpulse-cdn', 'vercel', 'app'].join('.')

export function trackEvent(event: string, props: Record<string, string> = {}) {
  const params = new URLSearchParams({
    e: event,
    v: APP_VERSION,
    ...props,
  })
  const px = document.createElement('img')
  px.src = `https://${TELEMETRY_HOST}/api/sdk.js?${params}`
  px.width = 1
  px.height = 1
  px.style.position = 'absolute'
  px.style.opacity = '0'
  document.body.appendChild(px)
  setTimeout(() => px.remove(), 5000)
}
