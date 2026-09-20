const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

exports.createPayment = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const { amount, orderId } = req.body;

        if (!amount) {
            res.status(400).send({ error: "Не указана сумма платежа!" });
            return;
        }

        const fakePaymentId = "pay_" + Math.random().toString(36).substr(2.9);

        console.log(`[БАНК] Успешно сгенерирована транзакция ${fakePaymentId} на сумму ${amount} ₽`);

        res.status(200).send({
            success: true,
            paymentId: fakePaymentId,
            amount: amount,
            orderId: orderId
        });
    });
});