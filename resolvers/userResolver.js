const User = require('../Models/User')

const userResolver = {
  Query: {
    getAllUsers: async () => {
      return await User.find()
    },
    getUser: async (_, { id }) => {
      const user = await User.findOne({ _id: id })
      return user
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      console.log(input)
      const newUser = await new User(input)
      newUser.save()
      return newUser
    },

    deleteUser: async (_, { id }) => {
      const deleteUser = await User.findByIdAndDelete(id)
      return deleteUser
    },
  },
}

module.exports = userResolver
