import React, { useCallback, useEffect, useState } from 'react'
import { useAsyncDebounce, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import logo from './../../../assets/logo.jpg'
import './style.css'
export const GlobalFilter=({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) => {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span>
        Search:{' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
        />
      </span>
    )
  }

 export const formatData = (data) => {




    return(
        <div id='print' 
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <img className="h-6 w-6 " src={logo} alt='none'  />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500"> {data[0].colum.Header} : { data[0].value} </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900"> {data[1].colum.Header} : { data[1].value}</p>
              <p className="text-2xl font-semibold text-gray-900"> {data[2].colum.Header} : { data[2].value}</p>
              <p className="text-2xl font-semibold text-gray-900"> {data[3].colum.Header} : { data[3].value}</p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                </div>
              </div>
            </dd>
          </div>
  )}

export const   Table = ({ columns, data }) => {

    const handleCaptureClick = useCallback(async () => {
        const canvas = await html2canvas(document.querySelector("#print"));
        const dataURL = canvas.toDataURL('image/png');
        downloadjs(dataURL, 'download.png', 'image/png');
      }, []);
      const [activeData, setActiveData] = useState(false)
      const [textOne, setTextOne] = useState('')
      const [textTwo, setTextTwo] = useState('')
      const [textTree, setTextTree] = useState('')
      let dataAc=false;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
    
        //new
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page
    
        // The rest of these things are super handy, too ;)
        // canPreviousPage,
        // canNextPage,
        // pageOptions,
        // pageCount,
        // gotoPage,
        // nextPage,
        // previousPage,
        // setPageSize,
    
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
      } = useTable({
          columns,
          data,
      },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,  // new
    )
      useEffect(() => {
       console.log('one',textOne);
      }, [activeData])

    return (
      <>
        {/* global search and filter */}
        <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
        {/* table */}
        <div className="mt-2 flex flex-col">
          <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          // Add the sorting props to control sorting. For this example
                          // we can add them into the header props
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                          >
                            {column.render('Header')}
                            {/* Add a sort direction indicator */}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? ' ▼'
                                  : ' ▲'
                                : ''}
                            </span>
                          </th>
                        ))}
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                            <span className="sr-only">Imprimir</span>
                        </th>
                      </tr>
                    ))}
                  </thead>
                  <tbody
                    {...getTableBodyProps()}
                    className="bg-white divide-y divide-gray-200"
                  >
                    {page.map((row, i) => {  // new
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map(cell => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap"
                              >
                                {cell.render('Cell')}
                              </td>
                            )
                          })}
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">
                            <button onClick={()=>{
                                console.log('Imprime', row.cells)
                                const paragraph = row.cells[1].value.split(' ')
                                let text1=''
                                let text2=''
                                let text3=''
                                console.log('Para', paragraph)
                                for (let i = 0; i < paragraph.length; i++) {
                                        if( i<= 3){
                                            
                                           text1 += `${paragraph[i]} `
                                        }else if(i>3 && i<=7){
                                            text2 += `${paragraph[i]} `
                                        }else{
                                            text3 += `${paragraph[i]} `
                                        }
                                }
                                setTextOne(text1);
                                setTextTwo(text2)
                                setTextTree(text3)
                                setActiveData(true)

                            }}  className="text-indigo-600 hover:text-indigo-900">
                            Visualizar
                            </button>
                            {
                                activeData > 0 &&
                              
                                <div
                                id='print'
                                    onClick={()=>{
                                        handleCaptureClick()
                                    }}
                                    // key={person.email}
                                    className="relative max-w-sm flex items-center space-x-1 rounded-lg border border-2 border-black bg-white px-2 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                                    >
                                    <div className="flex-shrink-0">
                                        <img className="h-24 w-24 rounded-full" src={logo} alt="" /> 
                                    </div>
                                    <div className="w-28 flex-1">
                                        <p className="text-lg  pr-40 font-medium text-gray-900"> {row.cells[0].value} </p>

                                        <p  className="text-base text-center text-ellipsis text-small text-gray-500">
                                         {textOne}</p>
                                         <p  className="text-base text-center text-ellipsis text-small text-gray-500">
                                         {textTwo}</p>
                                         <p  className="text-base  text-center text-ellipsis text-small text-gray-500">
                                         {textTree}</p>
                                         <p  className="text-base font-bold text-ellipsis text-lg text-gray-500">
                                         Docena: $ {row.cells[2].value}</p>
                                         <p  className="text-base font-medium text-ellipsis text-small text-gray-500">
                                         Unidad: $ {row.cells[3].value}</p>
                                    </div>
                                    </div>
                             
                             
                            }
                         </td>  
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Pagination */}

      </>
    )
  }