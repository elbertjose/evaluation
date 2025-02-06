import React, { useEffect, useState } from "react";
import { RootState } from "../../../../store";
import {
    deleteUserAction,
    fetchUsersAction,
    createUserAction,
    updateUserAction
} from "../../../../store/reducers/usersSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/users";
import { Button, Table, Modal, Label, TextInput } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faUserTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

interface UserFormValues {
    id: string;
    name: string;
    email: string;
    password: string;
}

const UserList: React.FC = () => {
    const users = useAppSelector((state: RootState) => state.users.users);
    const dispatch = useAppDispatch();

    // Estado para manejar el modal
    const [openModal, setOpenModal] = useState(false);
    const [editUser, setEditUser] = useState<UserFormValues | null>(null);

    const { register, handleSubmit, reset } = useForm<UserFormValues>({
        defaultValues: { name: "", email: "" }
    });

    useEffect(() => {
        dispatch(fetchUsersAction());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        dispatch(deleteUserAction(id));
    };

    const handleOpenModal = (user?: UserFormValues) => {
        setEditUser(user || null);
        setOpenModal(true);
        reset(user || { name: "", email: "", password: ""  });
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditUser(null);
        reset();
    };

    const onSubmit = (data: UserFormValues) => {
        if (editUser) {
            dispatch(updateUserAction({ ...data, id: data.id ?? "" }));
        } else {
            dispatch(createUserAction(data));
        }
        handleCloseModal();
    };
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Administrador de Usuarios</h2>
                <Button color="success" onClick={() => handleOpenModal()}>
                    <FontAwesomeIcon icon={faUserPlus} /> <span className="ml-2 hidden sm:inline">Agregar</span>
                </Button>
            </div>

            <Table>
                <Table.Head>
                    <Table.HeadCell className="w-full">Name</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {users.map((user) => (
                        <Table.Row key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <div className="flex">
                                    <Button
                                        color="failure"
                                        className="flex text-sm mx-1 items-center justify-center"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <FontAwesomeIcon className="py-1" icon={faUserTimes} />
                                        <p className="ml-2 hidden sm:inline-block">Eliminar</p>
                                    </Button>
                                    <Button
                                        color="info"
                                        className="flex text-sm mx-1 items-center justify-center"
                                        onClick={() => handleOpenModal(user)}
                                    >
                                        <FontAwesomeIcon className="py-1" icon={faUserEdit} />
                                        <p className="ml-2 hidden sm:inline-block">Editar</p>
                                    </Button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            {/* Modal de Agregar/Editar */}
            <Modal show={openModal} onClose={handleCloseModal}>
                <Modal.Header>{editUser ? "Editar Usuario" : "Agregar Usuario"}</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nombre</Label>
                            <TextInput id="name" {...register("name", { required: true })} />
                        </div>
                        <div>
                            <Label htmlFor="email">Correo</Label>
                            <TextInput id="email" type="email" {...register("email", { required: true })} />
                        </div>
                        <div>
                            <label className="block">Contraseña</label>
                            <TextInput {...register('password', { required: true })} type="password" className="w-full" />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button color="gray" onClick={handleCloseModal}>Cancelar</Button>
                            <Button type="submit" color="success">
                                {editUser ? "Actualizar" : "Agregar"}
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserList;
