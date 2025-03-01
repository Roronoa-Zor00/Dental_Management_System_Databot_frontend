import React, { useEffect, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import DataTable from 'react-data-table-component';
import { AuthContext } from '../../components/authcontext/AuthContext';
import { ExternalPatientCaseService } from '../../api/ExternalPatientCaseService';
import { useContext } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const ExternalCases = () => {
  const [dataa, setDataa] = useState([])
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext)
  // const userType = currentUser?.roles[0]?.name
  const permissions = currentUser?.permissions

  const getAllCases = async () => {


    try {
      const result = await ExternalPatientCaseService.getCases();

      if (result?.data?.status == 200) {

        console.log(result?.data?.data);

        const transformedCases = result?.data?.data?.map(cases => ({
          id: cases.id,
          case_id: cases.case_id,
          name: cases.name,
          guid: cases.guid,
          status: cases.status,
          client: `${cases?.client?.first_name? cases?.client?.first_name : ""} ${cases?.client?.last_name? cases?.client?.last_name : ""}`,
          case_datetime: cases.case_datetime,
          software: cases?.software?.name? cases?.software?.name : "None",
        }));
        setDataa(transformedCases)
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
    getAllCases()
  }, [])

  //delete user 
  const deleteCaseFunction = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Case?");

    if (!isConfirmed) {
      // If the user cancels, exit the function early
      return;
    }
    setLoading(true)

    try {
      const result = await ExternalPatientCaseService.deleteCase(id);



      if (result?.data?.status == 200) {

        toast.success(result?.data?.message, {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,

        });
        getAllCases()
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

  const columns = [
    {
      name: 'Case ID',
      selector: row => row.case_id,
      sortable: true,
    },

    {
      name: 'Patient Name',
      selector: row => row.name,
      sortable: true,
    },

    {
      name: 'Date Time',
      selector: row => {
        const date = new Date(row.case_datetime);
        return `${date.toLocaleString('en-US', { weekday: 'short' })}, ${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()} ${date.getFullYear()} : ${date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}`;
      },
      sortable: true,
    },    

    {
      name: 'Status',
      selector: row => <span className='case-status-tag'>
          
          {row?.status == '1' ? 'New Case' : row?.status == '2' ? "In Planning" : row?.status == '3' ? "Ready for QA" : row?.status == '4' ? "Need More Info" : row?.status == '5' ? "Case updated by ortho" : row?.status == '6' ? "Rejected By QA" : row?.status == '7' ? "Pending Ortho Check" : row?.status == '8' ? "Need Modifications" : row?.status == '9' ? "Pending Step Files" : row?.status == '10' ? "Pending Container files" : row?.status == '11' ?  "Stl files ready" : row?.status == '12' ?  "Container files ready" : row?.status == '13' ? "Need Stl File Modifications" : row?.status == '14' ? "Need Container File Modifications" : row?.status == '15' ? "Pending direct printing files" :  row?.status == '16' ? 'Direct printing files ready': row?.status == '17' ? 'Need direct printing files Modifications' : row?.status == '18' ? 'Case completed': ''}
          
          
          </span>,
      sortable: true,
    },

    {
      name: 'Client',
      selector: row => row.client,
      sortable: true,
    },

    {
      name: 'Software',
      selector: row => row.software,
      sortable: true,
    },

    {
      name: 'Action',
      cell: row => (
        <div className='icons__parent'>
          {permissions?.includes("external-cases-update") && <Link title='Update Case' className='button-icon' to={`/update-external-case/${row.guid}`} >
            <FiEdit />
          </Link>}
          {permissions?.includes("external-cases-delete") && <div title='Delete Case' className='button-icon' onClick={() => deleteCaseFunction(row.guid)}>
            <MdDeleteOutline />
          </div>}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];



  // Function to handle delete action

  return (
    <div className='users-wrapper'>
      {loading && <div className="loader-parent"><div className="_loader"></div></div>}
      {/* <ToastContainer /> */}
      {permissions?.includes("external-cases-store") && <div className="d-flex justify-content-end mb-3">
        <Link to={'/create-external-case'} className="button">Create New Case </Link>
      </div>}
      <DataTable
        columns={columns}
        data={dataa}

        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 20]}


      />
    </div>
  )
}

export default ExternalCases