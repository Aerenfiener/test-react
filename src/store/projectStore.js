import { observable, computed, action } from 'mobx';

class ProjectStore {
    @observable.ref finished = false;

    @computed
    get isFinished() {
        return this.finished;
    }

    @action
    setFinished() {
        this.finished = true;
    }
}

export default new ProjectStore();