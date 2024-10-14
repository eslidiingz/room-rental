export interface Company {
  id: string
  username: string
  code: string
  name: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  line_id?: string | null
  is_active: boolean
  email_verify_at?: Date | null
  created_at: Date
  updated_at: Date | null
  deleted_at?: Date | null
}
