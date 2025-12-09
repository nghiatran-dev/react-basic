
import { Drawer, Flex, Avatar, Image, Upload, Button, notification } from 'antd';
import { CameraOutlined, SaveOutlined } from '@ant-design/icons';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { apiUploadFile, apiUpdateUser } from '../../services/api.service.js';

const UserDetail = (props) => {
    const { isShowDetailUser, setIsShowDetailUser, detailUser, setDetailUser, loadUsers } = props;

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    const AVATAR_URL = `${import.meta.env.VITE_API_URL}/images/avatar`;
    const UPLOAD_TEMP_URL = 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload';

    const handleCloseDetail = async () => {
        setIsShowDetailUser(false);
        setDetailUser(null);

        // Clear upload avatar states
        clearUploadStates();

        // Because when showing detail we do not call api to get user information by id => can get old data.
        // Need to reload user list to get new information when clicking on user again.
        await loadUsers();
    }

    const clearUploadStates = () => {
        setFileList([]);
        setPreviewImage('');
    }

    const DescriptionItem = ({ title, content }) => (
        <Flex direction="column" gap={10}>
            <b className="site-description-item-profile-p-label">{title}:</b>
            {content}
        </Flex>
    );
    DescriptionItem.propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.node
    };

    const getBase64 = file =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const showNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };

    const uploadButton = (
        <button className='btn-upload-avatar' type="button">
            <CameraOutlined width={20}/>
            <div style={{ marginTop: "10px" }}>Upload</div>
        </button>
    );

    const handleClickSaveButton = async () => {
        // Step 1: Upload file to server
        const resUpload = await apiUploadFile('avatar', fileList[0].originFileObj);
        if (resUpload.data) {
            // Step 2: Update avatar user
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await apiUpdateUser(
                {
                    id: detailUser._id,
                    fullName: detailUser.fullName,
                    phoneNumber: detailUser.phone,
                    avatar: newAvatar
                }
            );
            if (resUpdateAvatar.data) {
                showNotification('success', 'Update avatar success', 'User avatar has been updated.');

                // Step 3: Update detail user state
                setDetailUser({
                    ...detailUser,
                    avatar: newAvatar
                });
                clearUploadStates();
            } else {
                showNotification('error', 'Update avatar error', JSON.stringify(resUpdateAvatar.message));
                clearUploadStates();
            }
        } else {
            showNotification('error', 'Upload file error', JSON.stringify(resUpload.message));
        }
    };

    return (
        <Drawer
            size='large'
            title="User detail"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={() => handleCloseDetail()}
            open={isShowDetailUser}
        >
            {
                detailUser ?
                <Flex justify='center' gap={30} vertical>
                    {/* User Info */}
                    <Flex align='center' gap={20} horizontal="true">
                        <Avatar
                            size={{ xs: 24, sm: 32, md: 40, lg: 150, xl: 200 }}
                            icon={
                                <img src={`${AVATAR_URL}/${detailUser.avatar}`} alt="avatar" />
                            }
                        />
                        <Flex gap={20} vertical>
                            <DescriptionItem title="ID" content={detailUser._id} />
                            <DescriptionItem title="Full name" content={detailUser.fullName} />
                            <DescriptionItem title="Email" content={detailUser.email} />
                            <DescriptionItem title="Phone number" content={detailUser.phone} />
                            <DescriptionItem title="Role" content={detailUser.role} />
                        </Flex>
                    </Flex>

                    {/* Upload Avatar Action */}
                    <Upload
                        action={UPLOAD_TEMP_URL}
                        listType="picture-circle"
                        maxCount={1}
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
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
                    {
                        fileList.length > 0 ?
                        <Button type="primary" icon={<SaveOutlined />} onClick={handleClickSaveButton}>Save Avatar</Button>
                        : null
                    }
                </Flex>
                :
                <Flex justify="center">No data</Flex>
            }
            
        </Drawer>
    );
}

UserDetail.propTypes = {
    detailUser: PropTypes.object,
    isShowDetailUser: PropTypes.bool,
    loadUsers: PropTypes.func,
    setDetailUser: PropTypes.func,
    setIsShowDetailUser: PropTypes.func,
};

export default UserDetail;