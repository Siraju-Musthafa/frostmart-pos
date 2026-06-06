const {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct
} = require("../services/product.service")

const {
  createProductSchema,
} = require("../validators/product.validator")

const create = async (req, res) => {
  try {
    const validatedData =
      createProductSchema.parse(req.body)

    const product =
      await createProduct(validatedData)

    res.status(201).json({
      success: true,
      data: product,
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
    const products = await getProducts()

    res.json({
      success: true,
      data: products,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const remove =
  async (req, res) => {

    try {

      await deleteProduct(
        req.params.id
      );

      res.json({
        success: true,
      });

    } catch (error) {

      res.status(400).json({
        message: error.message,
      });

    }
};

const update =
  async (req, res) => {

    try {

      const product =
        await updateProduct(
          req.params.id,
          req.body
        );

      res.json(product);

    } catch (error) {

      res.status(400).json({
        message: error.message,
      });

    }
};

module.exports = {
  create,
  getAll,
  remove,
  update
}