
import { useState } from 'react';
import { Table, Pagination, Flex, Tag, Space, Popconfirm, Button, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import UserDetail from './user.detail.jsx';
import { apiDeleteUser } from '../../services/api.service.js';

const UserTable = (props) => {
    const { current, pageSize, total, setCurrent, setPageSize, listUsers, loadUsers, handleClickButtonEdit } = props;

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
            title: 'No.',
            render: (_, record, index) => (
                <p>{index + (current - 1) * pageSize + 1}</p>
            ),
        },
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
            <Flex justify="end" style={{ marginBottom: 20 }}>
                <Pagination
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    showSizeChanger
                    pageSizeOptions={['6', '10', '20', '50']}
                    showTotal={(total, range) => { return (<div> {range[0]}-{range[1]} / {total} items</div>) }}
                    onChange={(p, size) => {
                        setCurrent(p);
                        setPageSize(size);
                    }}
                />
            </Flex>
            <Table
                rowKey={"_id"}
                columns={columns}
                dataSource={listUsers}
                pagination={false} // disable default pagination
            />
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
    current: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    listUsers: PropTypes.array,
    loadUsers: PropTypes.func,
    setCurrent: PropTypes.func,
    setPageSize: PropTypes.func,
    handleClickButtonEdit: PropTypes.func
};

export default UserTable;