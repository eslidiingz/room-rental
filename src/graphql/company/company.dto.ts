export interface CompanySignUpInput {
  username: string
  password: string
  name: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
}

export interface CompanySignInInput {
  username: string
  password: string
}