// src/routes/users/Users.jsx
import React, { useEffect,useState,useContext,useMemo } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import Dummy from '../../images/dummy.jpeg'
import DataTable from 'react-data-table-component';
import { BiBorderRadius } from 'react-icons/bi';
import { AuthContext } from '../../components/authcontext/AuthContext';
import logo from '../../../src/images/logo.png'
import { AuthService } from '../../api/AuthService';
import {Pagination} from 'react-laravel-paginex'

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";



const Users = () => {
  const {currentUser} = useContext(AuthContext)
  const userType = currentUser?.roles[0]?.name
  const [users,setUsers]=useState([])
  const permissions =currentUser?.permissions
  const [dataa,setDataa]=useState([])
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search,setSearch]=useState('')
  const api_url = process.env.REACT_APP_API_URL

  const getAllUsers = async (value=1) => {
    setData([])
    setDataa([])
      let current_page = 1;
      if(value && value.page){
        current_page = value.page;
      }
 
    try {
      setLoading(true)
        const result = await AuthService.getUsers(current_page,search);
         
        
        if(result?.data?.status == 200){
          setData(result.data.data);
        setUsers(result?.data?.data.data)
          const transformedUsers =result?.data?.data?.data?.map(user => ({
            id: user.guid,
            firstname: user.first_name,
            lastname: user.last_name,
            email: user.email,
            userId: user.username,
            image: user?.profile_pic ? `${api_url}/uploads/${user?.profile_pic}` : logo,
        }));
        setDataa(transformedUsers)
        setLoading(false)
          
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
    getAllUsers(1)
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
         const result = await AuthService.deleteUser(id);
         
        
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
            name: 'User id',
            selector: row => row.userId,
            sortable: true,
        },
       
        {
            name: 'Profile',
            selector: row => <img className='user_profile' src={row.image}   />,
            sortable: true,
        },
        {
            name: 'Action',
            
            cell: row => (
                <div className='icons__parent'>
                   {permissions?.includes("users-update") && <Link title='Edit User' className='button-icon' to={`/edit-user/${row.id}`} >
                        <FiEdit  />
                    </Link>}
                    {permissions?.includes("users-update") &&    <Link title='View User' className='button-icon'  to={`/user-detail/${row.id}`}>
                        <GrView   />
                    </Link>}
                    {permissions?.includes("users-delete") &&    <div title='Delete User' className='button-icon' onClick={() => deleteUserFunction(row.id)}>
                        <MdDeleteOutline  />
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
      <div className="d-flex justify-content-between mb-3">
       <div className='d-flex gap-3'>
       <input type="text" placeholder='Search user by name or email' className="input search-input" value={search} onChange={(e)=>setSearch(e.target.value)} />
        <button className='button' onClick={getAllUsers}>
          Filter
        </button>
       </div>
      {permissions?.includes("users-store")  && <Link to={'/create-user'} className="button">Create New User </Link> }
      </div>
          <DataTable
			columns={columns}
			data={dataa}
           
		/>
    <Pagination changePage={getAllUsers} data={data}/>
    </div>
  )
}

export default Users