import React, { useState, useMemo } from 'react';

export const userContext = React.createContext(null);

export function UserProvider(props) {
    const [user_data, setUserData] = useState(null);
    const [token, setUserToken] = useState(null);

    // useMemo se encarga de retornar el valor que va a consumir cualquier
    // componente de la aplicación
    /**
     * Si user_data o token se actualizan, useMemo vuelve a crear un objeto
     * esto debido a la configuración '[user_data, token]'
     */
    const value = useMemo(() => {
        return ({
            user_data, 
            setUserData,
            token,
            setUserToken,
        });
    }, [user_data, token]) 

    /**
     * Esta linea es relevante, ya que es como decir que si hay un consumidor,
     * se le da el valor que esté en value. En pocas palabras, acá retornamos al
     * proveedor del contexto.
     */
    return <userContext.Provider value={value}>
            {props.children}
        </userContext.Provider>
}
