import { User } from "../interfaces/User.interface"

class FaviriteUsers {
    favoriteUsersList: User[] = []

    add(userUuid: string, user: User) {
        const indexUserAlreadySalved = this.favoriteUsersList.findIndex(user => user.login.uuid === userUuid)

        if (indexUserAlreadySalved !== -1) {
            this.favoriteUsersList[indexUserAlreadySalved] = user
            return
        }
        
        
        this.favoriteUsersList.push(user)
        console.log(this.favoriteUsersList.length)
        return 
    }

    remove(userUuid: string) {
        // return this.favoriteUsersList.get(userUuid)
    }

    getAll() {
        return this.favoriteUsersList
    }
}

const favoriteUsersList = new FaviriteUsers()

export default favoriteUsersList;