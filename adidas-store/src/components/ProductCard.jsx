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
            <p>{price} ₽</p>
            <button onClick={onBuyClick} className="buy-btn">Купить</button>
            <div className="product-card-actions">
                <button 
                    onClick={onFavClick}
                    className={`fav-btn ${isFavorite ? 'active' : ''}`}
                >
                    &#10084;
                </button>
            </div>
        </div>
    );
}

export default ProductCard;