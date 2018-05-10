import React from 'react';
import { withRouter } from 'react-router';
import MenuForm from '../MenuForm/MenuForm'
import './SiteLayout.scss'

const SiteLayout = ({ children }) => {
    return(
        <div>
            <MenuForm />

            <div className="form_wrapper">
                { children }
            </div>
        </div>
    )
};

export default withRouter(SiteLayout);