import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utilis/constant';
import toast from 'react-hot-toast';

const Signup = () => {
  const [loading, setloading] = useState(false);
  const [input, setinput] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    role: '',
    file: '',
  });

  const navigate = useNavigate();

  const handel = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const handelfile = (e) => {
    setinput({ ...input, [e.target.name]: e.target.files[0] });
  };

  const handelsubmit = async (e) => {
    setloading(true);
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('name', input.name);
    formdata.append('email', input.email);
    formdata.append('contact', input.contact);
    formdata.append('password', input.password);
    formdata.append('role', input.role);
    formdata.append('file', input.file);

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formdata, {
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
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4 flex items-center justify-center">
      <form
        onSubmit={handelsubmit}
        className="bg-white shadow-md shadow-gray-400 rounded-2xl p-6 md:p-10 w-full max-w-xl space-y-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900">Create a new account</h1>
        <p className="text-center text-sm md:text-base text-gray-600">
          Get matched with jobs tailored to your skills, passions, and experience — all for free.
        </p>

        <div className="space-y-3">
          <label className="block font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handel}
            placeholder="Full Name"
            className="w-full border border-gray-800 rounded-xl px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
          />
        </div>

        <div className="space-y-3">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handel}
            placeholder="abcd@xyz.com"
            className="w-full border border-gray-800 rounded-xl px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
          />
        </div>

        <div className="space-y-3">
          <label className="block font-semibold">Phone Number</label>
          <input
            type="text"
            name="contact"
            value={input.contact}
            onChange={handel}
            placeholder="Mobile Number"
            className="w-full border border-gray-800 rounded-xl px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
          />
        </div>

        <div className="space-y-3">
          <label className="block font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handel}
            placeholder="Password"
            className="w-full border border-gray-800 rounded-xl px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
          />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center gap-4">
            <label className="font-semibold">Role:</label>
            <div className="flex gap-2">
              <label className="flex items-center gap-1">
                <input type="radio" value="student" name="role" onChange={handel} /> Student
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" value="recruiter" name="role" onChange={handel} /> Recruiter
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="file" className="font-semibold">
              Profile Photo:
            </label>
            <input
              id="file"
              type="file"
              name="file"
              onChange={handelfile}
              className="cursor-pointer border border-gray-800 rounded-xl px-2 py-1"
            />
          </div>
        </div>

        <Button className="w-full" disabled={loading}>
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 inline"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                />
              </svg>
              Signing Up...
            </>
          ) : (
            'Sign Up'
          )}
        </Button>

        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </div>
      </form>

      <div className="max-w-xl text-sm text-center mt-6 px-4 text-gray-500">
        By clicking 'Sign up', you acknowledge that you have read and accepted the{' '}
        <Link to="/terms" className="text-blue-400 underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="text-blue-400 underline">
          Privacy Policy.
        </Link>
      </div>
    </div>
  );
};

export default Signup;
