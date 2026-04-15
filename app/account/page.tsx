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

    // FAKE AI VERIFICATION STEP (3 seconds)
    setTimeout(() => {
      setStep("generating");
    }, 3000);

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
            bank: "Nextrade Bank USA",
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
    }, 100);
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
    <main className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center px-4 py-10">

      {/* HERO */}
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4">
          Receive Global Payments Instantly
        </h1>
      </div>

      {/* FORM */}
      <div className="mt-10 w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6">

        <input
          placeholder="Full Name"
          className="w-full mb-3 p-3 rounded-lg bg-black/40"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 p-3 rounded-lg bg-black/40"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Existing Bank / Wallet"
          className="w-full mb-3 p-3 rounded-lg bg-black/40"
          onChange={(e) => setForm({ ...form, existing: e.target.value })}
        />

        <select
          className="w-full mb-3 p-3 rounded-lg bg-black/40"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="bank">Bank Account</option>
          <option value="crypto">Crypto Wallet</option>
        </select>

        {/* CRYPTO OPTIONS */}
        {form.type === "crypto" && (
          <>
            <select
              className="w-full mb-3 p-3 rounded-lg bg-black/40"
              onChange={(e) =>
                setForm({ ...form, cryptoType: e.target.value })
              }
            >
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
            </select>

            <select
              className="w-full mb-4 p-3 rounded-lg bg-black/40"
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
          className="w-full bg-indigo-600 p-3 rounded-lg font-semibold"
        >
          Generate Account
        </button>
      </div>

      {/* AI VERIFICATION SCREEN */}
      {step === "verifying" && (
        <div className="mt-6 text-center">
          <p className="text-yellow-400 text-lg">
            🧠 AI Verification in progress...
          </p>
          <p className="text-gray-400">
            Analyzing identity & financial profile
          </p>
        </div>
      )}

      {/* GENERATING SCREEN + PROGRESS */}
      {step === "generating" && (
        <div className="mt-6 w-full max-w-md">
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
     {/* RESULT */}
{generated && (
  <div className="mt-8 w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6">

    <p className="text-green-400 mb-2">
      ✅ Account Generated Successfully
    </p>

    <p className="text-gray-300 text-sm mb-4">
      Your virtual account has been created securely. 
      To access full account details, a one-time verification fee is required.
      This helps activate your payment routing and secure your profile.
    </p>

    {generated.type === "bank" && (
      <>
        <p className="text-sm text-gray-400">Bank</p>
        <p className="mb-2">{generated.bank}</p>

        <p className="text-sm text-gray-400">Account</p>
        <p className="font-mono">{mask(generated.accountNumber)}</p>

        <p className="text-sm text-gray-400">Routing</p>
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

    {/* PAY BUTTON → DEPOSIT PAGE */}
    <button
      onClick={() => router.push("/deposit")}
      className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg font-semibold transition"
    >
      Pay to Unlock Full Details
    </button>
  </div>
)}
    </main>
  );
}