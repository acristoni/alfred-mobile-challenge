import { User } from "../interfaces/User.interface";

export class FavoriteUsers {
    private static instance: FavoriteUsers | null = null;
    private favoriteUsersList: User[] = [];

    private constructor() {}

    static getInstance(): FavoriteUsers {
        if (!FavoriteUsers.instance) {
            FavoriteUsers.instance = new FavoriteUsers();
        }
        return FavoriteUsers.instance;
    }

    add(userUuid: string, user: User) {
        const indexUserAlreadySaved = this.favoriteUsersList.findIndex(user => user.login.uuid === userUuid);

        if (indexUserAlreadySaved !== -1) {
            this.favoriteUsersList[indexUserAlreadySaved] = user;
            return;
        }

        this.favoriteUsersList.push(user);
        return;
    }

    remove(userUuid: string) {
        const arrayWithoutUser = this.favoriteUsersList.filter(user => user.login.uuid !== userUuid)
        this.favoriteUsersList = [...arrayWithoutUser]
        return;
    }

    getAll() {
        return this.favoriteUsersList;
    }
}

const favoriteUsersList = FavoriteUsers.getInstance();

export default favoriteUsersList;
