function ProductCard({ isNew, image, title, price, onCardClick, onBuyClick, onFavClick, isFavorite }) {
    return (
        <div className="product-card">
            <div className="product-card-image-wrapper">
                {isNew && (
                    <div className="new-badge-label">
                        НОВОЕ
                    </div>
                )}
                <img
                    src={image}
                    alt={title}
                    onClick={onCardClick}
                />
            </div>
            
            <h3 onClick={onCardClick}>{title}</h3>
            <p>{price} <span className="currency-rub">₽</span></p>
            <button onClick={onBuyClick} className="buy-btn">Купить</button>
            <div className="product-card-actions">
                <button 
                    onClick={onFavClick}
                    className={`fav-btn ${isFavorite ? 'active' : ''}`}
                >
                    {isFavorite ? (
                        <img src="icons/icon_heart_active.svg" alt="В избранном" className="my-heart-icon" />
                    ) : (
                        <img src="icons/icon_heart.svg" alt="Добавить в избранное" className="my-heart-icon" />
                    )}
                </button>
            </div>
        </div>
    );
}

export default ProductCard;