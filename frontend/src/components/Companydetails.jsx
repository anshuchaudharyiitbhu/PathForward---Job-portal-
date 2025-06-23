import React, { useContext, useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Button } from './ui/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { CompanyContext } from './context/companycontext'

const Companydetails = () => {
  const params = useParams();
  const companyid = params.id;
  const navigate=useNavigate();
  const [loading, setloading] = useState(false);
 
  
  const { company,fetchcompany } = useContext(CompanyContext);
  
  
 
  const [input, setInput] = useState({ 
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  
  
  
  
 
  
  
  
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setInput({ ...input, file: files[0] });
    } else {
      setInput({ ...input, [name]: value });
    }
  };
  useEffect(() => {
    
  if (company && company.length > 0) {
    const companydata = company.find(f=>f._id===companyid)
    
    if (companydata) {
      setInput({
        name: companydata.name || "",
        description: companydata.description || "",
        website: companydata.website || "",
        location: companydata.location || "",
        file: null, // don't set file from backend
      });
    }
  }
}, [company]);

  const handleClick = async (e) => { 
    e.preventDefault();
        setloading(true);

    const formdata = new FormData();
    formdata.append("name", input.name);
    formdata.append("description", input.description);
    formdata.append("website", input.website);
    formdata.append("location", input.location);
    formdata.append("file", input.file);

    try {
      const res = await axios.post(`http://localhost:3000/api/v1/company/update/${companyid}`, formdata, {
         headers: {
                    'Content-Type': 'multipart/form-data'
                },
        withCredentials: true,
      });
      console.log(res);
      //  const fetchcompany =useContext(CompanyContext);
      

      if (res.data.success) {
        toast.success("Company details updated successfully");
       await fetchcompany();
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      console.log(error);
    }finally
        {
            setloading(false);
        }
   
  };

  return (
    <div>
      <Navbar />
      <div className='flex flex-col justify-center items-center py-10'>
        <h1 className='text-3xl font-bold mb-2'>Company Details</h1>
        <p className='text-gray-600 mb-8'>Enter your company details below</p>

        <form onSubmit={handleClick}
          style={{ backgroundImage: "linear-gradient(to right, #f9c5d1, #f7d9ff)" }}
          className='w-[80%] max-w-4xl bg-gray-100 p-8 rounded-lg shadow-md'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex flex-col'>
              <label className='mb-1 font-semibold'>Company Name</label>
              <input
                name="name"
                value={input.name}
                onChange={handleChange}
                type="text"
                placeholder='Company'
                className='border border-gray-400 p-3 rounded-lg'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-semibold'>Description</label>
              <input
                name="description"
                value={input.description}
                onChange={handleChange}
                type="text"
                placeholder='Description'
                className='border border-gray-400 p-3 rounded-lg'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-semibold'>Website</label>
              <input
                name="website"
                value={input.website}
                onChange={handleChange}
                type="text"
                placeholder='Website'
                className='border border-gray-400 p-3 rounded-lg'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-semibold'>Location</label>
              <input
                name="location"
                value={input.location}
                onChange={handleChange}
                type="text"
                placeholder='Location'
                className='border border-gray-400 p-3 rounded-lg'
              />
            </div>

            <div className='flex flex-col md:col-span-2'>
              <label className='mb-1 font-semibold'>Upload Logo</label>
              <input
                name="file"
                onChange={handleChange}
                type="file"
                accept="image/*"
                className='border border-gray-400 p-3 rounded-lg'
              />
            </div>
          </div>
        </form>

        <div className='flex gap-6 mt-8 '>
          <Link to="/admin/companies">
            <Button className='px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white'>Cancel</Button>
          </Link>
           <Button onClick={handleClick} className='max-w-[20vw] cursor-pointer'   disabled={loading}>
                                {loading ? (
                                  <>
                                    <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                                    </svg>
                                   Updating...
                                  </>
                                ) : "Update"}
                              </Button>
        </div>
      </div>
    </div>
  );
};

export default Companydetails;
