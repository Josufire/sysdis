import React, { useState } from 'react'

import LayoutPage from './ui/Container/Layout/Pages/layout.page'
import { DataContext } from './ui/Hooks/jsonContext'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {

  const [data, setData] = useState([{codigo:'test',nombre:'test',docena:4,unidad:5}])

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