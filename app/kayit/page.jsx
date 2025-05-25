"use client";
import React, { useState } from 'react';
import { FaUserAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import Link from 'next/link';
import { FaPlayCircle } from 'react-icons/fa'
import { set } from 'mongoose';


function Kayit() {
    const [kullaniciAdi, setKullaniciAdi] = useState("")
    const [parola, setParola] = useState("")
    const [parolaOnay, setParolaOnay] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [fetchDonenCevap, setFetchDonenCevap] = useState("")
    const [hataMesaji, setHataMesaji] = useState("")
//   --------------------------------------------------------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (parola !== parolaOnay) {
            alert("Parolalar eşleşmiyor!");
            return;
        }
        try {
            setLoading(true);
            const cevap = await fetch("/api/user/kayit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    kullaniciAdi,
                    parola,
                    email
                })
            })

            const data = await cevap.json();

            if (cevap.ok) { //buradaki ok değişkeni 200-299 arasındaki durum kodlarını kontrol eder
                // Başarılı kayıt durumunda yapılacak işlemler
                setFetchDonenCevap(data.message);
                setTimeout(()=>{
                    setFetchDonenCevap("");
                },3000)
                setKullaniciAdi("");
                setParola("");
                setParolaOnay("");
            } else {
               
                setHataMesaji(data.message);
                setTimeout(()=>{
                    setHataMesaji("");
                },1500)
                
            }

        } catch (error) {
            setHataMesaji("Sunucu hatası, lütfen daha sonra tekrar deneyin.");

        } finally {
            setLoading(false);
            setKullaniciAdi("");
            setParola("");
            setParolaOnay("");
        }
        // devamında backend'e gönderme işlemi vs.

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
            <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-xl p-8 w-[90%] max-w-md border border-cyan-500">
                <h2 className="text-3xl font-bold text-cyan-300 text-center mb-6">Kayıt Ol</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Email */}
                    <div className="relative">
                        <FaEnvelope className="absolute top-3 left-3 text-cyan-300" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-md bg-[#1e293b] text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>

                    {/* Kullanıcı Adı */}
                    <div className="relative">
                        <FaUserAlt className="absolute top-3 left-3 text-cyan-300" />
                        <input
                            type="text"
                            name="kullaniciAdi"
                            placeholder="Kullanıcı Adı"
                            value={kullaniciAdi}
                            onChange={(e) => setKullaniciAdi(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-md bg-[#1e293b] text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>

                    {/* Şifre */}
                    <div className="relative">
                        <FaLock className="absolute top-3 left-3 text-cyan-300" />
                        <input
                            type="password"
                            name="parola"
                            placeholder="Parola"
                            value={parola}
                            onChange={(e) => setParola(e.target.value)}
                            minLength={6}
                            className="w-full pl-10 pr-4 py-2 rounded-md bg-[#1e293b] text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>

                    {/* Şifre Tekrar */}
                    <div className="relative">
                        <FaLock className="absolute top-3 left-3 text-cyan-300" />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Parola (Tekrar)"
                            value={parolaOnay}
                            onChange={(e) => setParolaOnay(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-md bg-[#1e293b] text-white border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>

                    {/* Kayıt Butonu */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex justify-center text-center bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-md font-semibold transition-colors duration-200`}
                    >
                        {loading ? <FaPlayCircle size={30} className='animate-spin text-center' /> : "Kayıt Ol"}
                    </button>
                </form>
                {hataMesaji && <p className="text-red-500 text-center mt-4">{hataMesaji}</p>}
                {fetchDonenCevap && <p className="text-green-500 text-center mt-4">{fetchDonenCevap}</p>}

                <p className="text-center text-gray-400 text-sm mt-4">
                    Zaten hesabın var mı? <Link href={"/giris"} className="text-cyan-400 hover:underline cursor-pointer">Giriş Yap</Link>
                </p>
            </div>
        </div>
    );
}

export default Kayit;
