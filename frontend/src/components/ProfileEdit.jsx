import React, { useState } from 'react';
import { Button } from './ui/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '@/utilis/constant';

const ProfileEdit = ({ user, setUser, close }) => {
  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.profile?.bio || '');
  const [contact, setContact] = useState(user.contact || '');
  const [email, setEmail] = useState(user.email || '');
  const [skills, setSkills] = useState(user.profile?.skills?.join(',') || '');
  const [file, setFile] = useState(null); // don't prefill file
  const [loading, setloading] = useState(false)

  const handleSave = async (e) => {
    setloading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('contact', contact);
    formData.append('email', email);
    formData.append('skills', skills);
    if (file) {formData.append('file', file);}

    try {
      // console.log(file)
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
    "Content-Type": "multipart/form-data",
  },
        withCredentials: true,
      });
  // console.log("anshuuuu");



      if (res.data.success) {
        setUser(res.data.user);  
        toast.success(res.data.message);
        close();
      }
    } catch (error) {
  console.log("Axios Error:", error);
  console.log("Error Response:", error?.response);
  toast.error(error?.response?.data?.message || 'Something went wrong');         
}finally{
  setloading(false);
}

  };

  return (   
    <div>
      <h2 className="text-xl font-bold mb-3">Edit Profile</h2>
      <label className="font-bold">Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded mb-2" />

      <label className="font-bold">Bio</label>
      <input value={bio} onChange={(e) => setBio(e.target.value)} className="w-full border p-2 rounded mb-2" />

      <label className="font-bold">Contact</label>
      <input value={contact} onChange={(e) => setContact(e.target.value)} className="w-full border p-2 rounded mb-2" />

      <label className="font-bold">Email</label>
      <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded mb-2" />

      <label className="font-bold">Resume (PDF)</label>
<input
  type="file"
  accept=".pdf"
  onChange={(e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      alert("Please select a valid PDF file.");
      return;
    }
    setFile(selectedFile);
  }}
  className="w-full border p-2 rounded mb-2"
/>

      {/* console.log(file.name); */}
      

      <label className="font-bold">Skills (comma separated)</label>
      <input value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full border p-2 rounded mb-2" />

      <div className="flex justify-end gap-2 mt-3">
        <Button onClick={close} variant="outline">Cancel</Button>
        <Button className='cursor-pointer' onClick={handleSave} disabled={loading}>
  {loading ? (
    <>
      <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
      </svg>
      Saving...
    </>
  ) : "Save"}
</Button>

      </div>
    </div>
  );
};

export default ProfileEdit;
