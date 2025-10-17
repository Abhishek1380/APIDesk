"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Signup() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();
        if (!username || !email || !password) {
            alert('All fields are necessary.')
            return;
        }
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            alert("Invalid email address");
            return;
        }

        if (password.length < 5) {
            alert('Password should be at least 5 characters in length.');
            return;
        }


        const userData = {
            username: username,
            email: email,
            password: password
        }

        fetch('/api/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert("Signup Successful");
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    router.push('/login');

                }
                else {
                    alert(data.message || "Something went wrong. Please try again.")
                }
            })
            .catch((err) => {
                alert(`Network error:` + err.message);
            })


    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-600 mb-2">Full Name</label>
                        <input type="text" placeholder="Enter your name" value={username} onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-2">Email</label>
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-2">Password</label>
                        <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <button type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-200">
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?
                    <a href="#" className="text-blue-500 hover:underline">Login</a>
                </p>
            </div>
        </div>

    )
}