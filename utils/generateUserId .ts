import { User } from "../models/users.model"

export const findLastUserId = async () => {
    // Find the last user in the database
    // Return the id of the last user
    const lastUser = await User.findOne({}, {id: 1, _id: 0}).sort({
        createdAt: -1
    }).lean()
    return lastUser?.id
}

export const generateUserId =async () => {

}