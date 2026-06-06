const {
  registerUser,
  loginUser,
} = require("../services/auth.service")

const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validator")

// REGISTER
const register = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body)

    const result = await registerUser(validatedData)

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

// LOGIN
const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body)

    const result = await loginUser(validatedData)

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  register,
  login,
}