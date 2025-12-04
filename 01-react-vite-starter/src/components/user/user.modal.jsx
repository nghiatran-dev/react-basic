import { useState, useEffect } from "react";
import { Modal, Flex, Input, notification } from "antd";
import { apiCreateUser, apiUpdateUser } from "../../services/api.service";
import PropTypes from 'prop-types';

const UserModal = (props) => {
    const { isModalOpen, dataUpdate, setIsModalOpen, setDataUpdateModal, loadUsers } = props;
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id || "");
            setFullName(dataUpdate.fullName || "");
            setEmail(dataUpdate.email || "");
            setPassword(dataUpdate.password || "");
            setPhoneNumber(dataUpdate.phone || "");
        }
    }, [dataUpdate]);

    const handleSubmitForm= async() => {
        const res = dataUpdate ? await apiUpdateUser({id, fullName, phoneNumber}) : await apiCreateUser({fullName, email, password, phoneNumber});
        if (res.data) {
            notification.success({
                message: dataUpdate ? 'Update user success' : 'Create user success',
                description: `User has been ${dataUpdate ? 'updated' : 'created'}.`,
            });

            // reload list users
            await loadUsers();

        } else {
            notification.error({
                message: dataUpdate ? 'Update user error' : 'Create user error',
                description: JSON.stringify(res.error.message),
            });
        }

        // close modal clear data
        resetModalAndClose(false);
    };

    const resetModalAndClose = () => {
        setIsModalOpen(false);
        setId("");
        setFullName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setDataUpdateModal(null);
    }

    return (
        <Modal
                title={ dataUpdate ? "Update User" : "Create User" }
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => handleSubmitForm()}
                onCancel={() => resetModalAndClose()}
                maskClosable={false}
                okText={ dataUpdate ? "Save" : "Add" }
            >
                <div style={{display: "flex", gap: "15px", flexDirection: "column"}}>
                    {
                        dataUpdate ? 
                        <Flex vertical align={"flex-start"} gap={5}>
                            <span>Id</span>
                            <Input value={id} disabled/>
                        </Flex>
                        : null
                    }
                    <Flex vertical align={"flex-start"} gap={5}>
                        <span>Full name</span>
                        <Input value={fullName} onChange={(event) => setFullName(event.target.value)} />
                    </Flex>
                    
                    <Flex vertical align={"flex-start"} gap={5}>
                        <span>Email</span>
                        <Input value={email} disabled={dataUpdate ? true : false} onChange={(event) => setEmail(event.target.value)}/>
                    </Flex>

                    {
                        dataUpdate ? null :
                        <Flex vertical align={"flex-start"} gap={5}>
                            <span>Password</span>
                            <Input.Password value={password} onChange={(event) => setPassword(event.target.value)}/>
                        </Flex>
                    }

                    <Flex vertical align={"flex-start"} gap={5}>
                        <span>Phone number</span>
                        <Input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}/>
                    </Flex>
                </div>
            </Modal>
    );
};

UserModal.propTypes = {
    isModalOpen: PropTypes.bool,
    dataUpdate: PropTypes.object,
    loadUsers: PropTypes.func,
    setIsModalOpen: PropTypes.func,
    setDataUpdateModal: PropTypes.func,
};

export default UserModal;