import React, {ReactNode} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../hooks/users";
import {RootState} from "../../../store";
import {Button} from "flowbite-react";
import {logout} from "../../../store/reducers/authSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOut} from "@fortawesome/free-solid-svg-icons";

interface props {
    children: ReactNode
}

const MainLayout: React.FC<props> = ({ children }) => {

    const auth = useAppSelector((state: RootState) => state.auth.currentAuthUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const onLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between mb-6">
                <Link to="/" className="text-2xl font-bold">SPA de Evaluation</Link>
                <nav>
                    {auth.access_token && <Button onClick={onLogout} className="mr-4 justify-center items-center">
                        Logout <FontAwesomeIcon className={"self-center my-1 ml-3"} icon={faSignOut} />
                    </Button>}
                </nav>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default MainLayout;
