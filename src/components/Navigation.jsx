import {Link} from 'react-router-dom'

export function Navigation(){
    return (
        <div className='flex justify-between py-3'>
            <Link to="/">
                <h1 className='font-bold text-3xl mb-4'>Event Expenses</h1>
            </Link>
            <button className='bg-indigo-500 px-3 py-1 rounded-lg'>
            <Link to="/user-create">
                <h1 className='font-bold text-3xl mb-4'>Crear usuario</h1>
            </Link> 
            </button>        
        </div>
    )
}