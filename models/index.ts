export interface Student {
    name: string;
    email: string;
    platform: string | null;
    language: string;
    startDate: string; // DD/MM/YY
    profile: string;
    businessName: string;
}

export type UserRole = 'student' | 'professor'

export interface UserRoleRow {
  id: string
  user_id: string
  role: UserRole
  created_at: string
}

export interface UserWithRole {
  id: string
  email: string
  role: UserRole | null
}

export type UserMe = {
  id: string
  user_id: string
  full_name: string | null
  onboarded: boolean
  country: string | null
  language: string | null
  learn_language: string | null
  lang_level: string | null
  created_at: string
  updated_at: string
}

export type UserMeInput = {
  full_name?: string
  onboarded?: boolean
  country?: string
  language?: string
  learn_language?: string
  lang_level?: string
}
