import { FC, PropsWithChildren } from 'react'
import { WithSidebar } from './WithSidebar'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WithSidebar>
      {children}
    </WithSidebar>
  )
}
