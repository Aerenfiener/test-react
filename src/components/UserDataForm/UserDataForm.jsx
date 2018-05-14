import React from 'react';
import { Link } from 'react-router-dom'
import './UserDataForm.scss'
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
            <div className="user-form">
                {
                    !projectStore.finished ?
                        <div className="user-form_wrapper">
                            <div>
                                <div className="user-form_input_label">Имя</div>
                                <div className={classNames('user-form_input', {'not-valid': !validate.name})}>
                                    <input type="text" defaultValue={name} onChange={this.onChangeName} />
                                </div>
                                <div className="user-form_input_label">Возраст</div>
                                <div className={classNames('user-form_input', {'not-valid': !validate.age})}>
                                    <input type="text"  defaultValue={age} onChange={this.onChangeAge} />
                                </div>
                                <div className={classNames('user-form_input', {'not-valid_checkbox': !validate.fullGrown})}>
                                    <div className="user-form_checkbox" >
                                        <input id="age" type="checkbox" defaultChecked={fullGrown} onClick={this.onChangeFullGrown}/>
                                    </div>
                                    <div className="user-form_checkbox_label">
                                        <label htmlFor="age">мне есть 18 лет</label>
                                    </div>
                                </div>
                            </div>
                            <div className="user-form_buttons_wrapper">
                                <Link onClick={this.onSubmitForm} to='/card' className="user-form_buttons_next">
                                    Далее
                                </Link>
                            </div>
                        </div> :
                        <div className="finished">
                            Данные были успешно отправлены!
                        </div>
                }
            </div>
        )
    }
}

export default UserDataForm;