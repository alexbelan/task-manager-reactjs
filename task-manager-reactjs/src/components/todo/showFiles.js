import React from 'react'
import folder from '../../img/folder.svg'
import list from '../../img/list.svg'
import add from '../../img/add.svg'
import editIcon from '../../img/edit.svg';
import trashIcon from '../../img/trash.svg';
import { useSelector } from 'react-redux'
import AddList from './AddList'

export const ShowFiles = ({fileData, lists, sidebar}) => {
    let showFiles = []
    const fileNewList = useSelector(state => state.app.fileNewList)
    if (fileData.length !== 0 && fileData.length !== "error") {
         fileData.map((objFile, index) => {
                let fileLists = lists.filter(objList => objList.file === objFile.fileId)
                showFiles.push(
                    <div className="file-block">
                        <div onClick={sidebar.clickFile} className="file" key={index} >
                            <div className="file-title">
                                <img className="icon" src={folder} />
                                <h4>{objFile.name}</h4>
                            </div>
                            <div className="file-actions">
                                <div className="edit-file">
                                    <img className="edit-file icon" src={editIcon} />
                                </div>
                                <div className="delete-file">
                                    <img className="delete-file icon" src={trashIcon} />
                                </div>
                                <div className="add-list">
                                    <img className="add-list icon" src={add} />
                                </div>
                            </div>
                        </div>
                        {fileLists.length !== 0 &&
                            <ul 
                            className="lists" 
                            data-open="false" 
                            data-length={fileLists.length}
                            data-id={objFile.fileId}>
                                {fileLists.map((item, index) => {
                                    return <li 
                                        onClick={sidebar.openList} 
                                        className="list" 
                                        key={index} 
                                        data-id={item.listId}> 
                                        <img className="icon" src={list} />
                                        <p title={item.name}>{item.name}</p>
                                        <img className="edit-list icon" src={editIcon} />
                                        <div className="delete-list">
                                            <img className="delete-list icon" src={trashIcon} />
                                        </div>
                                    </li>
                                })}
                                {objFile.fileId == fileNewList &&
                                    <AddList/>
                                }
                        </ul>
                        }
                        {fileLists.length === 0 &&
                            <ul 
                                className="lists" 
                                data-open="false" 
                                data-length="1"
                                data-id={objFile.fileId}>
                                {objFile.fileId == fileNewList &&
                                        <AddList/>
                                }
                                {objFile.fileId != fileNewList &&
                                    <li className="list not-list"><p>Нет списков</p></li>
                                }
                            
                            </ul>
                        }
                    </div>
                 )
        })
    }

    if (showFiles.length !== 0) {
        return showFiles
    } else {
        return null
    }
}