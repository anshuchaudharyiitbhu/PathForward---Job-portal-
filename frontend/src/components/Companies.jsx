import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './context/context'
import Navbar from './shared/Navbar';
import { Button } from './ui/Button';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Link, useNavigate } from 'react-router-dom';
import { CompanyContext } from './context/companycontext';
import { Edit2, Eye, MoreVertical } from 'lucide-react';
// import { Popover } from 'bootstrap';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
// import { Button } from 'react-bootstrap';



const Companies = () => {
  const user = useContext(UserContext);
  const { company,fetchcompany } = useContext(CompanyContext);
  const [filtercompany, setfiltercompany] = useState(company)
  const [input, setinput] = useState(null)
  const Navigate=useNavigate();

  useEffect(() => {
    const searched = company.length >= 0 && company.filter(company => {
      if (!input) {
        return true;
      }
      return company?.name?.toLowerCase().includes(input.toLowerCase());
    }
    )
    setfiltercompany(searched);



  }, [company, input,fetchcompany])









  return (
    <div>
      <Navbar />
      <div className=' max-w-7xl flex flex-col justify-between items-center m-auto gap-5 '>
        <div className="w-[50vw] gap-7 items-center flex  flex-col lg:flex-row justify-between">

          <input type="text" placeholder='Search companies' onChange={(e) => setinput(e.target.value)} className=' p-3 rounded-2xl border-2 border-black' />
          <Button className='bg-black text-white' ><Link to="/admin/companies/create" >Add Company</Link></Button>
        </div>
        {/* </div>
      <div className=' max-w-7xl flex justify-center items-center m-auto ' > */}
        <table className='bg-pink-100 p-5 w-[50vw] bg-gradient-to-br from-[#f9c5d1] to-[#f7d9ff] rounded-2xl'>

          <TableHeader >
            <TableRow className="p-10">
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          {filtercompany ? filtercompany.map((item, index) => (
            <TableBody>
              <TableCell><img className='w-12 h-12 rounded-full' src={item.logo} /></TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{new Date(item.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}</TableCell>
              <TableCell className='flex justify-end cursor-pointer' >
                <Popover >
                  <PopoverTrigger>
                    <MoreVertical className='cursor-pointer' />

                    <PopoverContent>
                      <div style={{ backgroundImage: "linear-gradient(to right, #f9c5d1, #f7d9ff)" }} className='rounded-2xl' >
                        <Link onClick={()=>Navigate(`/admin/companies/${item._id}`)} className=' p-5  flex  justify-center items-center gap-4'>
                       <Edit2/> Edit
                       </Link>
                       
                      </div>

                    </PopoverContent>
                  </PopoverTrigger>
                </Popover>
              </TableCell>
            </TableBody>


          )) : <span>"Nothing to show</span>}



        </table>
      </div>

    </div>
  )
}

export default Companies
