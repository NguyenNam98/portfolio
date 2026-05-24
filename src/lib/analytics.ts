import posthog from 'posthog-js'

import { APP_NAME, POSTHOG_API_KEY, POSTHOG_HOST } from './analytics-config'

let booted = false

function keyLooksReal(k: string): boolean {
  return k.startsWith('phc_') && k.length > 20
}

export function initAnalytics(): void {
  if (booted) return
  if (typeof window === 'undefined') return
  if (!keyLooksReal(POSTHOG_API_KEY)) return

  posthog.init(POSTHOG_API_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    person_profiles: 'identified_only',
  })

  // Every event from this app (including built-in $pageview / $autocapture)
  // gets `app: 'personal-website'` — lets me filter against Todos events in
  // the same shared project.
  posthog.register({ app: APP_NAME })

  booted = true
}

export function track(event: string, props?: Record<string, unknown>): void {
  if (!booted) return
  posthog.capture(event, props)
}

export function registerCompany(slug: string, displayName: string): void {
  if (!booted) return
  posthog.register({ company_slug: slug, company_name: displayName })
}
