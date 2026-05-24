import { createContext, useContext, type ReactNode } from 'react'

import type { Company } from '@/data/companies'

const CompanyCtx = createContext<Company | null>(null)

export function CompanyProvider({
  company,
  children,
}: {
  company: Company | null
  children: ReactNode
}) {
  return <CompanyCtx.Provider value={company}>{children}</CompanyCtx.Provider>
}

export function useCompany(): Company | null {
  return useContext(CompanyCtx)
}
