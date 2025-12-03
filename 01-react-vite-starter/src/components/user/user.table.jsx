import { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { fetchUsers } from '../../services/api.service';

const UserTable = () => {
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        console.log('>>> 2. Updated');
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const res = await fetchUsers();
        setListUsers(res.data);
    };

    console.log('>>> 1. Mounted');

    const columns = [
        {
            title: 'No.',
            dataIndex: '_id',
            key: '_id'
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone'
        },
    ];

    return (
        <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />
    );
};

export default UserTable;