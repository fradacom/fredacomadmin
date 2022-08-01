import React from 'react'
import LoginForm from '../../components/LoginForm'
import { Card, Row, Col } from "antd";


const Login = props => {
	return (
		<>
			<div className="container d-flex flex-column justify-content-center">
				<Row justify="center">
					<Col xs={24} sm={24} md={24} lg={10}>
						<Card style={{border: `none`, background: `none`}} className="add-space">
							<div className="mt-5">
								<div className="text-center">
									<h1 className="text-dark font-weight-bold">Sign in</h1>
								</div>
								<LoginForm {...props}/>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default Login
