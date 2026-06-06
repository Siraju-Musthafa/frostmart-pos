const prisma = require("../config/prisma")
const bcrypt = require("bcrypt")
const generateToken = require("../utils/generateToken")

// REGISTER
const registerUser = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (existingUser) {
    throw new Error("Email already exists")
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  })

  const token = generateToken(user)

  return {
    user,
    token,
  }
}

// LOGIN
const loginUser = async (data) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (!user) {
    throw new Error("Invalid credentials")
  }

  const isPasswordCorrect = await bcrypt.compare(
    data.password,
    user.password
  )

  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials")
  }

  const token = generateToken(user)

  return {
    user,
    token,
  }
}

module.exports = {
  registerUser,
  loginUser,
}