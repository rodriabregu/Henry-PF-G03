import './login.css';
import { Form, Input, Button, Checkbox } from 'antd';

const { Item } = Form;
const { Password } = Input;

const Login = () => {

    const formSuccess = (datos:any) => {
        console.log('Send nice', datos);
    }
    const formFailed = (error:any) => {
        console.log('Failed send', error);
    }

    return (
        <div className='containerPrincipal'>
            <div className='containerSecundario'>
                <Form name='form' initialValues={{remember: true}}
                onFinish={formSuccess}
                onFinishFailed={formFailed}
                >
                    <Item 
                    label='User'
                    name='username'
                    rules={[{
                        required: true,
                        message: 'Please enter your username.'
                    }]}
                    >
                        <Input />
                    </Item>
                    <Item 
                    label='Password'
                    name='password'
                    rules={[{
                        required: true,
                        message: 'Please enter your password.'
                    }]}
                    >
                        <Password />
                    </Item>
                    <Item name='remember' valuePropName='checked'>
                        <Checkbox>Member username</Checkbox>
                    </Item>
                    <Item>
                        <Button type='primary' htmlType='submit'>Log in</Button>
                    </Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;