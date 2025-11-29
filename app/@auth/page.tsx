import { Signin, Signup } from "@/components/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setUserRole } from "@/lib/user";
import { UserRole } from "@/models";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import logo from '@/assets/logo.png'

export default async function AuthPage({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const query = params?.['login']
  return (
    <div className="">
      <Image src={logo} alt="Logo" width={190} height={190} className="mx-auto mb-2" />
      <Tabs defaultValue={query === 'true' ? "login" : "register"} className="w-full flex items-center justify-center p-4 border border-gray-300 rounded-lg">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="mx-auto">
          <Signin action={handleSignin} />
        </TabsContent>

        <TabsContent value="register" className="mx-auto">
          <Signup action={handleSignup} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

const handleSignin = async (_: any, formData: FormData) => {
  "use server"
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) { console.error(error); throw error }
}
 
const handleSignup = async (_: any, formData: FormData) => {
  "use server"
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as UserRole;
  const supabase = await createClient()
  
  // Sign up with role in metadata
  const { error } = await supabase.auth.signUp({ 
    email, 
    password, 
    options: { 
      data: { role } 
    } 
  })
  
  if (error) { 
    console.error('Signup error:', error); 
    throw error 
  }
}
