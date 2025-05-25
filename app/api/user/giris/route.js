import connectMongo from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/lib/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export async function POST(req) {
    try {
        await connectMongo();
        const { kullaniciAdi, parola } = await req.json()

        const kullanici = await User.findOne({ kullaniciAdi });
        if (!kullanici) {
            return NextResponse.json({ message: "Böyle bir kullanıcı bulunamadı!" }, { status: 400 });
        }
        const parolaDogru = await bcrypt.compare(parola, kullanici.parola);
        if (!parolaDogru) {
            return NextResponse.json({ message: "Parola yanlış!" }, { status: 400 });
        }
        //TOKEN OLUŞTURMA

        const token = jwt.sign({ kullaniciAdi: kullanici.kullaniciAdi, kullaniciId: kullanici._id }, process.env.NEXT_PUBLIC_JWT_KEY)
        const response = NextResponse.json({ message: `Giriş Başarılı ` }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production", // local'de false, prod'da true
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7 // 7 gün
        });
        return response

    } catch (error) {
        console.error("Giriş hatası:", error);
        return NextResponse.json({ message: "Giriş işlemi sırasında bir hata oluştu!" }, { status: 500 });
    }
}