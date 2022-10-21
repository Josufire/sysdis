import React from 'react'
import {BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from '../../../Home/Pages/home.page'
import { FileUpload} from '../../../UploadFIle/Pages/uploadfile.page'


export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
              
                    <Route path='/' element={<Home/>} />
                    <Route path='/excel' element={<FileUpload/>} />
                   

            </Routes>
        </BrowserRouter>
    )
}