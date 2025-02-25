// src/routes/cases/Cases.jsx
import React, { useEffect, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import Dummy from '../../images/dummy.jpeg'
import DataTable from 'react-data-table-component';
import { BiBorderRadius } from 'react-icons/bi';
import { CaseService } from '../../api/CaseService';

import { AuthContext } from '../../components/authcontext/AuthContext';
import moment from 'moment';
import { useContext } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Pagination } from 'react-laravel-paginex'
import { useParams } from 'react-router-dom';
import { CSVLink } from "react-csv";



const Cases = () => {
  const { casestatus } = useParams();
  const { currentUser } = useContext(AuthContext);
  const userType = currentUser?.roles[0]?.name;
  const permissions = currentUser?.permissions;
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [dataa, setDataa] = useState([]);
  const [nonPaginatedData, setNonPaginatedData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters states
  const [caseid, setCaseid] = useState('');
  const [patientName, setPatientName] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [caseType, setCaseType] = useState('');
  const [completed, setCompleted] = useState('');
  const [isProrityCases, setIsProrityCases] = useState(0);
  const [isModificationCases, setIsModificationCases] = useState(0);

  const updateUrgentCases = async () => {
    await setIsProrityCases(1)
    await setIsModificationCases(0)
    await getAllCases(1, '', '', '', '', '', '', '', '', 1, '')
  }
  const updateModificationCases = async () => {
    await setIsModificationCases(1)
    await setIsProrityCases(0)
    await getAllCases(1, '', '', '', '', '', '', '', '', '', 1);
  }
  const updateAllCases = async () => {
    await setIsModificationCases(0)
    await setIsProrityCases(0)
    await getAllCases(1);
  }


  const getAllCases = async (value = 1, case_id = '', case_status = '', patient_name = '', clinic_name = '', date_from = '', date_to = '', case_type = '', is_completed = '', is_prority_cases = '', is_modification_cases = '') => {
    setLoading(true);
    setDataa([]);

    if (caseid) case_id = caseid;
    if (casestatus) case_status = casestatus;
    if (patientName) patient_name = patientName;
    if (clinicName) clinic_name = clinicName;
    if (dateFrom) date_from = dateFrom;
    if (dateTo) date_to = dateTo;
    if (caseType) case_type = caseType;
    if (completed) is_completed = completed;
    // if (isProrityCases) is_prority_cases = isProrityCases;
    // if (isModificationCases) is_modification_cases = isModificationCases;

    try {
      let current_page = 1;
      if (value && value.page) current_page = value.page;

      const result = await CaseService.getCases(current_page, case_id, case_status, patient_name, clinic_name, date_from, date_to, case_type, is_completed, is_prority_cases, is_modification_cases);

      if (result?.data?.status === 200) {
        setData(result.data.data);
        const transformedCases = result?.data?.data?.data?.map((item) => {
          const startDate = new Date(item?.start_date_time);
          const endTime = new Date(
            startDate.getTime() + (item?.expected_time != null ? parseInt(item?.expected_time) * 60 * 60 * 1000 : 0)
          );
          const remainingTimeMs = Math.max(0, endTime - new Date().getTime());

          return {
            id: item?.guid,
            caseId: item?.case_id,
            status: item.status,
            statusName: item?.status == '1' ? 'New Case' : item?.status == '2' ? "In Planning" : item?.status == '3' ? "Ready for QA" : item?.status == '4' ? "Need More Info" : item?.status == '5' ? "Case updated by ortho" : item?.status == '6' ? "Rejected By QA" : item?.status == '7' ? "Pending Ortho Check" : item?.status == '8' ? "Need Modifications" : item?.status == '9' ? "Pending Step Files" : item?.status == '10' ? "Pending Container files" : item?.status == '11' ? "Stl files ready" : item?.status == '12' ? "Container files ready" : item?.status == '13' ? "Need Stl File Modifications" : item?.status == '14' ? "Need Container File Modifications" : item?.status == '15' ? "Pending direct printing files" : item?.status == '16' ? 'Direct printing files ready' : item?.status == '17' ? 'Need direct printing files Modifications' : item?.status == '18' ? 'Case completed' : '',
            name: item?.name,
            email: item?.email,
            gender: item?.gender,
            created: `${moment(item?.created_at).format("ddd, MMM DD YYYY")} : ${moment(item?.created_at).format("HH:mm:ss")}`,
            clinic: item?.created_user?.username || "null",
            planner: item?.planner?.username ? `${item?.planner?.first_name} ${item?.planner?.last_name}` : "null",
            remainingTimeMs, // Store remaining time in milliseconds
          };
        });

        setDataa(transformedCases);
      } else {
        if (result?.data?.message === "Unauthenticated.") {
          navigate('/login');
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


  const getNonPaginatedCases = async (value = 1, case_id = '', case_status = '', patient_name = '', clinic_name = '', date_from = '', date_to = '', case_type = '', is_completed = '', is_prority_cases = '', is_modification_cases = '') => {
    setLoading(true);
    // setNonPaginatedData([]);

    if (caseid) case_id = caseid;
    if (casestatus) case_status = casestatus;
    if (patientName) patient_name = patientName;
    if (clinicName) clinic_name = clinicName;
    if (dateFrom) date_from = dateFrom;
    if (dateTo) date_to = dateTo;
    if (caseType) case_type = caseType;
    if (completed) is_completed = completed;
    // if (isProrityCases) is_prority_cases = isProrityCases;
    // if (isModificationCases) is_modification_cases = isModificationCases;

    try {
      let current_page = 1;
      if (value && value.page) current_page = value.page;

      const result = await CaseService.getAllCases(current_page, case_id, case_status, patient_name, clinic_name, date_from, date_to, case_type, is_completed, is_prority_cases, is_modification_cases);

      if (result?.data?.status === 200) {
        const transformedCases = result?.data?.data?.map((item) => {
          return {
            caseId: item?.case_id,
            statusName: item?.status == '1' ? 'New Case' : item?.status == '2' ? "In Planning" : item?.status == '3' ? "Ready for QA" : item?.status == '4' ? "Need More Info" : item?.status == '5' ? "Case updated by ortho" : item?.status == '6' ? "Rejected By QA" : item?.status == '7' ? "Pending Ortho Check" : item?.status == '8' ? "Need Modifications" : item?.status == '9' ? "Pending Step Files" : item?.status == '10' ? "Pending Container files" : item?.status == '11' ? "Stl files ready" : item?.status == '12' ? "Container files ready" : item?.status == '13' ? "Need Stl File Modifications" : item?.status == '14' ? "Need Container File Modifications" : item?.status == '15' ? "Pending direct printing files" : item?.status == '16' ? 'Direct printing files ready' : item?.status == '17' ? 'Need direct printing files Modifications' : item?.status == '18' ? 'Case completed' : '',
            name: item?.name,
            email: item?.email,
            gender: item?.gender,
            created: `${moment(item?.created_at).format("ddd, MMM DD YYYY")} : ${moment(item?.created_at).format("HH:mm:ss")}`,
            clinic: item?.created_user?.username || "null",
            planner: item?.planner?.username ? `${item?.planner?.first_name} ${item?.planner?.last_name}` : "null"
          };
        });


        setNonPaginatedData(transformedCases);
      } else {
        const transformedCases = [{
          caseId: '',
          statusName: '',
          name: '',
          email: '',
          gender: '',
          created: '',
          clinic: '',
          planner: ''
        }];

        // setNonPaginatedData(transformedCases);

        console.log('No case found');
      }
    } catch (error) {
      const transformedCases = [{
        caseId: '',
        statusName: '',
        name: '',
        email: '',
        gender: '',
        created: '',
        clinic: '',
        planner: ''
      }];

      // setNonPaginatedData(transformedCases);
      console.log('Error getting cases', error);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    getAllCases(1);
  }, []);

  useEffect(() => {
    getNonPaginatedCases(1);
  }, []);

  const csvHeaders = [
    { label: "Case ID", key: "caseId" },
    { label: "Status", key: "statusName" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Gender", key: "gender" },
    { label: "Created", key: "created" },
    { label: "Clinic", key: "clinic" },
    { label: "Planner", key: "planner" },
  ];

  // Real-time countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDataa((prevData) =>
        prevData.map((item) => {
          let remainingTimeMs = item.remainingTimeMs - 1000; // Decrease by 1 second (1000 ms)
          remainingTimeMs = Math.max(0, remainingTimeMs); // Ensure it doesn't go below 0

          const hours = Math.floor(remainingTimeMs / (1000 * 60 * 60));
          const minutes = Math.floor((remainingTimeMs % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remainingTimeMs % (1000 * 60)) / 1000);

          const formattedRemainingTime = `${hours}h ${minutes}m ${seconds}s`;

          return {
            ...item,
            remainingTimeMs,
            remainingTime: formattedRemainingTime,
          };
        })
      );
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, [dataa]);

  //delete case 
  const deleteCaseFunction = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this case?");

    if (!isConfirmed) {
      // If the case cancels, exit the function early
      return;
    }
    setLoading(true)

    try {
      const result = await CaseService.deleteCase(id);



      if (result?.data?.status == 200) {

        toast.error(result?.data?.message, {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,

        });
        getAllCases(1, caseid, casestatus, patientName, clinicName, dateFrom, dateTo, caseType, completed, isProrityCases, isModificationCases);
        getNonPaginatedCases(1, caseid, casestatus, patientName, clinicName, dateFrom, dateTo, caseType, completed, isProrityCases, isModificationCases);
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


    }
    finally {
      setLoading(false)
    }
  };

  const columns = [
    {
      name: 'Case Id',
      selector: row => row.caseId,
      sortable: true,
    },
    {
      name: 'Case Status',
      selector: row => <span className='case-status-tag'>

        {row?.statusName}


      </span>,
      sortable: true,
    },

    {
      name: 'Remaining Time',
      selector: row => <span className={`${(row.remainingTimeMs <= 8 * 60 * 60 * 1000) ? 'red-time' : (row.remainingTimeMs <= 16 * 60 * 60 * 1000) ? 'yellow-time' : 'green-time'}`} >{row.remainingTime}</span>,
      sortable: true,
    },
    {
      name: 'Patient Name',
      selector: row => row.name,
      sortable: true,
    },


    {
      name: 'Patient Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Gender',
      selector: row => row.gender,
      sortable: true,
    },
    {
      name: 'Case Created',
      selector: row => row.created,
      sortable: true,
    },
    {
      name: 'Clinic',
      selector: row => row.clinic,
      sortable: true,
    },
    {
      name: 'Planner',
      selector: row => row.planner,
      sortable: true,
    },


    {
      name: 'Action',

      cell: row => (
        <div className='icons__parent'>
          {(permissions?.includes("patient-cases-update") && (row?.status == '4' || row?.status == '1')) && <Link title='Edit Case' className='button-icon' to={`/update-case/${row.id}`} >
            <FiEdit />
          </Link>}
          {permissions?.includes("patient-cases-detail") && <a title='View Case' className='button-icon' target='_blank' href={`/case-detail/${row.id}`}>
            <GrView />
          </a>}
          {permissions?.includes("patient-cases-delete") && <div title='Delete Case' className='button-icon' onClick={() => deleteCaseFunction(row.id)}>
            <MdDeleteOutline />
          </div>}

        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      getAllCases();
      getNonPaginatedCases();
    }
  };

  const handleFilterClick = () => {
    getAllCases();
    getNonPaginatedCases();
  }





  // Function to handle delete action

  return (
    <div className='users-wrapper'>
      {loading && <div className="loader-parent"><div className="_loader">

      </div></div>}
      <ToastContainer />
      <div className="search-filer-wrapper">

        <div className="row">
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <label htmlFor="">Case id</label>
            <input className='input' type="text" placeholder='Search case by case id' value={caseid} onChange={(e) => setCaseid(e.target.value)} onKeyDown={handleKeyDown} />
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <label htmlFor="">Patient name</label>
            <input className='input' type="text" placeholder='Search  by patien name' value={patientName} onChange={(e) => setPatientName(e.target.value)} onKeyDown={handleKeyDown} />
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <label htmlFor="">Clinic name</label>
            <input className='input' type="text" placeholder='Search clinic name' value={clinicName} onChange={(e) => setClinicName(e.target.value)} onKeyDown={handleKeyDown} />
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <label htmlFor="">Date From</label>
            <input className='input' type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} onKeyDown={handleKeyDown} />
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <label htmlFor="">Date To</label>
            <input className='input' type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} onKeyDown={handleKeyDown} />
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <label htmlFor="">Case type</label>
            <select value={caseType} onChange={(e) => setCaseType(e.target.value)} className="input" onKeyDown={handleKeyDown}>
              <option value="">Select case type</option>
              <option value="(3-3)">(3-3)</option>
              <option value="(5-5)">(5-5)</option>
              <option value="Full arch correction">Full arch correction </option>
            </select>

          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-3">
            <label htmlFor="">Case status</label>
            <select value={completed} onChange={(e) => setCompleted(e.target.value)} className="input" onKeyDown={handleKeyDown}>
              <option value="">Select </option>
              <option value="1">New Case</option>
              <option value="2">In Planning</option>
              <option value="3">Ready for QA</option>
              <option value="4">Need More Info</option>

              <option value="5">Case updated by ortho</option>
              <option value="6">Rejected By QA</option>
              <option value="7">Pending Ortho Check</option>
              <option value="8">Need Modifications</option>

              <option value="9">Pending Step Files</option>
              <option value="10">Pending Container files</option>
              <option value="11">Stl files ready</option>
              <option value="12">Container files ready</option>
              <option value="13">Need Stl File Modifications</option>
              <option value="14">Need Container File Modifications</option>
              <option value="15">Pending direct printing files</option>
              <option value="16">Direct printing files ready</option>
              <option value="17">Need direct printing files Modifications</option>
              <option value="18">Case completed</option>

            </select>

          </div>

          <button className='button' onClick={handleFilterClick}>
            Filter
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between my-3">
        <div className="case-tabs">
          <button className={`${(isProrityCases == '0' && isModificationCases == '0') ? 'active' : ''}`} onClick={() => updateAllCases()}>All cases</button>
          <button className={`${isProrityCases == '1' ? 'active' : ''}`} onClick={() => updateUrgentCases()}>Urgent cases</button>
          <button className={`${isModificationCases == '1' ? 'active' : ''}`} onClick={() => updateModificationCases()}>Cases Modifications</button>
          {nonPaginatedData?.length > 0 && (
            <CSVLink data={nonPaginatedData} headers={csvHeaders} filename={"cases.csv"} className="button">
              Export CSV
            </CSVLink>
          )}
        </div>


        {permissions?.includes("patient-cases-store") && <Link to={'/create-case'} className="button">Create New Case </Link>}

      </div>
      <DataTable
        columns={columns}
        data={dataa}
        onRowClicked={(row) => {
          if (permissions?.includes("patient-cases-detail")) {
            window.open(`/case-detail/${row.id}`, "_blank");
          }
        }}
        pointerOnHover
        highlightOnHover
      />
      <Pagination changePage={getAllCases} data={data} />
    </div>
  )
}

export default Cases