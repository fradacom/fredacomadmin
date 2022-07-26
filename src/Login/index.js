import React from 'react'
import 'antd/dist/antd.css';
import { Button, Checkbox, Form, Input } from 'antd';
import './login.css'
import logo from './logo2.png'
import {useHistory} from'react-router-dom'

function Login() {
  const history = useHistory();
    const onFinish = (values) => {
        console.log('Success:', values);
        history.replace("/admin")
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  return (

    <>
    <div className="form">
        <div>
          <img src={logo} style={{width:'200px'}}/>
            <h1>Log in</h1>
        </div>
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span:50 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
    
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input  placeholder="Email"/>
    </Form.Item>

    <Form.Item
      
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password style={{width:'250px'}}  placeholder="Password"/>
    </Form.Item>

  
    <Form.Item wrapperCol={{   }}>
      <Button  htmlType="submit" style={{width:'250px',backgroundColor:'#2AC28E',padding:'8px',color:'white'}}>
        Login
      </Button>
    </Form.Item>
  </Form></div></>
  )
}

export default Login