import { FC, PropsWithChildren } from 'react'
import { WithSidebar } from './WithSidebar'

export const Layout: FC<PropsWithChildren<{ role?: 'student' | 'professor' }>> = ({ children, role = 'student' }) => {
  return (
    <WithSidebar role={role}>
      {children}
    </WithSidebar>
  )
}
