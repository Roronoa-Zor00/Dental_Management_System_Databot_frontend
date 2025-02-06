// src/routes/pending-approvals/ApprovalDetails.jsx
import React, { useEffect, useState } from "react";
import { MdApproval } from "react-icons/md";
import Dummy from "../../images/dummy.jpeg";


import { GoLink } from "react-icons/go";
import { CaseService } from "../../api/CaseService";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ApprovalDetail = () => {
   
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [approval, setApproval] = useState({});

  const api_url = process.env.REACT_APP_API_URL

  const getApprovalDetailFunction = async (id) => {
    try {
      const result = await CaseService.getPendingApprovalDetail(id);

      if (result?.data?.status == 200) {
        setApproval(result?.data?.data);
      } else {
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

const url ="https://file-examples.com/wp-content/storage/2017/10/file-sample_150kB.pdf"
  useEffect(() => {
    getApprovalDetailFunction(id);
  }, [id]);

  // Function to handle delete action

  return (
    <div className="users-wrapper">
      {loading && (
        <div className="loader-parent">
          <div className="_loader"></div>
        </div>
      )}
      <ToastContainer />

      <div className="user-details">
        <div className="row">
          <div className="col-6">
            <div className="text">
              <MdApproval />
              {approval?.status == "1" ? "Approved" : "Cancelled"}
            </div>
          </div>
          <div className="col-6">
            <div className="text">
              <GoLink /> 
              <a href={approval?.simulation_link_url} target="_blank" > Simulation Link </a>
              
            </div>
          </div>
        </div>

        

        <div className="text">
          <MdApproval />  <a href={`${api_url}/uploads/images/${approval?.ipr_chart}`} target="_blank" rel="noopener noreferrer">{`${api_url}/uploads/images/${approval?.ipr_chart}`}</a> 
        </div>

        <div className="comments_detaisl custom-text" dangerouslySetInnerHTML={{
                  __html: approval?.comments,
                }}>
         
        </div>
        <div style={{ height: '750px' }}>
       
       
    </div>
      </div>
    </div>
  );
};

export default ApprovalDetail;
