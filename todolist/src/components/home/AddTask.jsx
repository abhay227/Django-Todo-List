import React from 'react'
import { useRef } from 'react'
import { useRecoilState } from 'recoil';
import userInfoAtom from '../../recoil/userInfoAtom';
import addTaskAtom from '../../recoil/addTaskAtom';
import todoData from '../../recoil/todoData';
import filterDataAtom from '../../recoil/filterDataAtom';
const AddTask = () => {
    // global variables
    const [userInfo,setUserInfo] = useRecoilState(userInfoAtom);
    const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(addTaskAtom);
    const [todoApiData,setTodoApiData] = useRecoilState(todoData);
    const [filterData,setFilterData] = useRecoilState(filterDataAtom);
    // localvariables
    const titleRef = useRef(null);
    const descRef = useRef(null);

    // function
    const addTaskHandler = (e) => {
        e.preventDefault();
        const bodyData = {
            title: titleRef?.current?.value,
            desc: descRef?.current?.value,
        };

        fetch('http://127.0.0.1:8000/create_todo', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        }).then((response) => response.json()).then((data) => {
            console.log(data);
            setAddTaskOverlay(false);
            setTodoApiData(data?.todo_data);
            setFilterData(data?.stats);
        }).catch((error) => {
            console.log("Error", error);
        });
}
return (
    <div className='add-task-container'>
        <div className='add-task-contents'>
            <h1>New Task</h1>
            <form onSubmit={addTaskHandler} className='form-content'>
                <input ref={titleRef} type="text" placeholder='Title' />
                <textarea ref={descRef} cols="30" rows="10" placeholder='Description'></textarea>
                <button>Add</button>
            </form>
        </div>
    </div>
)
}

export default AddTask