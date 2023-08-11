import {useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const Login = ({setIsAuthenticated,isAuthenticated}) => {
    const navigate = useNavigate();

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
                setIsAuthenticated(true);
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

    const handleLogout = async () => {
    const confirmed = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cerrar sesión",
        cancelButtonText: "Cancelar",
    });

  if (confirmed.isConfirmed) {
    // Realiza la llamada a la API para cerrar sesión
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3001/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Elimina el token y redirige al inicio de sesión
    localStorage.removeItem("token");
    setIsAuthenticated(false)
    navigate("/");
  }
};


useEffect(() => {
    if(!isAuthenticated){
        showLoginDialog();
    }
},[]);

return (
    <div>
        <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
    </div>
    )
}

export default Login;
