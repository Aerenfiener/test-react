import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import './UserDataForm.scss'
import '../../styles/style.scss'
import classNames from 'classnames';


import { observer, inject } from "mobx-react"

@inject("userStore", "projectStore")
@observer

class UserDataForm extends React.Component{
    constructor() {
        super();

        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeFullGrown = this.onChangeFullGrown.bind(this);
    }

    onSubmitForm = ev => {

        this.props.userStore.onValidate();
        if (!this.props.userStore.getValid) {
            ev.preventDefault();
        }
    };

    onChangeName(event) {
        event.target.value = event.target.value.replace(/[^A-Za-z\s]/g, '');
        this.props.userStore.setUserName(event.target.value);
    }

    onChangeAge(event) {
        event.target.value = event.target.value.replace(/[^\d]/g, '').substring(0,3);
        this.props.userStore.setUserAge(event.target.value);
    }

    onChangeFullGrown(event) {
        this.props.userStore.setUserFullGrown(event.target.checked);
    }

    render() {
        const { projectStore, userStore } = this.props;
        const { user, validate } = userStore;
        const { name, age, fullGrown } = user;
        return(
            <div className="form">
                {
                    !projectStore.finished ?
                        <div className="user-form_wrapper">
                            <Fragment>
                                <div className="text-label">Имя</div>
                                <input type="text"
                                       defaultValue={name}
                                       onChange={this.onChangeName}
                                       className={classNames('text-input', {'text-input__error': !validate.age})} />
                                <div className="text-label">Возраст</div>
                                <input type="text"
                                       defaultValue={age}
                                       onChange={this.onChangeAge}
                                       className={classNames('text-input', {'text-input__error': !validate.age})} />
                                <div className="user-form__checkbox_wrapper">
                                    <input id="age" type="checkbox" defaultChecked={fullGrown} onClick={this.onChangeFullGrown}/>
                                    <div className={classNames('user-form__checkbox__label', {'user-form__checkbox-error': !validate.fullGrown})} >
                                        <label htmlFor="age">мне есть 18 лет</label>
                                    </div>
                                </div>
                            </Fragment>
                            <div className="user-form__buttons_wrapper">
                                <Link onClick={this.onSubmitForm} to='/card' className="button-next">
                                    Далее
                                </Link>
                            </div>
                        </div> :
                        <div className="form__finished_wrapper">
                            Данные были успешно отправлены!
                        </div>
                }
            </div>
        )
    }
}

export default UserDataForm;