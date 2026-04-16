"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import WhatsAppButton from "./components/WhatsAppButton"; // or correct name

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-white/10 backdrop-blur-md bg-black/30 sticky top-0 z-50">
       <div className="flex items-center gap-2">
  
  {/* ICON */}
 <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/40 logo-glow">
    <span className="text-white font-bold text-sm">A</span>
  </div>

  {/* LOGO TEXT */}
  <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
    ApexGenerate
  </h1>

</div>
<div className="flex items-center justify-between w-full md:w-auto text-sm text-gray-300">

  {/* RIGHT: MENU BUTTON (MOBILE) */}
  <button
    className="md:hidden text-2xl font-bold px-3 py-1 rounded-lg bg-white/5 border border-white/10"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    =
  </button>

  {/* DESKTOP MENU */}
  <div className="hidden md:flex gap-6 items-center">

    <a href="#features" className="hover:text-white transition">
      Features
    </a>

    <a href="#how" className="hover:text-white transition">
      How it works
    </a>

    <Link
      href="/account"
      className="bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-700 transition animate-wiggle"
    >
      Get Started
    </Link>

  </div>
</div>
      </nav>

      {menuOpen && (
  <div className="md:hidden mt-4 flex flex-col gap-3 text-gray-300 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-xl">

    <a
      href="#features"
      className="hover:text-white transition"
      onClick={() => setMenuOpen(false)}
    >
      Features
    </a>

    <a
      href="#how"
      className="hover:text-white transition"
      onClick={() => setMenuOpen(false)}
    >
      How it works
    </a>

    <Link
      href="/account"
      className="bg-indigo-600 px-4 py-2 rounded-lg text-center hover:bg-indigo-700 transition"
      onClick={() => setMenuOpen(false)}
    >
      Get Started
    </Link>

  </div>
)}

      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center text-center px-6">

        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/bg.jpg')" // 🔥 PUT YOUR IMAGE IN /public/bg.jpg
          }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Generate Virtual US Accounts <br />
            & Crypto Wallets Instantly
          </h2>

          <p className="text-gray-300 mb-8 text-lg">
            ApexGenerate lets you create realistic virtual accounts for demos,
            testing, and seamless wallet integration.
          </p>

          <Link href="/account">
            <button className="bg-indigo-600 hover:bg-indigo-700 px-10 py-4 rounded-xl text-lg font-semibold transition animate-wiggle shadow-lg shadow-indigo-500/30">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        
        {[
          {
            title: "⚡ Instant Generation",
            desc: "Generate virtual accounts and wallets in seconds.",
          },
          {
            title: "🔒 Secure Simulation",
            desc: "Safe for testing without real financial risks.",
          },
          {
            title: "🌍 Mobile Ready",
            desc: "Works perfectly inside your mobile wallet ecosystem.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-indigo-500 transition hover:scale-105"
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </div>
        ))}

      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-6 py-20 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-5xl mx-auto text-center">
          
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-10 text-left">
            
            {[
              {
                step: "1. Enter Details",
                desc: "Provide your basic info and existing account.",
              },
              {
                step: "2. Generate",
                desc: "Instantly receive a virtual account or wallet.",
              },
              {
                step: "3. Unlock",
                desc: "Unlock full details and start using it.",
              },
            ].map((item, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-2 text-indigo-400">{item.step}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-6 py-20">
        <h2 className="text-3xl font-bold mb-6">
          Ready to generate?
        </h2>

        <Link href="/account">
          <button className="bg-green-500 hover:bg-green-600 px-10 py-4 rounded-xl text-lg font-semibold animate-wiggle shadow-lg shadow-green-500/30">
            Start Now
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 text-center text-gray-500 text-sm py-6">
        © {new Date().getFullYear()} ApexGenerate. All rights reserved.
      </footer>
       <WhatsAppButton />

    </main>
  );
}