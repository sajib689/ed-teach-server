import { IUser } from "../interfaces/users.interface";
import { generateUserId } from "../utils/generateUserId ";

const createUsers = async (user: IUser): Promise <IUser | null> => {
    const id = await generateUserId();
}