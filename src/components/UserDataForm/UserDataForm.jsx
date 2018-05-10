import React from 'react';
import { Link } from 'react-router-dom'
import './UserDataForm.scss'
import classNames from 'classnames';


import { observer, inject } from "mobx-react"

@inject("userStore", "projectStore")
@observer

class UserDataForm extends React.Component{
    constructor(props) {
        super();


        const user = props.userStore.getUserInfo;

        this.state = {
            validate: {
                age: true,
                name: true,
                fullGrown: true
            },
            name: user.name,
            age: user.age,
            fullGrown: user.fullGrown
        };

        this.setWrapperNameRef = this.setWrapperNameRef.bind(this);
        this.setWrapperAgeRef = this.setWrapperAgeRef.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onChangeFullGrown = this.onChangeFullGrown.bind(this);

        this.wrapperNameRef = null;
        this.wrapperAgeRef = null;
    }

    setWrapperNameRef(node) {
        if (node) {
            this.wrapperNameRef = node;
            this.wrapperNameRef.addEventListener('input', this.regexpName = () => {
                const { value } = node;
                this.wrapperNameRef.value = value.replace(/[^A-Za-z\s]/g, '');
                this.setState({name: this.wrapperNameRef.value});
            });
        }
    }
    setWrapperAgeRef(node) {
        if (node) {
            this.wrapperAgeRef = node;
            this.wrapperAgeRef.addEventListener('input', this.regexpAge = () => {
                let { value } = node;
                this.wrapperAgeRef.value = value.replace(/[^\d]/g, '').substring(0,3);
                this.setState({ age: this.wrapperAgeRef.value });
            });
        }
    }

    componentWillUnmount() {
        if (this.wrapperNameRef) {
            this.wrapperNameRef.removeEventListener('input', this.regexpName);
        }
        if (this.wrapperAgeRef) {
            this.wrapperAgeRef.removeEventListener('input', this.regexpAge);
        }
    }

    onChangeFullGrown(event) {
        this.setState({ fullGrown: event.target.checked });
    }

    onSubmitForm = ev => {
        if (!this.onValidationForm()) {
            ev.preventDefault();
        }
        const { userStore } = this.props;
        const { name, age, fullGrown } = this.state;
        userStore.setUserInfo( {name, age, fullGrown} );
    };

    onValidationForm() {
        const { name, age, fullGrown, validate } = this.state;

        this.setState({
            validate: {
                name: !!name,
                age: !!age,
                fullGrown: !!fullGrown
            }
        });

        return !!(name && age && fullGrown);
    }

    render() {
        const { name, age, fullGrown, validate } = this.state;
        const { projectStore } = this.props;
        return(
            <div className="user-form">
                {
                    !projectStore.isFinished ?
                        <div className="user-form_wrapper">
                            <div>
                                <div className="user-form_input_label">Имя</div>
                                <div className={classNames('user-form_input', {'not-valid': !validate.name})}>
                                    <input type="text" defaultValue={name} onChange={this.onChangeName} ref={this.setWrapperNameRef} />
                                </div>
                                <div className="user-form_input_label">Возраст</div>
                                <div className={classNames('user-form_input', {'not-valid': !validate.age})}>
                                    <input type="text"  defaultValue={age} ref={this.setWrapperAgeRef} />
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