// src/api/SubClientsService.js
import axios from 'axios';
const api_url = process.env.REACT_APP_API_URL;

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = `${api_url}/api`;
// axios.defaults.headers.common['Authorization'] = 'Bearer'+AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';
//subclients api start here
//add subclient

async function addSubClient(data){
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
     var config = {
         method: 'post',
         url: '/sub_clients/store',
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
//update user
async function updateSubClient(id,data){
try {
  let AUTH_TOKEN = window.localStorage.getItem('token');
   var config = {
       method: 'post',
       url: `/sub_clients/update/${id}`,
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
// get users list

async function getSubClients(){
try {
  let AUTH_TOKEN = window.localStorage.getItem('token');
   var config = {
       method: 'get',
       url: '/sub_clients',
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


//get user detail

async function getSubClientDetail(id){
try {
  let AUTH_TOKEN = window.localStorage.getItem('token');
   var config = {
       method: 'get',
       url: `/sub_clients/${id}`,
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
// delete user

async function deleteSubClient(id){
try {
  let AUTH_TOKEN = window.localStorage.getItem('token');
   var config = {
       method: 'delete',
       url: `/sub_clients/${id}`,
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


export const SubClientService= {addSubClient,updateSubClient,deleteSubClient,getSubClientDetail,getSubClients}