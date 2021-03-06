import React from 'react'
import { useSelector } from 'react-redux'
import add from '../../img/add.svg'
import folder from '../../img/folder.svg'
import listImg from '../../img/list.svg'
import editIcon from '../../img/edit.svg';
import trashIcon from '../../img/trash.svg';
import AddList from './AddList'

export const ShowLists = ({lists, sidebar}) => {
    const fileNewList = useSelector(state => state.app.fileNewList)
    let dontFileLists = lists.filter(list => list.file === -1)
    let showList = []
    if (dontFileLists.length !== 0) {
        dontFileLists.map((obj, index) => {
            showList.push(<li className="list" onClick={sidebar.openList} key={index} data-id={obj.listId}>
                <img className="icon" src={listImg} />
                <p title={obj.name}>{obj.name}</p>
                <img className="edit-list icon" src={editIcon} />
                <div className="delete-list">
                    <img className="delete-list icon" src={trashIcon} />
                </div>
                </li>)
        })
    }

    const notList = (fileNewList === "-1") ? <AddList/> : <li>Нет Списков</li>

    if (showList.length === 0) {
        return (
            <div className="file-block">
                <div 
                    onClick={sidebar.clickFile} 
                    className="file standard" >
                        <div className="file-title">
                            <img className="icon" src={folder} />
                            <h4>Другие списки</h4>
                        </div>
                        <div className="add-list">
                            <img className="add-list icon" src={add} />
                        </div>
                    </div>
                <ul className="lists" data-open="false" data-length={showList.length} data-id="-1">
                    {notList}
                </ul>
            </div>
        )
    } else {    
        return (
            <div className="file-block">
                <div 
                    onClick={sidebar.clickFile} 
                    className="file standard" >
                        <div className="file-title">
                            <img className="icon" src={folder} />
                            <h4>Другие списки</h4>
                        </div>
                        <div className="add-list">
                            <img className="add-list icon" src={add} />
                        </div>
                    </div>
                <ul className="lists" data-open="false" data-length={showList.length} data-id="-1">
                    {showList}
                    {fileNewList == -1 &&
                        <AddList/>
                    }
                </ul>
            </div>
        )
    }
}