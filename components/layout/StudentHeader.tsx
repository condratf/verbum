'use client'
import { FC } from 'react'
import { Separator } from "@/components/ui/separator"
import { Icon } from '../common'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { createClient } from '@/utils/supabase/client'

export const StudentHeader: FC = () => {
  return (
    <nav className='fixed flex align-center justify-between w-full p-4 border-b border-gray-100 z-50 bg-gray-50'>
      <div>
        <Image src={logo} alt="Language Platform" width={100} height={100} />
      </div>

      <DropdownMenu >
        <DropdownMenuTrigger className='cursor-pointer outline-none flex items-center justify-center'>
          <Icon icon="account_circle" size={30} />
        </DropdownMenuTrigger>

        <DropdownMenuContent className='border-none'>
          <ProfileDropdown />
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}

const ProfileDropdown: FC = () => {
  const supabase = createClient()
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window?.location.reload();
  };

  return (
    <div className="w-64 rounded-2xl bg-white shadow-lg p-4 text-sm text-gray-800">
      <div className="mb-3">
        <div className="text-[15px] font-semibold text-gray-900">John Doe</div>
        <div className="mt-0.5 text-[13px] text-gray-500">john.doe@gmail.com</div>
      </div>

      <Separator className="my-2" />

      <nav className="flex flex-col gap-3 py-2 text-[14px]">
        <button className="flex items-center gap-3 text-left text-gray-700 hover:text-red-400 cursor-pointer">
          <Icon icon="person" size={16} />
          <span>Profile</span>
        </button>

        <button className="flex items-center gap-3 text-left text-gray-700 hover:text-red-400 cursor-pointer">
          <Icon icon="star" size={16} />
          <span>Level test</span>
        </button>

        <button className="flex items-center gap-3 text-left text-gray-700 hover:text-red-400 cursor-pointer">
          <Icon icon="favorite" size={16} />
          <span>Invite a friend</span>
        </button>
      </nav>

      <Separator className="my-2" />

      <button 
        className="mt-2 text-[14px] font-medium text-red-500 hover:text-red-600 cursor-pointer"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  )
}