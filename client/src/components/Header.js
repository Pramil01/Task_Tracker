import Button from './Button'


const Header = (props) => {
    
    return (
        <header className="header">
            <h1>{props.title}</h1>
            <Button color={props.showAdd ? "crimson":"Blue"} text={props.showAdd ? "Close":"Add"} onClick={props.onAdd}/>
        </header>
    )
}

Header.defaultProps = {
    title : "Task Tracker",
}

//In line css adds like <h1 style={styleInline}>
// const styleInline = {
//     color: 'white', 
//     backgroundColor: 'black'
// }

export default Header
