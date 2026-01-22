"use client";

import {SignInButton, useUser} from "@clerk/nextjs";
import {Download, MessageSquare} from "lucide-react";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useSidebar} from "./ui/sidebar";

export default function MaintenanceMode() {
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);
  const { toggleSidebar } = useSidebar();
  const { isSignedIn } = useUser();
  useEffect(() => {
    // Pulsing glow effect
    const glowInterval = setInterval(() => {
      setGlowIntensity((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 20);

    // Generate floating particles
    const particleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(particleArray);

    return () => {
      clearInterval(glowInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#00425E] to-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{
            backgroundColor: "#1A92A7",
            opacity: 0.2 + Math.sin(glowIntensity / 10) * 0.1,
          }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{
            backgroundColor: "#00425E",
            opacity: 0.15 + Math.cos(glowIntensity / 15) * 0.1,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{
            backgroundColor: "#1A92A7",
            opacity: 0.15 + Math.sin(glowIntensity / 12) * 0.1,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="mb-8 relative flex justify-center">
          <div className="relative bg-white/95 backdrop-blur-sm rounded-full p-1 shadow-2xl ring-4 ring-white/20">
            <Image src="/logo.png" alt="Logo" width={140} height={140} />
          </div>
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-50 animate-pulse"
            style={{ backgroundColor: "#1A92A7" }}
          />
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r animate-pulse drop-shadow-2xl"
            style={{
              backgroundImage:
                "linear-gradient(to right, #5CC8DB, #1A92A7, #5CC8DB)",
              filter: "drop-shadow(0 0 30px rgba(26, 146, 167, 0.6))",
            }}
          >
            Coming Soon
          </span>
        </h1>

        <p
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4"
          style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)" }}
        >
          Chat with my AI persona while you wait
        </p>

        <p
          className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
          style={{ textShadow: "0 1px 5px rgba(0, 0, 0, 0.5)" }}
        >
          The portfolio is being updated, but you can still learn about me by
          talking to my AI persona below.
        </p>

        {/* Animated progress indicators */}
        <div className="flex justify-center gap-3 mb-12">
          {["a", "b", "c", "d", "e"].map((id, i) => (
            <div
              key={id}
              className="w-3 h-3 md:w-4 md:h-4 rounded-full animate-pulse"
              style={{
                backgroundColor: "#1A92A7",
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.5s",
              }}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pointer mb-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Chat with AI Button */}
          {isSignedIn ? (
            <button
              type="button"
              onClick={toggleSidebar}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1A92A7] via-[#5CC8DB] to-[#1A92A7] hover:from-[#5CC8DB] hover:via-[#1A92A7] hover:to-[#5CC8DB] rounded-full text-white font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(26,146,167,0.6)] shadow-[0_0_20px_rgba(26,146,167,0.3)]"
            >
              <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Chat with My AI</span>
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          ) : (
            <SignInButton mode="modal">
              <button
                type="button"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1A92A7] via-[#5CC8DB] to-[#1A92A7] hover:from-[#5CC8DB] hover:via-[#1A92A7] hover:to-[#5CC8DB] rounded-full text-white font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(26,146,167,0.6)] shadow-[0_0_20px_rgba(26,146,167,0.3)]"
              >
                <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Chat with My AI</span>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </SignInButton>
          )}

          {/* Download CV Button */}
          <a
            href="/Muhammad Vohra.pdf"
            download="Muhammad_Vohra_CV.pdf"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1A92A7] via-[#5CC8DB] to-[#1A92A7] hover:from-[#5CC8DB] hover:via-[#1A92A7] hover:to-[#5CC8DB] rounded-full text-white font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(26,146,167,0.6)] shadow-[0_0_20px_rgba(26,146,167,0.3)]"
          >
            <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" />
            <span>Download CV</span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </a>
        </div>

        {/* AI Disclaimer */}
        <div className="mb-8 max-w-xl mx-auto">
          <p className="text-sm md:text-base text-gray-400/80 italic leading-relaxed">
            ⚡ <span className="text-gray-300">Heads up:</span> My AI takes its
            time because it cares about getting things right. Fast AIs are
            expensive, but this one? It does solid work. So be nice—he's doing
            his best! 😊
          </p>
        </div>

        {/* Floating elements */}
        <div className="mt-16 flex justify-center gap-8">
          <div
            className="animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "2s" }}
          >
            <div
              className="w-12 h-12 md:w-16 md:h-16 rounded-lg opacity-20 blur-sm"
              style={{ backgroundColor: "#1A92A7" }}
            />
          </div>
          <div
            className="animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "2.5s" }}
          >
            <div
              className="w-12 h-12 md:w-16 md:h-16 rounded-lg opacity-20 blur-sm"
              style={{ backgroundColor: "#00425E" }}
            />
          </div>
          <div
            className="animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "2s" }}
          >
            <div
              className="w-12 h-12 md:w-16 md:h-16 rounded-lg opacity-20 blur-sm"
              style={{ backgroundColor: "#1A92A7" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
