import { observable, computed, action } from 'mobx';

class CardStore {
    @observable cardNumber = '';

    @computed
    get getCardNumber() {
        return this.cardNumber;
    }

    @computed
    get getValid() {
        return !!this.cardNumber;
    }

    @action
    setCardNumber(cardNumber) {
        this.cardNumber = cardNumber;
    }
}

export default new CardStore();