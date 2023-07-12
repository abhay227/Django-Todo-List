import React from 'react'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
// recoil js
import { useRecoilState } from 'recoil';
import searchTextAtom from '../../recoil/searchTextAtom';
import todoData from '../../recoil/todoData';
import editTaskAtom from '../../recoil/editTaskAtom';
import filterDataAtom from '../../recoil/filterDataAtom';
import activeFilter from '../../recoil/activeFilter';
const Todos = () => {
  // global variables
  const [todoApiData, setTodoApiData] = useRecoilState(todoData);
  const [activeFilterValue,setActiveFilterValue]  = useRecoilState(activeFilter);
  const [selectedEditTask, setSelectedEditTask] = useRecoilState(editTaskAtom);
  const [inputVal, setInputVal] = useRecoilState(searchTextAtom);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);
  return (
    <div className='todo-main-container'>
      <div>
        {todoApiData?.filter((filtered_data) => {
          if (inputVal === ""){
            return filtered_data;
          }
          else if (filtered_data?.title?.toLowerCase()?.includes(inputVal?.toLowerCase())){
            return filtered_data;
          }
        })
        ?.map((data, index) => {
          return (
            <div key={index} className='todo-card'>
              <div>
                <div onClick={() => {
                  const bodyData = {
                    id: data?.id,
                  };
                  fetch('http://127.0.0.1:8000/complete_task', {
                    method: 'POST',
                    headers: {
                      'content-type': 'application/json',
                    },
                    body: JSON.stringify(bodyData),
                  }).then((response) => response.json()).then((res) => {
                    setTodoApiData(res?.todo_data);
                    setFilterData(res?.stats);
                  }).catch((error) => {
                    console.log("Error", error);
                  });
                }}
                  className={`${(data?.status === 'Completed' ? 'checkbox-active' : 'checkbox')}`}
                  >

                </div>
              </div>
              <div className='todo-card-container'>
                <div className='todo-card-header'>
                  <h4 className={`${data?.status === "Completed" ? "completed-todo-title" : ""}`}>{data?.title}</h4>
                  {activeFilterValue === "All" && <div className='icon-container'>
                    <ArchiveRoundedIcon className='archive'
                      onClick={() => {
                        const bodyData = {
                          id: data?.id,
                        };
                        fetch('http://127.0.0.1:8000/archived_task', {
                          method: 'POST',
                          headers: {
                            'content-type': 'application/json',
                          },
                          body: JSON.stringify(bodyData),
                        }).then((response) => response.json()).then((res) => {
                          setTodoApiData(res?.todo_data);
                          setFilterData(res?.stats);
                        }).catch((error) => {
                          console.log("Error", error);
                        });
                      }}
                    />
                    <EditRoundedIcon className='edit' onClick={() => {
                      setSelectedEditTask({
                        id: data?.id,
                        title: data?.title,
                        desc: data?.desc,
                      });
                    }} />
                    <DeleteRoundedIcon className='delete'
                      onClick={() => {
                        const bodyData = {
                          id: data?.id,
                        };
                        fetch('http://127.0.0.1:8000/delete_task', {
                          method: 'DELETE',
                          headers: {
                            'content-type': 'application/json',
                          },
                          body: JSON.stringify(bodyData),
                        }).then((response) => response.json()).then((res) => {
                          setTodoApiData(res?.todo_data);
                          setFilterData(res?.stats);
                        }).catch((error) => {
                          console.log("Error", error);
                        });
                      }}
                    />
                  </div>}
                </div>
                <p className='todo-desc'>{data?.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Todos