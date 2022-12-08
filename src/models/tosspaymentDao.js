const { appDataSource } = require("./dataSource")

const tossPaymentConfirm = async (amount, orderId, paymentKey) => {
	
	const result = await appDataSource.query(
    `INSERT INTO payment(
        amount,
        orderId,
        paymentKey
    ) VALUES (?, ?, ?);
    `,
    [amount, orderId, paymentKey]
    ); 
	return result;

};

module.exports = {
    tossPaymentConfirm
}