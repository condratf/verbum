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
