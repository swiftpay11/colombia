"use client";

import { useState } from "react";
import Link from "next/link";

export default function DepositPage() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // ✅ ADDED (payment step control)
  const [showPayment, setShowPayment] = useState(false);
  const [cryptoType, setCryptoType] = useState<"BTC" | "ETH" | "USDT">("BTC");
  const [network, setNetwork] = useState("BTC");

  // fake account data
 const accountData = {
  bank: {
    type: "bank",
    name:  "ApexGenerate Bank",
    accountNumber:
      "22" + Math.floor(1000000000 + Math.random() * 9000000000),
    routing:
      "0210" + Math.floor(10000 + Math.random() * 90000),
  },

    crypto: {
      BTC: {
        network: "Bitcoin Network",
        address: "bc1q" + Math.random().toString(36).substring(2, 18),
      },

      USDT: {
        network: "TRC20 / ERC20",
        address: "T" + Math.random().toString(36).substring(2, 18),
      },

      ETH: {
  network: "Ethereum (ERC20)",
  address: "0x" + Math.random().toString(36).substring(2, 18),
},

    },
  };

  const plans = [
    {
      name: "Basic",
      price: "$1,869",
      glow: "from-gray-500 to-gray-700",
      features: [
        "Basic account details unlock",
        "Limited transaction view",
        "Standard support",
        "Unlock a foreign account and a random crypto wallet address",
      ],
      access: "Unlock",
    },
    {
      name: "Plus",
      price: "$2,069",
      glow: "from-indigo-500 to-blue-500",
      features: [
        "Full account details unlock",
        "Bank / Crypto activation",
        "Instant routing access",
        "Unlock 2 foreign account and 2 random crypto wallet address"
      ],
      access: "Full Unlock",
    },
    {
      name: "Premium",
      price: "$5,569",
      glow: "from-purple-500 to-pink-500",
      features: [
        "Priority processing",
        "Higher transaction limits",
        "Advanced verification system",
        "Dedicated support",
        "Unlock mulitple foreign account and any crypto wallet address"
      ],
      access: "Premium Unlock + Priority",
    },
  ];

  // ❗ CHANGED ONLY (now opens payment screen instead of success)
  const handlePay = () => {
    if (!selectedPlan) return;
    setShowPayment(true);
  };

  // ✅ NEW: confirm payment flow (keeps your success logic intact)
  const confirmPayment = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setShowPayment(false);
        setShowModal(true);
      }, 800);
    }, 3000);
  };

  // fake wallet
 const walletAddress = {
  BTC: "ghjkk8767899",
  ETH: "P57tyopuygfhgjh",
  USDT: "E670986tdffg",
};

  // ✅ ADDED (needed for crypto selection mapping)
  const selectedCryptoData = accountData.crypto[cryptoType];

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white px-4 py-10 flex flex-col items-center">

      {/* HEADER */}
      <div className="text-center max-w-xl mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Secure Account Activation
        </h1>
        <p className="text-gray-400 text-sm">
          Choose a plan to unlock and activate your generated account details
        </p>
      </div>

      {/* PLANS */}
      <div className="grid md:grid-cols-3 gap-5 w-full max-w-5xl">

        {plans.map((plan, i) => (
          <div
            key={i}
            onClick={() => setSelectedPlan(plan)}
            className={`cursor-pointer rounded-2xl p-5 border transition transform hover:scale-105
            ${
              selectedPlan?.name === plan.name
                ? "border-white/40 bg-white/10"
                : "border-white/10 bg-white/5"
            }`}
          >
            <div
              className={`h-2 w-full rounded-full mb-4 bg-gradient-to-r ${plan.glow} blur-[1px]`}
            />

            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="text-indigo-400 font-semibold mb-3">
              {plan.price}
            </p>

            <p className="text-xs text-gray-400 mb-3">
              {plan.access}
            </p>

            <ul className="text-sm text-gray-300 space-y-1">
              {plan.features.map((f, idx) => (
                <li key={idx}>• {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* PAY BUTTON */}
      <button
        onClick={handlePay}
        disabled={!selectedPlan || loading}
        className="mt-10 w-full max-w-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 p-3 rounded-lg font-semibold transition"
      >
        {loading
          ? "Processing Payment..."
          : `Pay ${selectedPlan?.price || ""} to Unlock`}
      </button>

      {/* SUCCESS STATE */}
      {success && (
        <p className="mt-4 text-green-400">
          Payment successful ✔ Preparing your account...
        </p>
      )}

      {/* ============================= */}
      {/* NEW PAYMENT DETAILS MODAL */}
      {/* ============================= */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center px-4">

          <div className="bg-[#111] border border-indigo-500/30 rounded-2xl p-6 w-full max-w-md shadow-lg shadow-indigo-500/20">

            <h2 className="text-indigo-400 text-lg font-bold mb-2">
              Complete Crypto Payment
            </h2>

            <p className="text-gray-400 text-sm mb-4">
              Select network and send payment to activate your account.
            </p>

            {/* CRYPTO TYPE */}
            <label className="text-xs text-gray-400">Crypto Type</label>
            <select
              value={cryptoType}
              onChange={(e) => setCryptoType(e.target.value as "BTC" | "ETH" | "USDT")}
              className="w-full mb-3 p-3 rounded-lg bg-black/40 border border-white/10"
            >
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">USDT</option>
            </select>

            {/* NETWORK */}
            <label className="text-xs text-gray-400">Network</label>
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="w-full mb-4 p-3 rounded-lg bg-black/40 border border-white/10"
            >
              <option value="BTC">Bitcoin Network</option>
              <option value="ERC20">ERC20</option>
              <option value="TRC20">TRC20</option>
              <option value="BSC">BSC</option>
            </select>

            {/* GLOW WALLET BOX */}
            <div className="border border-indigo-500/40 bg-indigo-500/10 rounded-xl p-4 mb-4 shadow-md shadow-indigo-500/20">
              <p className="text-xs text-gray-400">Wallet Address</p>
              <p className="font-mono text-indigo-300 break-all text-sm">
               {walletAddress[cryptoType]}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <button
              onClick={confirmPayment}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-lg font-semibold"
            >
              {loading ? "Confirming..." : "I have made the payment"}
            </button>

            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-3 border border-white/10 p-3 rounded-lg text-gray-300 hover:bg-white/5"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* ============================= */}
      {/* YOUR ORIGINAL MODAL (UPDATED ONLY CRYPTO LINKING) */}
      {/* ============================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center px-4">

          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md animate-pulse">

            <h2 className="text-green-400 text-lg font-bold mb-3">
              🎉 Account Unlocked Successfully
            </h2>

            <p className="text-gray-400 text-sm mb-4">
              Your full account details are now active and ready for use.
              Store this details, if possible take a screenshot
            </p>

            <div className="space-y-3 text-sm">

              {/* BANK */}
              <div>
                <p className="text-gray-400">Bank</p>
                <p>{accountData.bank.name}</p>
              </div>

              <div>
                <p className="text-gray-400">Account Number</p>
                <p className="font-mono">{accountData.bank.accountNumber}</p>
              </div>

              <div>
                <p className="text-gray-400">Routing Number</p>
                <p className="font-mono">{accountData.bank.routing}</p>
              </div>

              {/* ✅ ADDED CRYPTO DISPLAY */}
              {selectedCryptoData && (
                <>
                  <div>
                    <p className="text-gray-400">Crypto Type</p>
                    <p className="font-mono">{cryptoType}</p>
                  </div>

                  <div>
                    <p className="text-gray-400">Network</p>
                    <p className="font-mono">{network}</p>
                  </div>

                  <div>
                    <p className="text-gray-400">Wallet Address</p>
                    <p className="font-mono break-all">
                      {selectedCryptoData.address}
                    </p>
                  </div>
                </>
              )}

            </div>

              <Link href="/account">
            <button
              className="mt-6 w-full bg-green-500 hover:bg-green-600 p-3 rounded-lg font-semibold"
            >
              Close
            </button>
            </Link>

          </div>
        </div>
      )}

    </main>
  );
}