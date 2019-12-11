import { action, observable, decorate } from "mobx"

class UserStore {
    user = {
        name: null,
        email: null,
        driver: null,
        office_id: null,
        arrive_work: null,
        leave_work: null,
        successful: false
    };

    userName = null;

    userEmail = null;

    setUser(u) {
        this.user = u;
    }
    clearUser() {
        this.user = {
            name: null,
            email: null,
            driver: null,
            office_id: null,
            arrive_work: null,
            leave_work: null,
            successful: false
        };
    }

    setName(n) {
        this.userName = n;
    }
    clearName() {
        this.userName = null;
    }

    setEmail(e) {
        this.userEmail = e;
    }
    clearEmail() {
        this.userEmail = null;
    }
}

  
decorate(UserStore, {
    user: observable,
    userName: observable,
    userEmail: observable,
    setUser: action,
    setName: action,
    setEmail: action,
    clearUser: action,
    clearName: action,
    clearEmail: action,
})

export default new UserStore()