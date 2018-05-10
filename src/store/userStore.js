import { observable, computed, action } from 'mobx';

class UserStore {
    @observable user = {
        name: '',
        age: '',
        fullGrown: false
    };

    @computed
    get getUserInfo() {
        return this.user;
    }

    @computed
    get getValid() {
        return !!(this.user.name && this.user.age && this.user.fullGrown);
    }

    @action
    setUserInfo(userInfo) {
        this.user = userInfo;
    }
}

export default new UserStore();