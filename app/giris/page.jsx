"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserAlt, FaLock, FaPlayCircle } from 'react-icons/fa';
import Link from 'next/link';
function Giris() {
    const [kullaniciAdi, setKullaniciAdi] = useState("")
    const [parola, setParola] = useState("")
    const [loading, setLoading] = useState(false)
    const [fetchDonenCevap, setFetchDonenCevap] = useState("")
    const [hataMesaji, setHataMesaji] = useState("")
    const router = useRouter();
    //   --------------------------------------------------------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const cevap = await fetch("/api/user/giris", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    kullaniciAdi,
                    parola
                })
            })

            const data = await cevap.json();

            if (cevap.ok) { //buradaki ok değişkeni 200-299 arasındaki durum kodlarını kontrol eder
                // Başarılı giriş durumunda yapılacak işlemler
                setFetchDonenCevap(data.message);
                setTimeout(() => {
                    setFetchDonenCevap("");
                }, 3000)
                setKullaniciAdi("");
                setParola("");
                router.refresh();

            } else {

                setHataMesaji(data.message);
                setTimeout(() => {
                    setHataMesaji("");
                }, 1500)

            }

        } catch (error) {
            setHataMesaji("Sunucu hatası, lütfen daha sonra tekrar deneyin.");
        } finally {
            setLoading(false);
            setKullaniciAdi("");
            setParola("")
            setTimeout(() => {
                router.push("/")
            }, 500)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#222831]">
            <div className=" bg-[#DFD0B8]/5 backdrop-blur-md rounded-xl  p-8 w-[90%] max-w-md ">
                <h2 className="text-3xl font-bold text-cyan-300 text-center mb-6">Giriş Yap</h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Kullanıcı Adı */}
                    <div className="relative">
                        <FaUserAlt className="absolute top-3 left-3 text-cyan-300" />
                        <input
                            type="text"
                            placeholder="Kullanıcı Adı"
                            name="kullaniciAdi"
                            required
                            value={kullaniciAdi}
                            onChange={(e) => setKullaniciAdi(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-md bg-[#1e293b] text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>

                    {/* Şifre */}
                    <div className="relative">
                        <FaLock className="absolute top-3 left-3 text-cyan-300" />
                        <input
                            type="password"
                            placeholder="Parola"
                            name='parola'
                            required
                            value={parola}
                            onChange={(e) => setParola(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-md bg-[#1e293b] text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>

                    {/* Giriş Butonu */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex justify-center text-center bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-md font-semibold transition-colors duration-200`}
                    >
                        {loading ? <div className="animate-spin rounded-full  border-b-2 border-cyan-300">
                            <FaPlayCircle size={75} className="text-cyan-300" />
                        </div> : "Giriş Yap"}
                    </button>
                </form>
                {/* Hata mesajı */}

                {hataMesaji ? <p className='text-red-500 text-center mt-4'>{hataMesaji}</p> : null}
                {fetchDonenCevap ? <p className='text-green-300 text-center mt-4'>{fetchDonenCevap}</p> : null}

                <p className="text-center text-gray-400 text-sm mt-4">
                    Hesabınız yok mu? <Link href={"/kayit"} className='text-cyan-800 underline'>Kayıt Ol</Link>
                </p>
            </div>
        </div>
    );
}

export default Giris;
