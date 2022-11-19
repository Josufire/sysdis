import React, { useCallback, useEffect, useState } from "react";
import {
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import logo from "./../../../assets/logo.jpg";
import "./style.css";
import Modal from "react-modal";
import { PrintData } from "./printLayout";
export const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
};

export const formatData = (data) => {
  return (
    <div
      id="print"
      className="relative px-4 pt-5 pb-12 overflow-hidden bg-white rounded-lg shadow sm:px-6 sm:pt-6"
    >
      <dt>
        <div className="absolute p-3 bg-indigo-500 rounded-md">
          <img className="w-6 h-6 " src={logo} alt="none" />
        </div>
        <p className="ml-16 text-sm font-medium text-gray-500 truncate">
          {" "}
          {data[1].colum.Header} : {data[1].value}{" "}
        </p>
      </dt>
      <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">
          {" "}
          {data[2].colum.Header} : {data[2].value}
        </p>
        <p className="text-2xl font-semibold text-gray-900">
          {" "}
          {data[3].colum.Header} : {data[3].value}
        </p>
        <p className="text-2xl font-semibold text-gray-900">
          {" "}
          {data[4].colum.Header} : {data[4].value}
        </p>
        <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-gray-50 sm:px-6">
          <div className="text-sm"></div>
        </div>
      </dd>
    </div>
  );
};

export const Table = ({ columns, data, dataArray , setDataArray }) => {
  const [isModal, setIsModal] = useState(false);
  const closeModal = () => {
    setIsModal(false);
    // setDataArray([]);
  };
  const openModal = () => {
    setIsModal(true);
  };

  const handleCaptureClick = useCallback(async () => {
    const canvas = await html2canvas(document.querySelector("#print"));
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "download.png", "image/png");
  }, []);

  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    //new
    page, // Instead of using 'rows', we'll use page,


    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <input
              type="checkbox"
              
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              {...getToggleAllRowsSelectedProps()}
            />
          ),
          Cell: ({ row }) => {
            return (
              <input
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                {...row.getToggleRowSelectedProps()}
              />
            );
          },
        },
        ...columns,
      ]);
    } // new
  );
  useEffect(() => {
     console.log('one',dataArray);
  }, [dataArray]);

  return (
    <>
      {/* global search and filter */}
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Modal
        isOpen={isModal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="page"
        contentLabel="Print Data"
      >
        <PrintData dataArray={dataArray} closeModal={closeModal} />
      </Modal>
      {/* table */}
      <div className="flex flex-col mt-2">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <button
            className="ml-20 text-indigo-600 hover:text-indigo-900"
            onClick={() => {
              openModal();
            }}
          >
            Imprimir
          </button>
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          {/* Add a sort direction indicator */}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " ▼"
                                : " ▲"
                              : ""}
                          </span>
                        </th>
                      ))}
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0"
                      >
                        <span className="sr-only">Imprimir</span>
                      </th>
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {page.map((row, i) => {
                    // new
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                      <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6 md:pr-0">
                            <button onClick={()=>{
                                // console.log('Imprime', row.cells)
                                let objectData ={codigo: row.cells[1].value, nombre : row.cells[2].value,docena:row.cells[3].value,unidad:row.cells[4].value}
                              setDataArray([... dataArray, objectData])

                            }}  className="text-indigo-600 hover:text-indigo-900">
                            Seleccionar
                            </button>
                          
                         </td>  
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                       
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
    </>
  );
};
