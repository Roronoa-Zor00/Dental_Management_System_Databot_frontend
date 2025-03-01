// src/routes/cases/components/Simulations.jsx
import { useContext, useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
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

import "react-quill/dist/quill.snow.css";
import "yet-another-react-lightbox/styles.css";
import { AuthContext } from "../../../components/authcontext/AuthContext";

const Simulations = ({ caseId = 0 }) => {
  const [casee, setCasee] = useState({});
  const { currentUser } = useContext(AuthContext);
  const userType = currentUser?.roles[0]?.name;
  const permissions = currentUser?.permissions;
  const [casetab, setCasetab] = useState("plans");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [dataa, setDataa] = useState([]);
  const [idd, setIdd] = useState("");
  const [editFields, setEditFields] = useState({})
  const [plan, setPlan] = useState([]);
  const [inputs, setInputs] = useState([
    { ipr_chart: null, simulation_link_url: "", text_notes: "" },
  ]);

  //get case details
  const getCaseDetailFunction = async (id) => {
    try {
      const result = await CaseService.getCaseDetail(id);

      if (result?.data?.status == 200) {
        setCasee(result?.data?.data);
        const transformedUsers = result?.data?.data?.case_plans?.map((item, index) => ({
          id: item?.guid,
          planId: index + 1,
          caseId: result?.data?.data?.case_id,
          iprChart: item?.ipr_chart,
          textNotes: item?.text_notes,
          simulationLink: item?.simulation_link_url,
        }));
        setDataa(transformedUsers);

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

  //set edit plan
  const setEditPlan = (row) => {

    setIdd(row.id);
    setInputs([{ ipr_chart: row.iprChart, simulation_link_url: row.simulationLink, text_notes: row.textNotes }])
    setCasetab("edit");

  };
  const setViewPlan = (idd) => {

    setIdd(idd);
    setCasetab("view");
    getPlan(idd)
  };

  // view plan details

  const getPlan = async (idd) => {
    try {
      const result = await CaseService.getCasePlan(idd);

      if (result?.data?.status == 200) {
        setPlan(result?.data?.data);

        setInputs([{ ipr_chart: result?.data?.data?.ipr_chart, simulation_link_url: result?.data?.data?.simulation_link_url, text_notes: result?.data?.data?.text_notes }])
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

  const api_url = process.env.REACT_APP_API_URL

  useEffect(() => {
    getPlan(idd);
  }, [idd]);

  // input hadle functions
  const handleInputChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleFileChange = (index, field, file) => {
    const newInputs = [...inputs];
    newInputs[index][field] = file;
    setInputs(newInputs);
  };

  //handle text change
  const handleTextEditorChange = (index, content) => {
    const newInputs = [...inputs];
    newInputs[index]["text_notes"] = content;
    setInputs(newInputs);
  };

  // add new plan
  const addNewInputs = () => {
    setInputs([
      ...inputs,
      { ipr_chart: "", simulation_link_url: "", text_notes: "" },
    ]);
  };
  //remove plan
  const removeInputs = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };



  useEffect(() => {
    if (caseId) {
      getCaseDetailFunction(caseId);
    }
  }, [caseId]);

  const columns = [
    {
      name: "Case plans",
      selector: (row) => row.planId,
      sortable: true,
    },
    {
      name: "Case Id",
      selector: (row) => row.caseId,
      sortable: true,
    },

    {
      name: "Ipr Chart",
      selector: (row) => row.iprChart,
      sortable: true,
    },
    // {
    //   name: "Text Notes",
    //   selector: (row) => row.textNotes ,
    //   sortable: true,
    // },

    {
      name: "Smulation Link",
      selector: (row) => <a className="custom-link" target="_blank" href={row.simulationLink}>{row.simulationLink}</a>,
      sortable: true,
    },

    {
      name: "Action",

      cell: (row) => (
        <>
          {permissions?.includes("case-plans-update") && (
            <div className="button-icon" onClick={() => setEditPlan(row)}>
              <FiEdit />
            </div>
          )}
          {permissions?.includes("case-plans-detail") && (
            <div className="button-icon" onClick={() => setViewPlan(row.id)}>
              <GrView />
            </div>
          )}
          {permissions?.includes("case-plans-delete") && (
            <div
              className="button-icon"
              onClick={() => deleteCasePlanApi(row.id)}
            >
              <MdDeleteOutline />
            </div>
          )}
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];




  const createCasePlanApi = async () => {


    const payload = inputs?.map((input) => ({

      text_notes: input.text_notes,
      simulation_link_url: input.simulation_link_url,

    }));


    try {
      var formData = new FormData();
      if (!caseId) {
        toast.error("Case not found", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      setLoading(true);

      formData.append("p_case_id", caseId);
      formData.append("case_plans", JSON.stringify(payload));
      if (inputs) {
        inputs?.map((input, index) => (

          formData.append(`ipr_chart_files[${index}]`, input.ipr_chart)

        ));
      }


      const result = await CaseService.createCasePlan(formData);
      if (result?.data?.status === 200) {
        toast.success(result?.data?.message, {
          autoClose: 1000,
          pauseOnHover: true,
          draggable: true,
        });

        setInputs([{ ipr_chart: null, simulation_link_url: "", text_notes: "" }]);
        setCasetab("plans");
        if (caseId) {
          getCaseDetailFunction(caseId)
        }
      } else {
        toast.error(result?.data?.message, {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.errors?.[0] || 'An error occurred', {
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };


  //update plan apii
  const updateCasePlanApi = async () => {

    const payload = inputs?.map((input) => ({

      text_notes: input.text_notes,
      simulation_link_url: input.simulation_link_url,

    }));


    try {
      var formData = new FormData();
      if (!caseId) {
        toast.error("Case not found", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      setLoading(true);

      formData.append("p_case_id", caseId);
      formData.append('ipr_chart', inputs[0]?.ipr_chart)
      formData.append('simulation_link_url', inputs[0]?.simulation_link_url)
      formData.append('text_notes', inputs[0]?.text_notes)


      const result = await CaseService.updateCasePlan(idd, formData);
      if (result?.data?.status === 200) {
        toast.success(result?.data?.message, {
          autoClose: 1000,
          pauseOnHover: true,
          draggable: true,
        });

        setInputs([{ ipr_chart: null, simulation_link_url: "", text_notes: "" }]);
        setCasetab("plans");
        if (caseId) {
          getCaseDetailFunction(caseId)
        }
      } else {
        toast.error(result?.data?.message, {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.errors?.[0] || 'An error occurred', {
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  //delete plan apii
  const deleteCasePlanApi = async (idd) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this plan?");

    if (!isConfirmed) {
      // If the user cancels, exit the function early
      return;
    }
    try {
      setLoading(true);

      const result = await CaseService.deleteCasePlan(idd);
      if (result?.data?.status == 200) {
        toast.success(result?.data?.message, {
          autoClose: 1000,
          pauseOnHover: true,
          draggable: true,
        });

        setCasetab("plans");
        if (caseId) {
          getCaseDetailFunction(caseId)
        }
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


  return (
    <div className="users-wrapper patinet-info mb-4">
      {loading && (
        <div className="loader-parent">
          <div className="_loader"></div>
        </div>
      )}
      {/* <ToastContainer /> */}

      <div className="user-details">
        <div className="tabs">
          {permissions?.includes("case-plans-list") && <div className="tab">
            <button
              className={`button ${casetab == "plans" ? "active" : ""}`}
              onClick={() => setCasetab("plans")}
            >
              All plans
            </button>
          </div>}
          {permissions?.includes("case-plans-store") && <div className="tab">
            <button
              className={`button ${casetab == "create" ? "active" : ""}`}
              onClick={() => setCasetab("create")}
            >
              Create Plan
            </button>
          </div>}
        </div>

        {/* All plans */}
        {(casetab == "plans" && permissions?.includes("case-plans-list")) &&
          <div>
            <div>
              <DataTable
                columns={columns}
                data={dataa}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[5, 10, 20]}
              />
            </div>
          </div>
        }
        {/* create plans */}

        {(casetab == "create" && permissions?.includes("case-plans-store")) &&
          <div>
            {inputs?.map((input, index) => (
              <div className="single-simulation" key={index}>
                {inputs.length > 1 && (
                  <div className="close" onClick={() => removeInputs(index)}>

                    <IoIosClose />
                  </div>
                )}
                <input
                  type="file"
                  className="input"
                  onChange={(e) =>
                    handleFileChange(index, "ipr_chart", e.target.files[0])
                  }
                />
                <input
                  type="text"
                  className="input"
                  value={input.simulation_link_url}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "simulation_link_url",
                      e.target.value
                    )
                  }
                  placeholder="Simulation Link URL"
                />
                <ReactQuill
                  value={input.text_notes}
                  onChange={(content, delta, source, editor) =>
                    handleTextEditorChange(index, content)
                  }
                  placeholder="Text Notes"
                />
              </div>
            ))}
            <div className="mb-4">
              {inputs?.length > 0 && (
                <button className="button" onClick={createCasePlanApi}>
                  Submit Plan
                </button>
              )}
            </div>
            <div>
              <button className="button" onClick={addNewInputs}>
                Add More Plan
              </button>
            </div>
          </div>
        }

        {/* edit plan section */}

        {(casetab == "edit" && permissions?.includes("case-plans-update")) &&
          <div>
            {inputs?.map((input, index) => (
              <div className="single-simulation" key={index}>

                <input
                  type="file"
                  className="input"
                  onChange={(e) =>
                    handleFileChange(index, "ipr_chart", e.target.files[0])
                  }
                />
                <input
                  type="text"
                  className="input"
                  value={input.simulation_link_url}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "simulation_link_url",
                      e.target.value
                    )
                  }
                  placeholder="Simulation Link URL"
                />
                <ReactQuill
                  value={input.text_notes}
                  onChange={(content, delta, source, editor) =>
                    handleTextEditorChange(index, content)
                  }
                  placeholder="Text Notes"
                />
              </div>
            ))}
            <div className="mb-4">
              {inputs?.length > 0 && (
                <button className="button" onClick={updateCasePlanApi}>
                  Update Plan
                </button>
              )}
            </div>

          </div>
        }





        {/* view plan section */}
        {casetab == "view" && (
          <div>
            <div className="view-box">
              <div className="title mb-3">
                Simulation link
                <span>
                  <a href={plan?.simulation_link_url} target="_blank">

                    {plan?.simulation_link_url}
                  </a>
                </span>
              </div>
              <div className="title mb-2">Text notes :</div>
              <div
                className="custom-text"
                dangerouslySetInnerHTML={{
                  __html: plan?.text_notes,
                }}
              ></div>
            </div>
            <iframe src={`${api_url}/uploads/pdf/${plan?.ipr_chart}`} width="100%" height="700px" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulations;
