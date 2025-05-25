import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ message: "Çıkış yapıldı" });

    // Çerezi silmek için maxAge: 0 veriyoruz
    response.cookies.set("token", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
    });

    return response;
}