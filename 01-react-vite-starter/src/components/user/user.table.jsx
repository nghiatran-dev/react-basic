
import { Table, Flex, Tag } from 'antd';
import PropTypes from 'prop-types';

const UserTable = (props) => {
    const { listUsers } = props;

    const columns = [
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
    ];

    return (
        <Table columns={columns} dataSource={listUsers} rowKey={"_id"} />
    );
};

UserTable.propTypes = {
    listUsers: PropTypes.array,
};

export default UserTable;