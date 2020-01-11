import { action, observable, decorate } from "mobx"

class UserStore {
    userName = null;
    userEmail = null;
    officeId = 1; // maps to lat/lon for esri offices
    driver = 1; // driving preference 
    arrive = "09:00";
    leave = "17:00";
    successful = false; // if checked, removes user from results list
    userNew = true; // determines whether to add new user or update existing
    lineId = null; // OBJECTID for the line layer
    pointId = null; // OBJECTID for the point layer
    route = null; // route Geometry 
    address = '';
    offsite = false;  // allows results and settings to load

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
        this.successful = x;
    }
    setLineId(x) {
        this.lineId = x;
    }
    setPointId(x) {
        this.pointId = x;
    }
    setRoute(x) {
        this.route = x;
    }
    setAddress(x) {
        this.address = x;
    }
    setOffsite(x) {
        this.offsite = x;
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
    lineId: observable,
    pointId: observable,
    route: observable,
    address: observable,
    offsite: observable,
    setNew: action,
    setName: action,
    setEmail: action,
    setDriver: action,
    setOffice: action,
    setLeave: action,
    setArrive: action,
    setSuccess: action,
    setLineId: action,
    setPointId: action,
    setRoute: action,
    setAddress: action,
    setOffsite: action
})

export default UserStore