import React, { useState, useEffect } from 'react'
import { SoftwareService } from '../../api/SoftwareService';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const UpdateSoftware = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('')

    const navigate = useNavigate()
    const getSoftwareDetailFunction = async (id) => {


        try {
            const result = await SoftwareService.getSoftwareDetail(id);



            if (result?.data?.status == 200) {


                setName(result?.data?.data?.name)

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



    useEffect(() => {
        getSoftwareDetailFunction(id)
    }, [id])
    const updateSoftwareApi = async () => {



        try {
            const formData = new FormData()
            if (!name) {
                toast.error("please enter  name", {
                    autoClose: 2000,
                    pauseOnHover: true,
                    draggable: true,

                });
            }



            else {
                setLoading(true)
                if (name) {
                    formData.append('name', name)
                }

                const result = await SoftwareService.updateSoftware(id, formData);
                if (result?.data?.status == 200) {
                    toast.success(result?.data?.message, {
                        autoClose: 1000,
                        pauseOnHover: true,
                        draggable: true,

                    });
                    setTimeout(() => {
                        navigate('/softwares')
                    }, 1300)

                }
                else {
                    toast.error(result?.data?.message, {
                        autoClose: 2000,
                        pauseOnHover: true,
                        draggable: true,

                    });
                }

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
    return (
        <div className='form-wrapper'>
            {/* <ToastContainer /> */}
            {loading && <div className="loader-parent"><div className="_loader"></div></div>}
            <div className="title">
                Update Software
            </div>
            <div className="row">
                <div className="col-12 col-md-12 mb-4">
                    <label htmlFor="">Enter name</label>
                    <input type="text" className='input' value={name} onChange={(e) => setName(e.target.value)} />
                </div>

            </div>

            <div className="d-flex justify-content-center my-3">
                <button className="button" onClick={updateSoftwareApi}>Update now </button>
            </div>

        </div>
    )
}

export default UpdateSoftware