import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import BookDetail from './book.detail';
import PropTypes from 'prop-types';
import { Table, Pagination, Flex, Space, Popconfirm, Button } from 'antd';

const BookTable = (props) => {

    const { current, pageSize, total, setCurrent, setPageSize, listBooks, handleClickButtonEdit } = props;
    const [detailBook, setDetailBook] = useState(null);
    const [isShowDetailBook, setIsShowDetailBook] = useState(false);

    const showBookDetail = (record) => {
        setDetailBook(record);
        setIsShowDetailBook(true);
    }

    const columns = [
        {
            title: 'No.',
            render: (_, record, index) => (
                <p>{index + (current - 1) * pageSize + 1}</p>
            ),
        },
        {
            title: 'Book Title',
            dataIndex: 'mainText',
            render: (_, record) => (
                <a onClick={() => showBookDetail(record)}>{record.mainText}</a>
            ),
        },
        {
            title: 'Author',
            dataIndex: 'author'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (_, record) => (
                <span>{record.quantity.toLocaleString('vi-VN')}</span>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (_, record) => (
                <span>{record.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
            )
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
                    >
                        <Button style={{border: "none", background: "none", boxShadow: "none"}}><DeleteOutlined style={{ color: 'red'}}/></Button>
                    </Popconfirm>
                </Space>
            ),
        }
    ];

    return (
        <Flex className='book-table' gap={20} vertical>
            <Flex justify="end">
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
                dataSource={listBooks}
                pagination={false} // disable default pagination
            />
            <BookDetail
                detailBook={detailBook}
                isShowDetailBook={isShowDetailBook}
                setDetailBook={setDetailBook}
                setIsShowDetailBook={setIsShowDetailBook}
            />
        </Flex>
    )
}

BookTable.propTypes = {
    current: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    setCurrent: PropTypes.func.isRequired,
    setPageSize: PropTypes.func.isRequired,
    listBooks: PropTypes.array.isRequired,
    loadBooks: PropTypes.func.isRequired,
    handleClickButtonEdit: PropTypes.func.isRequired,
};

export default BookTable;