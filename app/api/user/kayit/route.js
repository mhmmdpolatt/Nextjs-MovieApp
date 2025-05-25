import { NextResponse } from "next/server";
import User from "@/lib/models/user";
import connectMongo from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        await connectMongo();
        const { kullaniciAdi, parola, email } = await request.json();
        const mevcutKullanici = await User.findOne({ kullaniciAdi });
        const mevcutEmail = await User.findOne({ email });
        if (!kullaniciAdi || !parola || !email) {
            return NextResponse.json({ message: "Lütfen tüm alanları doldurun!" }, { status: 400 });
        }
        if (mevcutKullanici ) {
            return NextResponse.json({ message: "Bu kullanıcı adı zaten mevcut!" }, { status: 400 });
        }
        if (mevcutEmail) {
            return NextResponse.json({ message: "Bu email zaten mevcut!" }, { status: 400 });
        }
        // Parolayı hashle
        const hashedParola = await bcrypt.hash(parola, 10);
        const yeniKullanici = new User({
            kullaniciAdi,
            parola: hashedParola,
            email
        });
        await yeniKullanici.save();
        return NextResponse.json({ message: "Kayıt başarılı!", yeniKullanici: yeniKullanici }, { status: 201 });
    } catch (error) {
        console.error("Kayıt hatası:", error);
        //Duplicate key hatası
        if (error.code === 11000) {
            return NextResponse.json({ message: "Bu kullanıcı adı veya email zaten mevcut!" }, { status: 400 });
        }
        return NextResponse.json({ message: "Kayıt işlemi sırasında bir hata oluştu!" }, { status: 500 });
    }

}