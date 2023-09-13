import {useEffect} from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const Login = ({setIsAuthenticated,isAuthenticated}) => {
    const token = localStorage.getItem('token');
    // const urlBack= "https://matiaspage.onrender.com"
    const urlBack="https://vps-3582101-x.dattaweb.com";

    const showLoginDialog = () => {
        const swalModal = Swal.fire({
            title: 'Iniciar sesión',
            html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
                   <input type="password" id="password" class="swal2-input" placeholder="Password">`,
            confirmButtonText: 'Sign in',
            confirmButtonColor: "#DD6B55",
            focusConfirm: false,
            preConfirm: () => {
                const login = Swal.getPopup().querySelector('#login').value;
                const password = Swal.getPopup().querySelector('#password').value;
                if (!login || !password) {
                    Swal.showValidationMessage(`Please enter login and password`);
                }
                return { login: login, password: password };
            },
            showCloseButton: true,
            allowOutsideClick: true,
        });
    
        swalModal.then((result) => {
            if (!result.isConfirmed) {
                window.location.href = "/";
            } else {
                const username = result.value.login;
                const password = result.value.password;
                loginUser(username, password);
            }
        });
    };
    const loginUser = async (username, password) => {
        const loginData = { username, password };
        try {
            const response = await axios.post(`${urlBack}/login`, loginData);
            const token = response.data.token;
            if (token) {
                const { exp } = JSON.parse(atob(token.split('.')[1])); // Decodificar el token
                if (Date.now() < exp * 1000) {
                    // Configurar un temporizador para eliminar el token cuando expire
                    const expiresIn = (exp * 1000) + (3 * 60 * 60 * 1000) - Date.now(); //tres horas

                    setTimeout(() => {
                        handleLogoutTime();
                    },expiresIn);
                  } 

                localStorage.setItem('token', token);
                setIsAuthenticated(true);
                Swal.fire({
                    title: '¡Inicio de sesión exitoso!',
                    text: 'Has ingresado correctamente.',
                    icon: 'success'
                });
            }else{
                Swal.fire({
                    title: 'Error de inicio de sesión',
                    text: 'Usuario o contraseña incorrectos.',
                    icon: 'error'
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    title: 'Error de inicio de sesión',
                    text: 'Usuario o contraseña incorrectos.',
                    icon: 'error'
                }).then(() => {
                    showLoginDialog();
                });
            }else{
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al iniciar sesión. Por favor, intenta nuevamente.',
                    icon: 'error'
                });
            }
        }
    }

    const handleLogoutTime = async () => {
       await Swal.fire({
            icon: 'warning',
            title: 'Sesión Expirada',
            text: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.',
            confirmButtonColor: "#DD6B55",
            confirmButtonText: 'Iniciar Sesión',
            allowOutsideClick: false,
        }).then((result) => {
            if (!result.isConfirmed) {
                window.location.href = "/";
            } else {
                showLoginDialog();
            }
        });
  
        const token = localStorage.getItem("token");
        await axios.post(
        `${urlBack}/logout`,
        {},
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
        localStorage.removeItem("token");
        setIsAuthenticated(false)  
    };


    useEffect(() => {
        if(!isAuthenticated && !token) {
            showLoginDialog();
        }
    },[isAuthenticated,token]);

return (
    <div>
    </div>
    )
}

export default Login;
