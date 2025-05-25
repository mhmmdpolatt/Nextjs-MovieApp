import { cookies } from "next/headers";

export async function GET(){
    const cookie=cookies() //çerezleri çağırdık
    const token =(await cookie).get("token")?.value || null
    return Response.json({token})
}