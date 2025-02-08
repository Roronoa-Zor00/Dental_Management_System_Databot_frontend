// src/api/SoftwaresService.js
import axios from 'axios';
const api_url = process.env.REACT_APP_API_URL;

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = `${api_url}/api`
// axios.defaults.headers.common['Authorization'] = 'Bearer'+AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

//Create Case
async function createCase(data) {
    try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
        var config = {
            method: 'post',
            url: '/external_patient_cases/store',
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json', 
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + AUTH_TOKEN
            },
            data: data
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

//update Case
async function updateCase(id, data) {
    console.log(data);
    try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
        var config = {
            method: 'post',
            url: `/external_patient_cases/update/${id}`,
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json', 
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + AUTH_TOKEN
            },
            data: data
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

//get case detail
async function getCaseDetail(id) {
    try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
        var config = {
            method: 'get',
            url: `/external_patient_cases/${id}`,
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json', 
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + AUTH_TOKEN
            },
            data: ''
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

//delete case
async function deleteCase(id) {
    try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
        var config = {
            method: 'delete',
            url: `/external_patient_cases/${id}`,
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json', 
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + AUTH_TOKEN
            },
            data: ''
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

//get all External Cases
async function getCases() {
    try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
        var config = {
            method: 'get',
            url: '/external_patient_cases',
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json', 
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + AUTH_TOKEN
            },
            data: ''
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

export const ExternalPatientCaseService = { getCases, createCase, deleteCase, getCaseDetail, updateCase }