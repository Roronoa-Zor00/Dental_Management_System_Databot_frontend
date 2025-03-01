// src/routes/cases/CaseDetail.jsx
import React, { useEffect, useState, useContext } from "react";
import { FiEdit } from "react-icons/fi";
import Simulations from "./components/Simulations";
import ChangeStatus from "./components/ChangeStatus";
import { CiMobile4 } from "react-icons/ci";
import { NotificationService } from "../../api/NotificationService";
import { Link } from "react-router-dom";
import Dummy from "../../images/user.jpg";
import { MdOutlineAttachEmail } from "react-icons/md";
import { CiMedicalCase } from "react-icons/ci";
import { BiMaleFemale } from "react-icons/bi";
import { CaseService } from "../../api/CaseService";
import { TeamService } from "../../api/TeamsService";
import { MdElderlyWoman } from "react-icons/md";
import { SoftwareService } from "../../api/SoftwareService";
import { FaUserShield } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { StlViewer } from "react-stl-viewer";
import Lightbox from "yet-another-react-lightbox";
import { AiOutlineComment } from "react-icons/ai";
import lowerStl from '../../images/lowerstl.png'
import upperStl from '../../images/upperstl.png'
import bitescanStl from '../../images/bitescan.jpg'
import "yet-another-react-lightbox/styles.css";
import { AuthContext } from "../../components/authcontext/AuthContext";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { BsTags } from "react-icons/bs";


const CaseDetail = () => {
  const navigate = useNavigate();
  // const url ="https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"
  const [tab, setTab] = useState("patient-info");
  const [openImages, setOpenImages] = useState(false);
  const [imageSources, setImageSources] = useState([])
  const [openXrays, setOpenXrays] = useState(false);
  const [xraySources, setXraySources] = useState([])
  const { id } = useParams();
  const [progress, setProgress] = useState(0);
  const [plannerId, setPlannerId] = useState('')
  const [planners, setPlanners] = useState([])
  const [loading, setLoading] = useState(false);
  const [casee, setCasee] = useState({});
  const [lowerurl, setLowerUrl] = useState('')
  const [upperurl, setUpperUrl] = useState('')
  const [biteurl, setBiteUrl] = useState('')
  const [caseId, setCaseId] = useState('')
  const [caseIdn, setCaseIdn] = useState('')
  const [software, setSoftware] = useState('None');
  const [softwareId, setSoftwareId] = useState('');
  const [guid, setguid] = useState('')
  const { currentUser, isReadNot, updateIsReadNot } = useContext(AuthContext)
  const userType = currentUser?.role_name
  const createdId = currentUser?.id
  const permissions = currentUser?.permissions
  const style = {
    width: '100%',
    height: '100%', // Ensure it takes the full height of the viewport

  };

  const api_url = process.env.REACT_APP_API_URL

  const handleStlDownload = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.stl`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const formatString = (input) => {
    return input
      .split('_') // Split the string by underscores
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join the words with a space
  };
  // handle download all images
  const handleDownloadAllImages = async () => {
    const zip = new JSZip();

    // Add each image to the zip file
    await Promise.all(
      casee?.images?.map(async (img) => {
        const response = await fetch(`${api_url}/uploads/images/${img?.file_name}`);
        const blob = await response.blob();
        zip.file(img?.file_name, blob);
      })
    );

    // Generate the zip file and create a blob URL
    zip.generateAsync({ type: 'blob' })
      .then((zipBlob) => {
        saveAs(zipBlob, 'images.zip');
      })
      .catch((error) => {
        console.error('Error while generating zip file:', error);
      });
  };
  // handle download all images
  const handleDownloadAllXrays = async () => {
    const zip = new JSZip();

    // Add each image to the zip file
    await Promise.all(
      casee?.xrays?.map(async (img) => {
        const response = await fetch(`${api_url}/uploads/xrays/${img?.file_name}`);
        const blob = await response.blob();
        zip.file(img?.file_name, blob);
      })
    );

    // Generate the zip file and create a blob URL
    zip.generateAsync({ type: 'blob' })
      .then((zipBlob) => {
        saveAs(zipBlob, 'xrays.zip');
      })
      .catch((error) => {
        console.error('Error while generating zip file:', error);
      });
  };

  //get planners 
  const getPlannersApi = async (id) => {


    try {
      const result = await TeamService.getPlanners();



      if (result?.data?.status == 200) {

        setPlanners(result?.data?.data)


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
  useEffect(() => {
    getPlannersApi()
  }, [])
  //assign case to planner

  const assignCaseApi = async () => {

    setLoading(true)
    try {
      const formData = new FormData()
      if (caseIdn) {
        formData.append('p_case_id', caseIdn)
      }
      if (plannerId) {
        formData.append('user_id', plannerId)
      }
      if (casee?.status) {
        formData.append('p_case_status', casee?.status == '1' ? '2' : casee?.status)

      }
      const result = await CaseService.assignCase(formData);



      if (result?.data?.status == 200) {
        getCaseDetailFunction(id)
        createNotification("Case is Assigned", "Case is Assigned to Planner", plannerId)
        toast.success(result?.data?.message, {
          autoClose: 1500,
          pauseOnHover: true,
          draggable: true,

        });
        setTimeout(() => {
          navigate('/cases')
        }, 1500)



      }
      else {

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


    }
    finally {
      setLoading(false)
    }
  };

  //Create case notification
  const createNotification = async (title, body, userid) => {


    try {
      const formData = new FormData()







      formData.append('title', title)
      formData.append('body', body)

      formData.append('url_action', id)

      if (id) {
        formData.append('user_id', userid)
      }



      const result = await NotificationService.addNotification(formData);
      if (result?.data?.status == 200) {
        updateIsReadNot(!isReadNot)
        //  toast.success(result?.data?.message, {
        //   autoClose: 1000,
        //   pauseOnHover: true,
        //   draggable: true,

        // });
        setTimeout(() => {
          navigate('/cases')
        }, 1300)

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

  const fetchSoftwares = async (software_id) => {
    try {
      // Get all available softwares
      const software_list = await SoftwareService.getSoftwareDetail(software_id);
      // console.log(software_id);
      if (software_list?.data?.data) {
        // console.log(software_list?.data?.data.name);
        if (software_list?.data?.data.name) {
          setSoftware(software_list?.data?.data.name);
        }
      } else {
        toast.error("No software data found!", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Unable to load software data!", {
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  //get case details
  const getCaseDetailFunction = async (id) => {
    try {
      const result = await CaseService.getCaseDetail(id);

      if (result?.data?.status == 200) {
        console.log(result?.data?.data);
        setSoftwareId(result?.data?.data?.software_id)
        setCasee(result?.data?.data);
        setCaseId(result?.data?.data?.guid)
        setCaseIdn(result?.data?.data?.id)

        setUpperUrl(`${api_url}/uploads/stl/${result?.data?.data?.stl_upper_file}`)
        setLowerUrl(`${api_url}/uploads/stl/${result?.data?.data?.stl_lower_file}`)



        setBiteUrl(`${api_url}/uploads/stl/${result?.data?.data?.stl_byte_scan_file}`)

        setImageSources(result?.data?.data?.images?.map((img) => ({
          src: `${api_url}/uploads/images/${img?.file_name}`
        })));

        setXraySources(result?.data?.data?.xrays?.map((xray) => ({
          src: `${api_url}/uploads/xrays/${xray?.file_name}`
        })))

      }
      else {
        if (result?.data?.message == "Unauthenticated.") {
          navigate('/login')
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
    fetchSoftwares(softwareId)
  }, [softwareId]);
  //change status to submission

  useEffect(() => {
    getCaseDetailFunction(id)
  }, [id]);

  const updateStatusByClient = async (idd) => {
    if (!idd) {
      toast.error("Case not found", {
        autoClose: 1500,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setLoading(true);
      try {


        const result = await CaseService.updateCaseToSubmission(
          idd,
          (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        );

        if (result?.data?.status == 200) {
          createNotification("Case is confirmed by Client", "Subclient Case is sent to case submission", createdId)

          toast.success(result?.data?.message, {
            autoClose: 1500,
            pauseOnHover: true,
            draggable: true,
          });

          setTimeout(() => {
            navigate("/cases");
          }, 1500);
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

  // Timer function
  const endTime = new Date(new Date(casee?.start_date_time).getTime() + parseInt(casee?.expected_time) * 3600 * 1000).getTime();
  // Calculate the initial remaining time in seconds
  const calculateRemainingTime = () => {
    const now = new Date().getTime();
    const remainingTime = Math.max((endTime - now) / 1000, 0);
    return remainingTime;
  };
  const [timeRemaining, setTimeRemaining] = useState(calculateRemainingTime());

  useEffect(() => {
    const updateTimer = () => {
      setTimeRemaining(calculateRemainingTime());
    };

    // Initial call to set the correct remaining time
    updateTimer();

    const intervalId = setInterval(updateTimer, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [endTime]);
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    // return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    return { hrs: hrs.toString().padStart(2, '0'), mins: mins.toString().padStart(2, '0'), secs: secs.toString().padStart(2, '0') }
  };


  return (
    <div className="users-wrapper">
      {loading && (
        <div className="loader-parent">
          <div className="_loader"></div>
        </div>
      )}
      {/* <ToastContainer /> */}

      <div className="user-details">

        <div className="patinet-info">

          <div className="top-sticky-main">






            <div className="textt">
              <div className="info">
                Time left  <span className="userr"></span>
                <div className="time-left">
                  <span>{formatTime(timeRemaining).hrs}</span> : <span>{formatTime(timeRemaining).mins}</span> : <span>{formatTime(timeRemaining).secs}</span>
                </div>
              </div>
              {casee?.status == '1' ? <div className="info">
                Case is created by <span className="userr">{casee?.created_user?.username}</span>
              </div> : casee?.status == '2' ? <div className="info">
                Case is assigned to <span className="userr">{casee?.planner?.username}</span>
              </div> : casee?.status == '3' ? <div className="info">
                Case is assigned to <span className="userr">{casee?.qa?.username}</span> for QC
              </div> : casee?.status == '4' ? <div className="info">
                <span className="userr">{casee?.planner?.username}</span> Holds case
              </div> : casee?.status == '5' ? <div className="info">
                <span className="userr">{casee?.created_user?.username}</span> Updated the case
              </div> : casee?.status == '6' ? <div className="info">
                <span className="userr">{casee?.qa?.username}</span> Rejected the case
              </div> : casee?.status == '7' ? <div className="info">
                <span className="userr">{casee?.qa?.username}</span> Submitted case for ortho check
              </div> : casee?.status == '8' ? <div className="info">
                <span className="userr">{casee?.created_user?.username}</span> Asked modifications
              </div> : casee?.status == '9' ? <div className="info">
                <span className="userr">{casee?.created_user?.username}</span> Required stl files
              </div> : casee?.status == '10' ? <div className="info">
                <span className="userr">{casee?.created_user?.username}</span> Required container files
              </div> : casee?.status == '11' ? <div className="info">
                <span className="userr">{casee?.post_processing?.username}</span> uploaded stl files
              </div> : casee?.status == '12' ? <div className="info">
                <span className="userr">{casee?.post_processing?.username}</span> uploaded container files
              </div> : casee?.status == '13' ? <div className="info">
                <span className="userr">{casee?.created_user?.username}</span> Need stl files modifications
              </div> : casee?.status == '14' ? <div className="info">
                <span className="userr">{casee?.created_user?.username}</span> Need container files modifications
              </div> : casee?.status == '15' ? <div className="info">
                <span className="userr">{casee?.created_user?.username}</span> Marked case as completed
              </div> : ""}
            </div>




          </div>
          <div className="top-sticky mb-3">
            {/* {(casee.verified_by_client == '0' && casee.sub_client_id && casee.status == '1') && <div className="update-by-client form-wrapper">
              <button className="button" onClick={()=>updateStatusByClient(id)}>Send case to case submission </button>
            </div>} */}


            {permissions?.includes("patient-cases-case-assign-to") &&
              <div>
                {casee?.planner?.username && <div className="title mb-3">
                  This case is assigned to <span>{casee?.planner?.username}</span>
                </div>}
                <div className="title">
                  Assign cases
                </div>
                <div className="row ">
                  <div className="col-12">
                    <div className="form-group form-wrapper">
                      <label htmlFor="">Select Planner {casee?.status}</label>
                      <select className="input" value={plannerId} onChange={(e) => setPlannerId(e.target.value)}>
                        <option value="">Select planner</option>
                        {planners?.map((planer) => <option value={planer?.id}>{planer?.first_name} {planer?.last_name}</option>)}
                      </select>
                      <div className="d-flex my-3">
                        {plannerId && <button className="button" onClick={() => assignCaseApi()}>Assign now</button>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
            <ChangeStatus id={id} />
          </div>
          {
            ((casee?.status == '11' || casee?.status == '12' || casee?.status == '16') && <div className="check-stl-files">
              {casee?.stl_file_by_post_processing && <a className="button" href={`${api_url}/uploads/stl/${casee?.stl_file_by_post_processing}`} download={`${api_url}/uploads/stl/${casee?.stl_file_by_post_processing}`}>
                Download {casee?.status == '11' ? ' Stl Files' : casee?.status == '12' ? ' Container Files' : casee?.status == '16' ? 'Direct printing files' : ''}
              </a>}

              {casee?.stl_file_by_post_processing_we_transfer_link &&

                <>
                  <p>If you are facing problem downloadin file click  below button to get download link </p>
                  <p>
                    <a className="button" target="_link" href={casee?.stl_file_by_post_processing_we_transfer_link}>Download File by clicking this link</a>
                  </p></>
              }



            </div>)
          }

          <div>



            <div className="title">
              Patient info
            </div>
            <div className="row mb-4">
              <div className="col-12 col-md-6 col-lg-4 mb-3">
                <div className="item_flex">
                  <CiMedicalCase /> <span>{casee?.case_id}</span>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 mb-3">
                <div className="item_flex">
                  <FaUserShield /> <span>{casee?.name}</span>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 mb-3">
                <div className="item_flex">
                  <MdOutlineAttachEmail /> <span>{casee?.email}</span>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 mb-3">
                <div className="item_flex">
                  <BiMaleFemale /> <span>{casee?.gender}</span>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 mb-3">
                <div className="item_flex">
                  <MdElderlyWoman /> <span>{casee?.age} years old</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="item_flex">
                <strong>Case version </strong>: <span>{casee?.case_version}</span>
              </div>

            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="item_flex">
                <strong>Scan version </strong>: <span>{casee?.scan_version}</span>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="item_flex">
                <strong>Expected time </strong>: <span>{casee?.expected_time == '8' ? "Express setup delivery: 8 hrs" : casee?.expected_time == '24' ? 'Super Setup Delivery: 24 hrs' : casee?.expected_time == '48' ? 'Normal Setup Delivery: 48 hrs' : ''}</span>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="item_flex">
                <strong>Tooth label format </strong>: <span>{casee?.tooth_label_format}</span>
              </div>
            </div>

            {casee?.case_type && <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="item_flex">
                <strong>Case type: </strong> <span>{casee?.case_type}</span>
              </div>
            </div>}
            {casee?.arch && <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="item_flex">
                <strong>Arch: </strong> <span>{casee?.arch}</span>
              </div>
            </div>}
            {casee?.patient_location && <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="item_flex">
                <strong>Patient location: </strong> <span>{casee?.patient_location}</span>
              </div>
            </div>}
            {casee?.ipr && <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="item_flex">
                <strong>IPR: </strong> <span>{casee?.ipr}</span>
              </div>
            </div>}
            {casee?.extraction && <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="item_flex">
                <strong>Extraction: </strong> <span>{casee?.extraction}</span>
              </div>
            </div>}
            {casee?.attachments && <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="item_flex">
                <strong>Attachments: </strong> <span>{casee?.attachments}</span>
              </div>
            </div>}
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="item_flex">
                <strong>Software: </strong> <span>{software}</span>
              </div>
            </div>

          </div>
          <div>

            <div className="title">Cheif complaint</div>
            <div
              className="custom-text"
              dangerouslySetInnerHTML={{
                __html: casee?.chief_complaint,
              }}
            ></div>
            <div className="title">Treatment Plan</div>
            <div
              className="custom-text"
              dangerouslySetInnerHTML={{
                __html: casee?.treatment_plan,
              }}
            ></div>


          </div>



          <div>
            <Lightbox
              open={openImages}
              close={() => setOpenImages(false)}
              slides={imageSources}
            />
            <div className="title">Patient Images</div>
            {casee?.images?.length > 0 && <div className="buttons">
              <button className="button" onClick={() => setOpenImages(true)}>View  images</button>
              <button className="button" onClick={handleDownloadAllImages}>Download zip for case {casee?.name}</button>
            </div>}
            <div className="files-wrapper mb-4">
              {casee?.images?.map((img) => (
                <div className="image" key={img?.id} >
                  <img
                    src={`${api_url}/uploads/images/${img?.file_name}`}
                  />
                </div>
              ))}
            </div>
          </div>


          <div>
            <Lightbox
              open={openXrays}
              close={() => setOpenXrays(false)}
              slides={xraySources}
            />
            <div className="title">X-Ray Files</div>
            {casee?.xrays?.length > 0 && <div className="buttons">
              <button className="button" onClick={() => setOpenXrays(true)}>View  images</button>
              <button className="button" onClick={handleDownloadAllXrays}>Download zip for case {casee?.name}</button>
            </div>}
            <div className="files-wrapper mb-4">

              {casee?.xrays?.map((img) => (
                <div className="image" key={img?.id}>
                  <img
                    src={`${api_url}/uploads/xrays/${img?.file_name}`}
                  />
                </div>
              ))}
            </div>
          </div>


          <div className="mb-4">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="title mb-3">Stl Upper File</div>
                {upperurl && (
                  <div className="stl-main-viewr mb-5">
                    <img src={upperStl} alt="" />
                    {casee?.stl_upper_file && <button className="button" onClick={() => handleStlDownload(upperurl, 'upperstl')}>Download upper stl for case {casee?.name}</button>
                    }
                  </div>

                )}
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div className="title mb-3">Stl Lower File</div>
                {lowerurl && (
                  <div className="stl-main-viewr mb-5">
                    <img src={lowerStl} alt="" />
                    {casee?.stl_lower_file &&
                      <button className="button" onClick={() => handleStlDownload(lowerurl, 'lowerstl')}>Download lower stl for case {casee?.name}</button>
                    }
                  </div>


                )}
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div className="title mb-3">Stl BIte Scan File</div>
                {biteurl && (
                  <div className="stl-main-viewr mb-5">
                    {/* <StlViewer
                  style={style}
                  orbitControls
                  shadows
                  url={biteurl}
                /> */}
                    <img src={bitescanStl} alt="" />
                    {casee?.stl_byte_scan_file &&
                      <button className="button" onClick={() => handleStlDownload(biteurl, 'bitescanstl')}>Download bite scan stl for case {casee?.name}</button>
                    }
                  </div>

                )}
              </div>
            </div>





          </div>



          <Simulations caseId={caseId} />


          <div className="title">
            Case history
          </div>
          <div className="history-wrapper">
            {
              casee?.case_status_users?.map((cas) => (currentUser?.role_name == 'client' || currentUser?.role_name == 'sub_client') ? 

                <div className="single-case">
                  {
                    (cas?.case_status != 2 && cas?.case_status != 6 && cas?.case_status != 3) &&
                    <div className="image">
                      <BsTags />
                    </div>
                  }

                  {
                    (cas?.case_status != 2 && cas?.case_status != 6 && cas?.case_status != 3) && 
                    <div> 
                      <div className="header">
                        <div className="tit">
                          {cas?.case_status == '1' ? 'New Case' : cas?.case_status == '2' ? "In Planning" : cas?.case_status == '3' ? "Ready for QA" : cas?.case_status == '4' ? "Need More Info" : cas?.case_status == '5' ? "Case updated by ortho" : cas?.case_status == '6' ? "Rejected By QA" : cas?.case_status == '7' ? "Pending Ortho Check" : cas?.case_status == '8' ? "Need Modifications" : cas?.case_status == '9' ? "Pending Step Files" : cas?.case_status == '10' ? "Pending Container files" : cas?.case_status == '11' ? "Stl files ready" : cas?.case_status == '12' ? "Container files ready" : cas?.case_status == '13' ? "Need Stl File Modifications" : cas?.case_status == '14' ? "Need Container File Modifications" : cas?.case_status == '15' ? "Pending direct printing files" : cas?.case_status == '16' ? 'Direct printing files ready' : cas?.case_status == '17' ? 'Need direct printing files Modifications' : cas?.case_status == '18' ? 'Case completed' : ''}
                        </div>
                        <div className="sub_header">
                          <div className="inner">
                            <span className="label">Name:</span>
                            <span className="value">({cas.user_detail?.first_name} {cas.user_detail?.first_name})</span>
                          </div>
                          <div className="inner">
                            <span className="label">Role:</span>
                            <span className="value">({formatString(cas.user_detail?.role_name)})</span>
                          </div>
                        </div>
                        <div className="date">
                          {moment(cas.created_at).format('ddd, MMM DD YYYY')} :  {moment(cas.created_at).format('HH:mm:ss')}
                        </div>
                      </div>
                    </div>
                  }

                  <div className="bodyy">

                    <div className="profile mb-3">

                      {
                        (cas?.case_status != 2 && cas?.case_status != 6 && cas?.case_status != 3) && 
                        <img src={`${api_url}/uploads/${cas?.user_detail?.profile_pic}`} />
                      }

                      <div className="textt">
                        {
                          cas?.case_status == '1' ? 
                          <div className="info">
                            Case is created by 
                            <span className="userr">
                              {cas?.user_detail?.first_name} {cas?.user_detail?.last_name} 
                            </span>
                          </div> : 

                          cas?.case_status == '4' ? 
                          <div className="info">
                            <span className="userr"> 
                              {casee?.planner?.first_name} {casee?.planner?.lastt_name} 
                            </span> 
                            Holds case
                            {
                              cas?.cases_status_users_comments?.map((comnt) => 
                                <div className="comment">
                                  <div className="top">
                                    <div className="icon">
                                      <AiOutlineComment />  
                                    </div>
                                    <div className="date">
                                      {moment(comnt.created_at).format('ddd, MMM DD YYYY')} : {moment(comnt.created_at).format('HH:mm:ss')}
                                    </div>
                                  </div>
                                  <div className="custom-text comment-body" dangerouslySetInnerHTML={{__html: comnt?.comments,}}></div>
                                </div>
                              )
                            }
                          </div> : 

                          cas?.case_status == '5' ? 
                          <div className="info">
                            <span className="userr">
                              {casee?.created_user?.first_name} {casee?.created_user?.last_name}
                            </span> 
                            Updated the case
                            {
                              cas?.cases_status_users_comments?.map((comnt) => 
                                <div className="comment">
                                  <div className="top">
                                    <div className="icon">
                                      <AiOutlineComment />  
                                    </div>
                                    <div className="date">
                                      {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                                    </div>
                                  </div>
                                  <div className="custom-text comment-body" dangerouslySetInnerHTML={{html: comnt?.comments,}}></div>
                                </div>
                              )
                            }
                          </div> : 

                          cas?.case_status == '7' ? 
                          <div className="info">
                            <span className="userr">
                              {casee?.qa?.first_name} {casee?.qa?.last_name}
                            </span> 
                            Submitted case for ortho check
                            {
                              cas?.cases_status_users_comments?.map((comnt) => 
                                <div className="comment">
                                  <div className="top">
                                    <div className="icon">
                                      <AiOutlineComment />  
                                    </div>
                                    <div className="date">
                                      {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                                    </div>
                                  </div>
                                  <div className="custom-text comment-body" dangerouslySetInnerHTML={{__html: comnt?.comments,}}></div>
                                </div>
                              )
                            }
                          </div> : 

                          cas?.case_status == '8' ? 
                          <div className="info">
                            <span className="userr">
                              {casee?.created_user?.first_name} {casee?.created_user?.last_name}
                            </span> 
                            Asked modifications
                            {
                              cas?.cases_status_users_comments?.map((comnt) => 
                                <div className="comment">
                                  <div className="top">
                                    <div className="icon">
                                      <AiOutlineComment />  
                                    </div>
                                    <div className="date">
                                      {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                                    </div>
                                  </div>
                                  <div className="custom-text comment-body" dangerouslySetInnerHTML={{__html: comnt?.comments,}}></div>
                                </div>
                              )
                            }
                          </div> : 

                          cas?.case_status == '9' ? 
                          <div className="info">
                            <span className="userr">
                              {casee?.created_user?.first_name} {casee?.created_user?.last_name}
                            </span> 
                            Required stl files
                            {
                              cas?.cases_status_users_comments?.map((comnt) => 
                                <div className="comment">
                                  <div className="top">
                                    <div className="icon">
                                      <AiOutlineComment />  
                                    </div>
                                    <div className="date">
                                      {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                                    </div>
                                  </div>
                                  <div className="custom-text comment-body" dangerouslySetInnerHTML={{__html: comnt?.comments,}}></div>
                                </div>
                              )
                            }
                          </div> : 

                          cas?.case_status == '10' ? 
                          <div className="info">
                            <span className="userr">                    
                              <span className="userr">{casee?.created_user?.first_name} {casee?.created_user?.last_name}</span> 
                              Required container files
                            </span> 
                            Required container files
                            {
                              cas?.cases_status_users_comments?.map((comnt) => 
                                <div className="comment">
                                  <div className="top">
                                    <div className="icon">
                                      <AiOutlineComment />  
                                    </div>
                                    <div className="date">
                                      {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                                    </div>
                                  </div>
                                  <div className="custom-text comment-body" dangerouslySetInnerHTML={{__html: comnt?.comments,}}></div>
                                </div>
                              )
                            }
                          </div> : 

                          cas?.case_status == '11' ? 
                          <div className="info">
                            <span className="userr">
                              {casee?.post_processing?.first_name} {casee?.post_processing?.last_name}
                            </span> 
                            Uploaded stl files
                            {
                              cas?.cases_status_users_comments?.map((comnt) => 
                                <div className="comment">
                                  <div className="top">
                                    <div className="icon">
                                      <AiOutlineComment />  
                                    </div>
                                    <div className="date">
                                      {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                                    </div>
                                  </div>
                                  <div className="custom-text comment-body" dangerouslySetInnerHTML={{__html: comnt?.comments,}}></div>
                                </div>
                              )
                            }
                          </div> :

                          cas?.case_status == '12' ? 
                          <div className="info">
                            <span className="userr">{casee?.post_processing?.first_name} {casee?.post_processing?.last}</span> 
                            uploaded container files
                            {
                              cas?.cases_status_users_comments?.map((comnt) => 
                                <div className="comment">
                                  <div className="top">
                                    <div className="icon">
                                      <AiOutlineComment />  
                                    </div>
                                    <div className="date">
                                      {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                                    </div>
                                  </div>
                                  <div className="custom-text comment-body" dangerouslySetInnerHTML={{__html: comnt?.comments,}}></div>
                                </div>
                              )
                            }
                          </div> : 

                          cas?.case_status == '13' ? 
                          <div className="info">
                            <span className="userr">{casee?.created_user?.first_name} {casee?.created_user?.lastt_name}</span> 
                            Need stl files modifications
                            {
                              cas?.cases_status_users_comments?.map((comnt) => 
                                <div className="comment">
                                  <div className="top">
                                    <div className="icon">
                                      <AiOutlineComment />  
                                    </div>
                                    <div className="date">
                                      {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                                    </div>
                                  </div>
                                  <div className="custom-text comment-body" dangerouslySetInnerHTML={{__html: comnt?.comments,}}></div>
                                </div>
                              )
                            }
                          </div> : 

                          cas?.case_status == '14' ? 
                          <div className="info">
                            <span className="userr">{casee?.created_user?.first_name} {casee?.created_user?.lastt_name}</span> 
                            Need container files modifications
                            {
                              cas?.cases_status_users_comments?.map((comnt) => 
                                <div className="comment">
                                  <div className="top">
                                    <div className="icon">
                                      <AiOutlineComment />  
                                    </div>
                                    <div className="date">
                                      {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                                    </div>
                                  </div>
                                  <div className="custom-text comment-body" dangerouslySetInnerHTML={{__html: comnt?.comments,}}></div>
                                </div>
                              )
                          }
                          </div> : 

                          cas?.case_status == '15' ? 
                          <div className="info">
                            <span className="userr">{casee?.created_user?.first_name} {casee?.created_user?.lastt_name}</span> 
                            Required direct printing files
                            {
                              cas?.cases_status_users_comments?.map((comnt) => 
                                <div className="comment">
                                  <div className="top">
                                    <div className="icon">
                                      <AiOutlineComment />  </div>
                                    <div className="date">
                                      {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                                    </div>
                                  </div>
                                  <div className="custom-text comment-body" dangerouslySetInnerHTML={{__html: comnt?.comments,}}></div>
                                </div>
                              )
                            }
                          </div> : 

                          cas?.case_status == '16' ? 
                          <div className="info">
                            <span className="userr">{casee?.post_processing?.first_name} {casee?.post_processing?.last}</span> 
                            Uploaded Direct Printing files
                            {
                              cas?.cases_status_users_comments?.map((comnt) => 
                                <div className="comment">
                                  <div className="top">
                                    <div className="icon">
                                      <AiOutlineComment />  
                                    </div>
                                    <div className="date">
                                      {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                                    </div>
                                  </div>
                                  <div className="custom-text comment-body" dangerouslySetInnerHTML={{__html: comnt?.comments,}}></div>
                                </div>
                              )
                            }
                          </div> : 

                          cas?.case_status == '17' ? 
                          <div className="info">
                            <span className="userr">{casee?.created_user?.first_name} {casee?.created_user?.lastt_name}</span> 
                            Required Direct Printing files
                            {
                              cas?.cases_status_users_comments?.map((comnt) => 
                                <div className="comment">
                                  <div className="top">
                                    <div className="icon">
                                      <AiOutlineComment />  
                                    </div>
                                    <div className="date">
                                      {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                                    </div>
                                  </div>
                                  <div className="custom-text comment-body" dangerouslySetInnerHTML={{__html: comnt?.comments,}}></div>
                                </div>
                              )
                            }
                          </div> : 

                          cas?.case_status == '18' ? 
                          <div className="info">
                            <span className="userr">{casee?.created_user?.username}</span> 
                            Marked case as completed
                            {
                              cas?.cases_status_users_comments?.map((comnt) => 
                                <div className="comment">
                                  <div className="top">
                                    <div className="icon">
                                      <AiOutlineComment />  
                                    </div>
                                    <div className="date">
                                      {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                                    </div>
                                  </div>
                                  <div className="custom-text comment-body" dangerouslySetInnerHTML={{__html: comnt?.comments,}}></div>
                                </div>
                              )
                            }
                          </div> : 
                          ""
                        }
                      </div>

                    </div>

                  </div>

                </div> : 

                <div className="single-case">
                  <div className="image">
                    <BsTags />
                  </div>
                  <div className="header">
                    <div className="tit">{cas?.case_status == '1' ? 'New Case' : cas?.case_status == '2' ? "In Planning" : cas?.case_status == '3' ? "Ready for QA" : cas?.case_status == '4' ? "Need More Info" : cas?.case_status == '5' ? "Case updated by ortho" : cas?.case_status == '6' ? "Rejected By QA" : cas?.case_status == '7' ? "Pending Ortho Check" : cas?.case_status == '8' ? "Need Modifications" : cas?.case_status == '9' ? "Pending Step Files" : cas?.case_status == '10' ? "Pending Container files" : cas?.case_status == '11' ? "Stl files ready" : cas?.case_status == '12' ? "Container files ready" : cas?.case_status == '13' ? "Need Stl File Modifications" : cas?.case_status == '14' ? "Need Container File Modifications" : cas?.case_status == '15' ? "Pending direct printing files" : cas?.case_status == '16' ? 'Direct printing files ready' : cas?.case_status == '17' ? 'Need direct printing files Modifications' : cas?.case_status == '18' ? 'Case completed' : ''}
                  </div>
                  <div className="sub_header">
                    <div className="inner">
                      <span className="label">Name:</span>
                      <span className="value">({cas.user_detail?.first_name} {cas.user_detail?.first_name})</span>
                    </div>
                    <div className="inner">
                      <span className="label">Role:</span>
                      <span className="value">({formatString(cas.user_detail?.role_name)})</span>
                    </div>
                    {
                      cas.work_start_datetime && (currentUser?.role_name == 'super_admin' || currentUser?.role_name == 'case_submission' || currentUser?.role_name == 'quality_check') && (
                      <div className="inner">
                        <span className="label">Work Start:</span>
                        <span className="value">
                          {moment(cas.work_start_datetime).format('ddd, MMM DD YYYY')} : {moment(cas.work_start_datetime).format('HH:mm:ss')}
                        </span>
                      </div>    
                      )
                    }
                    {
                      cas.work_end_datetime && (currentUser?.role_name == 'super_admin' || currentUser?.role_name == 'case_submission' || currentUser?.role_name == 'quality_check') && (
                      <div className="inner">
                        <span className="label">Work Start:</span>
                        <span className="value">
                          {moment(cas.work_end_datetime).format('ddd, MMM DD YYYY')} : {moment(cas.work_end_datetime).format('HH:mm:ss')}
                        </span>
                      </div>    
                      )
                    }
                  </div>
                  <div className="date">
                    {moment(cas.created_at).format('ddd, MMM DD YYYY')} :  {moment(cas.created_at).format('HH:mm:ss')}
                  </div>
                </div>

              <div className="bodyy">
                <div className="profile mb-3">
                  {cas?.user_detail ? <img src={`${api_url}/uploads/${cas?.user_detail?.profile_pic}`} /> : <img src={Dummy} />}

                  <div className="textt">
                    {cas?.case_status == '1' ? <div className="info">
                      Case is created by <span className="userr">{cas?.user_detail?.first_name} {cas?.user_detail?.last_name} </span>
                    </div> : cas?.case_status == '2' ? <div className="info">
                      Case is assigned to <span className="userr">{casee?.planner?.first_name} {casee?.planner?.last_name}</span>
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '3' ? <div className="info">
                      Case is assigned to <span className="userr">{casee?.qa?.first_name} {casee?.qa?.last_name}</span> for QC
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '4' ? <div className="info">
                      <span className="userr"> {casee?.planner?.first_name} {casee?.planner?.last_name} </span> Holds case
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '5' ? <div className="info">
                      <span className="userr">{casee?.created_user?.first_name} {casee?.created_user?.last_name}</span> Updated the case
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '6' ? <div className="info">
                      <span className="userr">{casee?.qa?.first_name} {casee?.qa?.last_name}</span> Rejected the case
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '7' ? <div className="info">
                      <span className="userr">{casee?.qa?.first_name} {casee?.qa?.last_name}</span> Submitted case for ortho check
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '8' ? <div className="info">
                      <span className="userr">{casee?.created_user?.first_name} {casee?.created_user?.last_name}</span> Asked modifications
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '9' ? <div className="info">
                      <span className="userr">{casee?.created_user?.first_name} {casee?.created_user?.last_name}</span> Required stl files
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '10' ? <div className="info">
                      <span className="userr">{casee?.created_user?.first_name} {casee?.created_user?.last_name}</span> Required container files
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '11' ? <div className="info">
                      <span className="userr">{casee?.post_processing?.first_name} {casee?.post_processing?.last_name}</span> uploaded stl files
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '12' ? <div className="info">
                      <span className="userr">{casee?.post_processing?.first_name} {casee?.post_processing?.last_name}</span> uploaded container files
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '13' ? <div className="info">
                      <span className="userr">{casee?.created_user?.first_name} {casee?.created_user?.last_name}</span> Need stl files modifications
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '14' ? <div className="info">
                      <span className="userr">{casee?.created_user?.first_name} {casee?.created_user?.last_name}</span> Need container files modifications
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '15' ? <div className="info">
                      <span className="userr">{casee?.created_user?.first_name} {casee?.created_user?.lastt_name}</span> Required direct printing files
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '16' ? <div className="info">
                      <span className="userr">{casee?.post_processing?.first_name} {casee?.post_processing?.last}</span> Uploaded Direct Printing files
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '17' ? <div className="info">
                      <span className="userr">{casee?.created_user?.first_name} {casee?.created_user?.lastt_name}</span> Required Direct Printing files
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>


                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : cas?.case_status == '18' ? <div className="info">
                      <span className="userr">{casee?.created_user?.username}</span> Marked case as completed
                      {cas?.cases_status_users_comments?.map((comnt) => <div className="comment">
                        <div className="top">
                          <div className="icon">
                            <AiOutlineComment />  </div>
                          <div className="date">
                            {moment(comnt.created_at).format('ddd, MMM DD YYYY')} :  {moment(comnt.created_at).format('HH:mm:ss')}
                          </div>
                        </div>
                        <div className="custom-text comment-body" dangerouslySetInnerHTML={{
                          __html: comnt?.comments,
                        }}></div>

                      </div>)}
                    </div> : ""}
                  </div>
                </div>
              </div>
                </div>

              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
