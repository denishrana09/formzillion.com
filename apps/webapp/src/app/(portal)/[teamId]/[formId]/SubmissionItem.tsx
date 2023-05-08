import React, { useState } from "react";
import { getTimeAgo } from "@/utils/timeAgo";
import { ChatBubbleBottomCenterIcon, ClockIcon, EnvelopeIcon, UserCircleIcon } from "@heroicons/react/24/solid";


export default function SubmissionItem({ submission, isChecked, setCheckedIds }: any) {
  const [change, setChange] = useState(false);
    const [showMore, setShowMore] = useState(false);

  const {
    fields = {},
    country = "",
    createdAt,
    ip,
    isSpam = false,
    id,
  } = submission || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChange(e.target.checked);
    setCheckedIds(id);
  };

  const [firstName, lastName] = submission.fields.name.split(" ");
    const name = `${firstName.charAt(0)}${lastName.charAt(0)}`;


  return (
    <>
      <div className="broder-[#444444] border dark:bg-black py-[30px] px-[22px] dark:text-white grid grid-cols-8 mb-4">
        <div className="col-span-3 flex gap-3">
          <input
            type="checkbox"
            id="submission"
            name="submission"
            value=""
            checked={change || isChecked}
            onChange={(id) => handleChange(id)}
          />
          <div className="space-y-2">
            {/* getting 2 times formsubmission data */}
            {/* {Object.keys(fields).map((key, idx) => {
              return (
                <div key={idx}>
                  <p>{startCase(key)}</p>
                  <p>{fields[key]}</p>
                </div>
              );
            })} */}
            <div className="flex justify-between space-y-2">
              <div>
                <span className="inline-flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gray-800 mt-4">
                  <span className="text-lg font-medium leading-none text-white">
                    {name}
                  </span>
                </span>
              </div>
              <div className="space-y-2">
                <div className=" ml-4 flex flex-row space-x-2">
                  <UserCircleIcon className="h-[20px] w-[18px] text-gray-500 " />
                  <p>{fields.name}</p>
                </div>

                <div className="ml-4 flex flex-row space-x-2">
                  <EnvelopeIcon className="h-[20px] w-[18px] text-gray-500 " />
                  <p className="text-sm">{fields.email}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row space-x-2 ml-16  text-sm ">
              <ClockIcon className="h-[20px] w-[18px] text-gray-500" />
              <p>Submitted {getTimeAgo(createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="col-span-3 space-y-2 flex justify-center ml-36">
          <div>
            <div className="flex flex-row space-x-2">
              <ChatBubbleBottomCenterIcon className="h-[20px] w-[18px] text-gray-500" />
              <p className="text-black text-md">Message</p>
            </div>

            <div>
              {showMore
                ? fields.message
                : `${fields.message.substring(0, 100)}...`}
              <div>
                <button
                  className="btn underline"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Show less" : "Show more"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 text-end relative">
          <div className="w-full mb-3">
            <span className="bg-orange-500 px-4 py-2 text-sm text-gray-100">
              New
            </span>
            {isSpam && (
              <p className="absolute right-0 bottom-0 border py-1 px-2.5 border-red-700 ">
                Spam
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
