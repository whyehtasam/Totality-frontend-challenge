"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/app/utils/firebaseConfig"; // Ensure correct path

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle user registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName }); // Update display name
      console.log("User registered:", userCredential.user);
      router.push("/"); // Redirect to home page after successful registration
    } catch (err: any) {
      setError(err.message);
      console.error("Registration error:", err);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google user signed in:", result.user);
      router.push("/"); // Redirect to home page after successful Google sign-in
    } catch (err: any) {
      setError(err.message);
      console.error("Google sign-in error:", err);
    }
  };

  return (
    <Card className="max-w-sm mx-auto my-10 sm:my-20">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Create an account to start using our services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister}>
          <div className="grid gap-4">
            {error && <div className="mb-2 text-sm text-red-600">{error}</div>}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
            <Button variant="outline" className="w-full mt-2" onClick={handleGoogleSignIn}>
              Sign up with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Register;
