"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) {
            alert("All fields are required.");
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            alert("Invalid email address.");
            return;
        }

        const userData = { email, password };

        fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert("Login Successful");
                    setEmail("");
                    setPassword("");
                    router.push("/dashboard");
                } else {
                    alert(data.message || "Invalid credentials.");
                }
            })
            .catch((err) => {
                alert(`Network error: ${err.message}`);
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-600 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
