import {useState, useEffect, useRef} from 'react';
import ProductCard from './ProductCard';

function Catalog({onOpenProduct, favorites, onToggleFavorite, selectedGender, setSelectedGender, onlyNew, setOnlyNew, onRemoveModel, products: dbProducts}) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const filtersRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isFiltersOpen && filtersRef.current && !filtersRef.current.contains(event.target)) {
                setIsFiltersOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFiltersOpen]);

    const filteredProducts = (dbProducts || []).filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;

        const matchesGender = selectedGender === '' || 
            (Array.isArray(product.gender) ? product.gender.includes(selectedGender) : product.gender === selectedGender);

        const matchesNew = !onlyNew || product.isNew === true;

        return matchesSearch && matchesCategory && matchesGender && matchesNew;
    });

    const handleReset = () => {
        setSelectedCategory('');
        setSelectedGender('');
        setSearchQuery('');
        setOnlyNew(false);
        setIsFiltersOpen(false);
    };

    return (
        <main>
            <div className="filters-container">
                <div
                    className="filter-toggle-icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFiltersOpen(!isFiltersOpen);
                    }}
                >
                    <img src="icons/filter_toggle_icon.svg" className="icon-sliders" alt="filters" />
                </div>
                
                <div 
                    className={`filters-drawer ${isFiltersOpen ? 'drawer-open' : ''}`}
                    ref={filtersRef}
                >
                
                <div className="drawer-mobile-header">
                    <span>Фильтры</span>
                    <button className="drawer-close-btn" onClick={() => setIsFiltersOpen(false)}>✕</button>
                </div>

                <button 
                    onClick={handleReset}
                    className={`filter-btn ${isFiltersOpen ? 'mobile-show' : ''} ${selectedCategory === '' && selectedGender === '' && !onlyNew ? 'active' : ''}`}>
                        Все
                </button>

                <button 
                    onClick={() => { setSelectedCategory(selectedCategory === 'classic' ? '' : 'classic'); setOnlyNew(false); }}
                    className={`filter-btn ${isFiltersOpen ? 'mobile-show' : ''} ${selectedCategory === 'classic' ? 'active' : ''}`}>
                        Классика
                </button>

                <button 
                    onClick={() => { setSelectedCategory(selectedCategory === 'sport' ? '' : 'sport'); setOnlyNew(false); }}
                    className={`filter-btn ${isFiltersOpen ? 'mobile-show' : ''} ${selectedCategory === 'sport' ? 'active' : ''}`}>
                        Спорт
                </button>

                <button
                    onClick={() => { setSelectedGender(selectedGender === 'men' ? '' : 'men'); setOnlyNew(false); }}
                    className={`filter-btn ${isFiltersOpen ? 'mobile-show' : ''} ${selectedGender === 'men' ? 'active' :''}`}>
                        Мужское
                </button>

                <button
                    onClick={() => { setSelectedGender(selectedGender === 'women' ? '' : 'women'); setOnlyNew(false); }}
                    className={`filter-btn ${isFiltersOpen ? 'mobile-show' : ''} ${selectedGender === 'women' ? 'active' : ''}`}>
                        Женское
                </button>

                <button
                    onClick={() => { setSelectedGender(selectedGender === 'kids' ? '' : 'kids'); setOnlyNew(false); }}
                    className={`filter-btn ${isFiltersOpen ? 'mobile-show' : ''} ${selectedGender === 'kids' ? 'active' : ''}`}>
                        Детям
                </button>
                </div>

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    placeholder="Поиск..."
                />

                <div 
                    className={`drawer-overlay ${isFiltersOpen ? 'overlay-active' : ''}`}
                    onClick={() => setIsFiltersOpen(false)}
                ></div>
            </div>

            <div className="products-container">
                {filteredProducts.length === 0 ? (
                    <p className="no-products-text">
                        Товары не найдены. Попробуйте изменить параметры фильтрации.
                    </p>
                ) : (
                    filteredProducts.map((product) => {
                        const defaultColor = product.colors && product.colors[0] ? product.colors[0].name : 'white';
                         const isFav = favorites.some((favItem) => favItem.id === product.id);
                         const targetColorImages = product.images && product.images[defaultColor]
                            ?product.images[defaultColor]
                            :Object.values(product.images)[0];

                        const currentCardImage = Array.isArray(targetColorImages)
                            ?targetColorImages[0]
                            :targetColorImages;

                        return (
                            <ProductCard
                                key={product.id}
                                title={product.title}
                                price={product.price}
                                image={currentCardImage}
                                onBuyClick={() => onOpenProduct(product)}
                                onCardClick={() => onOpenProduct(product)}
                                isFavorite={isFav}
                                onFavClick={() => {
                                    if (isFav) {
                                        onRemoveModel(product.id);
                                    } else {
                                        const finalProduct = {
                                            ...product,
                                            selectedColor: defaultColor
                                        };
                                        onToggleFavorite(finalProduct);
                                    }
                                }}
                                isNew = {product.isNew}
                            />
                        );
                    })
                )}
            </div>
        </main>
    );
}

export default Catalog;