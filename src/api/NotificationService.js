// src/api/AuthService.js
import axios from 'axios';
const api_url = process.env.REACT_APP_API_URL;

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = `${api_url}/api`;
// axios.defaults.headers.common['Authorization'] = 'Bearer'+AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';



//Notifications api
//add Notification

  async function addNotification(data){
    try {
      let AUTH_TOKEN = window.localStorage.getItem('token');
       var config = {
           method: 'post',
           url: '/notifications/store',
           headers:{
            'Accept': 'application/json', 
            // 'Content-Type': 'application/json', 
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer '+AUTH_TOKEN
          },
           data : data
       };
       
     return await axios(config)
       .then(function (response) {
         return response;
       })
       .catch(function (error) {
         return error.response
     });
    } catch (err) {
     return err
    }
  }
//get notifications


async function getNotifications(current_page=1){
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
     var config = {
         method: 'get',
         url: `/notifications?current_page=${current_page}&paginate=yes`,
         headers:{
          'Accept': 'application/json', 
          // 'Content-Type': 'application/json', 
          "Content-Type": "multipart/form-data",
          'Authorization': 'Bearer '+AUTH_TOKEN
        },
         data : ''
     };
     
   return await axios(config)
     .then(function (response) {
       return response;
     })
     .catch(function (error) {
       return error.response
   });
  } catch (err) {
   return err
  }
}


//get Notification detail

async function getNotificationDetail(id){
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
     var config = {
         method: 'get',
         url: `/notifications/${id}`,
         headers:{
          'Accept': 'application/json', 
          'Content-Type': 'application/json', 
          // "Content-Type": "multipart/form-data",
          'Authorization': 'Bearer '+AUTH_TOKEN
        },
         data : ''
     };
     
   return await axios(config)
     .then(function (response) {
       return response;
     })
     .catch(function (error) {
       return error.response
   });
  } catch (err) {
   return err
  }
}

//read all notifications


async function readAllNotifications(){
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
     var config = {
         method: 'post',
         url: '/notifications_read_all',
         headers:{
          'Accept': 'application/json', 
          'Content-Type': 'application/json', 
          // "Content-Type": "multipart/form-data",
          'Authorization': 'Bearer '+AUTH_TOKEN
        },
         data : ''
     };
     
   return await axios(config)
     .then(function (response) {
       return response;
     })
     .catch(function (error) {
       return error.response
   });
  } catch (err) {
   return err
  }
}





export const NotificationService= { addNotification,getNotificationDetail,getNotifications,readAllNotifications}