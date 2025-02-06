// src/routes/subclients/SubClients.jsx
import React, { useEffect,useState,useContext } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { SubClientService } from '../../api/SubClientsService';
import { Link } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import Dummy from '../../images/dummy.jpeg'
import DataTable from 'react-data-table-component';
import { BiBorderRadius } from 'react-icons/bi';
import { AuthContext } from '../../components/authcontext/AuthContext';
import { AuthService } from '../../api/AuthService';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const SubClients = () => {
  const {currentUser} = useContext(AuthContext)
  const userType = currentUser?.roles[0]?.name
  const permissions =currentUser?.permissions
  const [dataa,setDataa]=useState([])
  const [loading, setLoading] = useState(false);

  const api_url = process.env.REACT_APP_API_URL

  const getAllUsers = async () => {
    
  
    try {
         const result = await SubClientService.getSubClients();
       
         
        
        if(result?.data?.status == 200){
        
          const transformedUsers =result?.data?.data?.map(user => ({
            id: user?.guid,
            firstname: user?.first_name,
            lastname: user?.last_name,
            email: user?.email,
            mobilenumber: user?.mobile_number,
            image: `${api_url}/uploads/${user?.profile_pic}`,
        }));
        setDataa(transformedUsers)
        
          
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


  
  useEffect(()=>{
    getAllUsers()
  },[])
  //delete user 
  const deleteUserFunction = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");

    if (!isConfirmed) {
      // If the user cancels, exit the function early
      return;
    }
    setLoading(true)
  
    try {
         const result = await SubClientService.deleteSubClient(id);
         
        
        if(result?.data?.status == 200){
      
          toast.error(result?.data?.message, {
            autoClose: 2000,
            pauseOnHover: true,
            draggable: true,
            
          });
          getAllUsers()
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
            name: 'First Name',
            selector: row => row.firstname,
            sortable: true,
        },
        {
          name: 'Last Name',
          selector: row => row.lastname,
          sortable: true,
      },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Mobile number',
            selector: row => row.mobilenumber,
            sortable: true,
        },
       
        {
            name: 'Profile',
            selector: row => <img src={row.image} height={40} borderRadius="10px"  />,
            sortable: true,
        },
        {
            name: 'Action',
            
            cell: row => (
              <div className='icons__parent'>
                   {permissions?.includes("sub-client-update") && <Link className='button-icon' to={`/update-sub-client/${row.id}`} >
                        <FiEdit />
                    </Link>}
                    {permissions?.includes("sub-client-detail") &&    <Link className='button-icon'  to={`/sub-client-detail/${row.id}`}>
                        <GrView  />
                    </Link>}
                    {permissions?.includes("sub-client-delete") &&    <div className='button-icon' onClick={() => deleteUserFunction(row.id)}>
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
      <ToastContainer />
      <div className="d-flex justify-content-end mb-3">
      {permissions?.includes("sub-client-store")  && <Link to={'/create-sub-client'} className="button">Create Sub client </Link> }
      </div>
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

export default SubClients