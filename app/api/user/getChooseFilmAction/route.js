import { NextResponse } from "next/server";
import User from "@/lib/models/user";
import connectMongo from "@/lib/db";
import { getUserFromCookie } from "@/lib/getUserFromCookie/getUserFromCookie";

export async function GET(req) {
    try {
        await connectMongo();

        const userFromCookie = await getUserFromCookie();

        if (!userFromCookie) {
            return NextResponse.json({ error: "Yetkisiz erişim. Kullanıcı doğrulanamadı." }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const typeChoose = searchParams.get("typeChoose");

        const validTypes = ["begendigiFilmler", "izlediklerim", "dahaSonraIzle"];

        if (!validTypes.includes(typeChoose)) {
            return NextResponse.json({ error: `Geçersiz liste türü: '${typeChoose}'. Beklenen türler: ${validTypes.join(", ")}` }, { status: 400 });
        }

        const user = await User.findById(userFromCookie.kullaniciId).populate(typeChoose);

        if (!user) {
            return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
        }

        return NextResponse.json({
            user:user.kullaniciAdi,
            liste: user[typeChoose],
        });
    } catch (error) {
        console.error("API HATASI:", {
            message: error.message,
            stack: error.stack,
        });

        return NextResponse.json(
            {
                error: "Sunucu hatası. Lütfen daha sonra tekrar deneyiniz.",
                detay: error.message, // Sadece geliştirici ortamı için gösterilebilir
            },
            { status: 500 }
        );
    }
}
