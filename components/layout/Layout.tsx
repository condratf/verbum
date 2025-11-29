import { FC, PropsWithChildren } from 'react'
import { StudentHeader } from './StudentHeader'
import { WithSidebar } from './WithSidebar'

export const Layout: FC<PropsWithChildren<{ role?: 'student' | 'professor' }>> = ({ children, role }) => {
  return (
    <>
      {role === 'student' && <StudentHeader />}
      {role === 'student' && <div className='h-12' />}
      <WithSidebar role={role}>
        {children}
      </WithSidebar>
    </>
  )
}
