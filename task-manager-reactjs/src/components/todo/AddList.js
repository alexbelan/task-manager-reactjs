import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { fileNewList } from '../../redux/actions/appActions';
import { newList } from '../../redux/actions/listActions';
import { addDataEditWindow, closeEditWindow } from '../../redux/actions/appActions';

export default function({fileId}) {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
        description: ""
    });
    const [file, setFile] = useState(document.querySelector(`[data-id="${fileId}"]`))

    const changeInputData = event => {
        event.persist()
        setData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const submitList = event => {
        event.preventDefault();
        if (data.name.length >= 50) {
            alert("Very large name for the list, less than 50 characters needed")
        } else {
            dispatch(newList({data: data, fileId: fileId}))
            dispatch(fileNewList(null))
            const openFile = file.getAttribute("data-open")
            const size = +file.getAttribute('data-length') + 1;
            if (openFile === "true") {
                if (size > 0) {
                    file.style.height = (34 * size) + 2 + "px"
                }
            }
            dispatch(closeEditWindow());
            dispatch(addDataEditWindow({type: "", id: -1}))
        }
    }

    return (
        <form onSubmit={submitList}>
            <div>
            <label for="nameList">
                <h5>Name:</h5>
            </label>
            <input id="nameList" type="text" name="name" value={data.name} onChange={changeInputData} />
            </div>
            <div>
            <label for="descriptionList">
                <h5>Description:</h5>
            </label>
            <textarea id="descriptionList" name="description" value={data.description} onChange={changeInputData}>

            </textarea>
            </div>
            <input type="submit"/>
        </form>
    )
}