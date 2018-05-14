import { observable, computed, action } from 'mobx';

class CardStore {
    @observable.ref cardNumber = '';
    @observable.ref cardValid = true;


    @computed
    get getValid() {
        return this.cardValid;
    }

    @action
    setCardNumber(cardNumber) {
        this.cardNumber = cardNumber;
    }

    @action
    onValidate() {
        this.cardValid = !!this.cardNumber;
    }
}

export default new CardStore();