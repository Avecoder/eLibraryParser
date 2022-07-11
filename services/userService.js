import UserModel from '../models/UserModel.js'
import ApiError from '../exception/apiError.js'

export const createUser = async ({lastName, eLibraryId}) => {
  const user = await UserModel.findOne({eLibraryId})
  if(user) throw ApiError.BadRequest(`Пользователь с id ${eLibraryId} уже существует`)
  const newUser = new UserModel({lastName: lastName.toLowerCase(), eLibraryId})
  await newUser.save()
  return newUser
}


export const getUserByName = async lastName => {
  const user = await UserModel.findOne({lastName: lastName.toLowerCase()})
  if(!user) throw ApiError.BadRequest(`Пользователь с фамилией ${lastName} не найден`)
  return user
}

export const removeUser = async eLibraryId => {
  const user = await UserModel.findOneAndDelete({eLibraryId})
  if(!user) throw ApiError.BadRequest(`Пользователь с id ${eLibraryId} не найден`)
  return user
}

export const getUserId = async eLibraryId => {
  const user = await UserModel.findOne({eLibraryId})
  if(!user) throw ApiError.BadRequest(`Пользователь с id ${eLibraryId} не найден`)
  return user._id
}


export const getAllUsersId = async () => {
  const users = await UserModel.find()

  return users.map(item => {
    return {eLibraryId: item.eLibraryId, id: item._id}
  })
}
