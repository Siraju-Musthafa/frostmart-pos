const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory 
} = require("../services/category.service")

const {
  createCategorySchema,
} = require("../validators/category.validator")

const create = async (req, res) => {
  try {
    const validatedData =
      createCategorySchema.parse(req.body)

    const category =
      await createCategory(validatedData)

    res.status(201).json({
      success: true,
      data: category,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

const getAll = async (req, res) => {
  try {
    const categories = await getCategories()

    res.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const update =
  async (req, res) => {

    try {

      const category =
        await updateCategory(
          req.params.id,
          req.body
        );

      res.json({
        success: true,
        data: category,
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }
};

const remove =
  async (req, res) => {

    try {

      await deleteCategory(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Category deleted successfully",
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }
};

module.exports = {
  create,
  getAll,
  update,
  remove
}