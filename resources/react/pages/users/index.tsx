import React from 'react';
import UserList from "./components/list";
import {Card} from "flowbite-react";

const UserPage: React.FC = () => {
    return (
        <Card className="space-y-6">
            <UserList />
        </Card>
    );
};

export default UserPage
