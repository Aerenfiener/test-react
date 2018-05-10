import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from "mobx-react"
import './CardDataForm.scss'
import classNames from "classnames";


@inject("cardStore", "projectStore")
@observer
class CardDataForm extends React.Component{
    constructor(props) {
        super();

        this.state = props.cardStore;
        this.state.cardValid = true;

        this.setWrapperRef = this.setWrapperRef.bind(this);
    }

    setWrapperRef(node) {
        if (node) {
            this.wrapperCodeRef = node;
            node.addEventListener('input', this.regexCode = () => {
                let { value } = this.wrapperCodeRef;
                let code = value.replace(/[^\d]/g, '').substring(0,16);
                this.wrapperCodeRef.value = code !== '' ? code.match(/.{1,4}/g).join(' ') : '';
                this.setState({ cardNumber: this.wrapperCodeRef.value });
            });
        }
    }

    onSubmitForm = ev => {
        if (!this.onValidationForm()) {
            ev.preventDefault();
        }

        const { cardStore } = this.props;
        const { cardNumber } = this.state;
        cardStore.setCardNumber(cardNumber);
    };

    onValidationForm() {
        const { cardNumber } = this.state;
        this.setState({cardValid: !!cardNumber});
        return !!cardNumber;
    }

    componentWillUnmount() {
        if (this.wrapperCodeRef) {
            this.wrapperCodeRef.removeEventListener('input', this.regexCode);
        }
    }

    render() {
        const { cardNumber, cardValid } = this.state;
        const { projectStore } = this.props;
        return(

            <div className="card-form_wrapper">
                {
                    !projectStore.isFinished ?
                        <form>
                            <div className="card-form_input_label">Номер банковской карты</div>
                            <div className={classNames('card-form_input', {'not-valid': !cardValid})}>
                                <input type="text" defaultValue={cardNumber} ref={this.setWrapperRef}/>
                            </div>
                            <div className="card-form_buttons_wrapper">
                                <Link to='/user' className="card-form_buttons_prev">
                                    Назад
                                </Link>
                                <Link to='/finish' onClick={this.onSubmitForm} className="card-form_buttons_next">
                                    Далее
                                </Link>
                            </div>
                        </form> :
                        <div className="finished">
                            Данные были успешно отправлены!
                        </div>
                }
            </div>
        )
    }
}

export default CardDataForm;