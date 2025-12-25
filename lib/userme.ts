import { createClient } from "@/utils/supabase/server";
import { UserMe, UserMeInput } from "@/models";

/**
 * Get the current user's userme data
 * @returns UserMe data or null if not found
 */
export async function getUserMe(): Promise<UserMe | null> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return null
  }
  
  const { data, error } = await supabase
    .from('userme')
    .select('*')
    .eq('user_id', user.id)
    .single()
  
  if (error) {
    console.error('Error fetching userme:', error)
    return null
  }
  
  return data
}

/**
 * Create or update the current user's userme data
 * @param input - UserMe fields to update
 * @returns Updated UserMe data or null on error
 */
export async function upsertUserMe(input: UserMeInput): Promise<UserMe | null> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return null
  }
  
  const { data, error } = await supabase
    .from('userme')
    .upsert(
      {
        user_id: user.id,
        ...input,
      },
      {
        onConflict: 'user_id',
      }
    )
    .select()
    .single()
  
  if (error) {
    console.error('Error upserting userme:', error)
    return null
  }
  
  return data
}

/**
 * Update specific fields in the current user's userme data
 * @param input - UserMe fields to update
 * @returns Updated UserMe data or null on error
 */
export async function updateUserMe(input: UserMeInput): Promise<UserMe | null> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return null
  }
  
  const { data, error } = await supabase
    .from('userme')
    .update(input)
    .eq('user_id', user.id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating userme:', error)
    return null
  }
  
  return data
}

/**
 * Check if the current user has completed onboarding
 * @returns boolean indicating onboarding status
 */
export async function isUserOnboarded(): Promise<boolean> {
  const userMe = await getUserMe()
  return userMe?.onboarded ?? false
}

/**
 * Mark the current user as onboarded
 * @returns Updated UserMe data or null on error
 */
export async function markUserAsOnboarded(): Promise<UserMe | null> {
  return updateUserMe({ onboarded: true })
}