import ProductCard from './ProductCard';
import { products } from '../productsData';

function Home({changePage, onOpenProduct, favorites = [], onToggleFavorite, setGenderFilter, onRemoveModel}) {
  const newArrivals = [products[9], products[7], products[16]];

  return (
    <main>
        <div className="home-page">
      <section className="hero-section">
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
            <img src="images/Logo_superstar.png" className="hero-image" alt="Adidas Superstar" />
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

                const defaultColor = product.colors && product.colors[0] ? product.colors[0].name : 'white';

                return (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        image={
                            typeof product.images === 'string'
                            ? product.images
                            : Array.isArray(Object.values(product.images)[0])
                                ? Object.values(product.images)[0][0]
                                : Object.values(product.images)[0]
                        }
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