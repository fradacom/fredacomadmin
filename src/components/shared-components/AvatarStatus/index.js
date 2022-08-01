import React from 'react';
import PropTypes from 'prop-types'
import { Avatar } from 'antd';

export const UserAvatar = (props) => {
	const { authUser, size } = props
	return (
		authUser?.avatar ? (
		<Avatar size={size} src={authUser?.avatar} />
		) : (
			<Avatar size={size} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}><span className='text-capitalize'>{String(authUser?.first_name?.slice(0,1)+authUser?.last_name?.slice(0,1))}</span></Avatar>
		)
	)
}

UserAvatar.propTypes = {
	size: PropTypes.number,
	authUser: PropTypes.object
}

UserAvatar.defaultProps = {
    size: 30,
	authUser: null
}


export default UserAvatar;
