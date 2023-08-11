import {useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const Login = () => {
    const showLoginDialog = () => {
        Swal.fire({
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
        }).then((result) => {
            if (result.isConfirmed) {
                const username = result.value.login;
                const password = result.value.password;
                loginUser(username, password);
            }
        });
    };
const loginUser = async (username, password) => {
    const loginData = { username, password };
    try {
        const response = await axios.post("http://localhost:3001/login", loginData);
        const token = response.data.token;
        if (token) {
            localStorage.setItem('token', token);
            Swal.fire({
                title: '¡Inicio de sesión exitoso!',
                text: 'Has ingresado correctamente.',
                icon: 'success'
        });
        } else {
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
    
useEffect(() => {
    showLoginDialog();
},[]);

    return (
        <div>

        </div>
    )
}

export default Login;
