import { NextResponse } from "next/server"
import { isUserOnboarded } from "@/lib/userme"

export default async function middleware(req: Request) {
  const isOnboarded = await isUserOnboarded()
  if (isOnboarded) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return NextResponse.next()
}