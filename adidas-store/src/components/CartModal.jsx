function CartModal({isOpen, closeCart, changePage, cartItems, onRemoveItem, onClearCart}) {
    const totalSum = cartItems.reduce((sum, item) => sum + item.price, 0);
    return (
        <div className={`cart-modal ${isOpen ? 'open' : ''}`} id="cartModal" onClick={(event) => {
            if (event.target.id === 'cartModal') {
                closeCart();
            }
        }}>
            <div className="cart-panel">
                <div className="cart-header">
                    <h2>Корзина</h2>

                    <div className="cart-header-actions">
                        {cartItems.length > 0 && (
                            <button 
                            onClick={onClearCart}
                            className="clear-cart-btn"
                            title="Очистить корзину"
                            >
                                <img src="icons/delete.svg" alt="Очистить" className="icon-trash" />
                            </button>
                        )}
                    </div>

                    <button onClick={closeCart} className="close-cart-btn" id="closeCartBtn">&times;</button>
                </div>

                <div className="cart-items-container" id="cartItemsContainer">
                    {cartItems.length === 0 ? (
                        <p className="empty-cart-text">Ваша корзина пуста</p>
                    ) : (
                        cartItems.map((item, index) => {
                            const colorImages = item.images && item.selectedColor ? item.images[item.selectedColor] : null;

                            const itemImage = Array.isArray(colorImages)
                                ?colorImages[0]
                                : (typeof colorImages === 'string'
                                    ?colorImages
                                    : (Array.isArray(Object.values(item.images)[0])
                                        ? Object.values(item.images)[0][0]
                                        : Object.values(item.images)[0] || ''));

                            return (
                                <div key={index} className="cart-item">
                                    <img
                                        src={itemImage}
                                        alt={item.title}
                                        className="cart-item-img"
                                    />
                                    <div className="cart-item-info">
                                        <h4>{item.title}</h4>
                                        
                                        {(item.selectedColor || item.selectedSize) && (
                                            <div className="cart-item-options" style={{ display: 'flex', gap: '10px', margin: '4px 0', fontSize: '12px', color: '#777777', textTransform: 'uppercase' }}>
                                                {item.selectedSize && <span>Размер: {item.selectedSize}</span>}
                                            </div>
                                        )}
                                        
                                        <p>{item.price} <span className="currency-rub">₽</span></p>
                                    </div>
                                    <button 
                                    onClick={() => onRemoveItem(index)}
                                    className="remove-item-btn">&times;</button>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="cart-footer">
                    <div className="cart-total">
                        <span>Итого:</span>
                        <span id="cartTotalSum">{totalSum} ₽</span>
                    </div>
                    <button
                        onClick={() => {
                            closeCart();
                            changePage('checkout');
                        }}
                         className="checkout-btn" disabled={cartItems.length === 0}>Оформить заказ</button>
                </div>
            </div>
        </div>
    );
}

export default CartModal;