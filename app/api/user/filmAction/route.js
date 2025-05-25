import connectMongo from "@/lib/db"
import { getUserFromCookie } from "@/lib/getUserFromCookie/getUserFromCookie"
import User from "@/lib/models/user"
import Film from "@/lib/models/film"
import { NextResponse } from "next/server"

export async function POST(req) {
  await connectMongo()

  const { movie, typeChoose } = await req.json()
  const user = await getUserFromCookie()

  if (!user) return NextResponse.json({ error: "Yetkisiz", message: "Giriş Yapmalısın" }, { status: 401 })

  const dbUser = await User.findById(user.kullaniciId)
  if (!dbUser) return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 })

  // 🎬 Filmi DB'de bul, yoksa oluştur
  let film = await Film.findOne({ id: movie.id })
  if (!film) {
    film = await Film.create({
      id: movie.id,
      title: movie.title || movie.name,
      tur:movie.title ? "film" :"dizi",
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    })
  }

  const listMap = {
    begendigiFilmler: "Film favorilere eklendi",
    izlediklerim: "Film izlediklerime eklendi",
    dahaSonraIzle: "Film daha sonra izle listesine eklendi",
  }

  const liste = typeChoose
  const mesaj = listMap[liste]

  if (!mesaj) {
    return NextResponse.json({ error: "Geçersiz liste tipi" }, { status: 400 })
  }

  const alreadyExists = dbUser[liste].includes(film._id)

  if (alreadyExists) {
    return NextResponse.json({ message: "Bu film zaten listede", film }, { status: 300 })
  }

  dbUser[liste].push(film._id)
  await dbUser.save()

  return NextResponse.json({ message: mesaj, film })
}

export async function DELETE(req) {
  await connectMongo();

  const { movieID, typeChoose } = await req.json();
  const user = await getUserFromCookie();

  if (!user)
    return NextResponse.json(
      { error: "Yetkisiz", message: "Giriş Yapmalısın" },
      { status: 401 }
    );

  const dbUser = await User.findById(user.kullaniciId);
  if (!dbUser)
    return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });

  // Film var mı kontrol et
  const filmToRemove = await Film.findById(movieID);
  if (!filmToRemove)
    return NextResponse.json({ error: "Film bulunamadı" }, { status: 404 });

  // Liste ismi geçerli mi kontrol
  const validTypes = ['begendigiFilmler', 'dahaSonraIzle', 'izlediklerim'];
  if (!validTypes.includes(typeChoose))
    return NextResponse.json({ error: "Geçersiz liste tipi" }, { status: 400 });

  // Listeden sil
  dbUser[typeChoose] = dbUser[typeChoose].filter(
    (id) => id.toString() !== movieID
  );
  await dbUser.save();

  return NextResponse.json({ success: true, message: "Film başarıyla silindi" });
}
