import React from 'react'
import Header from '../components/home/Header';
import "./home.css"
import SearchBar from '../components/home/SearchBar';
import Filters from '../components/home/Filters';
import Todos from '../components/home/Todos';
import { colors } from '@mui/material';
import { red, yellow } from '@mui/material/colors';
import AddTask from '../components/home/AddTask';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import addTaskAtom from '../recoil/addTaskAtom';
import apiDataAtom from '../recoil/apiDataAtom';
import todoData from '../recoil/todoData';
import editTaskAtom from '../recoil/editTaskAtom';
import EditTask from '../components/home/EditTask';
import filterDataAtom from '../recoil/filterDataAtom';
const Home = () => {
  // global variables
  const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(addTaskAtom);
  const [apiData,setApiData]  = useRecoilState(apiDataAtom);
  const [todoApiData,setTodoApiData] = useRecoilState(todoData);
  const [selectedEditTask,setSelectedEditTask] = useRecoilState(editTaskAtom);
  const [filterData,setFilterData] = useRecoilState(filterDataAtom);
  // useEffect(() => {
  //   console.log("apidata:",apiData );
  //   console.log("todoapidata",todoApiData);
  //   console.log("filterdata",filterData);
  // }, [filterData,todoApiData,apiData]);
  const homeData = {
    stats: [
      { label: "All", value: 4 },
      { label: "Completed", value: 6 },
      { label: "In Progress", value: 2 },
      { label: "Archived", value: 10 },
    ],
    todo_data: [
      {
        title: "Title 1",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur eum tempore fugiat, odio saepe porro.",
        status: "completed",
      },
      {
        title: "Title 2",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur eum tempore fugiat, odio saepe porro.",
        status: "In-progress",
      },
      {
        title: "Title 3",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur eum tempore fugiat, odio saepe porro.",
        status: "archived",
      },
      {
        title: "Title 4",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur eum tempore fugiat, odio saepe porro.",
        status: "comleted",
      }
    ]
  }; 
  // initial call to get apidata
  useEffect(() => {
    fetch('http://127.0.0.1:8000/initial_call', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        }).then((response) => response.json()).then((data) => {
            console.log(data);
            setApiData(data);
            setTodoApiData(data?.todo_data);
            setFilterData(data?.stats);
        }).catch((error) => {
            alert(error);
        });
  }, [])
  
  return (
    <div className="relative">
      {addTaskOverlay && (<div>        
          <div className="add-overlay" 
          onClick={()=>setAddTaskOverlay(null)}
          ></div>
          <AddTask />
        </div>                              
      )}
{selectedEditTask && (<div>        
          <div className="add-overlay" 
          onClick={()=>setSelectedEditTask(null)}
          ></div>
          <EditTask />
        </div>                              
      )}

      <div className='home-Container'>
          <Header />
          <SearchBar />
          <Filters />
          <Todos />
      </div>
    </div>
  );

};

export default Home;
