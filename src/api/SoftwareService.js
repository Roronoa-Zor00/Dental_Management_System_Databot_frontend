// src/api/SoftwaresService.js
import axios from 'axios';
const api_url = process.env.REACT_APP_API_URL;

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = `${api_url}/api`
// axios.defaults.headers.common['Authorization'] = 'Bearer'+AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

//Create Software
async function createSoftware(data) {
    try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
        var config = {
            method: 'post',
            url: '/softwares/store',
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

//update Software
async function updateSoftware(id, data) {
    try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
        var config = {
            method: 'post',
            url: `/softwares/update/${id}`,
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

//get all Software
async function getSoftwares() {
    try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
        var config = {
            method: 'get',
            url: '/softwares',
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

//get Software detail
async function getSoftwareDetail(id) {
    try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
        var config = {
            method: 'get',
            url: `/softwares/${id}`,
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

//delete team
async function deleteSoftware(id) {
    try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
        var config = {
            method: 'delete',
            url: `/softwares/${id}`,
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

export const SoftwareService = { createSoftware, updateSoftware, getSoftwares, getSoftwareDetail, deleteSoftware }