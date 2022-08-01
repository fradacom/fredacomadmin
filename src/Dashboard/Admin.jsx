import React,{useState,useEffect} from 'react'
import { Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { Select } from 'antd';
import './admin.css'
import axios from 'axios'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

function Admin() {
  
  const [file, setFile] = useState(null);
  const [title,settitle] = useState('');
  const [desc,setDesc] = useState(null);
  const [sel,setSel] = useState(null);
  const[fileStatus,setfileStatus] = useState('done')
  const { quill, quillRef } = useQuill();

  console.log(desc)
//data to post to backend
  const data = {
      title:title,
      Decriptions:desc,
      selectefFile:sel,
      file:file
  }
  
      

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  
    onChange(info) {
      setFile(info.file.name)
      setfileStatus(info.file.status)
      if (info.file.status !== 'uploading') {
      //  console.log(info.file, info.fileList);
        console.log(info)
      }
  
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        console.log(info)
       // message.error(`${info.file.name} file upload failed.`);
      }}}
  
       const post =  (e)=>{
        e.preventDefault();
        

          if(title ==='' || desc === '' || sel === null || fileStatus !== "done"){
           //It will always alert false because filestatus !== "done"(the action is empty).Check console for file status
                alert("false")
                settitle('')
                setDesc(null)
                setSel(null)
          }
          else{
            //axios.post to backend here
        // axios.post('',data).then((response)=>{
          //
        // })
        console.log("Success")
        settitle('')
        setDesc('')
        setSel(null)
          }
  
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setSel(value);
      };
    const { Option } = Select;
   
    useEffect(() => {
      if (quill) {
        quill.on('text-change', () => {
         
         
          setDesc(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
        });
      }
     
    }, [quill]);
  return (
    <>
    <div className='FormData'>
        <h1 style={{margin:'0'}}>Post Content</h1>
        <form onSubmit={post}>

       <div className="FormInput">
       
         <Input size="default" placeholder="Title" style={{width:'100%',padding:'7px'}} value={title} onChange={(e)=>settitle(e.target.value)}/></div>
      
         <div style={{ width: 800, height: 300 }}>
            <div ref={quillRef} />
        </div>
        <br/><br/>
        <Select defaultValue="Category" style={{ width: '95%' }} onChange={handleChange} className="FormInput">
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" >
        Disabled
         </Option>
         <Option value="Yiminghe">yiminghe</Option>
    </Select>

    <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload Image</Button>
  </Upload>
       
   

        <div className="FormInput">
          <button type="submit" style={{width:'250px',backgroundColor:'#2AC28E',color:'white',padding:'8px',border:'none',cursor:'pointer'}}>Submit post</button>
        </div>
    </form>
    </div>
  </>
);


}

export default Admin