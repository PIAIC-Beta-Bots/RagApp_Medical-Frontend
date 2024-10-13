"use client"
import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { IoKey } from "react-icons/io5";
import Link from 'next/link';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useRouter } from 'next/navigation';
// import CryptoJS from 'crypto-js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const router = useRouter();
  

//  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post('http://127.0.0.1:8080/login', {
        email,
        password,
      });
  
      if (response) {
        const userId = response.data.user.id;
  
        // Encrypt the user ID using AES and the secret key
        // const encryptedUserId = CryptoJS.AES.encrypt(userId, secretKey).toString();
  
        // // Store the encrypted user ID in local storage
        // localStorage.setItem('userId', encryptedUserId);
  
        // Show success message and navigate to the home page
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.",error);
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-36 bg-green-600">
          <svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,128L48,117.3C96,107,192,85,288,90.7C384,96,480,128,576,149.3C672,171,768,181,864,165.3C960,149,1056,107,1152,90.7C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="relative z-10 p-8 pt-8">
          <h1 className="text-4xl font-bold text-center text-white mb-4">HealthCare Portal</h1>
          <h2 className="text-lg text-center text-gray-600 pt-4 mb-6">Login to Your Account</h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center bg-gray-100 rounded-lg p-3">
              <div className="bg-green-600 rounded-full p-2 mr-3">
                <MdEmail className="w-6 h-6 text-white" />
              </div>
              <input
                type="email"
                className="bg-transparent w-full focus:outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg p-3">
              <div className="bg-green-600 rounded-full p-2 mr-3">
                <IoKey className="w-6 h-6 text-white" />
              </div>
              <input
                type="password"
                className="bg-transparent w-full focus:outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 flex justify-center items-center"
              disabled={loading} // Disable button during loading
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              ) : (
                'Login'
              )}
            </button>
          </form>
          
          <p className="text-center mt-6 text-sm text-gray-600">
            Don't Have Account? <Link href="/signup" className="text-green-600 font-semibold hover:underline">Register Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
