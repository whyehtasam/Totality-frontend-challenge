"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, googleProvider } from "@/app/utils/firebaseConfig"; // Import Firebase auth and Google provider
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js for navigation



export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize router for navigation

  // Handle form submission for email/password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); // Authenticate using Firebase
      router.push("/"); // Redirect to home page after successful login
    } catch (err: any) {
      setError("Failed to login. Please check your email and password."); // Set error message
      console.error("Login error", err);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider); // Authenticate using Google provider
      router.push("/"); // Redirect to home page after successful login
    } catch (err: any) {
      setError("Failed to login with Google. Please try again."); // Set error message
      console.error("Google login error", err);
    }
  };

  return (
    <Card className="mx-auto max-w-sm sm:my-24 my-12">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            {error && (
              <div className="text-red-600 text-sm mb-2">{error}</div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on input change
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
