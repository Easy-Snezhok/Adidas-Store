import ProductCard from './ProductCard';
import './Home.css';

function Home({changePage, onOpenProduct, favorites = [], onToggleFavorite, setGenderFilter, onRemoveModel, products}) {
  const newArrivals = Array.isArray(products)
    ? products.filter(product => product && (product.isArrival === true || product.isArrival === 'true')).slice(0, 3)
    : [];

  return (
    <main>
        <div className="home-page">
      <section className="hero-section">
        <video 
            className="hero-video-bg"
            src="/superstar-bg.mp4.mp4"
            autoPlay
            loop
            muted
            playsInline
        >
        </video>

        <div className="hero-video-overlay"></div>

        <div className="container-content">
            <span className="subtitle">ОРИГИНАЛЬНАЯ КОЛЛЕКЦИЯ</span>
            <h1>Adidas Superstar</h1>
            <button
                className="hero-btn"
                onClick={() => {
                    const superstarProduct = products.find(item => item.id === 4);
                    if (superstarProduct) {
                        onOpenProduct(superstarProduct);
                        changePage('catalog');
                    }
                }}
            >
                Купить сейчас
            </button>
        </div>

      </section>
      
      <section className="hero-category">
        <h2>Категории</h2>

        <div className="categories-container">
            <div 
                className="category-block-men category-card"
                data-gender="men"
                onClick = {() => {
                    setGenderFilter('men');
                    changePage('catalog');
                }}
            >
                <img src="images/Image_category_men.jpg" alt="Мужское" />
                <h3>Мужское</h3>
            </div>

            <div 
                className="category-block-women category-card" 
                data-gender="women"
                onClick = {() => {
                    setGenderFilter('women');
                    changePage('catalog');
                }}
            >
                <img src="images/image_category_women.jpg" alt="Женское" />
                <h3>Женское</h3>
            </div>

            <div 
                className="category-block-kids category-card" 
                data-gender="kids"
                onClick = {() => {
                    setGenderFilter('kids');
                    changePage('catalog');
                }}
            >
                <img src="images/image_category_kids.jpg" alt="Детям" />
                <h3>Детям</h3>
            </div>
        </div>
      </section>

      <section className="hero-new-arrivals">
        <h2>Новые поступления</h2>

        <div className="products-container">
            {newArrivals.map((product) => {
                const isFav = favorites.some((favItem) => favItem.id === product.id);

                const defaultColor = product.colors && product.colors[0] 
                    ? product.colors[0].name 
                    : 'white';

                 let displayImage = 'icon/Basket.svg';
                if (product.images) {
                    if (typeof product.images === 'string') {
                        displayImage = product.images;
                    } else if (product.images[defaultColor]) {
                        const targetImages = product.images[defaultColor];
                        displayImage = Array.isArray(targetImages) ? targetImages[0] : targetImages;
                    } else {
                        const fallbackImages = Object.values(product.images)[0];
                        displayImage = Array.isArray(fallbackImages) ? fallbackImages[0] : fallbackImages;
                    }
                }

                return (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        image={displayImage}
                        onBuyClick={() => onOpenProduct(product)}
                        onCardClick={() => onOpenProduct(product)}
                        isFavorite={isFav}
                        onFavClick={() => {
                            if (isFav) {
                                onRemoveModel(product.id);
                            } else {
                                const finalProduct = {
                                    ...product,
                                    selectedColor: defaultColor,
                                    salePercent: product.salePercent || 0
                                };
                                onToggleFavorite(finalProduct);
                            }
                        }}
                        isNew={product.isNew}
                    />
                )
            })}
        </div>

        <button
            onClick={() => changePage('catalog')}
            className="catalog-btn"
        >
            Смотреть весь каталог
        </button>
      </section>

    </div>
    </main>
  );
}

export default Home;