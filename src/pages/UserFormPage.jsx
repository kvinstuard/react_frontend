import {useForm} from 'react-hook-form';
import {createUser} from '../api/user.api';
import {useNavigate} from 'react-router-dom';

export function UserFormPage(){
    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm()
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async data =>{
        await createUser(data);
        navigate("/"); {/*Aqui poner la ruta de inicio de sesion*/}
    })

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="email"
                    {...register("correo_electronico", {required: true})}/>
                    {errors.correo_electronico && <span>Este campo es requerido</span>}      
                <input type="text" placeholder="nombres" maxLength={45}
                    {...register("nombres", {required: true})}/>
                    {errors.nombres && <span>Este campo es requerido</span>} 
                <input type="text" placeholder="apellidos" maxLength={45}
                    {...register("apellidos", {required: true})}/>
                    {errors.apellidos && <span>Este campo es requerido</span>} 
                <input type="text" placeholder="apodo" maxLength={10}
                    {...register("apodo", {required: true})}/>
                    {errors.apodo && <span>Este campo es requerido</span>} 
                <input type="text" placeholder="url_foto"
                    {...register("foto", {required: true})}/>
                    {errors.url_foto && <span>Este campo es requerido</span>} 
                <button>Guardar</button>
            </form>
        </div>
    );
}