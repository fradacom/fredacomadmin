import { Col, Table, message, Popconfirm, Button } from 'antd';
import Loading from 'components/shared-components/Loading';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RequestService from 'services/RequestService';
import { saveCategories } from 'redux/actions/Auth';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_PREFIX_PATH } from 'configs/AppConfig';
const Category = (props) => {
	const {saveCategories, categories} = props;
	const [initLoading, setInitLoading] = useState(true);	
	const navigate = useNavigate();
	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: "Edit",
			dataIndex: 'edit',
			key: 'edit',
		},
		{
			title: "Delete",
			dataIndex: 'delete',
			key: 'delete',
		},
	];

	const getPost = () => {
		RequestService.getCategories()
			.then((res) => {
				setInitLoading(false);
				saveCategories(res?.payload?.categories);
			});
	}
	useEffect(() => {
		getPost();
	}, 	[]);

	const confirmDelete = (id) => {
		RequestService.deleteCategory(
			id
		)
		.then((res) => {
			getPost();
			message.success("Post deleted");
		});
	}
	const dataSource = categories?.map((category, i) => (
	{
		"key": category.id,
		"title": category.name,
		"delete": <Popconfirm className='cursor' placement="top" title="Are you sure you want to delete this category?" onConfirm={() => confirmDelete(category?.id)} okText="Yes" cancelText="No">
					Delete
					</Popconfirm>,
		"edit" : <Button>Edit</Button>
	}));
	return (
		<>
			{initLoading ? (
				<Loading cover="page" />
			) : (
				<>
					<Col lg={15} sm={24} xl={15} md={24}>
						<h2>Blog Categories</h2>
						<Button className='my-3' onClick={() => navigate(`${DASHBOARD_PREFIX_PATH}/category/create`)}>Add Category</Button>
						<Table dataSource={dataSource} columns={columns} />;
					</Col>
				</>
				)
			}
		</>
	);
};
const mapStateToProps = ({auth}) =>{
	const {categories} = auth;
	return { categories }
};
const mapDispatchToProps = {
	saveCategories
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);