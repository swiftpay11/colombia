"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    existing: "",
    type: "bank",
    cryptoType: "BTC",
    network: "BTC",
  });

  const [generated, setGenerated] = useState<any>(null);

  const [step, setStep] = useState("idle"); 
  // idle → verifying → generating → done

  const [progress, setProgress] = useState(0);

  // -------------------------
  // GENERATORS
  // -------------------------
  const generateAccountNumber = () =>
    "23" + Math.floor(100000000 + Math.random() * 900000000);

  const generateRouting = () =>
    "0210" + Math.floor(10000 + Math.random() * 90000);

  const generateWallet = () =>
    "bc1q" + Math.random().toString(36).substring(2, 15);

  // -------------------------
  // HANDLE GENERATE
  // -------------------------
  const handleGenerate = () => {
    if (!form.name || !form.email || !form.existing) {
      alert("Please fill all fields");
      return;
    }

    setGenerated(null);
    setStep("verifying");
    setProgress(0);

    // FAKE AI VERIFICATION STEP (6 seconds)
    setTimeout(() => {
      setStep("generating");
    }, 6000);

    // PROGRESS BAR (10 seconds total)
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      setProgress(start);

      if (start >= 100) {
        clearInterval(interval);

        if (form.type === "bank") {
          setGenerated({
            type: "bank",
            bank: "ApexGenerate Bank",
            accountNumber: generateAccountNumber(),
            routing: generateRouting(),
          });
        } else {
          setGenerated({
            type: "crypto",
            cryptoType: form.cryptoType,
            network: form.network,
            address: generateWallet(),
          });
        }

        setStep("done");
      }
    }, 700);
  };

  // -------------------------
  // MASK
  // -------------------------
  const mask = (str: string) =>
    str ? str.slice(0, 4) + "****" + str.slice(-2) : "";

  // -------------------------
  // UI
  // -------------------------
 return (
  <main className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center px-4 py-10 relative overflow-hidden">

    {/* BACKGROUND GLOW */}
    <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] top-[-100px] left-[-100px]" />
    <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[120px] bottom-[-100px] right-[-100px]" />

    {/* HERO */}
    <div className="text-center max-w-xl z-10">
      <div className="flex items-center justify-center gap-3 mb-3">

  {/* LOGO ICON */}
  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/40 logo-glow">
    <span className="text-white font-bold text-lg">A</span>
  </div>

  {/* LOGO TEXT */}
  <h1 className="text-4xl md:text-5xl font-bold tracking-wide bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
    ApexGenerate
  </h1>

</div>

      <p className="text-lg text-gray-300 mb-2">
        Receive Global Payments Instantly
      </p>

      <p className="text-sm text-gray-500">
        Secure virtual bank accounts & crypto wallets powered by AI verification
      </p>

      {/* TRUST BADGES */}
      <div className="flex justify-center gap-4 mt-4 text-xs text-gray-400">
        <span>🔒 Bank-level Security</span>
        <span>⚡ Instant Activation</span>
        <span>🌍 Global Access</span>
      </div>
    </div>

    {/* FORM */}
    <div className="mt-10 w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl z-10">

      <p className="text-sm text-gray-400 mb-4">
        Enter your details to generate a secure receiving account
      </p>

      <input
        placeholder="Full Name"
        className="w-full mb-3 p-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-indigo-500"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email Address"
        className="w-full mb-3 p-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-indigo-500"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Existing Bank / Wallet"
        className="w-full mb-3 p-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-indigo-500"
        onChange={(e) => setForm({ ...form, existing: e.target.value })}
      />

      <select
        className="w-full mb-3 p-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-indigo-500"
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="bank">Bank Account</option>
        <option value="crypto">Crypto Wallet</option>
      </select>

      {/* CRYPTO OPTIONS */}
      {form.type === "crypto" && (
        <>
          <select
            className="w-full mb-3 p-3 rounded-lg bg-black/40 border border-white/10"
            onChange={(e) =>
              setForm({ ...form, cryptoType: e.target.value })
            }
          >
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="USDT">USDT</option>
          </select>

          <select
            className="w-full mb-4 p-3 rounded-lg bg-black/40 border border-white/10"
            onChange={(e) =>
              setForm({ ...form, network: e.target.value })
            }
          >
            <option value="BTC">Bitcoin Network</option>
            <option value="ERC20">ERC20 (Ethereum)</option>
            <option value="TRC20">TRC20 (Tron)</option>
            <option value="BSC">BSC (Binance)</option>
          </select>
        </>
      )}

      <button
        onClick={handleGenerate}
        className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg font-semibold transition shadow-lg shadow-indigo-600/30"
      >
        Generate Secure Account
      </button>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Your data is encrypted and securely processed
      </p>
    </div>

    {/* AI VERIFICATION SCREEN */}
    {step === "verifying" && (
      <div className="mt-6 text-center z-10">
        <p className="text-yellow-400 text-lg">
          🧠 Verification in progress...
        </p>
        <p className="text-gray-400">
          Validating identity, compliance & risk profile
        </p>
      </div>
    )}

    {/* GENERATING SCREEN */}
    {step === "generating" && (
      <div className="mt-6 w-full max-w-md z-10">
        <p className="text-indigo-400 mb-2">
          Generating secure account...
        </p>

        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-400 mt-2">
          {progress}% completed
        </p>
      </div>
    )}

    {/* RESULT */}
    {generated && (
      <div className="mt-8 w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl z-10">

        <p className="text-green-400 mb-2 font-semibold">
          ✅ Account Generated Successfully
        </p>

        <p className="text-gray-300 text-sm mb-4">
          Your virtual account has been created using ApexGenerate's secure infrastructure.
          To activate full payment functionality, a one-time verification fee is required.
        </p>

        {generated.type === "bank" && (
          <>
            <p className="text-sm text-gray-400">Bank</p>
            <p className="mb-2">{generated.bank}</p>

            <p className="text-sm text-gray-400">Account Number</p>
            <p className="font-mono">{mask(generated.accountNumber)}</p>

            <p className="text-sm text-gray-400">Routing Number</p>
            <p className="font-mono">{mask(generated.routing)}</p>
          </>
        )}

        {generated.type === "crypto" && (
          <>
            <p className="text-sm text-gray-400">Coin</p>
            <p className="mb-2">{generated.cryptoType}</p>

            <p className="text-sm text-gray-400">Network</p>
            <p className="mb-2">{generated.network}</p>

            <p className="text-sm text-gray-400">Address</p>
            <p className="font-mono">{mask(generated.address)}</p>
          </>
        )}

        <button
          onClick={() => router.push("/deposit")}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg font-semibold transition shadow-lg shadow-indigo-600/30"
        >
          Pay to Unlock Full Details
        </button>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Secure payment gateway • Instant activation
        </p>
      </div>
    )}
      {/* FOOTER */}
      <footer className="border-t border-white/10 text-center text-gray-500 text-sm py-6">
        © {new Date().getFullYear()} ApexGenerate. All rights reserved.
      </footer>

  </main>
);
}