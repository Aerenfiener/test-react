import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './MenuForm.scss'
import { withRouter } from "react-router";
import {inject, observer} from "mobx-react/index";


@inject("cardStore", "userStore")
@observer
class MenuForm extends React.Component {
    constructor() {
        super();
    }
    render() {
        const { location, cardStore, userStore } = this.props;
        return (
            <div>
                <div className="menu_wrapper">
                    <div className={classNames('menu_tab', {'menu_tab_active': location.pathname === '/user'})}>
                        <Link to="/user">Личные данные</Link>
                        { !userStore.getValid ?
                            <div className="menu_tab_is-full">Необходимо заполнить!</div> :
                            null
                        }
                    </div>
                    <div className={classNames('menu_tab', {'menu_tab_active': location.pathname === '/card'})}>
                        <Link to="/card">Номер банковской карты</Link>
                        { !cardStore.getValid ?
                            <div className="menu_tab_is-full">Необходимо заполнить!</div> :
                            null
                        }

                    </div>
                    <div className={classNames('menu_tab', {'menu_tab_active': location.pathname === '/finish'})}>
                        <Link to="/finish">Завершение</Link>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(MenuForm);