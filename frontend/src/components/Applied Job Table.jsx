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
  {(() => {
    const appliedJobs = job?.filter((job) =>
      job.applications?.some(
        (application) => application?.applicant?._id === user?._id
      )
    );

    return appliedJobs?.length === 0 ? (
      <TableRow>
        <TableCell colSpan={4} className="text-center">
          You haven't applied to any job yet.
        </TableCell>
      </TableRow>
    ) : (
      appliedJobs.map((job) => {
        const userApplication = job.applications.find(
          (application) => application.applicant._id === user._id
        );

        return (
          <TableRow key={job._id}>
            <TableCell>{job.createdAt?.split("T")[0]}</TableCell>
            <TableCell>{job.title}</TableCell>
            <TableCell>{job.company?.name}</TableCell>
            <TableCell className="text-right">
              <Badge
                className={`${
                  userApplication.status === "Rejected"
                    ? "bg-red-400"
                    : userApplication.status === "Accepted"
                    ? "bg-green-400"
                    : "bg-gray-400"
                } xl:w-[5vw] sm:w-[10vw] w-[15vw]`}
              >
                {userApplication.status.toUpperCase()}
              </Badge>
            </TableCell>
          </TableRow>
        );
      })
    );
  })()}
</TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
