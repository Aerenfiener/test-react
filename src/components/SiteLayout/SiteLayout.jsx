import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import MenuForm from '../MenuForm/MenuForm'
import './SiteLayout.scss'

const SiteLayout = ({ children }) => {
    return(
        <Fragment>
            <MenuForm />

            <div className="form_wrapper">
                { children }
            </div>
        </Fragment>
    )
};

export default withRouter(SiteLayout);