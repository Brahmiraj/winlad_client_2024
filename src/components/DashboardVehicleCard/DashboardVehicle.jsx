import React, { useState, useEffect } from "react";
import CatJeep from "../../assets/images/rafflesImages/newJeep.png";
import NewVeh from "../../assets/images/newVeh.png";
import { LuInfo } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Cab from "../../assets/cab.png";

const DashboardVehicleCard = ({
  bgColor,
  isSubscribed,
  name,
  date,
  icon,
  fromColor,
  type,
  onButton,
  color,
  raffleimage,
  id,
  eligeble,
  oneOffPackage,
  checkTrial,
  winner,
  winningNumber,
  status,
  sub_status,
  count = ''
}) => {
  const [eligebleOne, setEligebleOne] = useState(true);
  const [onePackage, setOnePackage] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setOnePackage(oneOffPackage);
    setEligebleOne(eligeble);
  }, []);

  const handleClick = () => {
    onButton();
  };

  const dateObject = new Date(date);
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",

    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    timeZone: "UTC", // Set the timeZone option to "UTC"
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    dateObject
  );

  const handleNavigateWon = () => {
    if (status === 1 && id == '6582b82ea332291cc7752d92') {
      navigate(`/won/${id}`);
    } else {
      ("");
    }
  };

  return (
    <>
      <div
        className={`relative flex text-white flex-col justify-between rounded-2xl w-full p-2 shadow-lg hover:transition hover:duration-300 hover:ease-in-out hover:opacity-75 cursor-pointer overflow-hidden border-2 border-[#000]`}
        // style={{ backgroundColor: color }}

        style={{
          background: `linear-gradient(180deg, ${color} 0%, #ACACAC 100%)`,
        }}
        onClick={handleNavigateWon}
      >
        {checkTrial ? (
          <div className="text-center bg-gradient-to-t from-black to-transparent absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-not-allowed z-20">
            <p className="text-xs md:text-lg font-semibold text-white capitalize">
              You remain ineligible until
              <br /> the end of the trial !
            </p>
          </div>
        ) : (
          eligebleOne &&
          !sub_status &&
          type != "max" && (
            <div className="text-center bg-gradient-to-t from-black to-transparent absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-not-allowed z-20">
              <p className="text-xs md:text-lg font-semibold text-white capitalize">
                You are not eligible,
                <br /> please subscribe first !
              </p>
            </div>
          )
        )}

        {/* <div className="flex justify-end px-1">
          <img
            src={icon}
            alt=""
            className="2xl:w-24 xl:w-24 w-16 special:w-28 "
          />
        </div> */}
        <div className="flex flex-col justify-between space-y-2">
          {/* <img
            src={raffleimage}
            alt=""
            className="flex w-36 special:w-96 2xl:w-48 shadow-xl"
          /> */}
          <div>
            <img src={raffleimage} alt="" />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center text-black font-bold">
              <p>{name}</p>
              <p className="text-xs text-black">{formattedDate}</p>
            </div>

          </div>
          {
            count && 
           <p className="text-sm">My Entries : {count ? count : 'No Entries'}</p>
          }

          <div className="flex flex-col">
            <div className="flex flex-col z-10 pr-2 items-end space-y-2 2xl:space-y-4 special:space-y-4 text-right">
              {/* <p className="font-bold xl:text-[16px] capitalize text-xs special:text-4xl 2xl:text-[16px]">
                {name}
              </p>
              <p className="text-[10px]  special:text-xl 2xl:text-[10px]">
                {winningNumber && <span>Drawn on </span>}
                {formattedDate}
              </p> */}
              <div>

                {winningNumber && (
                  <p className="text-sm text-yellow-500 font-semibold">
                    {winningNumber}
                  </p>
                )}

                {winner && (
                  <p className="text-xs capitalize text-black">Winner : {winner}</p>
                )}
              </div>
            </div>
            {onePackage && (
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(); // Replace 'childPage' with the appropriate destination for the child div
                  }}
                  className="rounded-md w-full border-2 capitalize hover:bg-black bg-white text-black cursor-pointer border-black  py-1 hover:scale-105 hover:transition-transform ease-out duration-300 mt-auto hover:text-white text-sm px-1"
                >
                  one off packages
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardVehicleCard;
