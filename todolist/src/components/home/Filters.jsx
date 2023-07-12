import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { filterEndpoints } from '../../helper/filter';

// recoil
import todoData from '../../recoil/todoData';
import filterDataAtom from '../../recoil/filterDataAtom';
import activeFilter from '../../recoil/activeFilter';
const Filters = (props) => {
  // local variables
  const [todoApiData, setTodoApiData] = useRecoilState(todoData);
  const [activeFilterValue, setActiveFilterValue] = useRecoilState(activeFilter);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);
  useEffect(() => {
    console.log("filterData");
    console.log(filterData);
  }, [filterData]);

  return (
    <div>
      <div className='filter-container'>
        {filterData?.map((data,index) => {
          return (
            <div 
            key={index} 
            className='btn-container' 
            onClick={() => setActiveFilterValue(data?.label)}
            >
              <button
                onClick={() => {
                  fetch("http://127.0.0.1:8000/" + filterEndpoints[index]?.endpoint, {
                    method: 'GET',
                    headers: {
                      'content-type': 'application/json',
                    },
                  }).then((response) => response.json())
                    .then((res) => {
                      if(index === 0){

                      }
                      setTodoApiData(res?.todo_data);
                      setFilterData(res?.stats);
                    }).catch((error) => {
                      alert(error);
                    });
                }}
                className={`${activeFilterValue === data?.label ? "active-filter" : ""}`}
              >
                <h3>{data?.label}</h3>
                <p className={`${activeFilterValue === data?.label ? "active-filter-value" : ""}`}> {data?.value} </p >
              </button>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Filters