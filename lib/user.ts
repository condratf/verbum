import { UserRole, UserWithRole } from "@/models"
import { createClient } from "@/utils/supabase/server"

export async function getUserRole(userId: string): Promise<UserRole | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single()

  if (error || !data) return null
  return data.role as UserRole
}

export async function getCurrentUserWithRole(): Promise<UserWithRole | null> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const role = await getUserRole(user.id)

  return {
    id: user.id,
    email: user.email!,
    role,
  }
}

export async function setUserRole(userId: string, role: UserRole) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('user_roles')
    .insert({ user_id: userId, role })

  return { error }
}
