import {draftMode} from "next/headers"
import {NextResponse} from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  ;(await draftMode()).disable()
  return NextResponse.redirect(new URL("/insights", request.url))
}
