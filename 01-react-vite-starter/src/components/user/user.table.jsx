
import { Table, Flex, Tag, Space } from 'antd';
import PropTypes from 'prop-types';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const UserTable = (props) => {
    const { listUsers, handleClickButtonEdit } = props;

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            render: (_, record) => (
                <>
                    <a href='#'>{record.fullName}</a>
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
        <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />
    );
};

UserTable.propTypes = {
    listUsers: PropTypes.array,
    handleClickButtonEdit: PropTypes.func,
};

export default UserTable;