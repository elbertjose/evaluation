import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import {Button, Modal} from "flowbite-react";
import AuthSigninForm from "../auth/signin";
import {useAppSelector} from "../../hooks/users";
import {RootState} from "../../store";

const HomePage: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate()

    const auth = useAppSelector((state: RootState) => state.auth.currentAuthUser);


    const onShowUser = () => {
      if(auth.access_token){
          navigate('/users')
      }else{
          setOpenModal(true)
      }
    }

    return (
        <div className="flex flex-col text-center ">
            <h1 className="text-4xl font-bold mb-4">Bienvenido a la Gestión de Usuarios</h1>
            <p className="text-lg mb-8">Usa el menú de navegación para administrar los usuarios.</p>
            <Button className="bg-blue-500 text-white px-6 py-3 rounded-md max-w-xl self-center" onClick={onShowUser}>Ir a la página de Usuarios</Button>
            <Modal dismissible show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                <Modal.Header className={"bg-sky-900 "}>
                    <div className={"mx-2 text-white font-medium"}>Inicio de Sesion</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-4">
                        <div className="text-sm font-medium text-gray-900 ">Iniciar sesion con el usuario y la contrasena predefinida en la configuracion de la app, para poder administrar usuarios</div>
                        <AuthSigninForm/>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default HomePage;

