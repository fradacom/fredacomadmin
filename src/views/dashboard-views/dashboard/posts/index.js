import { Col, Table, Pagination, message, Popconfirm, Button } from 'antd';
import Loading from 'components/shared-components/Loading';
import { DASHBOARD_PREFIX_PATH } from 'configs/AppConfig';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestService from 'services/RequestService';

const Dashboard = () => {
	const [initLoading, setInitLoading] = useState(true);
	const [list, setList] = useState([]);
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
		RequestService.getPosts()
			.then((res) => {
				setInitLoading(false);
				setList(res?.payload?.posts);
			});
	}
	useEffect(() => {
		getPost();
	}, 	[]);

	const confirmDelete = (id) => {
		RequestService.deletePost(
			id
		)
		.then((res) => {
			getPost();
			message.success("Post deleted");
		});
	}

	const handlePagination = (e) => {
		RequestService.getPosts(
			{
				page: e
			}
		)
		.then((res) => {
			setList(res?.payload?.posts);
		});
		
	};
	const dataSource = list?.data?.map((post, i) => (
	{
		"key": post.id,
		"title": post.title,
		"delete": <Popconfirm className='cursor' placement="top" title="Are you sure you want to delete this post?" onConfirm={() => confirmDelete(post?.id)} okText="Yes" cancelText="No">
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
						<h2>Blog Post</h2>
						<Button className='my-3' onClick={() => navigate(`${DASHBOARD_PREFIX_PATH}/posts/create`)}>Add Post</Button>
						<Table dataSource={dataSource} columns={columns} />;
						<Pagination defaultCurrent={1} total={list?.total} onChange={handlePagination}/>
					</Col>
				</>
				)
			}
		</>
	);
};

export default Dashboard;