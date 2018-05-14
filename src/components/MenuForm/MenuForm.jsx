import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './MenuForm.scss'
import { withRouter } from "react-router";
import { inject, observer } from "mobx-react/index";


@inject("cardStore", "userStore")
@observer
class MenuForm extends React.Component {
    constructor() {
        super();

        this.onGoToDifferentPage = this.onGoToDifferentPage.bind(this);
    }

    onGoToDifferentPage(event) {
        const { location, cardStore, userStore } = this.props;
        switch (location.pathname) {
            case '/user':
                userStore.onValidate();

                if (!userStore.getValid) {
                    event.preventDefault();
                }
                break;
            case '/card':
                cardStore.onValidate();

                // Чтобы поведение по кнопкам и по табам не расходилось
                if (!cardStore.getValid && event.currentTarget.attributes.href.textContent === '/finish') {
                    event.preventDefault();
                }
                break;
        }
    }

    render() {
        const { location, cardStore, userStore } = this.props;
        return (
            <Fragment>
                <div className="menu_wrapper">
                    <div className={classNames('menu_tab', {'menu_tab_active': location.pathname === '/user'})}>
                        <Link onClick={this.onGoToDifferentPage} to="/user">Личные данные</Link>
                        {!userStore.getValid ?
                            <div className="menu_tab_is-full">Необходимо заполнить!</div> :
                            null
                        }
                    </div>
                    <div className={classNames('menu_tab', {'menu_tab_active': location.pathname === '/card'})}>
                        <Link onClick={this.onGoToDifferentPage} to="/card">Номер банковской карты</Link>
                        {!cardStore.getValid ?
                            <div className="menu_tab_is-full">Необходимо заполнить!</div> :
                            null
                        }

                    </div>
                    <div className={classNames('menu_tab', {'menu_tab_active': location.pathname === '/finish'})}>
                        <Link onClick={this.onGoToDifferentPage} to="/finish">Завершение</Link>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(MenuForm);