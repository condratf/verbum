'use client'
import { FC, useActionState } from 'react'
import { Button } from '../common';
import { FormInput, FormSelect } from '../form';
import { UserRole } from '@/models';

interface SignupProps {
  // onSignup: ({ email, password, password_confirmation, role }: { email: string; password: string; password_confirmation: string; role: UserRole }) => void
   action: (prevState: any, formData: FormData) => Promise<any>;
}

export const Signup: FC<SignupProps> = ({ action }) => {
  const [state, formAction] = useActionState(action, null);

  return (
    <form
      action={formAction}
      className='min-w-[320px] flex flex-col gap-1'
    >
      <FormInput label="Email" name="email" type="email" />
      <FormInput label="Password" name="password" type="password" />
      <FormInput label="Password Confirmation" name="password_confirmation" type="password" />
      <FormSelect label="Role" name="role" options={['student', 'professor']} />
      <div className='my-1' />
      <Button type="submit">Sign up</Button>

      {state?.error && (
        <p className="text-red-500">{state.error}</p>
      )}
    </form>
  )
}
