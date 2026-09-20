function Favorites({favoriteItems, onToggleFavorite, onClearFavorites, onOpenProduct}) {
    return (
        <main className = "favorites-main">
            <h2 className = "favorites-title">Ваши избранные товары</h2>

            {favoriteItems.length > 0 && (
                <div className = "favorites-actions-bar">
                    <button
                        onClick = {onClearFavorites}
                        className = "clear-favorites-btn"
                    >
                        Удалить все товары
                    </button>
                </div>
            )}

            {favoriteItems.length === 0 ? (
                <p className = "empty-favorites-text">Ваш список избранного пока пуст</p>
            ) : (
                <div className = "favorites-list-container">
                    {favoriteItems.map((item) => {
                        const colorImages = item.selectedColor ? item.images[item.selectedColor] : null;

                        const currentImage = Array.isArray(colorImages)
                            ? colorImages[0]
                            : (typeof colorImages === 'string'
                                ? colorImages
                                : (Array.isArray(Object.values(item.images)[0])
                                    ? Object.values(item.images)[0][0]
                                    : Object.values(item.images)[0] || ''));

                        return (
                            <div
                                key = {`${item.id}-${item.selectedColor || 'default'}`}
                                className = "favorites-list-item"
                            >
                                <div className = "favorite-item"> 
                                    <img 
                                        src = {currentImage} 
                                        alt = {item.title}
                                        onClick = {() => onOpenProduct(item)}
                                        className = "cart-item-img" 
                                    />
                                    <div className = "fav-item-info">
                                        <h4
                                            onClick = {() => onOpenProduct(item)}
                                        >
                                            {item.title}
                                        </h4>
                                        <p>{item.price} ₽</p>
                                    </div>
                                </div>
                                <button
                                    onClick = {() => onToggleFavorite(item)}
                                    className = "remove-item-btn"
                                >
                                    &times;
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    );
}

export default Favorites;