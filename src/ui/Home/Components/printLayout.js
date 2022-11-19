import React, { useEffect } from "react";
import logo from './../../../assets/logo.jpg'
export const PrintData = ({ dataArray, closeModal }) => {

    useEffect(() => {
        console.log('====================================');
        console.log("valor",dataArray);
        console.log('====================================');
    }, [dataArray])
  return (
    <div className="grid w-full max-w-full grid-cols-3 grid-rows-6 gap-2">
      {dataArray.map((data) => (
        <div
          id="print"
          // key={person.email}
          className="relative flex items-center max-w-sm px-2 py-5 space-x-1 bg-white border border-2 border-black rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="flex-shrink-0 ">
            <img className="w-20 h-20 -translate-y-3 rounded-full" src={logo} alt="" />
          </div>
          <div className="flex-1 w-28">
            <p className="absolute pr-40 text-lg font-medium text-gray-900 top-2 ">
              {" "}
              {data.codigo}{" "}
            </p>

            <p className="px-10 text-base text-center text-gray-500 text-ellipsis text-small">
              {/* {data.nombre} */}
            </p>
            
            <p className="absolute text-sm text-base font-bold text-gray-500 bottom-8 text-ellipsis">
              Docena:  <p className="text-3xl" >$ {parseFloat(data.docena).toFixed(2) }</p> 

              <p className="absolute text-base font-medium text-gray-500 -top-9 text-ellipsis text-small" > Unidad: $ {parseFloat(data.unidad).toFixed(2)}</p>
            </p>
        
            <span className="absolute bottom-0 text-xs text-base font-bold text-gray-500 -left-0 text-start text-ellipsis"> {data.nombre}</span>
          </div>
        </div>
      ))}
      
    </div>
  );
};
