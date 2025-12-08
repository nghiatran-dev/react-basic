import { Flex, Card, Form, Input, Button, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { apiLogin } from '../services/api.service';

const LoginPage = () => {

    const [isLoading, setIsLoading] =  useState(false);

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async(values) => {
        setIsLoading(true);
        const res = await apiLogin(values.email, values.password);
        if (res && res.data) {
            message.success({
                type: 'success',
                content: 'Login successfully!',
            });
            // Save token to localStorage
            // localStorage.setItem('authToken', res.data.token);
            // Redirect to home page
            navigate('/');
        } else {
            message.error({
                type: 'error',
                content: JSON.stringify(res.message) || 'Please try again later.'
            });
        }

        setIsLoading(false);
    };

    return (
        <Flex justify="center" align="center" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e3f2fd, #bbdefb)" }}>
            <Card
                style={{
                    borderRadius: 15,
                    padding: "30px 20px",
                    boxShadow: "0px 8px 20px rgba(0,0,0,0.1)"
                }}
            >
                <div style={{ textAlign: "center", marginBottom: 25 }}>
                    <h1>Login</h1>
                </div>

                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="email"
                        rules={[
                            { required: true, message: "Please enter your email!" },
                            { type: "email", message: "Invalid email address" },
                        ]}
                    >
                        <Input size="large" prefix={<UserOutlined />} placeholder="Enter your email..." />
                    </Form.Item>

                    <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
                        <Input.Password size="large" prefix={<LockOutlined />} placeholder="Enter your password..." />
                    </Form.Item>

                    <Button loading={isLoading} type="primary" htmlType="submit" size="large" style={{ width: "100%", borderRadius: 8, marginTop: 10 }} icon={<LoginOutlined />} >
                        Login
                    </Button>
                </Form>

                <Flex justify="center" align="center" style={{ marginTop: 20 }}>
                    <span>Don&apos;t have an account? </span>
                    <Link to="/register" style={{ marginLeft: 5, color: "#1890ff" }}>Create an account</Link>
                </Flex>
            </Card>
            </Flex>
    );
}

export default LoginPage;