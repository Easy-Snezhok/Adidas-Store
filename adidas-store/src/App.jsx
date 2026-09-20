import { useState, useEffect } from 'react';
import Profile from './components/Profile';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Catalog from './components/Catalog';
import Favorites from './components/Favorites';
import Checkout from './components/Checkout';
import CartModal from './components/CartModal';
import ProductModal from './components/ProductModal';
import About from './components/About';
import './App.css';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [globalGender, setGlobalGender] = useState('');
  const [globalNewOnly, setGlobalNewOnly] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isFetchComplete, setIsFetchComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsFetchComplete(false);

      if (user) {
        setCurrentUser(user);
        console.log("Пользователь авторизован в системе:", user.email);

        try {
          const userDocRef = doc(db, "users_data", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const cloudData = userDocSnap.data();
            setCart(cloudData.cart || []);
            setFavorites(cloudData.favorites || []);
            setOrders(cloudData.orders || []);
            console.log("Данные аккаунта успешно подгружены из Firestore!");
          } else {
            console.log("Новый аккаунт: сохраняем текущую гостевую корзину для переноса в облако.");
          }
        } catch (error) {
          console.error("Ошибка скачивания данных", error);
        }
      } else {
        setCurrentUser(null);
        console.log("Режим гостя: загружаем локальный localStorage");

        const savedCart = localStorage.getItem('adidas_cart');
        const savedFavs = localStorage.getItem('adidas_favorites');
        const savedOrders = localStorage.getItem('adidas_orders');
        
        setCart(savedCart ? JSON.parse(savedCart) : []);
        setFavorites(savedFavs ? JSON.parse(savedFavs) : []);
        setOrders(savedOrders ? JSON.parse(savedOrders) : []);
      }
      
      setIsInitialLoad(false);
      setIsFetchComplete(true);
    });

    return () => unsubscribe();
  }, []);

   useEffect(() => {
    if (isInitialLoad || !isFetchComplete) return;

    const saveData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users_data", currentUser.uid);
          await setDoc(userDocRef, {
            cart: cart,
            favorites: favorites,
            orders: orders
          }, { merge: true });
          console.log("Изменения успешно запечатаны в облако Firestore!");
        } catch (error) {
          console.error("Ошибка сохранения в облако:", error);
        }
      } else {
        localStorage.setItem('adidas_cart', JSON.stringify(cart));
        localStorage.setItem('adidas_favorites', JSON.stringify(favorites));
        localStorage.setItem('adidas_orders', JSON.stringify(orders));
      }
    };

    saveData();
  }, [cart, favorites, orders, currentUser, isInitialLoad, isFetchComplete]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentPage]);

   const toggleFavorite = (product) => {
    const existingItem = favorites.find(
      (item) => item.id === product.id && item.selectedColor === product.selectedColor
    );

    if (existingItem) {
      setFavorites(
        favorites.filter(
          (item) => !(item.id === product.id && item.selectedColor === product.selectedColor)
        )
      );
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const removeModelFromFavorites = (productId) => {
      setFavorites(favorites.filter((item) => item.id !== productId));
    };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    setCart([]);
  };

  const completeOrder = () => {
    if (cart.length > 0) {
      const newOrder = {
        id: Math.floor(Math.random() * 9000) + 10000,
        date: new Date().toLocaleDateString('ru-RU'),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + item.price, 0)
      };

      setOrders([newOrder, ...orders]);
    }
    setCart([]);
  };

  return (
    <div className = "app-container">
        <Header 
        changePage = {(page) => {
          setCurrentPage(page);
          if (page === 'catalog') setGlobalGender('');
          setGlobalNewOnly(false);
        }}
        onNavigateNew={() => {
          setGlobalNewOnly(true);
          setGlobalGender('');
          setCurrentPage('catalog');
        }}
        openCart = {() => setIsCartOpen(true)}
        openAuth = {() => setIsAuthOpen(true)}
        user = {currentUser}
        cartCount = {cart.length} 
        favCount = {favorites.length}
        
        />

        <div className = "page-content-wrapper">
          {currentPage === 'home' && (
            <Home 
              changePage = {setCurrentPage}
              onAddToCart = {addToCart}
              onOpenProduct = {setSelectedProduct} 
              favorites = {favorites} 
              onToggleFavorite = {toggleFavorite}
              onRemoveModel = {removeModelFromFavorites}
              setGenderFilter = {setGlobalGender}
            />)}
          {currentPage === 'catalog' && (
            <Catalog 
              onAddToCart = {addToCart} 
              onOpenProduct = {setSelectedProduct} 
              favorites = {favorites}
              onToggleFavorite = {toggleFavorite}
              onRemoveModel = {removeModelFromFavorites}
              selectedGender = {globalGender}
              setSelectedGender = {setGlobalGender}
              onlyNew = {globalNewOnly}
              setOnlyNew = {setGlobalNewOnly}
            />)}
          {currentPage === 'favorites' && (
            <Favorites
            favoriteItems = {favorites}
            onToggleFavorite = {toggleFavorite}
            onClearFavorites = {() => setFavorites([])}
            onOpenProduct = {setSelectedProduct}
            />)}
          {currentPage === 'checkout' && (
            <Checkout
              cartItems = {cart}
              onOrderComplete={completeOrder}
            />
          )}
          {currentPage === 'about' && <About />}
          {currentPage === 'profile' && (
            <Profile
              user = {currentUser}
              orders = {orders}
              onLogout = {() => {
                setCurrentUser(null);
                setCart([]);
                setFavorites([]);
                setOrders([]);
                localStorage.removeItem('adidas_cart');
                localStorage.removeItem('adidas_favorites');
                localStorage.removeItem('adidas_orders');

                setCurrentPage('home');
              }}
            />
          )}
        </div>

        <Footer
        changePage = {setCurrentPage}
        onNavigateNew={() => {
            setGlobalNewOnly(true);
            setGlobalGender('');
            setCurrentPage('catalog');
          }}
        />

        <CartModal 
        isOpen = {isCartOpen}
        closeCart = {() => setIsCartOpen(false)}
        changePage = {setCurrentPage}
        cartItems = {cart}
        onRemoveItem = {removeFromCart}
        onClearCart = {clearCart}
        />

        <ProductModal
          isOpen = {Boolean(selectedProduct)}
          product = {selectedProduct}
          favorites = {favorites}
          onClose = {() => setSelectedProduct(null)}
          onAddToCart = {addToCart}
          onFavClick = {toggleFavorite}
        />

        <AuthModal
          isOpen = {isAuthOpen}
          onClose = {() => setIsAuthOpen(false)}
          onAuthSuccess = {(user) => {
            setCurrentUser(user);
            setCurrentPage('profile');
          }}
        />
    </div>
  );
}

export default App;