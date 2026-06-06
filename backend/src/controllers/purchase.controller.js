const {
  createPurchase,
  getPurchases,
  deletePurchase,
} = require(
  "../services/purchase.service"
)

const create =
  async (req, res) => {

    try {

      const purchase =
        await createPurchase(
          req.body
        )

      res.status(201).json({
        success: true,
        data: purchase,
      })

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

const allPurchases =
  async (req, res) => {

    try {

      const purchases =
        await getPurchases()

      res.json({
        success: true,
        data: purchases,
      })

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  const removePurchase =
async (req, res) => {

  try {

    await deletePurchase(
      req.params.id
    );

    res.json({

      success: true,

      message:
        "Purchase deleted",

    });

  } catch (error) {

    res.status(400).json({

      success: false,

      message:
        error.message,

    });

  }

};

module.exports = {
  create,
  allPurchases,
  removePurchase ,
}