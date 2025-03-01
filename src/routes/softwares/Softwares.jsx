import React, { useEffect, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import DataTable from 'react-data-table-component';
import { AuthContext } from '../../components/authcontext/AuthContext';
import { SoftwareService } from '../../api/SoftwareService';
import { useContext } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const Softwares = () => {
  const [dataa, setDataa] = useState([])
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext)
  // const userType = currentUser?.roles[0]?.name
  const permissions = currentUser?.permissions
  const getAllSoftwares = async () => {


    try {
      const result = await SoftwareService.getSoftwares();



      if (result?.data?.status == 200) {

        const transformedSoftwares = result?.data?.data?.map(software => ({
          id: software.guid,
          name: software.name,

        }));
        setDataa(transformedSoftwares)


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
    getAllSoftwares()
  }, [])

  //delete user 
  const deleteSoftwareFunction = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Software?");

    if (!isConfirmed) {
      // If the user cancels, exit the function early
      return;
    }
    setLoading(true)

    try {
      const result = await SoftwareService.deleteSoftware(id);



      if (result?.data?.status == 200) {

        toast.success(result?.data?.message, {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,

        });
        getAllSoftwares()
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
      name: 'Softwares',
      selector: row => row.name,
      sortable: true,
    },

    {
      name: 'Action',

      cell: row => (
        <div className='icons__parent'>
          {permissions?.includes("softwares-update") && <Link title='Update Software' className='button-icon' to={`/update-software/${row.id}`} >
            <FiEdit />
          </Link>}
          {permissions?.includes("softwares-delete") && <div title='Delete Software' className='button-icon' onClick={() => deleteSoftwareFunction(row.id)}>
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
      {permissions?.includes("softwares-store") && <div className="d-flex justify-content-end mb-3">
        <Link to={'/create-software'} className="button">Create New Software </Link>
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

export default Softwares