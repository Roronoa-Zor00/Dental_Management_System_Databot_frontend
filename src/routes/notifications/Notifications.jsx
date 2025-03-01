// src/routes/notifications/Notifications.jsx
import React, { useEffect,useState,useContext,useMemo } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import Dummy from '../../images/dummy.jpeg'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { BiBorderRadius } from 'react-icons/bi';
import { AuthContext } from '../../components/authcontext/AuthContext';
import logo from '../../../src/images/logo.png'
import { NotificationService } from '../../api/NotificationService';
import {Pagination} from 'react-laravel-paginex';
import moment from 'moment';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";



const Notifications = () => {
  const navigate =useNavigate()
  const {currentUser,isReadNot,updateIsReadNot} = useContext(AuthContext)
  const userType = currentUser?.role_name
  const [notifications,setNotifications]=useState([])
  const permissions =currentUser?.permissions
  const [dataa,setDataa]=useState([])
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const api_url = process.env.REACT_APP_API_URL

  const getNotificationsApi = async (value) => {
      let current_page = 1;
      if(value && value.page){
        current_page = value.page;
      }
 
    try {
      setLoading(true)
        const result = await NotificationService.getNotifications(current_page);
         
        
        if(result?.data?.status == 200){
          setData(result.data.data);
        setNotifications(result?.data?.data.data)
          const transformedNotifications =result?.data?.data?.data?.map((user,index) => ({
            index:index + 1,
            id: user?.guid,
            isRead:user?.is_read,
            isReadAdmin:user?.is_read_admin,
            isReadCase:user?.is_read_case_submission,
            url: user.url_action,
            title: user.title,
            body: user.body,
            created_at: moment(user.created_at).format("dddd, MMMM Do YYYY, h:mm:ss A")
           
        }));
        setDataa(transformedNotifications)
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
    getNotificationsApi(1)
  },[])

  const readNotification= async (notId,redul)=>{
    setLoading(true)
    try {
      const result = await NotificationService.getNotificationDetail(notId);

      if (result?.data?.status == 200) {
        updateIsReadNot(!isReadNot)
        navigate(`/case-detail/${redul}`)
        setLoading(false)
    
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
    } finally {
      setLoading(false);
    }
  }
 
  //read all notifications
  const readAllNotificationsApi = async ()=>{
    setLoading(true)
    try {
      const result = await NotificationService.readAllNotifications();

      if (result?.data?.status == 200) {
        getNotificationsApi(1)
    
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
    } finally {
      setLoading(false);
    }
  }
  
   
    const columns = [
        {
            name: '#',
            selector: row => row.index,
            sortable: true,
        },
        {
          name: 'Title',
          selector: row => row.title,
          sortable: true,
      },
        {
          name: 'Text',
          selector: row => row.body,
          sortable: true,
      },
      {
        name: 'Created',
        selector: row => row.created_at,
        sortable: true,
    },
        
        {
            name: 'Action',
            
            cell: row => (
                <div className='icons__parent'>
                   
                <Link title='View User' className='button-icon' onClick={()=>readNotification(row?.id,row.url)}>
                        <GrView   />
                    </Link>
                    
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
  
    const conditionalRowStyles = [
 
      {
          when: row => row.isRead == '1' && userType !== 'super_admin' && userType !== 'case_submission',
          style: {
              backgroundColor: '#ffffff',  
          },
          classNames: ['read-notification'],
      },
      
      {
          when: row => row.isRead == '0' && userType !== 'super_admin' && userType !== 'case_submission',
          style: {
              backgroundColor: '#ddd',  
          },
          classNames: ['unread-notification'],
      },
      
      {
          when: row => row.isReadAdmin == '1' && userType == 'super_admin',
          style: {
              backgroundColor: '#ffffff',  
          },
          classNames: ['read-notification'],
      },
     
      {
          when: row => row.isReadAdmin == '0' && userType == 'super_admin',
          style: {
              backgroundColor: '#ddd',  
          },
          classNames: ['unread-notification'],
      },
     
      {
          when: row => row.isReadCase == '1' && userType == 'case_submission',
          style: {
              backgroundColor: '#ffffff',  
          },
          classNames: ['read-notification'],
      },
      
      {
          when: row => row.isReadCase == '0' && userType == 'case_submission',
          style: {
              backgroundColor: '#ddd',  
          },
          classNames: ['unread-notification'],
      },
  ];
  


// Function to handle delete action

  return (
    <div className='users-wrapper'>
      <div className="d-flex justify-content-end mb-3">
        <button className="button" onClick={readAllNotificationsApi}>Read All Notifications</button>

      </div>
      {loading && <div className="loader-parent"><div className="_loader"></div></div>}
      {/* <ToastContainer /> */}
      
          <DataTable
			columns={columns}
			data={dataa}
      conditionalRowStyles={conditionalRowStyles} 
           
		/>
    <Pagination changePage={getNotificationsApi} data={data}/>
    </div>
  )
}

export default Notifications