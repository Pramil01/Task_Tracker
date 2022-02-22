import {FaTimesCircle} from 'react-icons/fa'

const Task = ({task, onDelete,onToggle}) => {
    return (
        <div className={`task ${task.reminder ?'reminder' : ''}`} onDoubleClick={()=>onToggle(task.id)}>
            <h3>{task.text} <FaTimesCircle style={style} onClick={()=>onDelete(task.id)}/></h3>
            <p>{task.day}</p>
        </div>
    )
}

const style = {
    color:'red',
    cursor:'pointer'
}


export default Task
