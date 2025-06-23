import React, { useContext } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from '../ui/button';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/context.jsx';
import toast from 'react-hot-toast';
import { JobContext } from '../context/Jobcontext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { fetchJobs } = useContext(JobContext);

  const handleLogout = () => {
    navigate('/');
    toast.success('Logged out successfully');
    setUser('');
  };

  const handleJobs = async () => {
    navigate('/admin/jobs');
  };

  return (
    <header className=" top-0 z-50 bg-white shadow-sm bg-gradient-to-br from-[#f9c5d1] to-[#f7d9ff] mb-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="sm:text-2xl font-bold tracking-tight">
          <Link to={user?.role === 'recruiter' ? '/admin/companies' : '/'}>
            Path<span className="text-purple-500">Forward</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-10 text-gray-700 font-medium sm:text-lg m-3">
          {user?.role === 'student' ? (
            <>
              <Link to="/" className="hover:text-blue-600 transition">Home</Link>
              <Link to="/jobs" className="hover:text-blue-600 transition">Jobs</Link>
              <Link to="/browse" className="hover:text-blue-600 transition">Browse</Link>
            </>
          ) :user?.role === 'recruiter'? (
            <>
              <Link to="/admin/companies" className="hover:text-blue-600 transition">Companies</Link>
              <span onClick={handleJobs} className="cursor-pointer hover:text-blue-600 transition">Jobs</span>
            </>
          ):(<></>)}
        </nav>

        {/* Auth / Profile */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login">
                <Button className="bg-gray-600 hover:bg-gray-700 text-white  cursor-pointer">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">Sign Up</Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <img
                  src={user?.profile?.profilephoto || "https://static.naukimg.com/s/0/0/i/ni-gnb-revamped/userdp_v1.svg"}
                  alt="Avatar"
                  className="sm:w-15 sm:h-15 w-10 h-10 rounded-full border-2   cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent className=" mr-5 z-50 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-5">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="space-y-3">
                  {user.role === 'student' && (
                    <div className="flex items-center gap-2">
                      <User2 className="text-gray-500" size={18} />
                      <Button variant="link" className="p-0 text-blue-600 hover:underline">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut className="text-gray-500" size={18} />
                    <Button onClick={handleLogout} variant="link" className="cursor-pointer p-0 text-red-600 hover:underline">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
