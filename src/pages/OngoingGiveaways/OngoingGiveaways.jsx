import React, { useState, useEffect } from "react";
import BG from "../../assets/images/HomesideBg.png";
import TopNav from "../../components/TopNav/TopNav";
import MainCar from "../../assets/images/MainCar.png";
import SearchField from "../../components/SearchField/SearchField";
import { validateCurrentUser } from "../../utils/validateuser";
import { Link, useNavigate } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.config.js";
import User from "../../assets/images/user4.png";
import { motion } from "framer-motion";
import NoLiveCard from "../../components/Live/NoLiveCard.jsx";
import LiveCard from "../../components/Live/LiveCard.jsx";
import axios from "axios";
import { MdOutlineDoNotDisturbOff } from "react-icons/md";
import ItemLoader from "../../components/Loader/ItemLoader";
import Cookies from "universal-cookie";
import DashboardVehicleCard from "../../components/DashboardVehicleCard/DashboardVehicle";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import SelectRafflePaymentMethod from "../../components/RaffleComponent/SelectRafflePaymentMethod";
import ActiveBanner from "../../assets/activeBanner.png";
import ActiveBanner1 from "../../assets/activeBannerM.png";

const OngoingGiveaways = () => {
  const iframeStyle = {
    width: "100%",
    height: "100%",
    aspectRatio: "16/9",
  };

  const [userImage, setUserImage] = useState("");
  const [valUser, setValUser] = useState({});
  const [liveLink, setLiveLink] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [giveaways, setGiveaways] = useState([]);
  const [selectGiveawayId, setSelectGiveawayId] = useState("");
  const [selectGiveawayName, setSelectGiveName] = useState("");
  const [selectPayment, setSelectPayment] = useState(false);
  const [price, setPrice] = useState("");
  const [sortedGiveaways, setSortedGiveaways] = useState([]);
  const cookies = new Cookies(null, { path: "/" });
  const [initialLength, setInitSize] = useState(8);

  useEffect(() => {
    currentUserValidation();
  }, []);

  useEffect(() => {
    const sortedArray = [...giveaways];
    sortedArray.sort(
      (a, b) => new Date(a.startingtime) - new Date(b.startingtime)
    );
    setSortedGiveaways(sortedArray);
    checkCoupen();
    console.log(sortedArray, "dasd");
  }, [giveaways]);

  const currentUserValidation = async () => {
    const validator = await validateCurrentUser();
    if (validator.validatorBl) {
      console.log("Session OK", validator.user);
      setValUser(validator.user);
      getGiveaways(validator.user.uid);
      getProfileImage(validator.user.image);
      // getRaffleCount(validator.user.uid);
    } else {
      navigate("/login");
    }
  };

  const getGiveaways = async (valuid) => {
    await axios
      .get(`${import.meta.env.VITE_SERVER_API}/raffleRoundsActive`)
      .then((response) => {
        console.log(response.data.data, "data raffle");
        setGiveaways(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleButton = ({ id, price, name }) => {
    setSelectGiveawayId(id);
    setPrice(price);
    setSelectGiveName(name);
    setSelectPayment(true);
  };

  const handleSeeMore = (show) => {
    if (show) {
      setInitSize(giveaways.length);
    } else {
      setInitSize(8);
    }
  };

  function getProfileImage(img) {
    getDownloadURL(ref(storage, img))
      .then((url) => {
        setUserImage(url);
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  const checkCoupen = () => {
    const checkCode = cookies.get("COUPEN");
    if (checkCode === "WINFREE") {
      // REMOVED THE COOKIE FOR AVOID STUCK IN ENTRIES PAGE,:)
      cookies.remove("COUPEN");
      navigate("/requestEntries");
    }
  };

  return (
    <>
      <div className="flex flex-col xl:px-6 px-4 special:px-12 special:space-y-24 overflow-hidden relative">
        <div className="xl:flex xl:flex-row flex-col xl:justify-between xl:gap-4">
          <img
            src={BG}
            alt=""
            className="absolute right-0 -z-10 top-10 w-72 xl:w-96 md:w-96 special:w-1/4 2xl:w-1/4 special:top-40 opacity-60 hidden xl:block"
          />
          <div className="flex flex-col flex-1">
            <div className="block xl:hidden space-y-4">
              <div
                className="bg-black rounded-b-xl py-4"
              // style={{
              //   backgroundImage: `url(${OngoingBanner1})`,
              //   backgroundSize: "cover",
              //   backgroundPosition: "center",
              // }}
              >
                <TopNav textColor={"white"} />
                {/* <div className="pt-10">
                  <img className="" src={MainCar} alt="main" />
                </div> */}
                {/* <div className="pt-96 flex justify-end pr-12 pb-8">
                  <button
                    className="capitalize bg-white text-[10px] 2xl:text-xl md:text-xs xl:text-sm xl:py-2 xl:px-8 px-2 py-1 hover:opacity-75 rounded-lg"
                    onClick={handleClickButton}
                  >
                    Enter Now
                  </button>
                </div> */}
              </div>
            </div>
            <div className="flex flex-col 2xl:space-y-8 space-y-6 special:space-y-12">
              {/* <div className="mt-4 xl:pt-0 pb-4 xl:pb-0">
                <SearchField />
              </div> */}
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col space-y-2 special:space-y-8 flex-1">
                  {/* <div className="flex flex-row items-center gap-2 special:gap-4">
                    {userImage ? (
                      <div className="w-12 h-12 special:w-36 special:h-36 rounded-full aspect-square">
                        <img
                          src={userImage}
                          className="w-full h-full object-cover"
                          alt="user"
                        />
                      </div>
                    ) : (
                      <img
                        src={User}
                        alt=""
                        className="w-12 h-12 special:w-36 special:h-36"
                      />
                    )}

                    <div className="flex flex-col space-y-1">
                      <p className="font-bold special:text-4xl">
                        Earning Balance
                      </p>
                      <p className="special:text-6xl">
                        $&nbsp;
                        {typeof valUser.balance === "number"
                          ? valUser.balance.toFixed(2)
                          : "0.00"}
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* <div className="flex flex-col gap-5">
                <div className="w-full">
                  <iframe
                    title="YouTube Video"
                    src="https://player.vimeo.com/video/899812267?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                    frameBorder="0"
                    className="w-full"
                    allow="autoplay; fullscreen; picture-in-picture;muted"
                    style={iframeStyle}
                  ></iframe>
                </div>
                {liveLink ? (
                  <Link to="/live">
                    <LiveCard />
                  </Link>
                ) : (
             
                  <NoLiveCard />
                )}
              </div> */}
            </div>
          </div>
          <div className="flex-col flex-1 space-y-4 hidden xl:flex">
            <div
              className="rounded-b-lg py-4 bg-black"
            // style={{
            //   backgroundImage: `url(${OngoingBanner})`,
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            // }}
            >
              <TopNav textColor={"white"} />
              {/* <div className="pt-10">
                <motion.img
                  initial={{ x: 80, opacity: 0 }} // Initial position and opacity (hidden)
                  animate={{ x: 60, opacity: 1 }} // Move and fade in when in view
                  transition={{ type: "tween", duration: 1, delay: 1 }}
                  className="w-3/4"
                  src={MainCar}
                  alt="main"
                />
              </div> */}
              {/* <div className="pt-96 special:pt-[1000px] flex justify-end pr-12 special:pr-16 pb-8">
                <button
                  className="capitalize bg-white text-[10px] 2xl:text-xl md:text-xs special:text-4xl xl:text-sm xl:py-2 xl:px-8 px-2 py-1 hover:opacity-75 rounded-lg"
                  onClick={handleClickButton}
                >
                  Enter Now
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 special:space-y-6 2xl:space-y-4">
          <p className="font-semibold text-lg xl:text-xl 2xl:text-2xl special:text-4xl pt-4 xl:pt-0">
            Active Giveaways
          </p>
          <div className="relative">
            <div className="hidden md:block">
              <img src={ActiveBanner} alt="" />
            </div>
            <div className="block md:hidden">
              <img src={ActiveBanner1} alt="" />
            </div>

            <div className="absolute xl:bottom-10 2xl:right-[20px] xl:left-[20px] bottom-16 md:bottom-4 left-[10px] md:left-[20px]">
              <Link
                to="https://winladsgiveaway.com/#packages"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="capitalize bg-white text-xl font-semibold 2xl:text-3xl md:text-xl xl:text-2xl 2xl:px-24 xl:py-2 xl:px-16 px-12 py-1 hover:opacity-75 rounded-lg"
                  style={{ boxShadow: "3px 10px 0px 0px black" }}>
                  Enter Now
                </button>
              </Link>
            </div>
          </div>
          <div className="flex items-start flex-col xl:flex-row">
            <div className="xl:w-2/3 pt-8 w-full">
              <iframe
                title="YouTube Video"
                src="https://player.vimeo.com/video/899812267?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameBorder="0"
                className="w-full rounded-xl"
                allow="autoplay; fullscreen; picture-in-picture;muted"
                style={iframeStyle}
              ></iframe>
            </div>
            <div className="xl:w-1/3 px-10 pt-5">
              <div className="text-xl xl:text-2xl font-normal 2xl:text-3xl special:text-6xl 2xl:pt-4 mb-5">
                Vehicle Specifications
              </div>
              <div className="md:text-sm xl:text-sm flex flex-row xl:flex-col items-start font-normal gap-2 2xl:text-xl w-3/4 max-xl:w-full special:text-4xl text-xs">
                <div className="w-full flex flex-col space-y-3">
                  <p>• 3.5 Tonne Towing Capacity</p>
                  <p>• Apple Carplay</p>
                  <p>• Leather Interior & Roof Racks</p>
                  <p>• Delivered Australia-Wide</p>
                  <p>• Valued at $68,750</p>
                </div>
                <div className="w-full flex flex-col space-y-3">
                  <p>• Brand New Mazda BT-50 SP Model</p>
                  <p>• 3.0L Turbo Diesel</p>
                  <p>• 140KW & 450NM of Torque</p>
                  <p>• Crystal LED Headlights</p>
                  <p>• 18 Inch Black Metallic Alloys</p>
                </div>
              </div>
            </div>
          </div>

          {/* {loading ? (
            <div className="flex justify-center">
              <ItemLoader />
            </div>
          ) : sortedGiveaways.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {sortedGiveaways.slice(0, initialLength).map((giveaway, key) => (
                <DashboardVehicleCard
                  isSubscribed={valUser.subscriptionPlan?.data}
                  key={key}
                  type={giveaway.raffle.type}
                  id={giveaway._id}
                  name={giveaway.name}
                  date={giveaway?.endtime}
                  color={giveaway?.raffle?.color}
                  fromColor={giveaway.raffle?.color}
                  icon={giveaway.raffle?.image}
                  price={giveaway?.price}
                  raffleimage={giveaway.raffle?.raffleimage}
                  eligeble={true}
                  oneOffPackage={giveaway.raffle?.name === "Vehicle" ? true : false}
                  onButton={() => {
                    handleButton({
                      id: giveaway?._id,
                      price: giveaway?.price,
                      name: giveaway?.name,
                    });
                  }}
                />
              ))}
              {giveaways.length > 8 &&
                (initialLength == 8 ? (
                  <button
                    onClick={() => handleSeeMore(true)}
                    className="mt-10 flex items-center justify-center mx-auto gap-2 "
                  >
                    See More <FaAngleDoubleDown />
                  </button>
                ) : (
                  <button
                    onClick={() => handleSeeMore(false)}
                    className="mt-10 flex items-center justify-center mx-auto gap-2"
                  >
                    See Less <FaAngleDoubleUp />
                  </button>
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2 pt-12">
              <MdOutlineDoNotDisturbOff className="w-12 h-12 2xl:w-12 2xl:h-12 special:w-24 special:h-24" />
              <p className="font-bold text-2xl 2xl:text-2xl special:text-6xl">
                No More Giveaways
              </p>
            </div>
          )} */}
          {selectPayment && (
            <SelectRafflePaymentMethod
              onClose={() => setSelectPayment(false)}
              userId={valUser.uid}
              giveawayId={selectGiveawayId}
              price={price}
              name={selectGiveawayName}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OngoingGiveaways;