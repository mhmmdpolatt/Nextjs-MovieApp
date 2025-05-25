import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function getUserFromCookie() {
  const cookieStore = await cookies()
  const token =(cookieStore).get('token')?.value

  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY)
    return decoded
  } catch (err) {
    console.error("Token doğrulama hatası:", err)
    return null
  }
}