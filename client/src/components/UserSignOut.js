import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// user sign out method, again pulls these methods from context.js
const UserSignOut = ({ context }) => {

    useEffect(() => context.actions.signOut());
    return (
        <Redirect to='/' />
    );
}

export default UserSignOut;