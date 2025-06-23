import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Choice_box from "./Choice_box";
import Companycard from "./Companycard";
import { JobContext } from "./context/Jobcontext";


const Company = () => {
 const settings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,

  responsive: [
    {
      breakpoint: 1500, // below 1024px
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1000, // below 640px (sm screen)
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};


  const {job,setjob}= useContext(JobContext);
  return (


    <div className="flex flex-col gap-10 my-20 justify-center items-center">
      <h1 className="text-2xl font-bold">
        Featured companies actively hiring
      </h1>

      <div className=" w-[70vw] h-[50vh]   justify-center    flex items-center">
        <Slider {...settings} className=" slick-style w-full">
          
          {job?.length>0 ?(job.map((item, index) => (

            
            <div key={index} className="box h-[90%] w-[50vw]  p-5 mx-2">
             
              <Companycard job={item}/>
            </div>
          ))):(<span>"Nothing to show</span> )}
        </Slider>
      </div>
    </div>
  );
};

export default Company;
