import { observable, computed, action } from 'mobx';

class UserStore {
    @observable.ref user = {
        name: '',
        age: '',
        fullGrown: false
    };
    @observable validate = {
        name: true,
        age: true,
        fullGrown: true
    };

    @computed
    get getValid() {
        return this.validate.name && this.validate.age && this.validate.fullGrown;
    }

    @action
    setUserInfo(userInfo) {
        this.user = userInfo;
    }

    @action
    setUserName(name) {
        this.user.name = name;
    }

    @action
    setUserAge(age) {
        this.user.age = age;
    }

    @action
    setUserFullGrown(fullGrown) {
        this.user.fullGrown = fullGrown;
    }

    @action
    setValidate(validate) {
        this.validate = validate;
    }

    @action
    onValidate() {
        this.validate.name = !!this.user.name;
        this.validate.age = !!this.user.age;
        this.validate.fullGrown = this.user.fullGrown;
    }
}

export default new UserStore();