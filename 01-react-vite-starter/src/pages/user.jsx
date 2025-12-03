import UserForm from '../components/user/user.form';
import UserTable from '../components/user/user.table';
import { useState, useEffect } from 'react';
import { fetchUsers } from '../services/api.service';

const UserPage = () => {
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const res = await fetchUsers();
        setListUsers(res.data);
    };

    return (
        <div style={{padding: "20px"}}>
            <UserForm loadUsers={loadUsers} />
            <UserTable listUsers={listUsers} />
        </div>
    )
}

export default UserPage;