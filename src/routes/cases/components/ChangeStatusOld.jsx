// src/routes/cases/components/ChangeStatus.jsx
import { useContext, useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { NotificationService } from "../../../api/NotificationService";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { IoIosClose } from "react-icons/io";
import Lightbox from "yet-another-react-lightbox";
import { CaseService } from "../../../api/CaseService";
import ReactQuill from "react-quill";
import { TeamService } from "../../../api/TeamsService";
import { MdOutlineFileUpload } from "react-icons/md";
import "react-quill/dist/quill.snow.css";
import axios from 'axios';
import "yet-another-react-lightbox/styles.css";
import { AuthContext } from "../../../components/authcontext/AuthContext";

const api_url = process.env.REACT_APP_API_URL;


const ChangeStatus = ({ id }) => {
  const [userAssignId,setUserAssignId]=useState('')
  const [loading, setLoading] = useState(false);
  const [ploading, setpLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stlFiles, setStlFiles] = useState(null);
  const [fileName, setFileName] = useState('');
  const [shareLink,setShareLink]=useState('')
  const [casee, setCasee] = useState({});
  const [caseId, setCaseId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [QaId, setQaId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [comments, setComments] = useState("");
  const [plannerId, setPlannerId] = useState("");
  const [PPId, setPPId] = useState("");
  const [caseStatus, setCaseStatus] = useState("");
  const { currentUser,isReadNot,updateIsReadNot } = useContext(AuthContext);
  const userType = currentUser?.roles[0]?.name;
  const permissions = currentUser?.permissions;
  const [casetab, setCasetab] = useState("plans");
  const navigate = useNavigate();
  const handleComment = (content, delta, source, editor) => {
    setComments(content);
  };
  //hanlde file upload

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFileName(file.name)
    setStlFiles(file);
  };
  //get case details
  const getCaseDetailFunction = async (idd) => {
    try {
      const result = await CaseService.getCaseDetail(idd);

      if (result?.data?.status == 200) {
        setCasee(result?.data?.data);
        setTeamId(result?.data?.data?.users?.team_id);
        setCaseId(result?.data?.data?.id);
        setPlannerId(result?.data?.data?.planner_id);
        setPPId(result?.data?.data?.post_processing_id);

        setDoctorId(result?.data?.data?.created_user?.id);
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
    getCaseDetailFunction(id);
  }, [id]);

  //get team detail function
  // team detail for qa id
  const getTeamDetail = async (idd) => {
    try {
      const result = await TeamService.getTeamUsers(idd);

      if (result?.data?.status == 200) {
        // Find user with role_name "quality_check"
        const userWithQualityCheckRole = result?.data?.data?.users.find(
          (user) => user.role_name === "quality_check"
        );

        // Get the ID of the user
        const qauser = userWithQualityCheckRole
          ? userWithQualityCheckRole.id
          : null;

        setQaId(qauser);
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
    getTeamDetail(teamId);
  }, [teamId]);

  // change status function

  

  const changeStatusFunction = async () => {
    if (caseStatus == "3" && !QaId) {
      toast.error("Qa not found in this team", {
        autoClose: 1500,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setLoading(true);
      try {
        const formData = new FormData();
        if (caseId) {
          formData.append("p_case_id", caseId);
        }


       
        if (caseStatus) {
          formData.append("case_status", caseStatus);
        }
        if (caseStatus == "3") {
         
          formData.append("user_id", QaId);
        }
        if (caseStatus == "4") {
          formData.append("user_id", plannerId);
          
        }
        if (caseStatus == "5") {
          formData.append("user_id", plannerId);
          
        }
        if (caseStatus == "6") {
          formData.append("user_id", plannerId);
          
        }
        if (caseStatus == "7") {
          formData.append("user_id", doctorId);
          
        }
        if (caseStatus == "8") {
          formData.append("user_id", plannerId);
         
        }
        if (caseStatus == "9") {
          formData.append("user_id", doctorId);
          
        }
        
        if (caseStatus == "10") {
          formData.append("user_id", doctorId);
          
        }
        if (caseStatus == "11") {
          formData.append("user_id", doctorId);
          
        }
        if (caseStatus == "12") {
          formData.append("user_id", doctorId);
          
        }
        if (caseStatus == "15") {
          formData.append("user_id", doctorId);
          setUserAssignId(doctorId)
        }

        if (caseStatus == "13") {
          formData.append("user_id", PPId);
          setUserAssignId(PPId)
        }
        if (caseStatus == "14") {
          formData.append("user_id", PPId);
          setUserAssignId(PPId)
        }
        if (caseStatus == "16") {
          formData.append("user_id", doctorId);
          setUserAssignId(doctorId)
        }
        if (caseStatus == "17") {
          formData.append("user_id", PPId);
          setUserAssignId(PPId)
        }
        if (caseStatus == "18") {
          formData.append("user_id", doctorId);
          setUserAssignId(doctorId)
        }
        if (comments) {
          formData.append("comments", comments);
        }

        const result = await CaseService.updateCaseStatus(
          formData,
          (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        );
        if (result?.data?.status == 200) {
          toast.success(result?.data?.message, {
            autoClose: 1500,
            pauseOnHover: true,
            draggable: true,
          });
          // if (caseStatus == "3") {
            
          //   createNotification("Case in Quality Check","Case Ready for QC By Treatment Planner",QaId)
            
          // }
          // if (caseStatus == "4") {
          //   createNotification("Need more info","Need more info from client",doctorId)
          // }
          if (caseStatus == "5") {
            createNotification("Case updated","Case Updated by Ortho",plannerId)
          }
          // if (caseStatus == "6") {
          //   createNotification("Case Rejected","Case Rejected by Quality Check department",plannerId)
          // }
          // if (caseStatus == "7") {
          //   createNotification("Case Approved by QC","Case Approved by Quality Check department",doctorId)
          // }
          if (caseStatus == "8") {
            createNotification("Need Modifications","Need Case Modifications by Client",plannerId)
          }
          if (caseStatus == "9") {
            createNotification("Pending Step files","Client Asked for Step files",doctorId)
          }
          
          if (caseStatus == "10") {
            createNotification("Pending Container files","Client Asked for Container files",doctorId)
          }
          // if (caseStatus == "11") {
          //   createNotification("STL FIles Ready","STL Files Ready by Post processing department",doctorId)
          // }
          // if (caseStatus == "12") {
            
          //     createNotification("Container Files Ready","Container Files Ready by Post processing department",doctorId)
            
          // }
         
  
          if (caseStatus == "13") {
            createNotification("Need Stl files modifications","Client Asked for Stl files modifications",PPId)
          }
          if (caseStatus == "14") {
            createNotification("Need Container Files modifications","Client Asked for Container Files modifications",PPId)
          }
          if (caseStatus == "15") {
            createNotification("Pending Direct Printing Files","Client Asked for Direct Printing Files",doctorId)
          }
          // if (caseStatus == "16") {
          //   createNotification("Direct Printing files Ready","Direct Printing files Ready by Post processing department",doctorId)
          // }
          if (caseStatus == "17") {
            createNotification("Need Direct Printing files modifications","Client Asked for Direct Printing files modifications",PPId)
          }
          if (caseStatus == "18") {
            createNotification("Case completed","Case completed By Client",doctorId)
          }
          // setTimeout(() => {
          //   navigate("/cases");
          // }, 1500);
        } else {
          toast.error(result?.data?.message, {
            autoClose: 1500,
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
    }
  };

  //upload stle files
 


const CHUNK_SIZE = 1 * 1024 * 1024; // 2MB per chunk


 
  const [uploadProgress, setUploadProgress] = useState(0);


  const uploadChunk = async (chunk, index, totalChunks) => {
    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('currentChunk', index);
    formData.append('totalChunks', totalChunks);
    formData.append('fileName', stlFiles.name);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    await axios.post(`${api_url}/api/upload-chunk`,formData, config).then(response => {
        
    });
  };

  // const handleSubmit = async () => {
 

  //   if (!stlFiles) {
  //     toast.error("Please upload stl files folder", {
  //       autoClose: 1500,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   } else if (!caseStatus) {
  //     toast.error("Please Select status", {
  //       autoClose: 1500,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   }
  //   else {
  //     setpLoading(true)
  //     const totalChunks = Math.ceil(stlFiles.size / CHUNK_SIZE);
  //     for (let i = 0; i < totalChunks; i++) {
  //       const start = i * CHUNK_SIZE;
  //       const end = Math.min(start + CHUNK_SIZE, stlFiles.size);
  //       const chunk = stlFiles.slice(start, end);
  
  //       await uploadChunk(chunk, i + 1, totalChunks);
  
  //       setUploadProgress(Math.round(((i + 1) / totalChunks) * 100));
  //     }
  
  //     await finalizeUpload();
  //     setpLoading(false)
  
  //     toast.success("Upload completed", {
  //       autoClose: 1500,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   }

    
  // };

  // const finalizeUpload = async () => {

  //   const totalChunks = Math.ceil(stlFiles.size / CHUNK_SIZE);
    
  //   const formData = new FormData();
  //   formData.append('fileName', stlFiles.name);
  //   formData.append('totalChunks', totalChunks);

  //   const config = {
  //       headers: {
  //           'content-type': 'multipart/form-data'
  //       }
  //   }

  //   await axios.post('https://admin.patientalignerplan.com/api/finalize-upload',formData, config).then(response => {
  //       if(response?.status == 200){
  //         uploadStlFunction()
  //       }
        
  //   });
  // };


  




  const uploadStlFunction = async () => {
    if (!caseStatus) {
      toast.error("Please Select status", {
        autoClose: 1500,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setLoading(true);
      try {
        const formData = new FormData();
        if (caseId) {
          formData.append("p_case_id", caseId);
        }
        if (shareLink) {
          formData.append("stl_file_by_post_processing_we_transfer_link", shareLink);
        }
        if (doctorId) {
          formData.append("user_id", doctorId);
        }
        if (caseStatus) {
          formData.append("case_status", caseStatus);
        }
        if (comments) {
          formData.append("comments", comments);
        }
        if (stlFiles) {
          formData.append("stl_file_by_post_processing", stlFiles);
        }

        const result = await CaseService.updateCaseStatus(
          formData,
          (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        );

        if (result?.data?.status == 200) {
          toast.success(result?.data?.message, {
            autoClose: 1500,
            pauseOnHover: true,
            draggable: true,
          });

          if (caseStatus == "11") {
            createNotification("STL FIles Ready","STL Files Ready by Post processing department",doctorId)
          }
          if (caseStatus == "12") {
            
              createNotification("Container Files Ready","Container Files Ready by Post processing department",doctorId)
            
          }
          if (caseStatus == "16") {
            
            createNotification("Direct Priniting Files Ready","Direct Priniting Files Ready by Post processing department",doctorId)
          
        }
          // setTimeout(() => {
          //   navigate("/cases");
          // }, 1500);
        } else {
          toast.error(result?.data?.message, {
            autoClose: 1500,
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
    }
  };

   //Create case notification
   const createNotification = async (title,body,uid) => {
    
  
    try {
      const formData = new FormData()
     
       
       

       
       
        
          formData.append('title',title)
          formData.append('body',body)
          
            formData.append('url_action',id)
          
          if(uid){
            formData.append('user_id',uid)
          }
          
         
       
        const result = await NotificationService.addNotification(formData);
     
        if(result){
          updateIsReadNot(!isReadNot)
        //  toast.success(result?.data?.message, {
        //   autoClose: 1000,
        //   pauseOnHover: true,
        //   draggable: true,
          
        // });
        setTimeout(()=>{
          navigate('/cases')
        },1300)
          
        } 
        else {
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
     
      
    }
    finally {
      setLoading(false)
    }
  };
  return (
    <div className="users-wrapper patinet-info">
     
     {ploading &&  <div className="loader-parent">
        
        <div className="porgress-bar-custom-container">
          <div
            className="porgress-bar-custom-bar"
            style={{ width: `${uploadProgress}%` }}
          ></div>
       
        <div className="textt">{uploadProgress}%</div>
      </div>
    </div>}
    
      {loading && (
        <div className="loader-parent">
        
            <div className="porgress-bar-custom-container">
              <div
                className="porgress-bar-custom-bar"
                style={{ width: `${progress}%` }}
              ></div>
           
            <div className="textt">{progress}%</div>
          </div>
        </div>
      )}
      {/* <ToastContainer /> */}
      <div className="change-status-wrapper">
        {(casee?.status == "9" || casee?.status == "10" || casee?.status == "13" || casee?.status == "14" || casee?.status == "15" || casee?.status == "17") &&
        (currentUser?.role_name == "post_processing" || currentUser?.role_name == "super_admin") ? (
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="case-status-main">
              Case Status :   {casee?.status == '1' ? 'New Case' : casee?.status == '2' ? "In Planning" : casee?.status == '3' ? "Ready for QA" : casee?.status == '4' ? "Need More Info" : casee?.status == '5' ? "Case updated by ortho" : casee?.status == '6' ? "Rejected By QA" : casee?.status == '7' ? "Pending Ortho Check" : casee?.status == '8' ? "Need Modifications" : casee?.status == '9' ? "Pending Step Files" : casee?.status == '10' ? "Pending Container files" : casee?.status == '11' ?  "Stl files ready" : casee?.status == '12' ?  "Container files ready" : casee?.status == '13' ? "Need Stl File Modifications" : casee?.status == '14' ? "Need Container File Modifications" : casee?.status == '15' ? "Pending direct printing files" :  casee?.status == '16' ? 'Direct printing files ready': casee?.status == '17' ? 'Need direct printing files Modifications' : casee?.status == '18' ? 'Case completed': ''}
              </div>
              <div className="form-group  mb-4">
                <div className="form-group mb-4">
                  <label htmlFor="">Upload Files </label>
                  <div className="file-wrapper">
              <span>{fileName ? fileName : 'Upload File here'}</span>
              <MdOutlineFileUpload />
                  <input
                    type="file"
                    name=""
                    className="input"
                    onChange={handleFile}
                  />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Paste  share link here </label>

                  <input
                    type="text"
                   value={shareLink}
                    className="input"
                    onChange={(e)=>setShareLink(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Select case status </label>

                  <select
                    className="input"
                    value={caseStatus}
                    onChange={(e) => setCaseStatus(e.target.value)}
                  >
                    <option value="">Select</option>
                    {(permissions?.includes("upload-stl-file") &&  (casee?.status == '9' || casee?.status == "13")) && (
                      <option value="11">Ready Stl Files</option>
                    )}
                     {(permissions?.includes("upload-container-file") && (casee?.status == '10' || casee?.status == "14") ) && (
                      <option value="12">Ready Container Files</option>
                    )}
                    {(permissions?.includes("upload-stl-file") && (casee?.status == '15' || casee?.status == "17") ) && (
                      <option value="16">Ready direct printing files</option>
                    )}
                  </select>
                </div>

                <div className=" mb-4">
                  <div className="form-group">
                    <label htmlFor="">Comments </label>

                    <ReactQuill value={comments} onChange={handleComment} />
                  </div>
                </div>

                <div className="d-flex my-3">
                  <button className="button" onClick={uploadStlFunction}>
                     { (casee?.status == '9' || casee?.status == "13") ? 'Upload Stl Files'  : (casee?.status == '10' || casee?.status == "14") ? 'Upload Container Files' : (casee?.status == '15' || casee?.status == "17") ? 'Upload direct printing files' : '' }
                  </button>
                </div>
              
              </div>
            </div>
          </div>
        ) : (
          (casee?.status !== '1' && casee?.status !== '18') && <div className="row">
          <div className="col-12 col-md-8">
         
          <div className="case-status-main">
              Case Status :   {casee?.status == '1' ? 'New Case' : casee?.status == '2' ? "In Planning" : casee?.status == '3' ? "Ready for QA" : casee?.status == '4' ? "Need More Info" : casee?.status == '5' ? "Case updated by ortho" : casee?.status == '6' ? "Rejected By QA" : casee?.status == '7' ? "Pending Ortho Check" : casee?.status == '8' ? "Need Modifications" : casee?.status == '9' ? "Pending Step Files" : casee?.status == '10' ? "Pending Container files" : casee?.status == '11' ?  "Stl files ready" : casee?.status == '12' ?  "Container files ready" : casee?.status == '13' ? "Need Stl File Modifications" : casee?.status == '14' ? "Need Container File Modifications" : casee?.status == '15' ? "Pending direct printing files" :  casee?.status == '16' ? 'Direct printing files ready': casee?.status == '17' ? 'Need direct printing files Modifications' : casee?.status == '18' ? 'Case completed': ''}
              </div>
            <div className="form-group  mb-4">
              <label htmlFor="">Select case status  </label>

              <select
                className="input"
                value={caseStatus}
                onChange={(e) => setCaseStatus(e.target.value)}
              >
                <option value="">Select</option>
                {casee?.status != "3" &&
                  permissions?.includes("ready-for-qa") && (
                    <option value="3">Ready For QA</option>
                  )}
                {casee?.status != "4" &&
                  permissions?.includes("need-more-case-info") && (
                    <option value="4">Need More Info</option>
                  )}
                  {(casee?.status != "5" && casee?.status == "4") &&
                  permissions?.includes("update-case-info") && (
                    <option value="5">Update case</option>
                  )}
                {casee?.status != "6" &&
                  permissions?.includes("reject-planner-case") && (
                    <option value="6">Reject Planner Case</option>
                  )}
                {casee?.status != "7" &&
                  permissions?.includes("approve-planner-case") && (
                    <option value="7">Approve Treatement plan</option>
                  )}

                {(casee?.status != "8" || casee?.status == "7" ) &&
                   
                  permissions?.includes("need-case-modification") && (
                    <option value="8">Need Modifications</option>
                  )}
                {(casee?.status != "9" || casee?.status == "7" ) &&
                  // casee?.status == "7" &&
                  permissions?.includes("approve-case-by-ortho") && (
                    <option value="9"> Need Step Files</option>
                    
                  )}
                    {(casee?.status != "10" || casee?.status == "7" ) &&
                  // casee?.status == "7" &&
                  permissions?.includes("approve-case-by-ortho") && (
                    <option value="10">Need Container Files</option>
                    
                  )}
                   {(casee?.status != "15" || casee?.status == "7" ) &&
                  // casee?.status == "7" &&
                  permissions?.includes("approve-case-by-ortho") && (
                    <option value="15">Need direct printing files</option>
                    
                  )}
                {/* {(casee?.status != '9' && permissions?.includes('stl-files-ready')) &&   <option value="9">STL Files Ready</option> } */}
                {casee?.status != "13" &&
                 ( casee?.status == "11") &&
                  permissions?.includes("case-step-files-modification") && (
                    <option value="13">Need Stl Files Modification </option>
                  )}
                  {casee?.status != "14" &&
                 ( casee?.status == "12") &&
                  permissions?.includes("case-container-files-modification") && (
                    <option value="14"> Need Continer Files Modification</option>
                  )}
                  {casee?.status != "17" &&
                 ( casee?.status == "16") &&
                permissions?.includes("case-step-files-modification") && (
                    <option value="17"> Need direct printing files Modification</option>
                  )}
                {casee?.status != "18" &&
                  ( casee?.status == "11" || casee?.status == "12" || casee?.status == "16" ) &&
                  permissions?.includes("case-complete") && (
                    <option value="18">Complete Case</option>
                  )}
              </select>
              {caseStatus && (
                <div className=" mb-4">
                  <div className="form-group">
                    <label htmlFor="">Comments </label>

                    <ReactQuill value={comments} onChange={handleComment} />
                  </div>
                </div>
              )}
              <div className="d-flex my-3">
                {caseStatus && (
                  <button className="button" onClick={changeStatusFunction}>
                    Change Status
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
     
    </div>
  );
};

export default ChangeStatus;
