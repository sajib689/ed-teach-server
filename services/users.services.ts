import { IUser } from "../interfaces/users.interface";
import { User } from "../models/users.model";
import { generateUserId } from "../utils/generateUserId ";

const createUsers = async (user: IUser): Promise <IUser | null> => {
    const id = await generateUserId();
    user.id = id;
    const createUser = await User.create(user);
    return createUser;
}