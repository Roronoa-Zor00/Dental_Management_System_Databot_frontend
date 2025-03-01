// src/routes/pending-approvals/PendingApprovals.jsx
import React, { useEffect,useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import Dummy from '../../images/dummy.jpeg'
import DataTable from 'react-data-table-component';
import { BiBorderRadius } from 'react-icons/bi';
import { AuthContext } from '../../components/authcontext/AuthContext';
import { CaseService } from '../../api/CaseService';
import { useContext } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const PendingApprovals = () => {
  const [dataa,setDataa]=useState([])
  const [loading, setLoading] = useState(false);
  const getAllApprovals = async () => {
    
  
    try {
         const result = await CaseService.getPendingApprovals();
       
         
        
        if(result?.data?.status == 200){
        
          const transformedUsers =result?.data?.data?.data?.map(pa => ({
            id: pa.id,
            caseId: pa.p_case_id,
            simulationlink: pa.simulation_link_url,
            comments: pa.status,
            
            
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
    getAllApprovals()
  },[])
  //delete approval 
  const deleteApprovalFunction = async (id) => {
    setLoading(true)
  
    try {
         const result = await CaseService.deletePendingApproval(id);
         
        
        if(result?.data?.status == 200){
      
          toast.error(result?.data?.message, {
            autoClose: 2000,
            pauseOnHover: true,
            draggable: true,
            
          });
          getAllApprovals()
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
   const {currentUser} = useContext(AuthContext)
    const columns = [
        { 
            name: 'Case Id',
            selector: row => row.caseId,
            sortable: true,
        },
        {
          name: 'Simulation link',
          selector: row => <a href={row.simulationlink} target='_blank'>Simulation link</a>,
          sortable: true,
      },
        {
            name: 'Status',
            selector: row => <div>{row?.status == '1' ? 'Approved' : 'Cancelled'}</div>,
            sortable: true,
        },
        
        {
            name: 'Action',
            
            cell: row => (
                <>
                    <Link className='button-icon' to={`/update-approval/${row.id}`} >
                        <FiEdit />
                    </Link>
                    <Link className='button-icon'  to={`/approval-detail/${row.id}`}>
                        <GrView  />
                    </Link>
                    <div className='button-icon' onClick={() => deleteApprovalFunction(row.id)}>
                        <MdDeleteOutline />
                    </div>
                    
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
      {loading && <div className="loader-parent"><div className="_loader"></div></div>}
      {/* <ToastContainer /> */}
      <div className="d-flex justify-content-end mb-3">
        <Link to={'/create-approval'} className="button">Create New Approval </Link> 
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

export default PendingApprovals