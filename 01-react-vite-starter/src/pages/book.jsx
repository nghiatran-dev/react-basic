import { useState, useEffect } from 'react';
import { Flex, Button } from 'antd';
import BookTable from '../components/book/book.table';
import BookModal from '../components/book/book.modal';
import { apiFetchBooks } from '../services/api.service';

const BookPage = () => {
    const [listBooks, setListBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataUpdateModal, setDataUpdateModal] = useState(null);

    useEffect(() => {
        loadBooks();
    }, [current, pageSize]);

    const loadBooks = async () => {
        const res = await apiFetchBooks(current, pageSize);
        if (res.data) {
            const books = res.data.result;
            if (books.length === 0 && current > 1) {
                setCurrent(1);
                return;
            }
            setCurrent(Number(res.data.meta.current));
            setPageSize(Number(res.data.meta.pageSize));
            setTotal(Number(res.data.meta.total));
            setListBooks(books);
        }
    }

    const handleClickButtonEdit = (itemEdit) => {
       setIsModalOpen(true);
       setDataUpdateModal(itemEdit);
       // No update functionality for books yet
    }

    return (
        <Flex gap={20} style={{padding: "20px"}} vertical>
            <Flex className="user-form" style={{margin: "20px 0"}} gap={15} justify="space-between" align="center">
                <h3>List Books</h3>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>Create</Button>
            </Flex>

            <BookTable
                listBooks={listBooks}
                loadBooks={loadBooks}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                handleClickButtonEdit={handleClickButtonEdit}
            />

            <BookModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                loadBooks={loadBooks}
                dataUpdate={dataUpdateModal}
            />
        </Flex>
    )
}

export default BookPage;