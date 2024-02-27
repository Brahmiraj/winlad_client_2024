import "./GoldCard.css";
import { useEffect, useState } from "react";
import { validateCurrentUser } from "../../utils/validateuser";
import { Link, useNavigate } from "react-router-dom";
import Cross from "../../assets/images/subcription/cross.png";
import SubBG from "../../assets/images/subBg.png";

const GoldCard = () => {
  const navigate = useNavigate();
  const [valUser, setValUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [subDate, setSubDate] = useState("");

  useEffect(() => {
    currentUserValidation();
  }, []);

  const currentUserValidation = async () => {
    const validator = await validateCurrentUser();
    if (validator.validatorBl) {
      console.log("Session OK", validator.user);
      setValUser(validator.user);
      setSubDate(valUser.transaction?.endfrom);
      setLoading(false);
    } else {
      navigate("/login");
      setLoading(false);
    }
  };

  const startDateObject = new Date(valUser?.startDate);
  const endDateObject = new Date(valUser?.expireDate);
  const trialEndDateObject = new Date(valUser?.trialend);
  const unsubObject = new Date(valUser.subscription?.cancledat);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "UTC",
  };

  const endDate = endDateObject.toLocaleString("en-GB", options);
  const startDate = startDateObject.toLocaleString("en-GB", options);
  const trialEndDate = trialEndDateObject.toLocaleString("en-GB", options);
  const unsubDate = unsubObject.toLocaleString("en-GB", options);

  return (
    <>
      {!loading &&
        (valUser?.subscription_status !== "noplan" ? (
          <div
            className={`relative border border-solid ${valUser.subscriptionPlan?.data?.name == "Black"
                ? "border-white"
                : "border-black"
              } overflow-hidden rounded-3xl flex flex-row w-full justify-between cursor-default`}
            // style={{ backgroundColor: valUser ? valUser.subscriptionPlan?.data?.color : "" }}
            style={{
              background: `linear-gradient(90deg, ${valUser._id ? valUser.subscriptionPlan?.data?.color : "white"
                } 0%, ${valUser._id
                  ? valUser.subscriptionPlan?.data?.colorFrom
                  : "white"
                } 100%)`,
            }}
          >
            {/* <div className="gold-card-inner-sec1"> */}
            <div className="flex flex-col pl-4 py-4">
              <span className="xl:text-4xl font-bold text-3xl 2xl:test-5xl special:text-7xl main-t">
                {valUser?.startDate && <p
                  className={`text-xs special:text-lg font-semibold ${valUser.subscriptionPlan?.data?.name == "Black"
                      ? "text-white"
                      : "text-black"
                    }`}
                >
                  <span>Member Since</span>&nbsp;{startDate}
                </p>
                }

                <p
                  className={`${valUser.subscriptionPlan?.data?.name == "Black"
                      ? "text-white"
                      : "text-black"
                    }`}
                >
                  {valUser.subscriptionPlan?.data?.name}
                </p>
                <span className="text-xs font-bold xl:text-xl 2xl:text-2xl special:text-3xl">
                  <p
                    className={`text-sm special:text-lg font-semibold ${valUser.subscriptionPlan?.data?.name == "Black"
                        ? "text-white"
                        : "text-black"
                      }`}
                  >
                    {valUser.trial && (
                      <>
                        <span>Trial Renews On</span>&nbsp;{trialEndDate}
                      </>
                    )}
                    {valUser.subscription_status === "unsubscribed" ? (
                      <>
                        <span className="font-bold hidden">
                          Current package unsubscribed on&nbsp;{unsubDate},
                        </span>
                        &nbsp;Subscription ends on&nbsp;
                        {endDate}
                      </>
                    ) : valUser.subscription_status === "expired" ? (
                      <>
                        <span>Expire Date On</span>&nbsp;
                        {endDate}
                      </>
                    ) : valUser.subscription_status === "active" ? (
                      <>
                        <span>Auto Renews On</span>&nbsp;
                        {endDate}
                      </>
                    ) : valUser.subscription_status === "noplan" ? (
                      <div className="flex flex-row gap-4 items-center justify-between rounded-lg w-full border-2 border-black py-2 px-4">
                        <img src={Cross} alt="" className="w-12" />
                        <p className="text-white 2xl:text-xl text-lg mbsmalltext">
                          Your subscription is currently inactive
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </p>
                </span>
              </span>
            </div>
            <div className="flex items-center">
              {valUser?.subscription_status !== "noplan" ? (
                valUser.subscription_status === "unsubscribed" ? (
                  <img src={SubBG} alt="" className="w-24 md:w-16" />
                ) : (
                  <img src={SubBG} alt="" className="" />
                )
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-4 items-center justify-between rounded-lg w-full border-2 border-black py-2 px-4">
            <img src={Cross} alt="" className="w-12" />
            <p className="text-black 2xl:text-xl text-lg">
              Your subscription is currently inactive
            </p>
          </div>
        ))}
    </>
  );
};

export default GoldCard;
