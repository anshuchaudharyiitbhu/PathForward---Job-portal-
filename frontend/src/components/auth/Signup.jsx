import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utilis/constant';
import toast from 'react-hot-toast';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    role: '',
    file: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      formData.append(key, input[key]);
    });

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Create a New Account</h2>
        <p className="text-center text-sm text-gray-600">
          Get matched with jobs tailored to your skills — completely free.
        </p>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              name="name"
              value={input.name}
              onChange={handleChange}
              type="text"
              placeholder="John Doe"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              type="email"
              placeholder="example@mail.com"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-400 focus:outline-none"
            />
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="contact"
              name="contact"
              value={input.contact}
              onChange={handleChange}
              type="text"
              placeholder="1234567890"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-400 focus:outline-none"
            />
          </div>

          {/* Role Selection and File Upload */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <div className="mt-1 flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="role" value="student" onChange={handleChange} /> Student
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="role" value="recruiter" onChange={handleChange} /> Recruiter
                </label>
              </div>
            </div>

            {/* File Upload */}
            <div className="flex flex-col">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">Profile Photo</label>
              <input
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
                className="mt-1 text-sm file:bg-pink-200 file:border-none file:px-3 file:py-1 file:rounded-lg"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button className="w-full cursor-pointer" disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  />
                </svg>
                Signing Up...
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>

        {/* Terms */}
        <div className="text-xs text-center text-gray-500 pt-4">
          By clicking "Sign up", you agree to our{' '}
          <Link to="/terms" className="text-blue-400 underline">Terms of Service</Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-blue-400 underline">Privacy Policy</Link>.
        </div>
      </form>
    </div>
  );
};

export default Signup;
