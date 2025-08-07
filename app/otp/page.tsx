"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const baseUrl = "https://balssimarket.com/api/v1";

const OTPPage = () => {
  const [otpValue, setOtpValue] = useState("");
  const [otpResponse, setOtpResponse] = useState<Credential | null>(null);

  async function sendOtpHandler() {
    axios
      .post(`${baseUrl}/accounts/auth/send-otp/`, { username: otpValue })
      .then((res) => {
        console.log("Res", res);
      });
  }

  useEffect(() => {
    if (!("OTPCredential" in window) || !("credentials" in navigator)) return;
    const abortController = new AbortController();
    if (navigator && navigator.credentials) {
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          mediation: "optional",
          signal: abortController.signal,
        } as any)
        .then((otp) => {
          setOtpResponse(otp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      abortController.abort(); // Clean up when component unmounts
    };
  }, []);

  return (
    <div>
      <h1>OTPPage</h1>
      <input
        autoComplete="one-time-code"
        inputMode="numeric"
        value={otpValue}
        className="border p-2"
        onChange={(e) => setOtpValue(e.target.value)}
      />
      <button className="border p-3" onClick={sendOtpHandler}>
        Send
      </button>
      <div className="p-4 border">{JSON.stringify(otpResponse)}</div>
    </div>
  );
};

export default OTPPage;
