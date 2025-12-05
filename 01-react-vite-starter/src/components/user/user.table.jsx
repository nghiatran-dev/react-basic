
import { useState } from 'react';
import { Table, Flex, Tag, Space, Popconfirm, Button, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import UserDetail from './user.detail.jsx';
import { apiDeleteUser } from '../../services/api.service.js';

const UserTable = (props) => {
    const { listUsers, loadUsers, handleClickButtonEdit } = props;

    const [detailUser, setDetailUser] = useState(null);
    const [isShowDetailUser, setIsShowDetailUser] = useState(false);

    const handleDeleteUser = async(id) => {
        const res = await apiDeleteUser(id);
        if (res.data) {
            notification.success({
                message: 'Delete user success',
                description: `User has been deleted.`,
            });

            // reload list users
            await loadUsers();

        } else {
            notification.error({
                message: 'Delete user error',
                description: JSON.stringify(res.error.message),
            });
        }
    };

    const showUserDetail = (record) => {
        setDetailUser(record);
        setIsShowDetailUser(true);
    }

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            render: (_, record) => (
                <>
                    <a onClick={() => showUserDetail(record)}>{record.fullName}</a>
                </>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone'
        },
        {
            title: 'Role',
            dataIndex: 'role'
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            render: (isActive) => {
                const color = isActive ? 'success' : 'default';
                return (
                    <Flex gap="small" align="center" wrap>
                        <Tag color={color}>
                            {isActive ? 'ACTIVE' : 'INACTIVE'}
                        </Tag>
                    </Flex>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={() => handleClickButtonEdit(record)}
                        style={{ color: 'orange'}}
                    />
                    <Popconfirm
                        placement="left"
                        title="Delete user"
                        description={`Are you sure to delete this user [${record.fullName}]?`}
                        okText="Confirm"
                        cancelText="No"
                        onConfirm={() => handleDeleteUser(record._id)}
                    >
                        <Button><DeleteOutlined style={{ color: 'red'}}/></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />
            <UserDetail
                loadUsers={loadUsers}
                detailUser={detailUser}
                isShowDetailUser={isShowDetailUser}
                setDetailUser={setDetailUser}
                setIsShowDetailUser={setIsShowDetailUser}
            />
        </>
    );
};

UserTable.propTypes = {
    listUsers: PropTypes.array,
    loadUsers: PropTypes.func,
    handleClickButtonEdit: PropTypes.func
};

export default UserTable;