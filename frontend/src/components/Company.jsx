import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Companycard from "./Companycard";
import { JobContext } from "./context/Jobcontext";

const Company = () => {
  const { job } = useContext(JobContext);

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
        breakpoint: 1280, // below lg
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // below md
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-10 my-20 justify-center items-center">
      <h1 className="text-2xl font-bold text-center">
        Featured companies actively hiring
      </h1>

      <div className="w-[80vw] md:w-[90vw] lg:w-[75vw]">
        {job?.length > 0 ? (
          <Slider {...settings}>
            {job.map((item, index) => (
              <div key={index} className="p-2">
                <Companycard job={item} />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-gray-500 text-lg text-center">Nothing to show</div>
        )}
      </div>
    </div>
  );
};

export default Company;
