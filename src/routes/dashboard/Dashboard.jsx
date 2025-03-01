// src/routes/dashboard/Dashboard.jsx
import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MonthlyBar from "./MonthlyBar";
import WeeklyBar from "./WeeklyBar";

import ClientModifications from "./ClientModifications";
import LineChart from "./LineChart";
import { FaRegEye } from "react-icons/fa";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { AuthContext } from "../../components/authcontext/AuthContext";
import { CaseService } from "../../api/CaseService";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ClientCasesMonthly from "./ClientCasesMonthly";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ClientCasesWeekly from "./ClientCasesWeekly";
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({});
  const { currentUser, updateUser } = useContext(AuthContext);
  const userType = currentUser?.role_name;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  //get case details
  const getDashboardData = async () => {
    try {
      const result = await CaseService.getDashboardStats();

      if (result?.data?.status == 200) {
        setDashboardStats(result?.data?.data);
      } else {
        if (result?.data?.message == "Unauthenticated.") {
          navigate("/login");
        }
        toast.error(result?.data?.message, {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error?.result?.data?.errors[0], {
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div className="dashboard-container">
      {loading && (
        <div className="loader-parent">
          <div className="_loader"></div>
        </div>
      )}
      {/* <ToastContainer /> */}

      <div className="small-boxes-wrapper">
        {/* =========== All cases ========= */}
        {(userType == "super_admin" ||
         
          userType == "case_submission") && (
            <Link className="small-box" to={`/cases/`}>
              <div className="flex-between">
                <div className="title">All cases </div>
              </div>
              <div className="flex-between">
                <div className="number">
                  {parseInt(dashboardStats?.cases_count)}
                </div>
                <div className="percentage">
                  
                    <BsArrowUpRight/>
                
                </div>
              </div>
            </Link>
          )}
        {/* =========== New cases  ========= */}
        <Link className="small-box" to={`/cases/1`}>
          <div className="flex-between">
            <div className="title">New Cases </div>
          </div>
          <div className="flex-between">
            <div className="number">
              {parseInt(dashboardStats?.cases_1_count)}
            </div>
            <div className="percentage">
              {parseInt(dashboardStats?.cases_1_count) > 0 &&
                dashboardStats?.cases_count > 0
                ? (
                  (parseInt(dashboardStats?.cases_1_count) /
                    dashboardStats?.cases_count) *
                  100
                ).toFixed(2)
                : "0"}{" "}
              %{" "}
              {(parseInt(dashboardStats?.cases_1_count) /
                dashboardStats?.cases_count) *
                100 >=
                50 ? (
                <BsArrowUpRight />
              ) : (
                <BsArrowDownRight />
              )}
            </div>
          </div>
        </Link>

        {/* =========== In planning  ========= */}
        {(userType == "super_admin" ||
          userType == "client" || userType == "sub_client" ||
          userType == "case_submission" ) && (
            <Link className="small-box" to={`/cases/2`}>
              <div className="flex-between">
                <div className="title">In Planning </div>
              </div>
              <div className="flex-between">
                <div className="number">
                  {parseInt(dashboardStats?.cases_2_count)}
                </div>
                <div className="percentage">
                  {parseInt(dashboardStats?.cases_2_count) > 0 &&
                    dashboardStats?.cases_count > 0
                    ? (
                      (parseInt(dashboardStats?.cases_2_count) /
                        dashboardStats?.cases_count) *
                      100
                    ).toFixed(2)
                    : "0"}{" "}
                  %{" "}
                  {(parseInt(dashboardStats?.cases_2_count) /
                    dashboardStats?.cases_count) *
                    100 >=
                    50 ? (
                    <BsArrowUpRight />
                  ) : (
                    <BsArrowDownRight />
                  )}
                </div>
              </div>
            </Link>
          )}
        {/* =========== In Quality check  ========= */}
        {(userType == "super_admin" ||
          userType == "case_submission" || userType == "quality_check" || userType == "treatment_planner") && (
            <Link className="small-box" to={`/cases/3`}>
              <div className="flex-between">
                <div className="title">In Quality Check </div>
              </div>
              <div className="flex-between">
                <div className="number">
                  {parseInt(dashboardStats?.cases_3_count)}
                </div>
                <div className="percentage">
                  {parseInt(dashboardStats?.cases_3_count) > 0 &&
                    dashboardStats?.cases_count > 0
                    ? (
                      (parseInt(dashboardStats?.cases_3_count) /
                        dashboardStats?.cases_count) *
                      100
                    ).toFixed(2)
                    : "0"}{" "}
                  %{" "}
                  {(parseInt(dashboardStats?.cases_3_count) /
                    dashboardStats?.cases_count) *
                    100 >=
                    50 ? (
                    <BsArrowUpRight />
                  ) : (
                    <BsArrowDownRight />
                  )}
                </div>
              </div>
            </Link>
          )}


        {/* =========== Rejected by QA  ========= */}
        {(userType == "super_admin" || userType == "treatment_planner" || userType == "quality_check") && (
          <Link className="small-box" to={`/cases/6`}>
            <div className="flex-between">
              <div className="title">QC Rejected  </div>
            </div>
            <div className="flex-between">
              <div className="number">
                {parseInt(dashboardStats?.cases_6_count)}
              </div>
              <div className="percentage">
                {parseInt(dashboardStats?.cases_6_count) > 0 &&
                  dashboardStats?.cases_count > 0
                  ? (
                    (parseInt(dashboardStats?.cases_6_count) /
                      dashboardStats?.cases_count) *
                    100
                  ).toFixed(2)
                  : "0"}{" "}
                %{" "}
                {(parseInt(dashboardStats?.cases_6_count) /
                  dashboardStats?.cases_count) *
                  100 >=
                  50 ? (
                  <BsArrowUpRight />
                ) : (
                  <BsArrowDownRight />
                )}
              </div>
            </div>
          </Link>
        )}


        {/* =========== Need More info  ========= */}
        {(userType == "super_admin" || userType == "client" || userType == "sub_client" || userType == "case_submission" || userType == "treatment_planner") && (
          <Link className="small-box" to={`/cases/4`}>
            <div className="flex-between">
              <div className="title">On Hold </div>
            </div>
            <div className="flex-between">
              <div className="number">
                {parseInt(dashboardStats?.cases_4_count)}
              </div>
              <div className="percentage">
                {parseInt(dashboardStats?.cases_4_count) > 0 &&
                  dashboardStats?.cases_count > 0
                  ? (
                    (parseInt(dashboardStats?.cases_4_count) /
                      dashboardStats?.cases_count) *
                    100
                  ).toFixed(2)
                  : "0"}{" "}
                %{" "}
                {(parseInt(dashboardStats?.cases_4_count) /
                  dashboardStats?.cases_count) *
                  100 >=
                  50 ? (
                  <BsArrowUpRight />
                ) : (
                  <BsArrowDownRight />
                )}
              </div>
            </div>
          </Link>
        )}

         {/* =========== Pending Ortho Check  ========= */}
         {(userType == "super_admin" || userType == "client" || userType == "sub_client" || userType == "case_submission" || userType == "quality_check") && (
          <Link className="small-box" to={`/cases/7`}>
            <div className="flex-between">
              <div className="title"> {userType == "quality_check" ? 'Approved by QC' : 'Pending Ortho Check'}  </div>
            </div>
            <div className="flex-between">
              <div className="number">{dashboardStats?.cases_7_count}</div>
              <div className="percentage">
                {dashboardStats?.cases_7_count > 0 &&
                  dashboardStats?.cases_count > 0
                  ? (
                    (dashboardStats?.cases_7_count /
                      dashboardStats?.cases_count) *
                    100
                  ).toFixed(2)
                  : "0"}
                %
                {(parseInt(dashboardStats?.cases_7_count) /
                  dashboardStats?.cases_count) *
                  100 >=
                  50 ? (
                  <BsArrowUpRight />
                ) : (
                  <BsArrowDownRight />
                )}
              </div>
            </div>
          </Link>
        )}
        {/* =========== Need case modifications  ========= */}
        {(userType == "super_admin" ||
          userType == "case_submission" || userType == "treatment_planner" || userType == "quality_check" || userType == "client" || userType == "sub_client" ) && (
            <Link className="small-box" to={`/cases/8`}>
              <div className="flex-between">
                <div className="title">Need Case modifications </div>
              </div>
              <div className="flex-between">
                <div className="number">
                  {parseInt(dashboardStats?.cases_8_count)}
                </div>
                <div className="percentage">
                  {parseInt(dashboardStats?.cases_8_count) > 0 &&
                    dashboardStats?.cases_count > 0
                    ? (
                      (parseInt(dashboardStats?.cases_8_count) /
                        dashboardStats?.cases_count) *
                      100
                    ).toFixed(2)
                    : "0"}{" "}
                  %{" "}
                  {(parseInt(dashboardStats?.cases_8_count) /
                    dashboardStats?.cases_count) *
                    100 >=
                    50 ? (
                    <BsArrowUpRight />
                  ) : (
                    <BsArrowDownRight />
                  )}
                </div>
              </div>
            </Link>
          )}
       
           {/* ==============>>>>> files reuqired status <<<<<===================== */}

        {/* =========== Step files ready  ========= */}
        {(userType == "super_admin" ||
          userType == "case_submission" ||
          userType == "post_processing" || userType == "client" || userType == "sub_client") && (
            <Link className="small-box" to={`/cases/11`}>
              <div className="flex-between">
                <div className="title">Step-Files Ready</div>
              </div>
              <div className="flex-between">
                <div className="number">
                  {parseInt(dashboardStats?.cases_11_count)}
                </div>
                <div className="percentage">
                  {parseInt(dashboardStats?.cases_11_count) > 0 &&
                    dashboardStats?.cases_count > 0
                    ? (
                      (parseInt(dashboardStats?.cases_11_count) /
                        dashboardStats?.cases_count) *
                      100
                    ).toFixed(2)
                    : "0"}{" "}
                  %{" "}
                  {(parseInt(dashboardStats?.cases_11_count) /
                    dashboardStats?.cases_count) *
                    100 >=
                    50 ? (
                    <BsArrowUpRight />
                  ) : (
                    <BsArrowDownRight />
                  )}
                </div>
              </div>
            </Link>
          )}
      



        {/* =========== Pending Container files ========= */}
        {(userType == "super_admin" ||
          userType == "case_submission" || userType == "client" || userType == "sub_client" ||
          userType == "post_processing") && (
            <Link className="small-box" to={`/cases/10`}>
              <div className="flex-between">
                <div className="title">Pending Container files</div>
              </div>
              <div className="flex-between">
                <div className="number">
                  {parseInt(dashboardStats?.cases_10_count)}
                </div>
                <div className="percentage">
                  {parseInt(dashboardStats?.cases_10_count) > 0 &&
                    dashboardStats?.cases_count > 0
                    ? (
                      (parseInt(dashboardStats?.cases_10_count) /
                        dashboardStats?.cases_count) *
                      100
                    ).toFixed(2)
                    : "0"}{" "}
                  %{" "}
                  {(parseInt(dashboardStats?.cases_10_count) /
                    dashboardStats?.cases_count) *
                    100 >=
                    50 ? (
                    <BsArrowUpRight />
                  ) : (
                    <BsArrowDownRight />
                  )}
                </div>
              </div>
            </Link>
          )}


        {/* =========== Pending Direct printing files ========= */}
        {(userType == "super_admin" ||
          userType == "case_submission" || userType == "client" || userType == "sub_client" ||
          userType == "post_processing") && (
            <Link className="small-box" to={`/cases/15`}>
              <div className="flex-between">
                <div className="title">Pending Direct printing files</div>
              </div>
              <div className="flex-between">
                <div className="number">
                  {parseInt(dashboardStats?.cases_15_count)}
                </div>
                <div className="percentage">
                  {parseInt(dashboardStats?.cases_15_count) > 0 &&
                    dashboardStats?.cases_count > 0
                    ? (
                      (parseInt(dashboardStats?.cases_15_count) /
                        dashboardStats?.cases_count) *
                      100
                    ).toFixed(2)
                    : "0"}{" "}
                  %{" "}
                  {(parseInt(dashboardStats?.cases_15_count) /
                    dashboardStats?.cases_count) *
                    100 >=
                    50 ? (
                    <BsArrowUpRight />
                  ) : (
                    <BsArrowDownRight />
                  )}
                </div>
              </div>
            </Link>
          )}
         {/* ==================>>> Files ready status <<<<====================== */}
  {/* =========== Container Files Ready  ========= */}
  {(userType == "super_admin" ||
          userType == "case_submission" || userType == "post_processing" || userType == "client" || userType == "sub_client") && (
          <Link className="small-box" to={`/cases/12`}>
            <div className="flex-between">
              <div className="title">Container Files Ready</div>
            </div>
            <div className="flex-between">
              <div className="number">
                {parseInt(dashboardStats?.cases_12_count)}
              </div>
              <div className="percentage">
                {parseInt(dashboardStats?.cases_12_count) > 0 &&
                  dashboardStats?.cases_count > 0
                  ? (
                    (parseInt(dashboardStats?.cases_12_count) /
                      dashboardStats?.cases_count) *
                    100
                  ).toFixed(2)
                  : "0"}{" "}
                %{" "}
                {(parseInt(dashboardStats?.cases_12_count) /
                  dashboardStats?.cases_count) *
                  100 >=
                  50 ? (
                  <BsArrowUpRight />
                ) : (
                  <BsArrowDownRight />
                )}
              </div>
            </div>
          </Link>
        )}



        {/* =========== Direct printing files ready ========= */}
        {(userType == "super_admin" ||
          userType == "case_submission" || userType == "post_processing" || userType == "client" || userType == "sub_client") && (
          <Link className="small-box" to={`/cases/16`}>
            <div className="flex-between">
              <div className="title">Direct printing files ready</div>
            </div>
            <div className="flex-between">
              <div className="number">
                {parseInt(dashboardStats?.cases_16_count)}
              </div>
              <div className="percentage">
                {parseInt(dashboardStats?.cases_16_count) > 0 &&
                  dashboardStats?.cases_count > 0
                  ? (
                    (parseInt(dashboardStats?.cases_16_count) /
                      dashboardStats?.cases_count) *
                    100
                  ).toFixed(2)
                  : "0"}{" "}
                %{" "}
                {(parseInt(dashboardStats?.cases_16_count) /
                  dashboardStats?.cases_count) *
                  100 >=
                  50 ? (
                  <BsArrowUpRight />
                ) : (
                  <BsArrowDownRight />
                )}
              </div>
            </div>
          </Link>
        )}




        {/* =========== Pending Step files ========= */}
        {(userType == "super_admin" ||
          userType == "case_submission" || userType == "client" || userType == "sub_client" ||
          userType == "post_processing") && (
            <Link className="small-box" to={`/cases/9`}>
              <div className="flex-between">
                <div className="title">Pending Step files</div>
              </div>
              <div className="flex-between">
                <div className="number">
                  {parseInt(dashboardStats?.cases_9_count)}
                </div>
                <div className="percentage">
                  {parseInt(dashboardStats?.cases_9_count) > 0 &&
                    dashboardStats?.cases_count > 0
                    ? (
                      (parseInt(dashboardStats?.cases_9_count) /
                        dashboardStats?.cases_count) *
                      100
                    ).toFixed(2)
                    : "0"}{" "}
                  %{" "}
                  {(parseInt(dashboardStats?.cases_9_count) /
                    dashboardStats?.cases_count) *
                    100 >=
                    50 ? (
                    <BsArrowUpRight />
                  ) : (
                    <BsArrowDownRight />
                  )}
                </div>
              </div>
            </Link>
          )}



          {/* ===============>>>>>>>> Modifications for files <<<<<<<<<<<<=============== */}
            {/* =========== Need Stl File Modification  ========= */}
        {(userType == "super_admin" ||
          userType == "case_submission" || userType == "post_processing" || userType == "client" || userType == "sub_client") && (
          <Link className="small-box" to={`/cases/13`}>
            <div className="flex-between">
              <div className="title">Need Stl File Modification</div>
            </div>
            <div className="flex-between">
              <div className="number">
                {parseInt(dashboardStats?.cases_13_count)}
              </div>
              <div className="percentage">
                {parseInt(dashboardStats?.cases_13_count) > 0 &&
                  dashboardStats?.cases_count > 0
                  ? (
                    (parseInt(dashboardStats?.cases_13_count) /
                      dashboardStats?.cases_count) *
                    100
                  ).toFixed(2)
                  : "0"}{" "}
                %{" "}
                {(parseInt(dashboardStats?.cases_13_count) /
                  dashboardStats?.cases_count) *
                  100 >=
                  50 ? (
                  <BsArrowUpRight />
                ) : (
                  <BsArrowDownRight />
                )}
              </div>
            </div>
          </Link>
        )}



        {/* =========== Need Container File Modifications ========= */}
        {(userType == "super_admin" ||
          userType == "case_submission" || userType == "post_processing" || userType == "client" || userType == "sub_client") && (
          <Link className="small-box" to={`/cases/14`}>
            <div className="flex-between">
              <div className="title">Need Container File Modifications</div>
            </div>
            <div className="flex-between">
              <div className="number">
                {parseInt(dashboardStats?.cases_14_count)}
              </div>
              <div className="percentage">
                {parseInt(dashboardStats?.cases_14_count) > 0 &&
                  dashboardStats?.cases_count > 0
                  ? (
                    (parseInt(dashboardStats?.cases_14_count) /
                      dashboardStats?.cases_count) *
                    100
                  ).toFixed(2)
                  : "0"}{" "}
                %{" "}
                {(parseInt(dashboardStats?.cases_14_count) /
                  dashboardStats?.cases_count) *
                  100 >=
                  50 ? (
                  <BsArrowUpRight />
                ) : (
                  <BsArrowDownRight />
                )}
              </div>
            </div>
          </Link>
        )}




      


      </div>
      <div className="row mb-4">
        <div className="col-12 col-md-6">
          <div className="title-grap">Daily Cases</div>
          <div className="chart-top">
            <WeeklyBar dashboard={dashboardStats} />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="title-grap">Monthly Cases</div>
          <div className="chart-top">
            <MonthlyBar dashboard={dashboardStats} />
          </div>
        </div>
      </div>
      {userType == "super_admin" && (
        <div className="row mb-4">
          <div className="col-12 col-md-7">
            <div className="title-grap">Clients Cases modifications ratio </div>
            <div className="chart-top">
              <ClientModifications dashboard={dashboardStats} />
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="title-grap">All cases modifications ratio</div>
            <div className="chart-top">
              <div className="over-all-stats-wrapper">
                <div className="parent-circle">
                  <CircularProgressbar
                    value={dashboardStats?.over_all_ratio_count?.toFixed(1)}
                    text={`${dashboardStats?.over_all_ratio_count?.toFixed(
                      1
                    )}%`}
                    styles={buildStyles({
                      // Customize the path color
                      pathColor: `#064469`,
                      // Customize the text color
                      textColor: "#064469",
                      // Customize the trail color (background)
                      trailColor: "#d6d6d6",
                      // Customize the background color
                      backgroundColor: "#3e98c7",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {userType == "super_admin" && (
        <div className="row mb-4">
          <div className="col-12 col-md-6">
            <div className="title-grap">Client Monthly Cases </div>
            <div className="chart-top">
              <ClientCasesMonthly dashboard={dashboardStats} />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="title-grap">Client Weekly Cases </div>
            <div className="chart-top">
              <ClientCasesWeekly dashboard={dashboardStats} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
