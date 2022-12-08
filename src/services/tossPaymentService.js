const tosspaymentDao = require("../models/tosspaymentDao")

const tossPaymentConfirm = async (amount, orderId, paymentKey) => {
    return await tosspaymentDao.tossPaymentConfirm(amount, orderId, paymentKey)

}

module.exports = {
    tossPaymentConfirm
}
