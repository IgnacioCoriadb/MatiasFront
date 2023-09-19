import axios from "axios";
import Swal from 'sweetalert2';

const Logout = ()=>{
    // const urlBack= "https://matiaspage.onrender.com"
    const urlBack="https://vps-3582101-x.dattaweb.com";


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
            window.location.href = "/";
        }
    };
 
    return(
        <div>
            <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
        </div>
    )
}


export default Logout;