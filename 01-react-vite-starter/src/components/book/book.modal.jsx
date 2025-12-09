
import { Modal, Form, Row, Col, Input, InputNumber, Select, Upload, Image, notification } from "antd";
import { CameraOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { apiUploadFile, apiCreateBook, apiUpdateBook } from "../../services/api.service";

const BookModal = (props) => {
    const BOOK_URL = `${import.meta.env.VITE_API_URL}/images/book`;
    const UPLOAD_TEMP_URL = 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload';

    const { isModalOpen, setIsModalOpen, dataUpdate, loadBooks } = props;

    const [hasChangedThumbnail, setHasChangedThumbnail] = useState(false);

    useEffect(() => {
        if (dataUpdate) {
            bookForm.setFieldsValue({
                mainText: dataUpdate.mainText || "",
                author: dataUpdate.author || "",
                quantity: dataUpdate.quantity || 0,
                price: dataUpdate.price || 0,
                category: dataUpdate.category || "",
                thumbnail: dataUpdate.thumbnail || ""
            });
            setFileList([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: `${BOOK_URL}/${dataUpdate.thumbnail}`
            }]);
        }
    }, [dataUpdate]);
    
    const [bookForm] = Form.useForm();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryOptions = [
        { value: 'Arts', label: 'Arts' },
        { value: 'Business', label: 'Business' },
        { value: 'Comics', label: 'Comics' },

        { value: 'Cooking', label: 'Cooking' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'History', label: 'History' },

        { value: 'Music', label: 'Music' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Teen', label: 'Teen' },
        { value: 'Travel', label: 'Travel' }
    ];

    const uploadButton = (
        <button className='btn-upload-avatar' type="button">
            <CameraOutlined width={20}/>
            <div style={{ marginTop: "10px" }}>Upload</div>
        </button>
    );

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        setHasChangedThumbnail(true);
        if (newFileList.length > 0) {
            bookForm.setFields([{ name: 'thumbnail', errors: [] }]);
        }
    };

    const resetModalAndClose = () => {
        setIsModalOpen(false);
        bookForm.resetFields();

        setFileList([]);
        setPreviewImage('');
        setPreviewOpen(false);
        setLoading(false);
        setHasChangedThumbnail(false);
    };

    const showNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };

    const onFinish = async (values) => {
        setLoading(true);

        // 1. Upload book image to server
        const resUpload = await apiUploadFile('book', fileList[0].originFileObj);
        if (resUpload.data) {
            const bookImage = resUpload.data.fileUploaded;
            // Create book data with uploaded image URL
            const payload = {
                ...values,
                thumbnail: bookImage
            };

            // 2. Create book
            const res = await apiCreateBook(payload);
            if (res && res.data) {
                showNotification('success', dataUpdate ? 'Update success' : 'Create success', `A book has been ${dataUpdate ? 'updated' : 'created'}.`);

                // reload list books
                await loadBooks();

                // close modal clear data
                resetModalAndClose();
            } else {
                showNotification('error', dataUpdate ? 'Update error' : 'Create error', JSON.stringify(res.message));
            }
        } else {
            showNotification('error', 'Upload file error', JSON.stringify(resUpload.message));
        }

        setLoading(false);
    };

    return (
        <div className="book-modal">
            <Modal
                title={dataUpdate ? "Update Book" : "Create New Book"}
                open={isModalOpen}
                onOk={() => bookForm.submit()}
                onCancel={() => resetModalAndClose(false)}
                maskClosable={false}
                okText={dataUpdate ? "Save" : "Add"}
                confirmLoading={loading}
            >
                <Form
                    form={bookForm}
                    name="bookForm"
                    labelCol={{ span: 6 }}
                    labelAlign="left"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    style={{marginTop: "40px"}}
                >
                    <Row justify={'center'}>
                        <Col span={24}>
                            <Form.Item
                                label="Title"
                                name="mainText"
                                rules={[{ required: true, message: 'Please input the title!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify={'center'}>
                        <Col span={24}>
                            <Form.Item
                                label="Author"
                                name="author"
                                rules={[
                                    { required: true, message: 'Please input the author!' }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify={'center'}>
                        <Col span={24}>
                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[
                                    { required: true, message: 'Please input the category!' }
                                ]}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    options={categoryOptions}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify={'center'}>
                        <Col span={24}>
                            <Form.Item
                                label="Quantity"
                                name="quantity"
                                rules={[
                                    { required: true, message: 'Please input the quantity!' }
                                ]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }}
                                    onKeyDown={(e) => {
                                        if (!/[\d]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                                            e.preventDefault();
                                        }
                                    }}
                                    parser={(value) => value.replace(/\./g, "")}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify={'center'}>
                        <Col span={24}>
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[
                                    { required: true, message: 'Please input the price!' }
                                ]}
                            >
                                <InputNumber suffix="₫" style={{ width: '100%', textAlign: 'right' }}
                                    onKeyDown={(e) => {
                                        if (!/[\d]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                                            e.preventDefault();
                                        }
                                    }}
                                    parser={(value) => value.replace(/\./g, "")}
                                    controls={false} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify={'center'}>
                        <Col span={24}>
                            <Form.Item
                                label="Picture"
                                name="thumbnail"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => {
                                    if (Array.isArray(e)) return e;
                                    return e?.fileList ?? [];
                                }}
                                rules={[
                                    {
                                    validator: () => {
                                        if (fileList.length > 0) return Promise.resolve();
                                        return Promise.reject(new Error("Please input the picture!"));
                                    }
                                    }
                                ]}
                            >
                                {/* Upload book image action */}
                                <Upload
                                    action={UPLOAD_TEMP_URL}
                                    listType="picture-card"
                                    maxCount={1}
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    beforeUpload={() => false}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                {
                                    previewImage && (
                                        <Image
                                            wrapperStyle={{ display: 'none' }}
                                            preview={{
                                                visible: previewOpen,
                                                onVisibleChange: visible => setPreviewOpen(visible),
                                                afterOpenChange: visible => !visible && setPreviewImage(''),
                                            }}
                                            src={previewImage}
                                        />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

BookModal.propTypes = {
    isModalOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.func,
    dataUpdate: PropTypes.object,
    loadBooks: PropTypes.func,
    setDataUpdateModal: PropTypes.func,
};

export default BookModal;