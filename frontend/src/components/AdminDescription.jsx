import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import Navbar from './shared/Navbar';
import { UserContext } from './context/context';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminDescription = () => {
  const { user } = useContext(UserContext);
  const { id: jobid } = useParams();
  const Navigate=useNavigate();

  const [jobDetails, setJobDetails] = useState(null);
  const [isapplied, setisapplied] = useState(false);

  // ✅ Fetch job + check application status
  const fetchJobStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/application/${jobid}/applicants`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const jobFromServer = res.data.job;
        setJobDetails(jobFromServer);

        const applied = jobFromServer.applications.some(
          (j) => j.applicant._id === user._id
        );
        setisapplied(applied);
      }
    } catch (error) {
      console.log("Error checking application status", error);
    }
  };

  // 🔁 On mount
  useEffect(() => {
    if (user?._id && jobid) {
      fetchJobStatus();
    }
  }, [user?._id, jobid]);



  // ⏳ Loading state
  if (!jobDetails) {
    return <div className="text-center mt-20 text-lg text-gray-600">Loading job...</div>;
  }
  

  return (
    <>
      <Navbar />
      <div
        style={{ backgroundImage: "linear-gradient(to right, #f5b2c2, #eecaff)" }}
        className="max-w-4xl lg:mx-auto  mx-5 mt-10 bg-white shadow-lg p-8 rounded-lg border border-gray-200"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">{jobDetails.title}</h1>
            <p className="text-gray-600">
              {jobDetails.company?.name} • {jobDetails.location}
            </p>
          </div>
          <Button variant="outline" size="icon">
            <Bookmark />
          </Button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Posted on{" "}
          {new Date(jobDetails.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Job Description</h2>
          <p className="text-gray-700">{jobDetails.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Skills Required</h2>
          <ul className="list-disc list-inside text-gray-700">
            {jobDetails.requirements?.length > 0 ? (
              jobDetails.requirements.map((skill, idx) => <li key={idx}>{skill}</li>)
            ) : (
              <li>No skills specified</li>
            )}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Salary</h2>
          <p className="text-gray-700">{jobDetails.salary} LPA</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Total Applicants</h2>
          <p className="text-gray-700">{jobDetails.applications.length}</p>
        </div>

        <div className="flex gap-4 mt-4">
          <Button className='cursor-pointer' onClick={()=>Navigate(`/description/${jobid}/admin/applicant`)} > Applicants</Button>
        </div>
      </div>
    </>
  );
};

export default AdminDescription;
