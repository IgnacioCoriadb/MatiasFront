/* eslint-disable no-fallthrough */
import {useState} from "react";
import Swal from 'sweetalert2';
import axios from "axios";
import style from "./Contact.module.css";

const Contact = ()=>{
    const [formData, setFormData] =useState({
        name:'',
        lastname: '',
        email: '',
        message:''
    })

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[a-zA-Z\s]+$/;
        switch (true) {
            case formData.name === "":
                Swal.fire({
                    confirmButtonColor:'#007bff',
                    title: "El campo 'Nombre' está vacío"
                });
            break;
            case formData.lastname === "":
                Swal.fire({
                    confirmButtonColor:'#007bff',
                    title:"El campo 'Apellido' está vacío"
                });
            break;
            case formData.email === "":
                Swal.fire({
                    confirmButtonColor:'#007bff',
                    title:"El campo 'Email' está vacío"
                });
            break;
            case formData.message === "":
                Swal.fire({
                    confirmButtonColor:'#007bff',
                    title:"El campo 'Mensaje' está vacío"
                });
            break;
            case  !emailRegex.test(formData.email):
                Swal.fire({
                    confirmButtonColor:'#007bff',
                    title:"El campo  tiene que ser un email"
                });
            break;
            case  !nameRegex.test(formData.name):
                Swal.fire({
                    confirmButtonColor:'#007bff',
                    title:'El campo "Nombre" no permite símbolos '
                });
            break;
            case  !nameRegex.test(formData.lastname):
                Swal.fire({
                    confirmButtonColor:'#007bff',
                    title:'El campo "Apellido" no permite símbolos'
                });
            break;
            default:
                try {
                    Swal.showLoading();
                    const submit = await axios.post("http://localhost:3001/contact",formData);
                   
                    Swal.hideLoading();
                    if(submit.status === 200)
                    // Mostrar alerta de éxito si la solicitud se completó con éxito
                    Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: submit.data,
                    showConfirmButton: false,
                    timer: 1500
                    });
                    setFormData({
                        name:'',
                        lastname: '',
                        email: '',
                        message:''
                    })
                } catch (error) {
                    // Ocultar mensaje de carga en caso de error
                    Swal.hideLoading();
                // Mostrar alerta de error si ocurrió un problema en la solicitud
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Error al enviar la solicitud',
                        text: error.message, 
                        showConfirmButton: true
                    });
                    }
            break;
        }
    }
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    return (
        <div class="container">
        <div class="row justify-content-center contact">
            <div class="col-md-8">
                <div class="well well-sm">
                    <form class="form-horizontal"  onSubmit={handleSubmit} method="post">
                        <fieldset>
                            <legend class={`text-center  ${style['bigicon']}`}>Contact us</legend>
                            <div class="form-group">
                                <span class="col-md-1 col-md-offset-2 text-center"><i class={`fa fa-user ${style['bigicon']}`}></i></span>
                                <div class="col-md-10 offset-md-1">
                                    <input 
                                        id="fname"
                                        name="name"
                                        type="text"
                                        placeholder="First Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        class="form-control mb-3"
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <span class="col-md-1 col-md-offset-2 text-center"><i class={`fa fa-user ${style['bigicon']}`}></i></span>
                                <div class="col-md-10 offset-md-1">
                                    <input 
                                        id="lname"
                                        name="lastname"
                                        type="text"
                                        placeholder="Last Name"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        class="form-control mb-3"
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <span class="col-md-1 col-md-offset-2 text-center"><i class={`fa fa-user ${style['bigicon']}`}></i></span>
                                <div class="col-md-10 offset-md-1">
                                    <input 
                                        id="email"
                                        name="email"
                                        type="text"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        class="form-control mb-3"
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <span class="col-md-1 col-md-offset-2 text-center"><i class={`fa fa-user ${style['bigicon']}`}></i></span>
                                <div class="col-md-10 offset-md-1">
                                    <textarea 
                                        class="form-control mb-3"
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Enter your massage for us here."
                                        rows="7">
                                    </textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12 text-center">
                                    <button type="submit" class="btn btn-primary bg-dark">Submit</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Contact;