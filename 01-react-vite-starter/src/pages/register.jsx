import { Flex, Form, Button, Input } from 'antd';

const formItemLayout = {
    labelCol: {
        xs: { span: 50 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 50 },
        sm: { span: 14 },
    },
};
const RegisterPage = () => {

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Flex justify="center" align='center' style={{ marginTop: 50, marginBottom: 20 }} vertical>
            <div style={{width: "40%"}}>
                <h1 style={{marginBottom: "20px"}}>Register</h1>
                <Flex style={{width: "100%"}}>
                    <Form
                        name="register"
                        labelCol={{ span: 8 }}
                        labelAlign="left"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={{width: "100%"}}
                    >
                        <Form.Item
                            label="Full name"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Phone number"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item 
                            label={null}
                            wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </Form.Item>
                    </Form>
                </Flex>
            </div>
        </Flex>
    )
}

export default RegisterPage;