import React, { useContext, useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import toast from 'react-hot-toast';
import { JobContext } from './context/Jobcontext';

const Applicants = () => {
  const { id: jobid } = useParams();
  const [applications, setApplications] = useState([]);
  const { job, setjob } = useContext(JobContext);
  const [status, setstatus] = useState("Pending")

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/job/get/${jobid}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setApplications(res.data.job.applications || []);
      }
    } catch (err) {
      console.error('Error fetching applicants', err);
    }
  };

  const handleStatusChange = async (newStatus, appId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/application/status/${appId}/update`,
        { status: newStatus },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success('Status updated successfully');
        fetchApplicants(); // refresh list
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Status update failed');
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        style={{ backgroundImage: 'linear-gradient(to right, #f5b2c2, #eecaff)' }}
        className="max-w-4xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-lg border border-gray-200"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applications.length > 0 ? (
              applications.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src={
                        item.applicant.profile?.profilephoto ||
                        'https://static.naukimg.com/s/0/0/i/ni-gnb-revamped/userdp_v1.svg'
                      }
                      alt="Profile"
                    />
                  </TableCell>
                  <TableCell>{item.applicant.name}</TableCell>
                  <TableCell>{item.applicant.email}</TableCell>
                  <TableCell>
                    {item?.applicant?.profile?.resume ? (
                      <a
                        className="text-blue-500 underline"
                        href={item.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.applicant.profile.resumeOriginalname || 'Resume'}
                      </a>
                    ) : (
                      'NA'
                    )}
                  </TableCell>
                  <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <select
                     
                      onChange={(e) => handleStatusChange(e.target.value, item._id)}
                      onClick={(e)=>setstatus(e.target.value)}
                      className="border p-2 rounded-md"
                    >
                      <option value="status" disabled hidden>
                        {status}
                      </option>
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-5">
                  No applicants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Applicants;
