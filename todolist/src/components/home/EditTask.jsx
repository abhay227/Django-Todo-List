import React, { useRef } from 'react'
import { useRecoilState } from 'recoil';
import editTaskAtom from '../../recoil/editTaskAtom';
import todoData from '../../recoil/todoData';
import addTaskAtom from '../../recoil/addTaskAtom';
import filterDataAtom from '../../recoil/filterDataAtom';
const EditTask = () => {

    const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(addTaskAtom);
    const [todoApiData, setTodoApiData] = useRecoilState(todoData);
    const [selectedEditTask,setSelectedEditTask] = useRecoilState(editTaskAtom);
    const [filterData,setFilterData] = useRecoilState(filterDataAtom);
    // localvariables
    const titleRef = useRef(null);
    const descRef = useRef(null);


    const editTaskHandler = (e) => {
        e.preventDefault();
        const data = {
            id: selectedEditTask?.id,
            title: titleRef?.current?.value,
            desc: descRef?.current?.value,
        };
        fetch('http://127.0.0.1:8000/update_task', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => response.json()).then((data) => {
            setSelectedEditTask(false);
            setTodoApiData(data?.todo_data);
            setFilterData(data?.stats);
        }).catch((error) => {
            console.log("Error", error);
        });
    }
    return (
        <div className='add-task-container'>
            <div className='add-task-contents'>
                <h1>Edit Task</h1>
                <form onSubmit={editTaskHandler} className='form-content'>
                    <input ref={titleRef} type="text" placeholder='Title' defaultValue={selectedEditTask?.title} />
                    <textarea ref={descRef} cols="30" rows="10" placeholder='Description' defaultValue={selectedEditTask?.desc}></textarea>
                    <button>Edit</button>
                </form>
            </div>
        </div>
    )
}

export default EditTask