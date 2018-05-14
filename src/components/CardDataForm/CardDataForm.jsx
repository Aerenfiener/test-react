import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from "mobx-react"
import './CardDataForm.scss'
import '../../styles/style.scss'
import classNames from "classnames";


@inject("cardStore", "projectStore")
@observer
class CardDataForm extends React.Component{
    constructor() {
        super();

        this.onCardChange = this.onCardChange.bind(this);
        this.onValidate = this.onValidate.bind(this);
    }

    onSubmitForm = ev => {
        this.onValidate();

        if (!this.props.cardStore.getValid) {
            ev.preventDefault();
        }
    };

    onValidate() {
        this.props.cardStore.onValidate();
    }

    onCardChange(event) {
        let { selectionStart, selectionEnd, value } = event.target;
        value = value.replace(/[^\d]/g, '').substring(0,16);
        value = value !== '' ? value.match(/.{1,4}/g).join(' ') : '';

        if (selectionStart % 5 === 0) {
            ++selectionStart;
            ++selectionEnd;
        }

        event.target.value = value;
        event.target.selectionStart = selectionStart;
        event.target.selectionEnd = selectionEnd;

        this.props.cardStore.setCardNumber(event.target.value);
    }

    render() {
        const { projectStore } = this.props;
        const { cardNumber, cardValid } = this.props.cardStore;
        return(
            <div className="form">
                {
                    !projectStore.finished ?
                        <Fragment>
                            <div className="text-label">Номер банковской карты</div>
                            <input type="text"
                                   defaultValue={cardNumber}
                                   onChange={this.onCardChange}
                                   className={classNames('text-input', {'text-input__error': !cardValid})} />
                            <div className="card-form_buttons_wrapper">
                                <Link to='/user' onClick={this.onValidate} className="button-prev">
                                    Назад
                                </Link>
                                <Link to='/finish' onClick={this.onSubmitForm} className="button-next">
                                    Далее
                                </Link>
                            </div>
                        </Fragment> :
                        <div className="form__finished_wrapper">
                            Данные были успешно отправлены!
                        </div>
                }
            </div>
        )
    }
}

export default CardDataForm;