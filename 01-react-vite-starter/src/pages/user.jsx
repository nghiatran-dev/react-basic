import { useState, useEffect } from 'react';
import { apiFetchUsers } from '../services/api.service';
import UserForm from '../components/user/user.form';
import UserTable from '../components/user/user.table';
import UserModal from '../components/user/user.modal';

const UserPage = () => {
    const [listUsers, setListUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataUpdateModal, setDataUpdateModal] = useState(null);

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadUsers();
    }, [current, pageSize]);

    const loadUsers = async () => {
        const res = await apiFetchUsers(current, pageSize);
        if (res.data) {
            const users = res.data.result;
            // If the current page has no data and current > 1, fallback to page 1
            if (users.length === 0 && current > 1) {
                setCurrent(1);
                // useEffect will automatically reload data
                return;
            }
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
            setListUsers(users);
        }
        
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
                loadUsers={loadUsers}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
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