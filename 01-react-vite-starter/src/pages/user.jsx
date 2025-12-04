import { useState, useEffect } from 'react';
import { apiFetchUsers } from '../services/api.service';
import UserForm from '../components/user/user.form';
import UserTable from '../components/user/user.table';
import UserModal from '../components/user/user.modal';

const UserPage = () => {
    const [listUsers, setListUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataUpdateModal, setDataUpdateModal] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const res = await apiFetchUsers();
        setListUsers(res.data);
    };

    const handleClickButtonEdit = (itemEdit) => {
       setIsModalOpen(true);
       setDataUpdateModal(itemEdit);
    }

    return (
        <div style={{padding: "20px"}}>
            <UserForm loadUsers={loadUsers} setIsModalOpen={setIsModalOpen} />
            <UserTable 
                listUsers={listUsers}
                handleClickButtonEdit={handleClickButtonEdit}
            />
            <UserModal
                isModalOpen={isModalOpen}
                dataUpdate={dataUpdateModal}
                loadUsers={loadUsers}
                setIsModalOpen={setIsModalOpen}
                setDataUpdateModal={setDataUpdateModal}
            />
        </div>
    )
}

export default UserPage;