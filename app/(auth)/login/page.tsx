import FormLogin from "@/components/form-login";
import React from "react";

function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <h1 className="text-4xl font-bold mb-8">Welcome to Get Security</h1>
        <FormLogin />
      </div>
    </main>
  );
}

export default LoginPage;
