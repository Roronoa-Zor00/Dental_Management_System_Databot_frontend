// src/routes/cases/CreateCase.jsx
import React, { useState, useEffect, useContext } from "react";
import { CaseService } from "../../api/CaseService";
import { SoftwareService } from "../../api/SoftwareService";
import { NotificationService } from "../../api/NotificationService";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { StlViewer } from "react-stl-viewer";
import ReactQuill from "react-quill";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import { AuthContext } from "../../components/authcontext/AuthContext";
import { CiLock } from "react-icons/ci";
import "react-quill/dist/quill.snow.css";
const CreateCase = () => {

  const { currentUser, updateUser, isReadNot, updateIsReadNot } = useContext(AuthContext)
  const id = currentUser?.id

  const isExpressDelivery = currentUser?.is_8_hours_enabled
  const [caseUrl, setCaseUrl] = useState('')
  const [loading, setLoading] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [patientLocation, setPatientLocation] = useState("");
  const [caseType, setCaseType] = useState("");
  const [arch, setArch] = useState("");

  const [expectedTime, setExpectedTime] = useState('')
  const [toothLabelFormat, setToothLabelFormat] = useState('')
  const [gender, setGender] = useState("");

  const [ipr, setIpr] = useState("");
  const [extraction, setExtraction] = useState("");
  const [attachments, setAttachments] = useState("");
  const [software, setSoftware] = useState(false);
  const [softwareList, setSoftwareList] = useState([]);
  const [chiefComplaint, setChiefComplaint] = useState("None");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [upperStl, setUpperStl] = useState(null);
  const [lowerStl, setLowerStl] = useState(null);
  const [stlByteScan, setStlByteScan] = useState(null);
  const [progress, setProgress] = useState(0);
  const [disabledbtn, setdisabledbtn] = useState(false)

  // xray files
  const [xrays, setXrays] = useState([])
  const [xrayPerview, setXrayPreview] = useState([]);
  const handleXryChange = (event) => {
    const files = Array.from(event.target.files);
    setXrays(files);
  }

  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        // Get all available softwares
        const software_list = await SoftwareService.getSoftwares();
        console.log(software_list.data.data);
        if (software_list?.data?.data?.length > 0) {
          setSoftwareList(software_list.data.data);
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

    fetchSoftwares();
  }, []);


  useEffect(() => {
    const previews = xrays.map(file => URL.createObjectURL(file));
    setXrayPreview(previews);

    // Cleanup function to revoke object URLs
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [xrays]);
  const handleXrayRemove = (index) => {
    const newFiles = xrays.filter((_, i) => i !== index);
    setXrays(newFiles);
  };

  //xrays images end here


  // images files
  const [images, setImages] = useState([])
  const [imagesPerview, setImagesPreview] = useState([]);
  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  }
  useEffect(() => {
    const previews = images.map(file => URL.createObjectURL(file));
    setImagesPreview(previews);

    // Cleanup function to revoke object URLs
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);
  const handleImageRemove = (index) => {
    const newFiles = images.filter((_, i) => i !== index);
    setImages(newFiles);
  };

  //xrays images end here
  const navigate = useNavigate();

  const handleCheifComplaint = (content, delta, source, editor) => {
    setChiefComplaint(content);
  };
  const handleTreatmentPlan = (content, delta, source, editor) => {
    setTreatmentPlan(content);
  };

  //stl files handler

  const handleUpperStlFile = (event) => {
    const file = event.target.files[0];
    setUpperStl(file);
  };
  const handleLowerStlFile = (event) => {
    const file = event.target.files[0];
    setLowerStl(file);
  };
  const handleByteStlFile = (event) => {
    const file = event.target.files[0];
    setStlByteScan(file);
  };
  const style = {
    width: '100%',
    height: '100%', // Ensure it takes the full height of the viewport

  };
  const createCaseFunction = async () => {
    try {
      const formData = new FormData();
      if (!caseId) {
        toast.error("Please enter  case id", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
      }
      else if (!name) {
        toast.error("please enter patient  name", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
      }
      else if (!age) {
        toast.error("Please enter patient  age", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
      }
      else if (patientLocation == 'local' && !extraction) {
        toast.error("Please select extraction", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
      }
      else if (patientLocation == 'local' && !ipr) {
        toast.error("Please select ipr", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
      }
      else if (patientLocation == 'local' && !attachments) {
        toast.error("Please  select  attachments", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
      }

      else if (!treatmentPlan) {
        toast.error("Please enter select  treatmentPlan", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
      }
      else if (!upperStl) {
        toast.error("Please upload upper stl file", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
      }
      else if (!lowerStl) {
        toast.error("Please upload upper lower file", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
      }
      // else if (!software) {
      //   toast.error("Please select software", {
      //     autoClose: 2000,
      //     pauseOnHover: true,
      //     draggable: true,
      //   });
      // }
      else {
        setLoading(true);
        if (caseId) {
          formData.append("case_id", caseId);
        }
        if (name) {
          formData.append("name", name);
        }

        if (email) {
          formData.append("email", email);
        }
        if (age) {
          formData.append("age", age);
        }
        if (expectedTime) {
          formData.append("expected_time", expectedTime)
        }
        if (toothLabelFormat) {
          formData.append("tooth_label_format", toothLabelFormat)
        }
        if (gender) {
          formData.append("gender", gender);
        }
        if (patientLocation) {
          formData.append("patient_location", patientLocation);
        }
        if (caseType) {
          formData.append("case_type", caseType);
        }
        if (arch) {
          formData.append("arch", arch);
        }
        if (extraction) {
          formData.append("extraction", extraction);
        }
        if (attachments) {
          formData.append("attachments", attachments);
        }
        if (ipr) {
          formData.append("ipr", ipr);
        }

        if (chiefComplaint) {
          formData.append("chief_complaint", chiefComplaint);
        }
        if (treatmentPlan) {
          formData.append("treatment_plan", treatmentPlan);
        }

        if (upperStl) {
          formData.append("stl_upper_file", upperStl);
        }

        if (lowerStl) {
          formData.append("stl_lower_file", lowerStl);
        }
        if (stlByteScan) {
          formData.append("stl_byte_scan_file", stlByteScan);
        }

        if (xrays) {
          xrays.forEach((file, index) => {
            formData.append(`xrays_files[]`, file);
          });

        }
        if (images) {
          images.forEach((file, index) => {
            formData.append(`image_files[]`, file);
          });

        }

        if (software) {
          formData.append("software_id", software);
        }

        const result = await CaseService.createCase(formData, (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        });

        if (result?.data?.status == 200) {
          setCaseUrl(result?.data?.data?.guid)
          toast.success(result?.data?.message, {
            autoClose: 1000,
            pauseOnHover: true,
            draggable: true,
          });
          await createNotification(result?.data?.data?.guid)
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

  //Create case notification
  const createNotification = async (url) => {


    try {
      const formData = new FormData()
      formData.append('title', "Case created")
      formData.append('body', `Case created by ${currentUser?.username}`)
      formData.append('url_action', url)
      if (id) {
        formData.append('user_id', id)
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

  //check if case availble
  const checkCase = async () => {


    try {
      const result = await CaseService.isCaseAvailble(caseId);
      // console.log(result)


      if (result?.data?.data == false) {
        setdisabledbtn(true)
        toast.error(result?.data?.message, {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,

        });



      }
      else {
        setdisabledbtn(false)

        // toast.error(result?.data?.message, {
        //   autoClose: 2000,
        //   pauseOnHover: true,
        //   draggable: true,

        // });
      }


    } catch (error) {
      // toast.error(error?.result?.data?.errors[0], {
      //   autoClose: 2000,
      //   pauseOnHover: true,
      //   draggable: true,

      // });
      console.log(error)


    }
    finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    checkCase(caseId)
  }, [caseId])

  return (
    <div className="form-wrapper">
      <ToastContainer />
      {loading && (
        <div className="loader-parent">
          <div className="porgress-bar-custom-container">
            <div className="porgress-bar-custom-bar" style={{ width: `${progress}%` }}>

            </div>
          </div>
          <div className="textt">
            {progress}%
          </div>

        </div>
      )}
      <div className="title">Create Case </div>
      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Case Id <span>*</span></label>
          <input
            type="text"
            className="input"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Patient Name <span>*</span></label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Patient Email </label>
          <input
            type="text"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Patient Gender <span>*</span></label>
          <select
            name=""
            className="input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Patient Age <span>*</span></label>
          <input
            type="text"
            className="input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Patient Location </label>
          <select
            name=""
            className="input"
            value={patientLocation}
            onChange={(e) => setPatientLocation(e.target.value)}
          >
            <option value="">Select</option>
            <option value="overseas">Overseas(No IPR, No Attachments, No Extraction)</option>
            <option value="travelling">Travelling (IPR/Attachments/Extraction at early steps)</option>
            <option value="local">Local (Customized)</option>
          </select>
        </div>

        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Case type </label>
          <select
            name=""
            className="input"
            value={caseType}
            onChange={(e) => setCaseType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="(3-3)">(3-3)</option>
            <option value="(5-5)">(5-5)</option>
            <option value="Full arch correction">Full arch correction </option>
          </select>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Arch </label>
          <select
            name=""
            className="input"
            value={arch}
            onChange={(e) => setArch(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Upper only">Upper only</option>
            <option value="Lower only">Lower only</option>
            <option value="Both Arch">Both Arch</option>
          </select>
        </div>

        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Expected Time  <span>*</span></label>
          <select
            name=""
            className="input"
            value={expectedTime}
            onChange={(e) => setExpectedTime(e.target.value)}
          >
            <option value="">Select</option>
            {isExpressDelivery == '1' ? <option value="8">Express setup delivery: 8 hrs</option> : <option disabled >Express setup delivery: 8 hrs (This option is paid)</option>}


            <option value="24">Super Setup Delivery: 24 hrs <CiLock /></option>
            <option value="48">Normal Setup Delivery: 48 hrs</option>
          </select>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Tooth Label Format <span>*</span></label>
          <select
            name=""
            className="input"
            value={toothLabelFormat}
            onChange={(e) => setToothLabelFormat(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Universal notation">Universal notation</option>
            <option value="Fdi Notation">FDI Notation</option>
            <option value="Parlmer Notation">Parlmer Notation</option>
          </select>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="form-group">
            <label htmlFor="">Attachments {patientLocation == 'local' && <span>*</span>}</label>
            <select className="input" value={attachments} onChange={(e) => setAttachments(e.target.value)}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="form-group">
            <label htmlFor="">Software<span>*</span></label>
            <select className="input" value={software} onChange={(e) => setSoftware(e.target.value)} required>
              <option value="">Select</option>
              {
                softwareList.map((software, index) => {
                  return (
                    <option value={software.id} key={index}>{software.name}</option>
                  )

                })
              }
            </select>

          </div>
        </div>
      </div>
      <div className="row">

        <div className="col-12 col-md-6 mb-4">
          <div className="form-group">
            <label htmlFor="">IPR {patientLocation == 'local' && <span>*</span>}</label>
            <select className="input" value={ipr} onChange={(e) => setIpr(e.target.value)}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="form-group">
            <label htmlFor="">Extraction {patientLocation == 'local' && <span>*</span>}</label>
            <select className="input" value={extraction} onChange={(e) => setExtraction(e.target.value)}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="form-group">
            <label htmlFor="">Chief Complaint <span>*</span></label>

            <ReactQuill
              value={chiefComplaint}
              onChange={handleCheifComplaint}
              placeholder="None"
            />
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="form-group">
            <label htmlFor="">Treatment Plan <span>*</span></label>

            <ReactQuill value={treatmentPlan} onChange={handleTreatmentPlan} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-4 mb-4">
          <div className="form-group">
            <label htmlFor="">Upper stl file <span>*</span></label>
            <div className="file-wrapper">
              <span>Upload File here</span>
              <MdOutlineFileUpload />
              <input
                type="file"
                accept=".stl"
                className="input"
                onChange={handleUpperStlFile}
              />
            </div>
          </div>
          {upperStl && (
            <div className="stl-viewer mt-5">
              <StlViewer
                style={style}
                orbitControls

                shadows

                url={URL.createObjectURL(upperStl)}
              />
            </div>
          )}
        </div>
        <div className="col-12 col-md-4 mb-4">
          <div className="form-group">
            <label htmlFor="">Lower stl file <span>*</span></label>
            <div className="file-wrapper">
              <span>Upload File here</span>
              <MdOutlineFileUpload />
              <input
                type="file"
                className="input"
                accept=".stl"
                onChange={handleLowerStlFile}
              />
            </div>
          </div>
          {lowerStl && (
            <div className="stl-viewer mt-5">
              <StlViewer
                style={style}
                orbitControls
                shadows
                url={URL.createObjectURL(lowerStl)}
              />
            </div>
          )}
        </div>
        <div className="col-12 col-md-4 mb-4">
          <div className="form-group">
            <label htmlFor="">Stl Bite Scan file </label>
            <div className="file-wrapper">
              <span>Upload File here</span>
              <MdOutlineFileUpload />
              <input
                type="file"
                className="input"
                accept=".stl"
                onChange={handleByteStlFile}
              />
            </div>

          </div>
          {stlByteScan && (
            <div className="stl-viewer mt-5">
              <StlViewer
                style={style}
                orbitControls
                shadows
                url={URL.createObjectURL(stlByteScan)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-12 mb-4">
          <label htmlFor="">Xray images</label>
          <div className="file-wrapper">
            <span>Upload Files here</span>
            <MdOutlineFileUpload />
            <input
              type="file"
              className="input"
              accept=".jpg, .jpeg, .png"
              multiple
              onChange={handleXryChange}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="images-preview">
            {xrayPerview.map((preview, index) => (
              <div key={index} className="image"  >
                <div className="close" onClick={() => handleXrayRemove(index)}><IoIosCloseCircleOutline /></div>
                <img
                  src={preview}
                  alt={`preview ${index}`}

                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-12 mb-4">
          <label htmlFor="">Patient images <span>*</span></label>
          <div className="file-wrapper">
            <span>Upload Files here</span>
            <MdOutlineFileUpload />
            <input
              type="file"
              className="input"
              multiple
              accept=".jpg, .jpeg, .png"
              onChange={handleImagesChange}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="images-preview">
            {imagesPerview.map((preview, index) => (
              <div key={index} className="image"  >
                <div className="close" onClick={() => handleImageRemove(index)}><IoIosCloseCircleOutline /></div>
                <img
                  src={preview}
                  alt={`preview ${index}`}

                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center my-3">
        {disabledbtn ? <button className='button disabled'  >
          Create Case
        </button> : <button className='button' onClick={createCaseFunction}>
          Create Case
        </button>}

      </div>
    </div>
  );
};

export default CreateCase;
