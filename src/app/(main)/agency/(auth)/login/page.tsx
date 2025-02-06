import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import React from "react";

const LoginPage = () => {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-6xl font-semibold drop-shadow-md">Auth</h1>
      <p className="text-white text-lg">A simple authentication service</p>
      <div>
        <LoginButton>
          <Button variant="secondary" size="lg">
            Sign in
          </Button>
        </LoginButton>
      </div>
    </div>
  );
};

export default LoginPage;
