import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GoldCard from "../../components/GoldCard/GoldCard";
import TopNav from "../../components/TopNav/TopNav";
import MainCar from "../../assets/images/MainCar.png";
import Transfer from "../../assets/images/transaction/transfer-outlined.png";
import Save from "../../assets/images/transaction/save-outlined.png";
import Slip from "../../assets/images/transaction/slip-outlined.png";
import "react-calendar/dist/Calendar.css";
import Profit from "../../assets/images/transaction/profit.png";
import ShoppingBag from "../../assets/images/transaction/shopping-bag.png";
import axios from "axios";
import { validateCurrentUser } from "../../utils/validateuser";
import Stripe from "../../assets/images/transaction/strip.png";
import Fund from "../../assets/images/transaction/fund.png";
import Sub from "../../assets/images/transaction/sub.png";
import Balance from "../../assets/images/transaction/balance.png";
import ItemLoader from "../../components/Loader/ItemLoader";
import FundTransferForm from "../../components/fundTransfer/FundTransferForm";
import BG from "../../assets/images/HomesideBg.png";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Line from "../../assets/images/line.png";
import NewBalance from "../../assets/images/new/balance.png";
import NewEarning from "../../assets/images/new/earnings.png";
import NewPurcahase from "../../assets/images/new/purchase.png";
import EntriPagination from "../../components/MyEntries/EntriPagination";

const recodeCount = 10;

const Transaction = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const [wallet, setWallet] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionsCom, setTransactionsCom] = useState(true);
  const [initialShow, setInitShow] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [valUser, setValUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    currentUserValidation();
  }, []);

  const handleSeeMore = (show) => {
    if (show) {
      setInitShow(transactions.length);
    } else {
      setInitShow(5);
    }
  };

  const currentUserValidation = async () => {
    const validator = await validateCurrentUser();
    if (validator.validatorBl) {
      console.log("Session OK", validator.user);
      setValUser(validator.user);
      getEarning(validator.user.uid);
      getTransactionsFunction(validator.user.uid, 1, 10);
    } else {
      navigate("/login");
    }
  };

  const getEarning = async (valuid) => {
    await axios
      .get(`${import.meta.env.VITE_SERVER_API}/getPointBalances?uid=${valuid}`)
      .then((response) => {
        console.log(response.data);
        setWallet(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const getTransactionsFunction = async (valuid, from, to) => {
    setLoading(true);
    await axios
      .get(
        `${
          import.meta.env.VITE_SERVER_API
        }/getTransactions?uid=${valuid}&from=${from}&to=${to}`
      )
      .then((response) => {
        console.log(response.data.data);
        setTransactions(response?.data?.data);
        const onePage = Math.ceil(response.data.count / recodeCount);
        setPageCount(onePage);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const pagination = (no) => {
    const fromNo = recodeCount * (no - 1) + 1;
    const toNo = recodeCount * no;
    setCurrentPage(no);
    getTransactionsFunction(valUser.uid, fromNo, toNo);
  };

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };
  

  

  // const startDateObject = new Date(transactions?.startfrom);

  // const options = { year: "numeric", month: "numeric", day: "numeric" };
  // const startDate = startDateObject.toLocaleString("en-US", options);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  const handleDateChange = (newDate) => {
    // Handle date change logic here
    setDate(newDate);
  };

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartOptions = {
    series: [1, 1, 1],
    options: {
      chart: {
        type: "donut",
      },
      legend: {
        position: "bottom",
      },
      labels: [
        "Card Transactions",
        "Digital Transactions",
        "Earning Transactions",
      ],
    },
  };

  const handleButtonClick = () => {
    setTransactionsCom(false);
  };

  const handleBackClick = () => {
    setTransactionsCom(true);
  };

  const chartWidth = windowWidth > 700 ? 400 : windowWidth - 80;

  return (
    <div className="flex relative min-h-screen w-full overflow-hidden">
      <div className="xl:flex xl:flex-row flex-col xl:justify-between px-3 special:px-12 2xl:px-8 flex-1 xl:gap-8 special:gap-16 2xl:gap-12 space-y-4 xl:space-y-0">
        <img
          src={BG}
          alt=""
          className="absolute right-0 -z-10 top-40 w-72 xl:w-96 md:w-96 special:w-1/4 2xl:w-1/4 special:top-60 opacity-60 2xl:top-40"
        />
        <div className="flex flex-col space-y-4 flex-1 special:space-y-8 2xl:space-y-6">
          {transactionsCom ? (
            <div className="block xl:hidden space-y-4">
              <div className="bg-black rounded-b-3xl py-4">
                <TopNav textColor={"white"} />
                <div className="pt-10">
                  <img className="w-full" src={MainCar} alt="main" />
                </div>
              </div>

              <div className="flex md:flex-col flex-col space-y-2 md:space-y-0 gap-2">
                <div className="w-full">
                  <GoldCard />
                </div>
                <div
                  className="bg-black rounded-2xl text-white text-center py-2 text-sm  hover:bg-black/75 cursor-pointer hidden"
                  onClick={handleButtonClick}
                >
                  <p>Fund transfer</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="block xl:hidden pb-12">
              <TopNav color="black" />
            </div>
          )}

          <div className="flex flex-col space-y-1">
            <p className="font-extrabold text-xl md:text-xl xl:text-xl 2xl:text-2xl special:text-4xl">
              Your Balance
            </p>
            {/* <p className="font-extrabold md:text-2xl xl:text-3xl 2xl:text-3xl special:text-4xl">
                ${valUser.balance}
              </p> */}
          </div>
          <div className="flex xl:flex-row md:flex-row flex-col gap-1 xl:gap-2 md:gap-6 2xl:text-2xl special:text-3xl">
            <div
              className="from-[#005887] gap-4 to-black bg-gradient-to-r justify-between items-center rounded-2xl py-2 xl:px-3 md:px-4 flex flex-1 flex-row px-2 cursor-default hover:bg-green-600/75"
              style={{}}
            >
              <img
                src={NewBalance}
                alt="balance"
                className="w-6 h-6 md:h-20 md:w-20 xl:h-12 xl:w-12 max-w-screen-sm"
              />
              <div className="flex flex-col w-full">
                <p className="text-white text-lg md:text-xl xl:text-xl 2xl:text-2xl special:text-3xl">
                  ${Math.floor(wallet.balance * 100) / 100 || "0.00"}
                </p>
                <p className="text-white text-sm md:text-lg xl:text-sm 2xl:text-xl special:text-2xl">
                  Balance
                </p>
              </div>
            </div>
            <div className="from-[#008767] to-black bg-gradient-to-r justify-between items-center rounded-2xl gap-4 py-2 xl:px-4 md:px-4 flex flex-1 flex-row px-2 cursor-default hover:bg-[#52A0DF]/75">
              <img
                src={NewEarning}
                alt=""
                className="w-6 h-6 md:h-20 md:w-20 xl:h-12 xl:w-12 max-w-screen-sm"
              />
              <div className="flex flex-col w-full">
                <p className="text-white text-lg md:text-xl xl:text-xl 2xl:text-2xl special:text-3xl">
                  $
                  {wallet.earning
                    ? Math.floor(wallet.earning * 100) / 100 || "0.00"
                    : "0.00"}
                </p>
                <p className="text-white text-sm md:text-lg xl:text-sm 2xl:text-xl special:text-2xl">
                  Earning
                </p>
              </div>
            </div>

            <div className="from-[#CBAD11] to-black bg-gradient-to-r justify-between items-center rounded-2xl gap-4 py-2 xl:px-3 md:px-4 flex flex-1 flex-row px-2 cursor-default hover:bg-[#DF7E59]/75">
              <img
                src={NewPurcahase}
                alt=""
                className="w-6 h-6 md:h-20 md:w-20 xl:h-12 xl:w-12 max-w-screen-sm"
              />
              <div className="flex flex-col w-full">
                <p className="text-white text-lg md:text-xl xl:text-xl 2xl:text-2xl special:text-3xl">
                  $
                  {wallet.purchase
                    ? Math.floor(wallet.purchase * 100) / 100 || "0.00"
                    : "0.00"}
                </p>
                <p className="text-white text-sm md:text-lg xl:text-sm 2xl:text-xl special:text-2xl">
                  Purchase
                </p>
              </div>
            </div>
          </div>
          {transactionsCom ? (
            ""
          ) : (
            <div className="block xl:hidden flex-col space-y-2">
              <IoArrowBackCircleOutline
                className="hover:scale-110 text-2xl"
                onClick={handleBackClick}
              />

              <FundTransferForm />
            </div>
          )}
          {/* <div className="flex flex-col">
              <div style={{ position: "relative" }}>
                <div
                  className="flex flex-row items-center justify-center gap-2 mb-5"
                  onClick={toggleCalendar}
                >
                  <p className="text-center uppercase md:text-xl xl:text-lg 2xl:text-2xl special:text-3xl">
                    DECEMBER 2023
                  </p>
                  <img src={Arrow} alt="" />
                </div>
                {isCalendarVisible && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%", // Center vertically
                      left: "50%", // Center horizontally
                      transform: "translate(-50%, -50%)", // Center both vertically and horizontally
                      zIndex: 100,
               
                    }}
                  >
                    <Calendar onChange={handleDateChange} value={date} />
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <Chart
                  options={chartOptions.options}
                  series={chartOptions.series}
                  type="donut"
                  width={chartWidth}
                  font="18px"
                />
              </div>
            </div> */}
          <div className="flex flex-col space-y-4 flex-1 pt-12">
            {/* <div className="flex flex-row justify-between items-center">
                <p className="text-[#EC2639] md:text-xl xl:text-lg 2xl:text-2xl special:text-3xl">
                  Transactions History
                </p>
             
              </div> */}
            <div className="flex justify-between items-center">
              <p className="font-bold text-xl md:text-xl xl:text-lg 2xl:text-2xl special:text-3xl">
                Transactions
              </p>
              {/* <p className="text-md md:text-xl xl:text-lg 2xl:text-2xl special:text-3xl">See All</p> */}
              {/* <div className="relative inline-block text-left">
                <button
                  onClick={handleToggle}
                  type="button"
                  className="inline-flex  items-center justify-center w-full px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring focus:border-gray-300 relative"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  <span className="mr-4 text-sm md:text-sm xl:text-lg 2xl:text-lg special:text-2xl">
                    {selectedOption || "See All"}
                  </span>
                  <span
                    className={`transform ${isOpen ? "-rotate-180" : "rotate-0"
                      }`}
                  >
                    &#9660;
                  </span>
                </button>

                {isOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <div
                        onClick={() => handleSelect("Card Transaction")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        role="menuitem"
                      >
                        Card Transaction
                      </div>
                      <div
                        onClick={() => handleSelect("Digital Transaction")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        role="menuitem"
                      >
                        Digital Transaction
                      </div>
                      <div
                        onClick={() => handleSelect("Earning Transaction")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        role="menuitem"
                      >
                        Earning Transaction
                      </div>
                    </div>
                  </div>
                )}
              </div> */}
            </div>
            {loading ? (
              <div className="flex justify-center">
                <ItemLoader />
              </div>
            ) : transactions.length > 0 ? (
              <div className="flex flex-col space-y-1">
                {transactions?.map((transaction, key) => (
                  <div
                    key={key}
                    className="flex flex-row items-center justify-between hover:bg-[#F5F5F5] p-2 rounded-lg cursor-default"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex flex-col">
                        <p className="text-black capitalize">
                          {transaction.mode}
                        </p>
                        <div className="flex flex-col">
                          <p className={`capitalize text-xs text-gray-400`}>
                            {new Date(transaction.startfrom).toLocaleString(
                              "en-GB",
                              options
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div>
                        <p
                          className={`text-${
                            transaction.transactiontype == "DR"
                              ? "red-400"
                              : "green-400"
                          } text-lg`}
                        >
                          ${Math.floor(transaction.amount * 100) / 100}
                        </p>
                      </div>
                      <p className="capitalize text-xs text-gray-400 text-end">
                        {transaction.type}
                      </p>
                    </div>
                  </div>
                ))}
                <EntriPagination
                  setCurrentPage={pagination}
                  buttonClick={pagination}
                  pageCount={pageCount}
                  currentPage={currentPage}
                />
              </div>
            ) : (
              <p className="flex justify-center text-lg text-black">
                No transactions data
              </p>
            )}

            {/* Display Card Purchase */}
            {selectedOption === "Card Transaction" && (
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <img
                    src={Transfer}
                    alt=""
                    className="special:w-20 special:h-20 xl:w-14 xl:h-14 md:w-12 md:h-12 w-8 h-8"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm md:text-lg xl:text-xl 2xl:text-2xl special:text-3xl">
                      Car Purchase
                    </p>
                    <p className="text-xs md:text-xl xl:text-lg 2xl:text-xl special:text-2xl">
                      Auto Loan
                    </p>
                  </div>
                </div>
                <p className="text-[#4FC8E8] font-semibold xl:text-lg 2xl:text-2xl special:text-4xl">
                  -$ 250
                </p>
              </div>
            )}

            {/* Display House Purchase */}
            {selectedOption === "Digital Transaction" && (
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <img
                    src={Slip}
                    alt=""
                    className="special:w-20 special:h-20 xl:w-14 xl:h-14 md:w-12 md:h-12 w-8 h-8"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm md:text-lg xl:text-xl 2xl:text-2xl special:text-3xl">
                      Houses Purchase
                    </p>
                    <p className="text-xs md:text-xl xl:text-lg 2xl:text-xl special:text-2xl">
                      Airbnb home
                    </p>
                  </div>
                </div>
                <p className="text-[#059713] font-semibold xl:text-lg 2xl:text-2xl special:text-4xl">
                  $ 2250
                </p>
              </div>
            )}

            {/* Display Transport */}
            {selectedOption === "Earning Transaction" && (
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2 items-center">
                  <img
                    src={Save}
                    alt=""
                    className="special:w-20 special:h-20 xl:w-14 xl:h-14 md:w-12 md:h-12 w-8 h-8"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm md:text-lg xl:text-xl 2xl:text-2xl special:text-3xl">
                      Transport
                    </p>
                    <p className="text-xs md:text-xl xl:text-lg 2xl:text-xl special:text-2xl">
                      Uber pathao
                    </p>
                  </div>
                </div>
                <p className="text-[#059713] font-semibold xl:text-lg 2xl:text-2xl special:text-4xl">
                  $ 250
                </p>
              </div>
            )}
          </div>
        </div>

        {transactionsCom ? (
          <div className="flex-col flex-1 space-y-4 hidden xl:flex">
            <div className="space-y-4">
              <div className="bg-black rounded-b-3xl py-4">
                <TopNav textColor={"white"} />
                <div className="pt-10">
                  <motion.img
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 80, opacity: 1 }}
                    transition={{ type: "tween", duration: 1, delay: 1 }}
                    className="w-3/4"
                    src={MainCar}
                    alt="main"
                  />
                </div>
              </div>
              <div className="w-full">
                <GoldCard />
              </div>
              <div
                className="bg-black rounded-2xl hidden text-white text-center py-2 special:py-4 2xl:text-lg text-sm special:text-2xl hover:bg-black/75 cursor-pointer"
                onClick={handleButtonClick}
              >
                <p>Fund transfer</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden xl:flex flex-1 flex-col pt-6">
            <div className="pb-12">
              <TopNav />
            </div>
            <img src={Line} alt="" />
            <div className="flex flex-col">
              <IoArrowBackCircleOutline
                className="text-2xl 2xl:text-4xl special:text-6xl hover:scale-110"
                onClick={handleBackClick}
              />
              <FundTransferForm />
            </div>
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Transaction;
