import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Alert, Select } from "antd";
import {
    showLoading,
    hideLoading,
    saveCategory,
    hideAuthMessage,
    showAuthMessage,
    saveCategories
} from "redux/actions/Auth";

import { useNavigate } from "react-router-dom";
import { DASHBOARD_PREFIX_PATH } from 'configs/AppConfig';
import handleErrors from 'services/handleErrors';
import RequestService from "services/RequestService";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Upload } from 'antd';
import { savePostRequest } from 'model/request/savePostRequest'

const rules = {
    title: [
        {
            required: true,
            message: "Please input post title",
        },
    ],
    category: [
        {
            required: true,
            message: "Please input post category",
        },
    ],
    content: [
        {
            required: true,
            message: "Please input post content",
        },
    ],
    upload: [
        {
            required: true,
            message: "Please input post cover image",
        },
    ],
};

const modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
};
const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "formula",
];
export const LoginForm = (props) => {
    const [fileList, setFileList] = useState([]);
    const [content, setContent] = useState(null);

    
    const beforeUpload = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            file.upload = reader.result;
        }   
        setFileList([...fileList, file]);
        return false;  
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    }
    const {
        showLoading,
        loading,
        showMessage,
        message,
        hideAuthMessage,
        showAuthMessage,
        hideLoading,
        categories, 
        saveCategories
    } = props;

    let navigate = useNavigate();
	const {Option} = Select;
    const [form] = Form.useForm();

    const getPost = () => {
		RequestService.getCategories()
			.then((res) => {
				saveCategories(res?.payload?.categories);
			});
	}
	useEffect(() => {
		getPost();
	}, 	[]);
  
    const options = categories && categories.length > 0 ? (
        <>
            {categories.map((category) => (
                <Option key={category.name} value={category.id}>{category.name}</Option>
            ))}
        </>
    ) : (
        <></>
    )
    const saveForm = () => {
        hideAuthMessage();
        form.validateFields().then((values) => {
            const payload = savePostRequest(values, content,fileList);
            showLoading();
            RequestService.createPost(payload)
                .then(() => {
                    navigate(`${DASHBOARD_PREFIX_PATH}/posts`);
                })
                .catch((e) => {
                showAuthMessage(
                    e?.response?.data?.payload?.message
                    ? [e?.response?.data?.payload?.message]
                    : [
                        "No response from server, check your network connectivity and try again",
                        ]
                );
            }).finally(() => {
                hideLoading();
            });
        });
    };

    const handleDescriptionTextChange = (html) => {
        setContent(html);
    };

    useEffect(() => {
        if (showMessage) {
            setTimeout(() => {
                hideAuthMessage();
            }, 5000);
        }
    });

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="login-form"
        onFinish={saveForm}
      >
        <h3>Create Category</h3>
        <Form.Item
            name="title"
            label="Title"
            hasFeedback
            validateFirst={true}
            rules={rules.title}
        >
        <Input
            autoComplete="off"
            placeholder="Enter post title..."
          />
        </Form.Item>
        <Form.Item 
            name="category_id" 
            label="Category"
            rules={rules.category}
        >
            <Select
                className='selectCategory'
                showSearch
                placeholder="Select Category"
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
                {options}
            </Select>
        </Form.Item>
        <Form.Item
            name="Content"
            label="Content"
            className="mt-4 mb-2"
            validateFirst={true}
            rules={rules.content}
            initialValue={null}
            >
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                onChange={handleDescriptionTextChange}
                value={content || null}
                placeholder="Please enter step description"
                className="w-100"
              />
        </Form.Item>

        <Form.Item
            name="upload"
            label="Upload"
            rules={rules.upload}
            valuePropName="fileList"
            getValueFromEvent={normFile}
        >
            <Upload name="logo" beforeUpload={beforeUpload} action="/upload.do" listType="picture">
                <Button>Click to upload</Button>
            </Upload>
        </Form.Item>
        {showMessage === true ? (
            <Alert
                type="error"
                className="mt-2 mb-3"
                showIcon
                message={handleErrors(message)}
                >    
            </Alert>
        ) : (
          <></>
        )}

        <Form.Item className="mt-2">
            <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
            >
                Create Post 
            </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { authUser, loading, categories } = auth;
  return { authUser, loading, categories };
};

const mapDispatchToProps = {
  saveCategory,
  showLoading,
  hideLoading,
  showAuthMessage,
  hideAuthMessage,
  saveCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
