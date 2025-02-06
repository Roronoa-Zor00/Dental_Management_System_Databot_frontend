// src/routes/cases/CompletedCases.jsx
import React, { useEffect,useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link,useNavigate } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import Dummy from '../../images/dummy.jpeg'
import DataTable from 'react-data-table-component';
import { BiBorderRadius } from 'react-icons/bi';
import { CaseService } from '../../api/CaseService';
import { AuthContext } from '../../components/authcontext/AuthContext';

import { useContext } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const CompletedCases = () => {
  const {currentUser} = useContext(AuthContext)
  const userType = currentUser?.roles[0]?.name
  const permissions =currentUser?.permissions
  const navigate = useNavigate();
  const [dataa,setDataa]=useState([])
  const [loading, setLoading] = useState(false);
  const getAllCases = async () => {
    setLoading(true)
  
    try {
         const result = await CaseService.getCompletedCases();
       
         
        
        if(result?.data?.status == 200){
        
          const transformedCases =result?.data?.data?.map(item => ({
            id: item?.guid,
            caseId:item?.case_id,
            status:item.status,
            name: item?.name,
            
            email: item?.email,
            gender: item?.gender,
            clinic:item?.created_user?.username ? item?.created_user?.username : 'null',
            planner:item?.planner?.username ? item?.planner?.username : 'null',
            
          
        }));
        setDataa(transformedCases)
        
          
        } 
        else {
          if(result?.data?.message == "Unauthenticated.") {
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


  
  useEffect(()=>{
    getAllCases()
  },[])
  //delete user 
  const deleteCaseFunction = async (id) => {
    setLoading(true)
  
    try {
         const result = await CaseService.deleteCase(id);
       
         
        
        if(result?.data?.status == 200){
      
          toast.error(result?.data?.message, {
            autoClose: 2000,
            pauseOnHover: true,
            draggable: true,
            
          });
          getAllCases()
        } 
        else {
          if(result?.data?.message == "Unauthenticated.") {
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
          selector: row => <span className='case-status-tag'>Completed</span>,
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
                <>
                  {/* {(permissions?.includes("patient-cases-update") && (row?.status == '4' || row?.status == '1')) &&  <Link className='button-icon' to={`/update-case/${row.id}`} >
                        <FiEdit />
                    </Link>} */}
                    {permissions?.includes("patient-cases-detail") &&     <Link className='button-icon'  to={`/case-detail/${row.id}`}>
                        <GrView  />
                    </Link>}
                    {permissions?.includes("patient-cases-delete") &&    <div className='button-icon' onClick={() => deleteCaseFunction(row.id)}>
                        <MdDeleteOutline />
                    </div>}
                    
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
  
 


// Function to handle delete action

  return (
    <div className='users-wrapper'>
      {loading && <div className="loader-parent"><div className="_loader">
        
        </div></div>}
      <ToastContainer />
      
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

export default CompletedCases