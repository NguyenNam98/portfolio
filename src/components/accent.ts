import type { AccentKey } from '@/data/profile'

/**
 * Maps a logical accent key to the corresponding CSS custom property.
 * Used everywhere a project / skill group / pill needs to express its
 * accent color via inline style.
 */
export const ACCENT_VAR: Readonly<Record<AccentKey, string>> = {
  rose: 'var(--dw-rose)',
  mint: 'var(--dw-mint-2)',
  blue: 'var(--dw-blue)',
  purple: 'var(--dw-purple)',
}

export function accentColor(key: AccentKey | undefined): string {
  return ACCENT_VAR[key ?? 'rose']
}
