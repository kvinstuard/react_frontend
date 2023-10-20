
import {useForm} from 'react-hook-form';
import {createUser} from '../api/user.api';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function MainPage(){
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
        <div className='max-w-xl mx-auto border-2  border-gray-700 p-4 hover:border-4'>
            <h1 className='font-bold text-3xl mb-4 text-center'>Inicia sesión</h1>
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
                <button
                    className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'
                >Ingresar</button>
            </form>
        </div>
    );
}