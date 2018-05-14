import React from 'react';
import './FinishForm.scss'
import '../../styles/style.scss'
import { inject, observer } from "mobx-react/index";

@inject("cardStore", "userStore", "projectStore")
@observer
class FinishForm extends React.Component{
    constructor() {
        super();

        this.state = {
            canFinished: true
        };

        this.onFinish = this.onFinish.bind(this);
    }

    onFinish() {
        const { cardStore, userStore } = this.props;
        cardStore.onValidate();
        userStore.onValidate();

        if (cardStore.getValid && userStore.getValid) {
            this.props.projectStore.setFinished();
        } else {
            this.setState({ canFinished: false })
        }
    }

    render() {
        const { canFinished } = this.state;
        const { finished } = this.props.projectStore;

        return(
            <div className="form">
                {
                    !canFinished && !finished ?
                        <div className="finish_error">Заполните все поля в формах для завершения!</div> :
                        null
                }
                {
                    finished ?
                        <div className="form__finished_wrapper">
                            Данные были успешно отправлены!
                        </div> :
                        <div className="finish_button_wrapper">
                            <div className="finish_button" onClick={this.onFinish}>
                                Завершить
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default FinishForm;