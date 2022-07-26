import React from 'react'
import { Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { Select } from 'antd';
import './admin.css'

function Admin() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
      };
    const { Option } = Select;
  return (
    <>
    <div className='FormData'>
        <div><h1>Post Content</h1></div>
        <form>

       <div className="FormInput">
       
         <Input size="default" placeholder="Title" style={{width:'100%',padding:'7px'}} /></div>

         <div className="FormInput"><textarea placeholder="Descriptions" style={{padding:'10px'}}/></div>
        
        <Select defaultValue="Category" style={{ width: '95%' }} onChange={handleChange} className="FormInput">
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" >
        Disabled
         </Option>
         <Option value="Yiminghe">yiminghe</Option>
    </Select>
       
    <Upload className="FormInput">
            <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>

        <div className="FormInput">
            <Button style={{width:'250px',backgroundColor:'#2AC28E',padding:'8px',color:'white'}}>Submit Post</Button>
        </div>
    </form>
    </div>
  </>
);


}

export default Admin