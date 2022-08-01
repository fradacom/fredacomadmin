import React from 'react'
import { Card, Row, Col, Divider} from "antd";
import { AUTH_PREFIX_PATH } from 'configs/AppConfig';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const EmailError = () => {
	return (
		<div className="h-100">
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={24} sm={24} md={24} lg={12}>
						<Card style={{border: `none`, background: `none`}} className="add-space">
							<div className="my-2">
								<h1 className="mt-3 font-weight-bold text-center">Password reset link expired or is invalid</h1>
								
								<p className="text-dark mt-4 mb-0 text-center">The Password reset link sent to you email address has expired or it invalid, to get a new reset link click on request new link below.</p>
								
                                <Divider></Divider>
                                <div className='d-flex justify-content-between w-100 align-items-center text-primary'>
                                    <Link to={`${AUTH_PREFIX_PATH}/password/forgot`}>
                                        <span>Link Expired? 
                                            <u> Request a new link</u>
                                        </span>
                                    </Link>
                                </div>
                                <div className='d-flex justify-content-between mt-2 w-100 align-items-center text-primary'>
                                    <Link to={`${AUTH_PREFIX_PATH}/signup`}>
                                        <span>Don’t have an account? 
                                            <u> Sign Up</u>
                                        </span>
                                    </Link>
                                </div>
                                <div className='d-flex justify-content-between w-100 mt-2 align-items-center text-primary'>
                                    <Link to={`${AUTH_PREFIX_PATH}/login`}>
                                        <span>Back to 
                                            <u> Sign in</u>
                                        </span>
                                    </Link>
                                </div>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	)
}

const mapStateToProps = ({auth}) => {
	const {token, redirect, authUser} = auth;
  	return {token, redirect, authUser}
}

export default connect(mapStateToProps)(EmailError);
