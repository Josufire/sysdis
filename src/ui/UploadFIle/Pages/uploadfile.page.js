import React , {useContext }from 'react'
import { useNavigate } from 'react-router-dom'
import * as xlsx from 'xlsx'
import { DataContext } from '../../Hooks/jsonContext'


export const  FileUpload =()=>{
    const {setData} = useContext(DataContext)
    let navigate = useNavigate()
    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                setData(json)
                alert("Se ha cargado la data correctamente")
                navigate('/')

            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }
    return (
        <form>
        <label htmlFor="upload">Subir excel</label>
        <input
            type="file"
            name="upload"
            id="upload"
            onChange={readUploadFile}
        />
    </form>
    
    )
}