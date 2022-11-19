import React, { useState } from 'react'

import LayoutPage from './ui/Container/Layout/Pages/layout.page'
import { DataContext } from './ui/Hooks/jsonContext'


export default function App() {

  const [data, setData] = useState([{codigo:'',nombre:'',docena:0,unidad:0}])

  const dataSettings = {
    data,
    setData
  }

  return (
    <DataContext.Provider value={dataSettings} >
    <LayoutPage/>
    </DataContext.Provider>
  )
}