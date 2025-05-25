# 🎬 MovieApp - TMDB Film & Dizi Platformu

Kendi film/dizi keşif platformunu inşa etmeye ne dersin?  
**MovieApp**, Next.js 13 ile geliştirilen, TMDB API ile çalışan, kullanıcıların film ve dizi bilgilerine erişip favorilerine ekleyebildiği tam özellikli bir uygulamadır.

![MovieApp Banner]![Ekran Görüntüsü (2)](https://github.com/user-attachments/assets/03246aab-8af4-4200-ada2-24b1578817f1)
) 

---

## 🚀 Canlı Demo

🔗 [MovieApp'i canlı olarak deneyimle]([https://your-deployment-link.vercel.app](https://nextjs-movie-app-mauve.vercel.app/))
https://nextjs-movie-app-mauve.vercel.app/

---

## ⚙️ Özellikler

- ✅ **JWT ile kullanıcı girişi ve kaydı**
- 🧠 **Kullanıcı bazlı veriler (beğenilenler, izlenenler, sonra izle)**
- 🎞️ **Film & Dizi listeleme** (kategori, puan, yıl filtreleri)
- 📝 **Hover ile açılan detay kutuları** (Netflix tarzı)
- 🌐 **Mobil uyumlu responsive tasarım**
- 🌈 **Şık arayüz (Tailwind CSS + React Icons)**
- 📦 **MongoDB Atlas üzerinde veri yönetimi**
- ⚡ **Next.js 13 App Router kullanımı**

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji        | Açıklama                    |
|------------------|-----------------------------|
| Next.js 13       | React tabanlı framework     |
| MongoDB Atlas    | Bulut tabanlı NoSQL veritabanı |
| Tailwind CSS     | Utility-first CSS framework |
| TMDB API         | Film & dizi verileri        |
| JWT              | Kimlik doğrulama sistemi    |
| Vercel           | Hosting & deployment        |

---

## 🔧 Kurulum ve Çalıştırma

```bash
# Repoyu klonla
git clone https://github.com/mhmmdpolatt/Nextjs-MovieApp.git
cd Nextjs-MovieApp

# Bağımlılıkları yükle
npm install

# .env dosyasını oluştur ve içine aşağıdaki bilgileri gir
NEXT_PUBLIC_TMDB_BEARER_TOKEN=your_tmdb_token
NEXT_PUBLIC_MONGO_DB_URL=your_mongodb_connection_string
NEXT_PUBLIC_JWT_KEY=your_jwt_secret

# Projeyi başlat
npm run dev
