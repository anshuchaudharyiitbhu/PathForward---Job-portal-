import React, { useContext } from 'react';
import { Button } from './ui/Button';
import { Bookmark } from 'lucide-react';
import { Badge } from './ui/badge';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import { JobContext } from './context/Jobcontext';
import { useNavigate } from 'react-router-dom';
import { FilterContext } from './context/filtercontent';

const Job = () => {
  const { job } = useContext(JobContext);
  const { filter } = useContext(FilterContext);
  const navigate = useNavigate();

  // Function to get "x days ago"
  function getDaysAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  }

  const matchSalary = (salaryStr, selected) => {
    const salary = parseFloat(salaryStr); // assume salary is in LPA

    if (selected === '0-40k') return salary <= 0.4;
    if (selected === '42-1lakh') return salary > 0.4 && salary <= 1;
    if (selected === '1lakh to 5lakh') return salary > 1 && salary <= 5;
    if (selected > '5lakh') return  salary > 5;
    return true;
  };
  // ✅ Filtering logic based on selected filters
  const filteredJobs = job?.filter((item) => {
    const matchesLocation = filter?.Location ? item.location.toLowerCase().includes( filter.Location.toLowerCase() ): true;
    const matchesIndustry = filter?.Industry ? item.title.toLowerCase().includes(filter.Industry.toLowerCase()) : true;
    const matchesSalary = filter?.Salary ? matchSalary(item.salary, filter.Salary) : true;

    return matchesLocation && matchesIndustry && matchesSalary;
  });

  // Helper to handle salary range filtering

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-4 px-4">
        
        <FilterCard />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full h-fit">
          {filteredJobs?.length > 0 ? (
            filteredJobs.map((item) => (
              <div
                key={item._id}
                className="p-6 rounded-3xl shadow-xl border border-gray-300 bg-gradient-to-tr from-[#f9c5d1] to-[#f7d9ff]
                  transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl relative"
              >
                {/* Top Date and Bookmark */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{getDaysAgo(item.createdAt)}</span>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Bookmark />
                  </Button>
                </div>

                {/* Logo and Company */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-white rounded-full shadow-md overflow-hidden">
                    <img
                      src={
                        item.company?.logo ||
                        'https://static.naukimg.com/s/0/0/i/ni-gnb-revamped/userdp_v1.svg'
                      }
                      alt="logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{item.company?.name}</h3>
                    <p className="text-gray-600 text-sm">{item.location}</p>
                  </div>
                </div>

                {/* Job Title & Description */}
                <div className="mb-3">
                  <h2 className="text-xl font-bold text-[#3f3f3f] mb-1">{item.title}</h2>
                  <p className="text-sm text-gray-700 line-clamp-3">{item.description}</p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-blue-100 text-blue-700">{item.position}</Badge>
                  <Badge className="bg-red-100 text-red-600">{item.jobType}</Badge>
                  <Badge className="bg-purple-100 text-purple-700">{item.salary} LPA</Badge>
                </div>

                {/* Bottom Buttons */}
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/description/${item._id}`)}
                    className="w-full border-pink-400 text-pink-600 hover:bg-pink-50"
                  >
                    Details
                  </Button>
                  {/* <Button className="bg-[#7209b7] hover:bg-[#5c068c] text-white w-full">
                    Save
                  </Button> */}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center col-span-full font-semibold text-gray-600 mt-10">
              No jobs match your selected filters.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Job;
