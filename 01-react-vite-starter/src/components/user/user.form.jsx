import React from "react";
import { Button, Input, notification } from "antd";
import { createUser } from "../../services/api.service";

const UserForm = () => {
    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");

    const handleClickCreateButton = async() => {
        const res = await createUser({fullName, email, password, phoneNumber});
        if (res.data) {
            notification.success({
                message: 'Create User Success',
                description: `User ${res.data.fullName} has been created.`,
            });
        } else {
            notification.error({
                message: 'Create User Error',
                description: JSON.stringify(res.error.message),
            });
        }
    };

    return (
        <div className="user-form" style={{margin: "20px 0"}}>
            <div style={{display: "flex", gap: "15px", flexDirection: "column"}}>
                <div>
                    <span>Full name</span>
                    <Input value={fullName} onChange={(event) => setFullName(event.target.value)}/>
                </div>
                <div>
                    <span>Email</span>
                    <Input value={email} onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <div>
                    <span>Phone number</span>
                    <Input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}/>
                </div>
                <div>
                    <Button type="primary" onClick={() => handleClickCreateButton()}>Create</Button>
                </div>
            </div>
        </div>
    );
};

export default UserForm;