import UserStore from "../store/userDomainStore"

describe("UserStore", () => {
    it("creates new user", () => {
      const store = UserStore
      store.setName("John Doe")
      store.setEmail("john@esri.com")
      expect(store.userName).toBe("John Doe")
      expect(store.userEmail).toBe("john@esri.com")
    })

})