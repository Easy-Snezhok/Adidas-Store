import { useState } from 'react';

function Checkout({cartItems = [], onOrderComplete}) {
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    
    const [buyerName, setBuyerName] = useState('');
    const [buyerPhone, setBuyerPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const [isPaying, setIsPaying] = useState(false);

    const [isBankFormOpen, setIsBankOpen] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvc, setCardCvc] = useState('');
    const [bankError, setBankError] = useState('');
    const [finalTotal, setFinalTotal] = useState(0);

    const handleCardNumberChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').substring(0, 16);

        const formatted = input.match(/.{1,4}/g)?.join(' ') || '';

        setCardNumber(formatted);
    };

    const handleCardExpiryChange = (e) => {
        let input = e.target.value.replace(/\D/g, '');

        if (input.length === 1 && input > '1') {
            input = '0' + input;
        }

        if (input.length === 2 && Number(input) > 12) {
            input = '12';
        }

        input = input.substring(0, 4);

        let formatted = input;
        if (input.length > 2) {
            formatted = `${input.substring(0, 2)}/${input.substring(2)}`;
        }
        setCardExpiry(formatted);
    }

    const checkoutTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

    const formatPhoneNumber = (value) => {
        if (!value) return value;

        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 2) return '+7 ';
        if (phoneNumberLength < 5) { return `+7 (${phoneNumber.slice(1)})`; }
        if (phoneNumberLength < 8) { return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`; }
        if (phoneNumberLength < 10) { return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`; }
        return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
    };

    const handlePhoneChange = (event) => {
        const inputVal = event.target.value;
        const formatted = formatPhoneNumber(inputVal);
        setBuyerPhone(formatted);

        if (formatted.length === 18) {
            setPhoneError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (buyerPhone.length < 18) {
            setPhoneError('Пожалуйста, введите номер телефона полностью!');
            return;
        }
        setPhoneError('');
        
        if (cartItems.length === 0) return;

        setIsPaying(true);
        const randomOrderId = Math.floor(Math.random() * 90000) + 10000;

        try {
            const response = await fetch("http://localhost:5001/adidas-store-318bb/us-central1/createPayment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: checkoutTotal,
                    orderId: randomOrderId
                })
            });

            const data = await response.json();

            if (data.success) {
                setIsPaying(false);
                setIsBankOpen(true);
            } else {
                alert("Ошибка сервера платежей.");
                setIsPaying(false);
            }

        } catch (error) {
            console.error("Сервер оффлайн, включаем автономный режим:", error);
            setIsPaying(false);
            setIsBankOpen(true);
        }
    };

    const handleBankPaymentSubmit = (e) => {
        e.preventDefault();
        setBankError('');

        const cleanCard = cardNumber.replace(/\s/g, '');
        if (cleanCard.length !== 16) {
            setBankError('Номер карты должен состоять из 16 цифр!');
            return;
        }
        if (cardCvc.length !== 3) {
            setBankError('Неверный CVC код (3 цифры)!');
            return;
        }

        setFinalTotal(checkoutTotal);

        setBankError('Проверка карты банком...');
        setTimeout(() => {
            setIsBankOpen(false);
            onOrderComplete(buyerName, buyerPhone, 'Самовывоз / Адрес из профиля');
            setIsSuccessOpen(true);
        }, 800);
    };

    return (
        <main className="checkout-main">
            <div className="checkout-container">
                
                <div className="checkout-form-block">
                    <h2>Оформление заказа</h2>
                    <form id="checkoutForm" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="userName">Ваше имя и фамилия</label>
                            <input 
                                type="text" 
                                id="userName" 
                                required 
                                placeholder="Иван Иванов"
                                value={buyerName}
                                onChange={(e) => setBuyerName(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="userPhone">Номер телефона</label>
                            <input
                                type="tel"
                                id="userPhone"
                                required
                                value={buyerPhone}
                                onChange={handlePhoneChange}
                                placeholder="+7 (999) 999 99-99"
                            />

                            {phoneError && (
                                <span className="input-error-text">
                                    {phoneError}
                                </span>
                            )}
                        </div>

                        <div className="input-group">
                            <label htmlFor="userAddress">Адрес доставки</label>
                            <input type="text" id="userAddress" required placeholder="г. Москва, ул. Ленина, д. 1, кв. 5"/>
                        </div>

                        <button type="submit" className="pay-btn" disabled={cartItems.length === 0 || isPaying}>
                            {isPaying ? 'Связь с банком...' : 'Оплатить заказ'}
                        </button>
                    </form>
                </div>

                <div className="checkout-summary-block">
                    <h3>Ваш заказ</h3>
                    <div className="checkout-total">
                        <span>Итого к оплате:</span>
                        <span id="checkoutTotalSum">{checkoutTotal} <span className="currency-rub">₽</span></span>
                    </div>
                </div>

            </div>

            <div className={`custom-alert-overlay ${isBankFormOpen ? 'open' : ''}`}>
                <div className="checkout-bank-card">
                    <div className="checkout-bank-icon">
                        <img src="icons/card-bank.svg" alt="Банковская карта" className="checkout-svg-card-icon" />
                    </div>
                    <h2>Оплата</h2>
                    <p className="checkout-bank-subtitle">Adidas Store</p>

                    <form onSubmit={handleBankPaymentSubmit} className="checkout-bank-form">
                        <div className="input-group">
                            <label>Номер карты</label>
                            <input
                                type="text"
                                required
                                maxLength="19"
                                placeholder="0000 0000 0000 0000"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                            />
                        </div>

                        <div className="checkout-bank-row">
                            <div className="input-group">
                                <label>Срок действия</label>
                                <input
                                    type="text"
                                    required
                                    maxLength="5"
                                    placeholder="ММ/ГГ"
                                    value={cardExpiry}
                                    onChange={handleCardExpiryChange}
                                />
                            </div>
                            <div className="input-group">
                                <label>CVC / CVV</label>
                                <input
                                    type="text"
                                    required
                                    maxLength="3"
                                    placeholder="•••"
                                    value={cardCvc}
                                    onChange={(e) => setCardCvc(e.target.value.replace(/[^\d]/g, ''))}
                                />
                            </div>
                        </div>

                        {bankError && <span className="input-error-text checkout-bank-error">{bankError}</span>}

                        <div className="custom-alert-actions">
                            <button type="button" onClick={() => setIsBankOpen(false)} className="custom-alert-btn-cancel">
                                Отмена
                            </button>
                            <button type="submit" className="custom-alert-btn-confirm">
                                Оплатить {checkoutTotal} <span className="currency-rub">₽</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={`success-overlay ${isSuccessOpen ? 'open' : ''}`} id="successOverlay">
                <div className="success-card">
                    <div className="success-icon">
                        <img src="icons/Check.svg" alt="Успешно" className="success-check-img"/>
                    </div>
                    <h2>Заказ успешно оплачен!</h2>
                     <p className="success-card-text">
                        <strong>{buyerName}</strong>, спасибо за покупку!<br />
                        Сумма вашего заказа: <strong>{finalTotal} <span className="currency-rub">₽</span></strong>.<br />
                        Наш менеджер уже связывается с вами для подтверждения по телефону: <strong>{buyerPhone}</strong>.
                    </p>
                    <button
                        onClick={() => {
                            setIsSuccessOpen(false);
                            onOrderComplete();
                            window.location.reload();
                        }}
                        className="success-btn"
                        id="successHomeBtn"
                    >
                        На главную
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Checkout;