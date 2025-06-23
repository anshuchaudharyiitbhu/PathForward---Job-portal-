import React, { useContext } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { JobContext } from './context/Jobcontext'
import { UserContext } from './context/context'
// import { useSelector } from 'react-redux'
// const allAppliedJobs=[1,2,3]

const AppliedJobTable = () => {
    // const {allAppliedJobs} = useSelector(store=>store.job);
    const {job}=useContext(JobContext);
    const {user}=useContext(UserContext);
    const status=null;

    
    
    
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
  job?.length <= 0 ? (
    <span>You haven't applied to any job yet.</span>
  ) : (
    job?.map((job) => {
      const userApplication = job.applications?.find(
        (applicant) => applicant?.applicant?._id === user._id
      );

      const status = userApplication?.status || "Pending"; // fallback if not found

      return (
        <TableRow key={job._id}>
          <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
          <TableCell>{job.title}</TableCell>
          <TableCell>{job.company?.name}</TableCell>
          <TableCell className="text-right ">
            <Badge
              className={`${
                status === "rejected"
                  ? 'bg-red-400'
                  : status === "accepted"
                  ? 'bg-green-400'
                  : 'bg-gray-400'
              } xl:w-[5vw] sm:w-[10vw] w-[15vw] `}
            >
              {status.toUpperCase()}
            </Badge>
          </TableCell>
        </TableRow>
      );
    })
  )
}

                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable