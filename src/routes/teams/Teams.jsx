import React, { useEffect,useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import Dummy from '../../images/dummy.jpeg'
import DataTable from 'react-data-table-component';
import { BiBorderRadius } from 'react-icons/bi';
import { AuthContext } from '../../components/authcontext/AuthContext';
import { TeamService } from '../../api/TeamsService';
import { useContext } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineAssignmentInd } from "react-icons/md";


const  Teams = () => {
  const [dataa,setDataa]=useState([])
  const [loading, setLoading] = useState(false);
  const {currentUser} = useContext(AuthContext)
  const userType = currentUser?.roles[0]?.name
  const permissions =currentUser?.permissions
  const getAllTeams = async () => {
    
  
    try {
         const result = await TeamService.getTeams();
       
         
        
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
    getAllTeams()
  },[])
  //delete user 
  const deleteTeamFunction = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this team?");

    if (!isConfirmed) {
      // If the user cancels, exit the function early
      return;
    }
    setLoading(true)
  
    try {
         const result = await TeamService.deleteTeam(id);
        
         
        
        if(result?.data?.status == 200){
      
          toast.error(result?.data?.message, {
            autoClose: 2000,
            pauseOnHover: true,
            draggable: true,
            
          });
          getAllTeams()
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
                   {permissions?.includes("teams-update") && <Link title='Update Team' className='button-icon' to={`/update-team/${row.id}`} >
                        <FiEdit />
                    </Link>}
                    {permissions?.includes("teams-detail") &&  <Link title='View Team' className='button-icon'  to={`/team-detail/${row.id}`}>
                        <GrView  />
                    </Link>}
                    {permissions?.includes("teams-assings-to-users") &&  <Link title='Assign Team' className='button-icon'  to={`/team-detail/${row.id}`}>
                        <MdOutlineAssignmentInd  />
                    </Link>}
                    {permissions?.includes("teams-delete") &&   <div title='Delete Team' className='button-icon' onClick={() => deleteTeamFunction(row.id)}>
                        <MdDeleteOutline />
                    </div> }
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
      {permissions?.includes("teams-store") &&    <div className="d-flex justify-content-end mb-3">
        <Link to={'/create-team'} className="button">Create New Team </Link> 
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

export default Teams