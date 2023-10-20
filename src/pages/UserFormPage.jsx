import {useForm} from 'react-hook-form';
import {createUser} from '../api/user.api';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function UserFormPage(){
    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm()
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async data =>{
        await createUser(data);
        toast.success("Se ha registrado con exito!")
        navigate("/"); {/*Aqui poner la ruta de inicio de sesion*/}
    })

    return(
        <div className='max-w-xl mx-auto border-2  border-gray-700 p-4'>
            <h1 className='font-bold text-3xl mb-4 text-center'>Registrarte</h1>
            <h2 className='font-ligth text-1xl mb-4 text-center'>Es rápido y fácil.</h2>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="email"
                    {...register("correo_electronico", {required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.correo_electronico && <span>Este campo es requerido</span>}
                <input type="password" placeholder="contraseña" maxLength={45}
                    {...register("password", {required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.password && <span>Este campo es requerido</span>}       
                <input type="text" placeholder="nombres" maxLength={45}
                    {...register("nombres", {required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.nombres && <span>Este campo es requerido</span>} 
                <input type="text" placeholder="apellidos" maxLength={45}
                    {...register("apellidos", {required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.apellidos && <span>Este campo es requerido</span>} 
                <input type="text" placeholder="apodo" maxLength={10}
                    {...register("apodo", {required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.apodo && <span>Este campo es requerido</span>} 
                <input type="text" placeholder="url_foto"
                    {...register("foto", {required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                    />
                    {errors.url_foto && <span>Este campo es requerido</span>} 
                <button
                    className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'
                >Guardar</button>
            </form>
        </div>
    );
}