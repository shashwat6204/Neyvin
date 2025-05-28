export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: string | null
          created_at: string
        }
        Insert: {
          id: string
          role?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          role?: string | null
          created_at?: string
        }
      }
      jobs: {
        Row: {
          id: number
          title: string
          department: string
          location: string
          type: string
          experience: string
          description: string
          created_at: string
          is_active: boolean
        }
        Insert: {
          id?: number
          title: string
          department: string
          location: string
          type: string
          experience: string
          description: string
          created_at?: string
          is_active?: boolean
        }
        Update: {
          id?: number
          title?: string
          department?: string
          location?: string
          type?: string
          experience?: string
          description?: string
          created_at?: string
          is_active?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 