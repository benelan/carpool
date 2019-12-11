import { action, observable, decorate } from "mobx"

class UserStore {
    userName = null;
    userEmail = null;
    officeId = 1;
    arrive = "09:00";
    leave = "17:00";
    driver = 1;
    successful = false;
    userNew = true;

    setName(x) {
        this.userName = x;
    }
    setEmail(x) {
        this.userEmail = x;
    }
    setNew(x) {
        this.userNew = x;
    }
    setDriver(x) {
        this.driver = x;
    }
    setArrive(x) {
        this.arrive = x;
    }
    setLeave(x) {
        this.leave = x;
    }
    setOffice(x) {
        this.officeId = x;
    }
    setSuccess(x) {
        this.success = x;
    }
}

  
decorate(UserStore, {
    userNew: observable,
    userName: observable,
    userEmail: observable,
    officeId: observable,
    leave: observable,
    arrive: observable,
    driver: observable,
    successful: observable,
    setNew: action,
    setName: action,
    setEmail: action,
    setDriver: action,
    setOffice: action,
    setLeave: action,
    setArrive: action,
    setSuccess: action
})

export default new UserStore()