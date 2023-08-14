import { useState, useEffect } from "react";
import axios from "axios";
import style from "./Folders.module.css";
import Swal from 'sweetalert2';
import UploadImage from "../Files/UploadFile";

const Folder = ({isAuthenticated}) => {
    const [folders, setFolders] = useState([]);
    const token = localStorage.getItem('token');
    const [folderName, setFolderName] = useState("");
    const [modal, setModal] = useState(false);

    const openModal =()=>{
            setModal(true);
        
    }

    const allFolders = async()=>{
        const token = localStorage.getItem('token');
       const result = await axios.get(`http://localhost:3001/folders/allFolders`,{
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, 
          },
       })
       setFolders([...result.data])
    }

    const newFolder = async()=>{
        const { value: subfolder } = await Swal.fire({
            title: 'Insertar dato',
            input: 'text',
            inputLabel: 'Nuevo dato:',
            inputPlaceholder: 'Escribe aquí...',
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return 'Debes ingresar un valor';
              }
            } 
        })
        if (subfolder) {
            insertNewFolder(subfolder);
          }
    }
    
    const insertNewFolder =async (subfolder)=>{
        const folder = {subfolder:subfolder}
        try{
            Swal.showLoading();
            const result = await axios.post("http://localhost:3001/folders/createFolder",folder,{
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`, 
                  },
            });
            Swal.hideLoading();
            Swal.fire({
            position: 'center',
            icon: 'success',
            title: result.data,
            showConfirmButton: false,
            timer: 1500
            });
        }catch(error) {
            // Ocultar mensaje de carga en caso de error
            Swal.hideLoading();
            const errorMessage = error.response?.data || "Error al crear carpeta";
            // Mostrar alerta de error con el mensaje del servidor o el mensaje predeterminado
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al enviar la solicitud',
                text: errorMessage,
                showConfirmButton: true
            });
        }
    } 
    const deleteFolder =async (idDb)=>{
        try{
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción eliminará la carpeta permanentemente.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
              });
            if(result.isConfirmed){
                const deleteFolder = await axios.delete(`http://localhost:3001/folders/deleteFolder/${idDb}`,{
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${token}`, 
                      },
                });
                if(deleteFolder){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: "Carpeta eliminada",
                        showConfirmButton: false,
                        timer: 1500
                        });
                }
            }
        }catch(err) {
            console.log(err)
        }
    }

    const nameFolder = (name)=>{
        setFolderName(name)
    }
    
    useEffect(()=>{
        if(isAuthenticated){
            allFolders();
        }
    },[isAuthenticated,folders])

    return (
        <div className="container">
            <h1>Folder</h1>
            <ul className={`${style['square-boxes']} d-flex justify-content-center" key="key" `}>                  
                {
                    isAuthenticated && folders ? folders.map((foldername,key) => (
                        <div key={key}> 

                        <li className={style.box} key={foldername.id} onClick={() => { nameFolder(foldername.name); openModal(); }}>{foldername.name}</li>
                            <button type="button" className="btn  btn-danger mt-2" onClick={()=>deleteFolder(foldername.id)}>Eliminar</button>

                        </div>
                    )
                    ):""
                }
                <li className={`${style['box_new_folder']}`} key="-1" onClick={newFolder}>Nueva Carpeta</li>
        </ul>
                <UploadImage folderName={folderName} modal={modal}></UploadImage>
        </div>
    );
}

export default Folder;
