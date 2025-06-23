import React, { useContext, useState } from 'react';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './Applied Job Table';
import { UserContext } from './context/context';
import ProfileEdit from './ProfileEdit';

const Profile = () => {
  const [edit, setedit] = useState(false);
  const { user, setUser } = useContext(UserContext);

  return (
    <div className=" min-h-screen">
      <Navbar />

      {/* Edit Modal */}
      {edit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[90vw] md:w-[50vw] shadow-lg">
            <ProfileEdit user={user} setUser={setUser} close={() => setedit(false)} />
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div
        style={{ backgroundImage: 'linear-gradient(to right, #f9c5d1, #f7d9ff)' }}
        className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-2xl p-8 border border-gray-200"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-6">
            <img
              src={
                user?.profile?.profilephoto
                  ? user.profile.profilephoto
                  : 'https://static.naukimg.com/s/0/0/i/ni-gnb-revamped/userdp_v1.svg'
              }
              alt="profile"
              className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <h1 className="text-2xl font-semibold">{user.name}</h1>
              <p className="text-gray-700 mt-1">
                About:{' '}
                <span className="text-gray-600">
                  {user?.profile?.bio ? user.profile.bio : 'Empty'}
                </span>
              </p>
            </div>
          </div>
          <Button onClick={() => setedit(true)} variant="outline">
            <Pen className="w-4 h-4 mr-1" /> Edit
          </Button>
        </div>

        {/* Contact */}
        <div className="space-y-2 mb-6 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-600" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="w-5 h-5 text-gray-600" />
            <span>{user.contact}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills && user.profile.skills.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-700">{item}</Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mb-2">
          <Label className="text-md font-bold">Resume</Label>
          <div className="mt-1">
            {user?.profile?.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {user.profile.resumeOriginalname || 'Download Resume'}
              </a>
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs */}
      <div
        style={{ backgroundImage: 'linear-gradient(to right, #f9c5d1, #f7d9ff)' }}
        className="mt-6 mb-10 max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 border border-gray-200"
      >
        <h1 className="text-lg font-bold mb-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
    </div>
  );
};

export default Profile;
