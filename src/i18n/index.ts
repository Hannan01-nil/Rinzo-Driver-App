import { en } from './en'

export const i18n = en

export function t(path: string): string {
  const keys = path.split('.')
  let result: unknown = i18n
  for (const key of keys) {
    result = (result as Record<string, unknown>)?.[key]
    if (result === undefined) return path
  }
  return String(result)
}
