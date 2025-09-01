"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import QrScanner from "qr-scanner";
import Image from "next/image";
import { Upload, QrCode, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string>("Initializing camera...");
  const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>(null);

  // Start live QR scanner
  useEffect(() => {
    if (!scannerRef.current) return;

    const qrCodeScanner = new Html5Qrcode(scannerRef.current.id);
    setHtml5QrCode(qrCodeScanner);

    qrCodeScanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setStatus(`QR Code detected: ${decodedText}`);
          qrCodeScanner.stop();
          window.location.href = `/dashboard?token=${encodeURIComponent(
            decodedText
          )}`;
        },
        () => setStatus("Scanning...")
      )
      .catch((err) => setStatus("❌ Error starting scanner: " + err));

    return () => {
      qrCodeScanner.stop().catch(() => {});
    };
  }, []);

  // Handle uploaded ID card (using qr-scanner lib for better results)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    setStatus("Processing uploaded image...");

    try {
      const result = await QrScanner.scanImage(file, {
        returnDetailedScanResult: true,
      });
      setStatus(`QR Code detected: ${result.data}`);
      window.location.href = `/dashboard?token=${encodeURIComponent(
        result.data
      )}`;
    } catch (err) {
      setStatus("❌ Could not detect QR code in uploaded image.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-[#f8fbff] to-[#e6f0ff] min-h-screen relative">
      {/* Background */}
      <Image src="/bg.png" alt="Background" fill className="object-cover z-0" />

      {/* Card */}
      <div className="relative bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md text-center border border-gray-200 z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Elevare Tech" width={120} height={120} />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-[#002C5F] mb-2">
          Elevare Tech Portal
        </h1>
        <p className="text-gray-600 mb-6">
          Scan your <span className="font-semibold">Employee QR Code</span> to
          login
        </p>

        {/* Live Scanner */}
        <div className="relative flex items-center justify-center mb-6">
          <div
            id="qr-reader"
            ref={scannerRef}
            className="w-[280px] h-[260px] border-4 border-[#002C5F] rounded-xl overflow-hidden flex items-center justify-center"
          ></div>
          <div className="absolute w-[240px] h-[2px] bg-[#4DB3FF] animate-pulse top-1/2"></div>
        </div>

        {/* Upload Option */}
        <div className="mt-4">
          <label className="flex items-center justify-center gap-2 cursor-pointer bg-[#002C5F] hover:bg-[#004080] text-white font-medium py-2 px-4 rounded-lg transition">
            <Upload className="w-5 h-5" />
            Upload ID Card
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              hidden
            />
          </label>
        </div>

        {/* Status */}
        <p
          className={`mt-6 text-sm font-medium flex items-center justify-center gap-2 ${
            status.startsWith("❌") ? "text-red-600" : "text-[#002C5F]"
          }`}
        >
          {status.startsWith("❌") ? (
            <AlertCircle className="w-4 h-4" />
          ) : (
            <QrCode className="w-4 h-4" />
          )}
          {status}
        </p>
      </div>
    </div>
  );
}
