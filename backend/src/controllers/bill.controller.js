const {
  createBill,deleteBill,updateBill
} = require("../services/bill.service")

const {
  createBillSchema,
} = require("../validators/bill.validator")

const create = async (req, res) => {
  try {
    const validatedData =
      createBillSchema.parse(req.body)

    const bill =
      await createBill(
        validatedData,
        req.user.id
      )

    res.status(201).json({
      success: true,
      data: bill,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}


const remove = async (req, res) => {

  try {

    const result =
      await deleteBill(
        req.params.id
      );

    res.json({
      success: true,
      message: result.message,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};

const update = async (
  req,
  res
) => {

  try {

    const bill =
      await updateBill(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      data: bill,
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
  remove,
  update 
}