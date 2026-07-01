import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/context';
import Navbar from './shared/Navbar';
import { Button } from './ui/Button';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Link, useNavigate } from 'react-router-dom';
import { CompanyContext } from './context/companycontext';
import { Edit2, MoreVertical, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';

const Companies = () => {
  const user = useContext(UserContext);
  const { company, fetchcompany, deleteCompany } = useContext(CompanyContext);
  const [filtercompany, setfiltercompany] = useState([]);
  const [input, setinput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchcompany();
  }, []);

  useEffect(() => {
    const searched = company.filter(comp => {
      if (!input) return true;
      return comp?.name?.toLowerCase().includes(input.toLowerCase());
    });
    setfiltercompany(searched);
  }, [company, input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl flex flex-col justify-between items-center m-auto gap-5">
        <div className="w-[50vw] gap-7 items-center flex flex-col lg:flex-row justify-between">
          <input
            type="text"
            placeholder="Search companies"
            onChange={(e) => setinput(e.target.value)}
            className="p-3 rounded-2xl border-2 border-black"
          />
          <Button className="bg-black text-white">
            <Link to="/admin/companies/create">Add Company</Link>
          </Button>
        </div>

        <table className="bg-pink-100 p-5 w-[50vw] bg-gradient-to-br from-[#f9c5d1] to-[#f7d9ff] rounded-2xl">
          <TableHeader>
            <TableRow className="p-10">
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          {filtercompany && filtercompany.length > 0 ? (
            filtercompany.map((item) => (
              <TableBody key={item._id}>
                <TableRow>
                  <TableCell>
                    <img className="w-12 h-12 rounded-full" src={item.logo} alt={item.name} />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="flex justify-end cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreVertical className="cursor-pointer" />
                      </PopoverTrigger>

                      <PopoverContent>
                        <div
                          style={{ backgroundImage: 'linear-gradient(to right, #f9c5d1, #f7d9ff)' }}
                          className="rounded-2xl flex flex-col"
                        >
                          <button
                            onClick={() => navigate(`/admin/companies/${item._id}`)}
                            className="p-5 flex items-center gap-4 hover:bg-white/20"
                          >
                            <Edit2 size={18} />
                            Edit
                          </button>

                          <button
                            onClick={() => deleteCompany(item._id)}
                            className="p-5 flex items-center gap-4 text-red-600 hover:bg-white/20"
                          >
                            <Trash2 size={18} />
                            Delete
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No companies found. Try refreshing or re-logging.
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Companies;
