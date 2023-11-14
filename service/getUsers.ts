import { ReturnGetUsers } from "../interfaces/ReturnGetUsers.interface";

export default async function getUsers(): Promise<ReturnGetUsers | null> {
    try {
        let headersList = {}
        
        let response = await fetch("https://randomuser.me/api/?page=3&results=50", { 
          method: "GET",
          headers: headersList
        });
        
        let data = await response.json() as ReturnGetUsers;
        return data
    } catch {
        return null
    }
}