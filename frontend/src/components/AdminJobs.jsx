import React, { useContext, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Badge } from './ui/badge';
import Navbar from './shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { AdminJobContext } from './context/Adminjobcontext';

const AdminJobs = () => {
  const { ajob } = useContext(AdminJobContext);
  const navigate = useNavigate();

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  const [input, setinput] = useState(null)
  const [search, setsearch] = useState(ajob)
useEffect(() => {
  
const searched = ajob?.length >= 0 && ajob.filter(job => {
      if (!input) {
        return true;
      }
      return job?.company?.name?.toLowerCase().includes(input.toLowerCase());
    }
    )
    setsearch(searched);

 
}, [ajob,input])

  return (
    <>
      <Navbar />
      <div  className="max-w-7xl mx-auto px-4 py-8">
        {/* Header and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search Jobs by Company name"
            onChange={(e)=>setinput(e.target.value)}
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-xl shadow-sm"
          />
          <Link to="/admin/job/create">
            <Button className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800">Add Job</Button>
          </Link>
        </div>

        {/* Job Cards Grid */}
        <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {search?.length > 0 ? search.map((item) => (
            <div style={{ backgroundImage: "linear-gradient(to right, #f9c5d1, #f7d9ff)" }}
              key={item._id}
              className="bg-white rounded-xl shadow-md border hover:shadow-lg transition p-5 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{getDaysAgo(item.createdAt)}</span>
                <Button variant="ghost" size="icon"><Bookmark /></Button>
              </div>

              {/* Company Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src={item.company?.logo || '/default-logo.png'}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">{item.company?.name}</h2>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>

              {/* Job Title + Description */}
              <div className="mb-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="text-blue-700 bg-blue-100">{item.position}</Badge>
                <Badge className="text-orange-700 bg-orange-100">{item.jobType}</Badge>
                <Badge className="text-purple-700 bg-purple-100">{item.salary} LPA</Badge>
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/description/${item._id}/admin`)}
                  className="w-[100%] cursor-pointer"
                >
                  Details
                </Button>
                {/* <Button className="bg-[#7209b7] text-white w-[48%] hover:bg-[#5f0799]">
                  Save
                </Button> */}
              </div>
            </div>
          )) : (
            <p className="text-gray-500 col-span-full text-center">No jobs found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminJobs;
