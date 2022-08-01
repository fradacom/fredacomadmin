import React from 'react';

const handleErrors = (errors = []) => {
    return (
        <>
            {
                errors?.length > 0 ? (
                    <ul className='error-display-parent'>
                    {errors.map((error) => (
                        <li className='error-display-child' key={error}>{error}</li>
                    ))}
                    </ul>
                ): (
                    <li className='error-display-child'>No response from server, check your network connectivity and try again</li>
                )
            }
        </>
    );
}

export default handleErrors;