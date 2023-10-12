import {Link} from 'react-router-dom'

export function Navigation(){
    return (
        <div>
            <Link to="/"><h1>Event Expenses</h1></Link>
            <Link to="/user-create">Crear usuario</Link>         
        </div>
    )
}