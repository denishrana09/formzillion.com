"use client";

import { useState } from "react";
import { isEmpty } from "lodash";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Button } from "@/ui/Buttons/SButton";
import Sort from "@/ui/Sort";
import EmptySubmissions from "./EmptySubmissions";
import SubmissionItem from "./SubmissionItem";
import TestFormModal from "./settings/TestFormModal";
import { FaSync } from "react-icons/fa";

export default function FormsOverviewPage({
  TotalPages,
  formId,
  formSubmissions,
}: any) {
  const [showTestFormModal, setShowTestFormModal] = useState(false);
  const toggleTestFormModal = () => setShowTestFormModal(!showTestFormModal);
  const parsedFormSubmissions = JSON.parse(formSubmissions);
  const [submissions, setSubmissions] = useState(parsedFormSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("name");
  const [isChecked, setIsChecked] = useState(false);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedIds, setCheckedIds] = useState([]);
  const [count,setCount]=useState();
  const [total, setTotal] = useState();
  const [selectedTab, setSelectedTab] = useState("All");


  const handleSpamClick = async (isSpam: any) => {
    setSelectedTab(isSpam ? "Spam" : "Verified");
    const status = isSpam ? "spam" : "verify";
    if (!isEmpty(parsedFormSubmissions)) {
      const filteredSubmissions = parsedFormSubmissions.filter(
        (submission: { isSpam: any }) => {
          return submission.isSpam === isSpam
        }
      );
      const count=filteredSubmissions.length;
      setCount(count);
      setSubmissions(filteredSubmissions);
    }
    setFilter(status);
  };
  const handleSpam = async (isSpam: any) => {
    setSelectedTab(isSpam ? "Spam" : "Verified");
    const status = isSpam ? "spam" : "verify";
    if (!isEmpty(parsedFormSubmissions)) {
      const filteredSubmissions = parsedFormSubmissions.filter(
        (submission: { isSpam: any }) => {
          return submission.isSpam === isSpam;
        }
      );
      const TotalCount = filteredSubmissions.length;
      setTotal(TotalCount);
      setSubmissions(filteredSubmissions);
    }
    setFilter(status);
  };

  const filteredData = submissions.filter((obj: any) => {
    if (filterType === "name") {
      return obj.fields.name?.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterType === "email") {
      return obj.fields.email?.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return false;
    }
  });

  const handleSubmission = () => {
    setSelectedTab("All");
    const isSpam = "all";
    if (!isEmpty(parsedFormSubmissions)) {
      setSubmissions(parsedFormSubmissions);
    }
    setFilter(isSpam);
  };
  const refreshPage = () => {
    window.location.reload();
  };


  const itemsPerPage = 10;
  const totalPages = Math.ceil(TotalPages / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentData = filteredData.slice(start, end);
  return (
    <>
      <div className="flex space-x-8  divide-gray-300 dark:divide-gray-700 px-1 bg-white pt-4 dark:bg-black">
        <div className=" space-y-3 mt-5 cursor-pointer w-[10%]  text-start  ">
          <div
            id="All"
            className={`${
              selectedTab === "All" ? "bg-slate-100 text-gray-600" : ""
            } hover:bg-slate-100 p-2 hover:text-gray-600 dark:hover:bg-slate-300 transition-all rounded flex justify-between`}
            onClick={() => handleSubmission()}
          >
            All
            <div>{parsedFormSubmissions.length}</div>
          </div>
          <div
            id="Spam"
            className={`${
              selectedTab === "Spam" ? "bg-slate-100 text-gray-600" : ""
            } hover:bg-slate-100 p-2 hover:text-gray-600 dark:hover:bg-slate-300 transition-all rounded flex justify-between`}
            onClick={() => handleSpamClick(true)}
          >
            Spam
            <div>{count}</div>
          </div>
          <div
            id="Verified"
            className={`${
              selectedTab === "Verified" ? "bg-slate-100 text-gray-600" : ""
            } hover:bg-slate-100 p-2 hover:text-gray-600 dark:hover:bg-slate-300 transition-all rounded flex justify-between`}
            onClick={() => handleSpam(false)}
          >
            Verified
            <div>{total}</div>
          </div>
        </div>
        <div className="w-[85%] mt-5  shadow dark:bg-black border border-gray-300 dark:border-gray-700 p-4">
          {submissions?.length > 0 && (
            <div className="flex justify-between  ">
              <div className=" flex items-center">
                <Sort
                  formSubmissions={formSubmissions}
                  checkedIds={checkedIds}
                  setIsChecked={setIsChecked}
                  toggleTestFormModal={toggleTestFormModal}
                  setSubmissions={setSubmissions}
                  isChecked={isChecked}
                  submissions={submissions}
                  setSearchTerm={setSearchTerm}
                  setFilterType={setFilterType}
                />
              </div>
            </div>
          )}
          <div className="text-end mt-6 mb-2 flex justify-between">
            <button onClick={refreshPage}>
              <FaSync
                size={14}
                className="text-gray-500 dark:text-gray-300 h-5 w-7 ml-2"
              />
            </button>
            {submissions.length > 10 && (
              <div className="flex justify-end dark:text-white">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <IoIosArrowBack />
                </button>
                <div className="mx-2 rounded-lg border-2 px-2  font-medium dark:border-gray-700">
                  {currentPage} / {totalPages}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            )}
          </div>

          {submissions.length <= 0 &&
            filter !== "spam" &&
            filter !== "verify" && (
              <div className="mb-2 flex flex-row justify-end items-center mt-4">
                {isEmpty(submissions) && (
                  <Button
                    className=" bg-black text-white hover:bg-black hover:text-white"
                    onClick={toggleTestFormModal}
                  >
                    Mock Submission
                  </Button>
                )}
              </div>
            )}
          {!isEmpty(currentData) ? (
            currentData?.map((submission: any, idx: any) => {
              return (
                <SubmissionItem
                  key={idx}
                  submission={submission}
                  isChecked={isChecked}
                  setCheckedIds={setCheckedIds}
                />
              );
            })
          ) : (
            <EmptySubmissions formId={formId} />
          )}
          {showTestFormModal && (
            <TestFormModal
              formId={formId}
              isOpen={showTestFormModal}
              closeModal={toggleTestFormModal}
            />
          )}
        </div>
      </div>
    </>
  );
}
