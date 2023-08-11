import { useState, useEffect } from "react";
import axios from "axios";
import style from "./Folders.module.css";

const Folder = ({isAuthenticated}) => {
    const [folders, setFolders] = useState([]);

    const allImages = async()=>{
        const token = localStorage.getItem('token');
       const result = await axios.get(`http://localhost:3001/folders/allFolders`,{
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, 
          },
       })
       setFolders([...result.data])
    }

useEffect(()=>{
    if(isAuthenticated){
        allImages();
    }
},[isAuthenticated])


return (
    <div className="container">
        <h1>Folder</h1>
        <ul className={`${style['square-boxes']} d-flex justify-content-center" key="key" `}>                  
            {
                isAuthenticated && folders ? folders.map((foldername,key) => (
                    <div key={key}> 
                        <li className={style.box} key={foldername.id}>{foldername.name}</li>
                    </div>
                )
                ):""
            }
            
       </ul>
    </div>
  );
}

export default Folder;
