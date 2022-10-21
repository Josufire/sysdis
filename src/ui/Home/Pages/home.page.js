import React, { useMemo, useContext} from 'react'
import { DataContext } from '../../Hooks/jsonContext'
import { Table } from '../Components/table'

export default function Home(){
    const {data} = useContext(DataContext)

    const getData =() => data
    const columns= useMemo(() => [
        {
            Header: "Codigo",
            accessor:"codigo"
        },
        {
            Header: "Nombre",
            accessor:"nombre"
        },
        {
            Header: "Docena",
            accessor:"docena"
        },
        {
            Header: "Unidad",
            accessor:"unidad"
        },
    ], [])

    const db= useMemo(() => getData(), [])
    return (
       <Table columns={columns } data={data} />
    )
}