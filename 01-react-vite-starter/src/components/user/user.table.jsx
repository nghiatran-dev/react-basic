
import { useState } from 'react';
import { Table, Flex, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import UserDetail from './user.detail.jsx';

const UserTable = (props) => {
    const { listUsers, handleClickButtonEdit } = props;

    const [detailUser, setDetailUser] = useState(null);
    const [isShowDetailUser, setIsShowDetailUser] = useState(false);

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
                    <DeleteOutlined style={{ color: 'red'}}/>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />
            <UserDetail
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
    handleClickButtonEdit: PropTypes.func
};

export default UserTable;