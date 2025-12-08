import { Row, Col, Flex, Form, Button, Input, notification } from 'antd';
import { apiRegister } from '../services/api.service';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const navigate = useNavigate();
    const onFinish = async (values) => {
        const res = await apiRegister(values);
        if (res && res.data) {
            notification.success({
                message: 'Register successfully!',
                description: 'You can login with your account now.'
            });
            navigate('/login');
        } else {
            notification.error({
                message: 'Register error!',
                description: JSON.stringify(res.error.message) || 'Please try again later.'
            });
            return;
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Flex justify="center" style={{ marginTop: 50, marginBottom: 20, width: "100%" }} vertical>
            <Row justify={'center'} style={{margin: "10px"}}>
                <Col xs={24} md={12}>
                    <h1 style={{marginBottom: "20px", marginLeft: "5px"}}>Register</h1>
                </Col>
            </Row>
            <Form
                name="register"
                labelCol={{ span: 8 }}
                labelAlign="left"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{margin: "20px"}}
            >
                <Row justify={'center'}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Full name"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={'center'}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Email is not in the correct format!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={'center'}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."  }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={'center'}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Phone number"
                            name="phone"
                            rules={[
                                { required: true, message: 'Please input your phone number!' },
                                { pattern: /^0[1-9][0-9]{8}$/, message: "Phone number is not in correct format!" },
                            ]}
                        >
                            <Input maxLength={10}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={'center'}>
                    <Col xs={24} md={12}>
                        <Form.Item 
                            label={null}
                            wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Flex> 
    )
}

export default RegisterPage;