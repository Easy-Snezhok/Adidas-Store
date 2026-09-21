import {useState} from 'react';

function ProductModal({isOpen, product, onClose, onAddToCart, favorites = [], onFavClick}) {
    const [activeColorIndex, setActiveColorIndex] = useState(0);
    const [activeSizeIndex, setActiveSizeIndex] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const [cachedProduct, setCachedProduct] = useState(null);
    const [prevProductId, setPrevProductId] = useState(null);

    if (product && product !== cachedProduct) {
        setCachedProduct(product);
    }

    if (product && product.id !== prevProductId) {
        setPrevProductId(product.id);
        setActiveColorIndex(0);
        setActiveSizeIndex(0);
        setActiveImageIndex(0);
    }

    if (!cachedProduct) return null;

    const displayProduct = cachedProduct;
    const currentColorName = displayProduct.colors[activeColorIndex]?.name || 'white';
    const imagesArray = Array.isArray(displayProduct.images[currentColorName])
        ? displayProduct.images[currentColorName]
        : [displayProduct.images[currentColorName] || Object.values(displayProduct.images)[0]];

    const isCurrentColorFavorite = favorites.some(
        (item) => item.id === displayProduct.id && item.selectedColor === currentColorName
    );

    return (
        <div 
            className={`product-modal ${isOpen ? 'open' : ''}`}
            id="productModal"
            onClick={(event) => {
                if (event.target.id === 'productModal') {
                    onClose();
                }
            }}
        >
                <div className="product-modal-content">
                    <button onClick={onClose} className="close-product-modal-btn" id="closeProductModalBtn">&times;</button>

                    <div className="product-modal-body">
                        
                        <div className="product-modal-gallery-wrapper">
                            <div className="modal-thumbnails-sidebar">
                                {imagesArray.map((imgUrl, idx) => (
                                    <div
                                        key={idx}
                                        className={`thumbnail-card ${idx === activeImageIndex ? 'active' : ''}`}
                                        onClick={() => setActiveImageIndex(idx)}
                                    >
                                        <img src={imgUrl} alt={`Ракурс ${idx + 1}`} />
                                    </div>
                                ))}
                            </div>

                            <div className="product-modal-main-image-block">
                                <div 
                                    className="product-modal-slider-tape"
                                    data-active-index={activeImageIndex}
                                >
                                    {imagesArray.map((imgUrl, idx) => (
                                        <div key={idx} className="product-modal-slide-item">
                                            <img src={imgUrl} alt={`${displayProduct.title} ракурс ${idx + 1}`}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="product-modal-right">
                            <h2 id="modalProductTitle">{displayProduct.title}</h2>
                            <p className="modal-product-price" id="modalProductPrice">{displayProduct.price} <span className="currency-rub">₽</span></p>

                            <div className="modal-option-block">
                                <h3>Цвет:</h3>
                                <div className="color-selector" id="modalColorSelector">
                                    {displayProduct.colors && displayProduct.colors.map((color, idx) => (
                                        <span
                                            key={idx}
                                            onClick={() => {
                                                setActiveColorIndex(idx);
                                                setActiveImageIndex(0);
                                            }}
                                            className={`color-circle ${idx === activeColorIndex ? 'active' : ''}`}
                                            style={{background: color.value}}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="modal-option-block">
                                <h3>Размер:</h3>
                                <div className="size-selector" id="modalSizeSelector">
                                    {displayProduct.sizes && displayProduct.sizes.map((size, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveSizeIndex(idx)}
                                            className={`size-btn ${idx === activeSizeIndex ? 'active' : ''}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={() => {
                                    const finalProduct = {
                                        ...displayProduct,
                                        selectedColor: displayProduct.colors[activeColorIndex].name,
                                        selectedSize: displayProduct.sizes[activeSizeIndex]
                                    };
                                    onAddToCart(finalProduct);
                                    onClose();
                                }}
                                className="modal-add-to-cart-btn"
                                id="modalAddToCartBtn"
                            >
                                Добавить в корзину
                            </button>

                            <button
                                onClick = {() => {
                                    const finalProduct = {
                                        ...displayProduct,
                                        selectedColor: displayProduct.colors[activeColorIndex].name
                                    };
                                    onFavClick(finalProduct);
                                }}
                                className = {`modal-fav-btn ${isCurrentColorFavorite ? 'active' : ''}`} 
                                id = "modalFavBtn"
                            >
                                {isCurrentColorFavorite ? (
                                    <img src="icons/icon_heart_active.svg" alt="in favorites" className="my-heart-icon" />
                                ) : (
                                    <img src="icons/icon_heart.svg" alt="add to favorites" className="my-heart-icon" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default ProductModal;