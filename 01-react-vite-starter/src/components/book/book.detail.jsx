import { Drawer, Flex, Image } from 'antd';
import PropTypes from 'prop-types';

const BookDetail = (props) => {
    const THUMBNAIL_URL = `${import.meta.env.VITE_API_URL}/images/book`;
    const { isShowDetailBook, setIsShowDetailBook, detailBook, setDetailBook } = props;

    const handleCloseDetail = async () => {
        setIsShowDetailBook(false);
        setDetailBook(null);
    };

    const DescriptionItem = ({ title, content, showHeader = true }) => (
        <Flex gap={10} align='center' horizontal>
            {showHeader && <b className="site-description-item-profile-p-label">{title}:</b>}
            {content}
        </Flex>
    );
    DescriptionItem.propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.node,
        showHeader: PropTypes.bool
    };

    return (
        <Drawer
            size='large'
            title="Book detail"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={() => handleCloseDetail()}
            open={isShowDetailBook}
        >
            {
                detailBook ?
                <Flex justify='center' gap={30} vertical>
                    {/* Book Info */}
                    <Flex align='center' gap={20} horizontal="true">
                        <Image
                            width={300}
                            src={`${THUMBNAIL_URL}/${detailBook.thumbnail}`}
                            alt="book image"
                        />
                        <Image.PreviewGroup
                            items={[`${THUMBNAIL_URL}/${detailBook.thumbnail}`]}
                        />
                        <Flex gap={20} vertical>
                            <DescriptionItem title="Title" 
                                content={
                                    <h1 style={{fontSize: "20px"}}>{detailBook.mainText}</h1>
                                }
                                showHeader={false} />
                            <DescriptionItem title="Author" content={detailBook.author} />
                            <DescriptionItem title="Category" content={detailBook.category} />
                            <DescriptionItem title="Quantity" content={detailBook.quantity.toLocaleString('vi-VN')} />
                            <DescriptionItem title="Sold" content={detailBook.sold.toLocaleString('vi-VN')} />
                            <DescriptionItem title="Price" 
                                content={
                                    <span style={{color: "rgb(255, 66, 78)", fontSize: "24px", fontWeight: "600"}}>{detailBook.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                } />
                        </Flex>
                    </Flex>
                </Flex>
                :
                <Flex justify="center">No book</Flex>
            }
        </Drawer>
    );
};

BookDetail.propTypes = {
    detailBook: PropTypes.object,
    isShowDetailBook: PropTypes.bool,
    setDetailBook: PropTypes.func,
    setIsShowDetailBook: PropTypes.func,
};

export default BookDetail;