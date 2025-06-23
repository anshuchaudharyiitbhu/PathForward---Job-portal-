import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Companycard({ job }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full  rounded-3xl overflow-hidden shadow-xl 
      border border-pink-200 bg-gradient-to-br from-[#f9c5d1] to-[#f7d9ff]
      transform transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl"
    >
      {/* Logo */}
      <div className="bg-gradient-to-br from-[#f9c5d1] to-[#f7d9ff] flex justify-center items-center h-[150px] p-4">
        <img
          src={job.company?.logo || "https://img.naukimg.com/logo_images/groups/v2/445608.gif"}
          alt="Company Logo"
          className="h-full max-w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between h-[250px]">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
            {job.company?.name || "Company Name"}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-3 text-center">
            {job.description || "No description provided for this company."}
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            onClick={() => navigate(`/description/${job._id}`)}
            className="bg-[#ff80ab] text-white px-5 py-2 rounded-full shadow-md 
              hover:shadow-lg border-0 hover:bg-[#f06292] transition"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Companycard;
