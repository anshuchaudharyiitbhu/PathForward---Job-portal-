import React from 'react';
import Choice_box from './Choice_box';

const Choices = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[90vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <Choice_box choice="Remote" link="https://static.naukimg.com/s/0/0/i/trending-naukri/remoteonetheme.svg" />
        <Choice_box choice="MNC" link="https://static.naukimg.com/s/0/0/i/trending-naukri/mnconetheme.svg" />
        <Choice_box choice="Banking & Finance" link="https://static.naukimg.com/s/0/0/i/trending-naukri/financeonetheme.svg" />
        <Choice_box choice="Analytics" link="https://static.naukimg.com/s/0/0/i/trending-naukri/analyticsonetheme.svg" />
        <Choice_box choice="Data Science" link="https://static.naukimg.com/s/0/0/i/trending-naukri/data-scienceonetheme.svg" />
        <Choice_box choice="Software & IT" link="https://static.naukimg.com/s/0/0/i/trending-naukri/softwareonetheme.svg" />
        <Choice_box choice="Business" link="https://static.naukimg.com/s/0/0/i/trending-naukri/startuponetheme.svg" />
      </div>
    </div>
  );
};

export default Choices;
