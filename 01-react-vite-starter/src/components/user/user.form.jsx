import { useState } from "react";
import { Button, Modal, notification } from "antd";
import { Flex, Input } from 'antd';
import { createUser } from "../../services/api.service";
import PropTypes from 'prop-types';

const UserForm = (props) => {
    const { loadUsers } = props;
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitForm= async() => {
        const res = await createUser({fullName, email, password, phoneNumber});
        if (res.data) {
            notification.success({
                message: 'Create User Success',
                description: `User ${res.data.fullName} has been created.`,
            });

            // reload list users
            await loadUsers();

        } else {
            notification.error({
                message: 'Create User Error',
                description: JSON.stringify(res.error.message),
            });
        }

        // close modal clear data
        resetModalAndClose(false);
    };

    const resetModalAndClose = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
    }

    return (
        <div className="user-form" style={{margin: "20px 0"}}>
            <div style={{display: "flex", gap: "15px", flexDirection: "column"}}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <h3>List Users</h3>
                    <Button type="primary" onClick={() => setIsModalOpen(true)}>Create</Button>
                </div>
            </div>

            <Modal
                title="Create User"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => handleSubmitForm()}
                onCancel={() => resetModalAndClose()}
                maskClosable={false}
                okText="Create"
            >
                <div style={{display: "flex", gap: "15px", flexDirection: "column"}}>
                    <Flex vertical align={"flex-start"} gap={5}>
                        <span>Full name</span>
                        <Input value={fullName} onChange={(event) => setFullName(event.target.value)} />
                    </Flex>
                    <Flex vertical align={"flex-start"} gap={5}>
                        <span>Email</span>
                        <Input value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </Flex>
                    <Flex vertical align={"flex-start"} gap={5}>
                        <span>Password</span>
                        <Input.Password value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </Flex>
                    <Flex vertical align={"flex-start"} gap={5}>
                        <span>Phone number</span>
                        <Input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}/>
                    </Flex>
                </div>
            </Modal>
        </div>
    );
};


UserForm.propTypes = {
    loadUsers: PropTypes.func,
};

export default UserForm;