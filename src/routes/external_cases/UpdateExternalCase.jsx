// src/routes/teams/CreateTeam.jsx
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { ExternalPatientCaseService } from '../../api/ExternalPatientCaseService'
import { AuthService } from '../../api/AuthService'
import { SoftwareService } from '../../api/SoftwareService';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const UpdateExternalCase = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false);
    const [client, setClient] = useState(null);
    const [clients, setClients] = useState([]);
    const [software, setSoftware] = useState(false);
    const [softwares, setSoftwares] = useState([]);
    const [status, setStatus] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateStr, setSelectedDateStr] = useState(null);
    const [caseId, setCaseId] = useState(null);
    const [name, setName] = useState(null);

    const navigate = useNavigate()

    const caseStatues = [
        {
            "value": 1,
            "name": "New Case"
        },
        {
            "value": 2,
            "name": "In Planning"
        },
        {
            "value": 3,
            "name": "Ready for QA"
        },
        {
            "value": 4,
            "name": "Need More Info"
        },
        {
            "value": 5,
            "name": "Case updated by ortho"
        },
        {
            "value": 6,
            "name": "Rejected By QA"
        },
        {
            "value": 7,
            "name": "Pending Ortho Check"
        },
        {
            "value": 8,
            "name": "Need Modifications"
        },
        {
            "value": 9,
            "name": "Pending Step Files"
        },
        {
            "value": 10,
            "name": "Pending Container files"
        },
        {
            "value": 11,
            "name": "Stl files ready"
        },
        {
            "value": 12,
            "name": "Container files ready"
        },
        {
            "value": 13,
            "name": "Need Stl File Modifications"
        },
        {
            "value": 14,
            "name": "Need Container File Modifications"
        },
        {
            "value": 15,
            "name": "Pending direct printing files"
        },
        {
            "value": 16,
            "name": "Direct printing files ready"
        },
        {
            "value": 17,
            "name": "Need direct printing files Modifications"
        },
        {
            "value": 18,
            "name": "Case completed"
        }
    ];

    const getAllClients = async () => {

        setLoading(true);
        try {
            var clients = await AuthService.getAllUsers();
            if (clients?.data?.status == 200) {
                setClients(clients?.data?.data)
            } else {
                toast.error(clients?.data?.message ? clients?.data?.message : 'Error fetching clients!', {
                    autoClose: 2000,
                    pauseOnHover: true,
                    draggable: true,

                });
            }
        }
        catch (error) {
            toast.error('Error fetching clients!', {
                autoClose: 2000,
                pauseOnHover: true,
                draggable: true,

            });
        }

        setLoading(false);

    }

    const getAllSoftwares = async () => {

        setLoading(true);
        try {
            var softwares = await SoftwareService.getSoftwares();
            if (softwares?.data?.status == 200) {
                setSoftwares(softwares?.data?.data)
            } else {
                toast.error(softwares?.data?.message ? softwares?.data?.message : 'Error fetching softwares!', {
                    autoClose: 2000,
                    pauseOnHover: true,
                    draggable: true,

                });
            }
        }
        catch (error) {
            toast.error('Error fetching softwares!', {
                autoClose: 2000,
                pauseOnHover: true,
                draggable: true,

            });
        }
        setLoading(false);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedDateStr(format(date, "yyyy-MM-dd HH:mm:ss"));
    };

    const getCaseDetail = async (id) => {
        setLoading(true);
        var casedetai = await ExternalPatientCaseService.getCaseDetail(id);

        if (casedetai?.data?.status == 200) {

            if (casedetai?.data?.data?.name) {
                setName(casedetai?.data?.data?.name);
            }

            if (casedetai?.data?.data?.case_id) {
                setCaseId(casedetai?.data?.data?.case_id);
            }

            if (casedetai?.data?.data?.client_id) {
                setClient(casedetai?.data?.data?.client_id);
            }

            if (casedetai?.data?.data?.client_id) {
                setSoftware(casedetai?.data?.data?.software_id);
            }

            if (casedetai?.data?.data?.status) {
                setStatus(casedetai?.data?.data?.status);
            }

            if (casedetai?.data?.data?.case_datetime) {
                setSelectedDate(casedetai?.data?.data?.case_datetime);
                setSelectedDateStr(format(casedetai?.data?.data?.case_datetime, "yyyy-MM-dd HH:mm:ss"));
            }

        }
        else {
            toast.error(casedetai?.data?.message ? casedetai?.data?.message : "Unable to get case detail!", {
                autoClose: 2000,
                pauseOnHover: true,
                draggable: true,

            });
        }
        setLoading(false);

    };

    useEffect(() => {
        getAllClients();
    }, []);

    useEffect(() => {
        getAllSoftwares();
    }, []);

    useEffect(() => {
        getCaseDetail(id);
    }, []);

    const UpdateCaseApi = async () => {

        setLoading(true);

        try {
            const formData = new FormData()
            if (!client) {
                toast.error("Please select client!", {
                    autoClose: 2000,
                    pauseOnHover: true,
                    draggable: true,

                });
                setLoading(false);
            } else if (!software) {
                toast.error("Please select software!", {
                    autoClose: 2000,
                    pauseOnHover: true,
                    draggable: true,

                });
                setLoading(false);
            } else if (!status) {
                toast.error("Please select status!", {
                    autoClose: 2000,
                    pauseOnHover: true,
                    draggable: true,

                });
                setLoading(false);
            } else if (!selectedDateStr) {
                toast.error("Please select date!", {
                    autoClose: 2000,
                    pauseOnHover: true,
                    draggable: true,

                });
                setLoading(false);
            } else if (!caseId) {
                toast.error("Please input Case ID!", {
                    autoClose: 2000,
                    pauseOnHover: true,
                    draggable: true,

                });
                setLoading(false);
            } else if (!name) {
                toast.error("Please input Patient Name!", {
                    autoClose: 2000,
                    pauseOnHover: true,
                    draggable: true,

                });
                setLoading(false);
            }
            else {
                setLoading(true)
                formData.append('client_id', client);
                formData.append('software_id', software);
                formData.append('status', status);
                formData.append('case_datetime', selectedDateStr);
                formData.append('name', name);
                formData.append('case_id', caseId);

                const result = await ExternalPatientCaseService.updateCase(id, formData);
                if (result?.data?.status == 200) {
                    toast.success(result?.data?.message, {
                        autoClose: 1000,
                        pauseOnHover: true,
                        draggable: true,

                    });
                    setLoading(false);
                    setTimeout(() => {
                        navigate('/external-cases')
                    }, 1300)

                }
                else {
                    setLoading(false);
                    toast.error(result?.data?.message, {
                        autoClose: 2000,
                        pauseOnHover: true,
                        draggable: true,

                    });
                }

            }

        } catch (error) {
            setLoading(false);
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

    return (
        <div className='form-wrapper'>
            {/* <ToastContainer /> */}
            {loading && <div className="loader-parent"><div className="_loader"></div></div>}
            <div className="title">
                Update Case
            </div>
            <div className="row">
                <div className="col-12 col-md-6 mb-4">
                    <label htmlFor="">Case ID</label>
                    <input type="text" className="input" value={caseId} onChange={(e) => setCaseId(e.target.value)}/>
                </div>
                <div className="col-12 col-md-6 mb-4">
                    <label htmlFor="">Patient Name</label>
                    <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="col-12 col-md-6 mb-4">
                    <label htmlFor="">Client</label>
                    <select className="input" value={client} onChange={(e) => setClient(e.target.value)}>
                        <option value="" key={0}>Please select client</option>
                        {clients?.map((client) => <option key={client?.id} value={client?.id} >{`${client?.first_name} ${client?.last_name}`}</option>)}
                    </select>
                </div>
                <div className="col-12 col-md-6 mb-4">
                    <label htmlFor="">Software</label>
                    <select className="input" value={software} onChange={(e) => setSoftware(e.target.value)}>
                        <option value="" key={0}>Please select software</option>
                        {softwares?.map((software) => <option key={software?.id} value={software?.id} >{software?.name}</option>)}
                    </select>
                </div>
                <div className="col-12 col-md-6 mb-4">
                    <label htmlFor="">Status</label>
                    <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="" key={0}>Please select status</option>
                        {caseStatues?.map((status) => <option key={status?.value} value={status?.value} >{status?.name}</option>)}
                    </select>
                </div>
                <div className="col-12 col-md-6 mb-4">
                    <label htmlFor="">Case Datetime</label>
                    <DatePicker
                        selected={typeof (selectedDate) == 'string' ? new Date(selectedDate) : selectedDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={1}
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                        className="border p-2 rounded"
                    />
                </div>
            </div>

            <div className="d-flex justify-content-center my-3">
                <button className="button" onClick={UpdateCaseApi}>Update Case </button>
            </div>

        </div>
    )
}

export default UpdateExternalCase