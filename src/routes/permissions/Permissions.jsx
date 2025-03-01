import React, { useEffect,useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import Dummy from '../../images/dummy.jpeg'
import DataTable from 'react-data-table-component';
import { BiBorderRadius } from 'react-icons/bi';
import { AuthContext } from '../../components/authcontext/AuthContext';
import { AuthService } from '../../api/AuthService';
import { useContext } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";



const  Permissions = () => {
  const {currentUser} = useContext(AuthContext)
  const userType = currentUser?.roles[0]?.name
  const permissions =currentUser?.permissions
  const [dataa,setDataa]=useState([])
  const [loading, setLoading] = useState(false);
  const getAllPermissions = async () => {
    
  
    try {
         const result = await AuthService.getPermissions();
       
         
        
        if(result?.data?.status == 200){
        
          const transformedUsers =result?.data?.data?.map(user => ({
            id: user.guid,
            name: user.name,
          
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
    getAllPermissions()
  },[])
  //delete user 
  const deletePermissionFunction = async (id) => {
    setLoading(true)
  
    try {
         const result = await AuthService.deletePermission(id);
        
         
        
        if(result?.data?.status == 200){
      
          toast.error(result?.data?.message, {
            autoClose: 2000,
            pauseOnHover: true,
            draggable: true,
            
          });
          getAllPermissions()
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
            name: 'Permission',
            selector: row => row.name,
            sortable: true,
        },
       
        {
            name: 'Action',
            
            cell: row => (
              <div className='icons__parent'>
                   {/* {permissions?.includes("permissions-update") &&  <Link className='button-icon' to={`/update-permission/${row.id}`} >
                        <FiEdit />
                    </Link>} */}
                    {permissions?.includes("permissions-detail") &&   <Link className='button-icon'  to={`/permission-detail/${row.id}`}>
                        <GrView  />
                    </Link>}
                    {/* {permissions?.includes("permissions-delete") &&   <div className='button-icon' onClick={() => deletePermissionFunction(row.id)}>
                        <MdDeleteOutline />
                    </div>} */}
                    
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
      <div className="d-flex justify-content-end mb-3">
      {permissions?.includes("permissions-store") &&   <Link to={'/add-permission'} className="button">Create New Permission </Link> }
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

export default Permissions