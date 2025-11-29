'use client'
import { FC, useActionState } from 'react'
import { Button } from '../common';
import { FormInput } from '../form';

interface SigninProps {
  // onSignin: ({ email, password }: { email: string; password: string }) => void
  action: (prevState: any, formData: FormData) => Promise<any>;
}

export const Signin: FC<SigninProps> = ({ action }) => {
  const [state, formAction] = useActionState(action, null);

  return (
    <form
      action={formAction}
      className='min-w-[320px] flex flex-col gap-1'
    >
      <FormInput label="Email" name="email" type="email" />
      <FormInput label="Password" name="password" type="password" />
      <div className='my-5' />
      <Button type="submit">Sign in</Button>

      {state?.error && (
        <p className="text-red-500">{state.error}</p>
      )}
    </form>
  )
}
