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
import { doc, setDoc, getDoc, collection, onSnapshot, addDoc } from 'firebase/firestore';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnOrderId, setReturnOrderId] = useState('');
  const [returnReason, setReturnReason] = useState('');
  const [returnContact, setReturnContact] = useState('');
  const [returnSuccess, setReturnSuccess] = useState('');
  const [returnError, setReturnError] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [globalGender, setGlobalGender] = useState('');
  const [globalNewOnly, setGlobalNewOnly] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [globalOrders, setGlobalOrders] = useState([]);
  const [returnRequests, setReturnRequests] = useState([]);

  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isFetchComplete, setIsFetchComplete] = useState(false);
  const [isDataLoadedFromCloud, setIsDataLoadedFromCloud] = useState(false);

  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsFetchComplete(false);
      setIsDataLoadedFromCloud(false);

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
            console.log("Данные аккаунта успешно подгружены из Firestore");
          } else {
            console.log("Новый аккаунт: сохраняет текущую гостевую корзину для переноса в облако");
          }
          setIsDataLoadedFromCloud(true);
        } catch (error) {
          console.error("Ошибка скачивания данных", error);
          setIsDataLoadedFromCloud(true);
        }
      } else {
        setCurrentUser(null);
        console.log("Режим гостя: загружает локальный localStorage");

        const savedCart = localStorage.getItem('adidas_cart');
        const savedFavs = localStorage.getItem('adidas_favorites');
        const savedOrders = localStorage.getItem('adidas_orders');
        
        setCart(savedCart ? JSON.parse(savedCart) : []);
        setFavorites(savedFavs ? JSON.parse(savedFavs) : []);
        setOrders(savedOrders ? JSON.parse(savedOrders) : []);
        setIsDataLoadedFromCloud(true);
      }
      
      setIsInitialLoad(false);
      setIsFetchComplete(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribeFromGlobalOrders = onSnapshot(collection(db, "global_orders"), (querySnapshot) => {
      const ordersArray = [];
      
      querySnapshot.forEach((doc) => {
        ordersArray.push({
          ...doc.data(),
          cloudOrderId: doc.id
        });
      });

      ordersArray.sort((a, b) => b.id - a.id);

      setGlobalOrders(ordersArray);
      console.log("CRM-лента заказов Adidas Store успешно синхронизирована");
    }, (error) => {
      console.error("Ошибка при получении CRM-ленты заказов:", error);
    });

    return () => unsubscribeFromGlobalOrders();
  }, []);

  useEffect(() => {
    const unsubscribeFromReturnRequests = onSnapshot(collection(db, "return_requrests"), (querySnapshot) => {
      const returnsArray = [];

      querySnapshot.forEach((doc) => {
        returnsArray.push({
          ...doc.data(),
          cloudReturnId: doc.id
        });
      });

       returnsArray.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      });

      setReturnRequests(returnsArray);
      console.log("Лента возвратов заказов успешно синхронизирована");
    }, (error) => {
      console.error("Ошибка при получении Ленты заказов:", error);
    });
    return () => unsubscribeFromReturnRequests();
  }, []);

  useEffect(() => {
    const unsubscribeFromProducts = onSnapshot(collection(db, "products"), (querySnapshot) => {
      const firebaseProductsArray = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        firebaseProductsArray.push({
          ...data,
          id: doc.id, 
          orderNumber: data.id ? Number(data.id) : 999 
        });
      });
      firebaseProductsArray.sort((a, b) => a.orderNumber - b.orderNumber);

      setProducts(firebaseProductsArray);
      setIsLoadingProducts(false);
      console.log("Витрина Adidas Store синхронизирована с Firestore");
    }, (error) => {
      console.error("Критическая ошибка при обновлении каталога:", error);
      setIsLoadingProducts(false);
    });

    return () => unsubscribeFromProducts();
  }, []);

  useEffect(() => {
    if (isInitialLoad || !isFetchComplete || !isDataLoadedFromCloud) return;

    const saveData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users_data", currentUser.uid);
          await setDoc(userDocRef, {
            cart: cart,
            favorites: favorites,
            orders: orders
          }, { merge: true });
          console.log("Изменения успешно добавлены в облако Firestore");
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
  }, [cart, favorites, orders, currentUser, isInitialLoad, isFetchComplete, isDataLoadedFromCloud]);

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
    const hasSale = product.salePercent > 0;
    const finalPrice = hasSale
      ? Math.round(product.price * (1 - product.salePercent / 100))
      : product.price;

    const productWithDiscount = {
      ...product,
      price: finalPrice
    };
    setCart([...cart, productWithDiscount]);
  };

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    setReturnSuccess('');
    setReturnError('');

    if (!returnOrderId.trim() || !returnReason.trim() || !returnContact.trim()) {
      setReturnError('Пожалуйста, заполните все три поля заявки!');
      return;
    }

    try {
      await addDoc(collection(db, "return_requrests"), {
        orderId: returnOrderId.trim(),
        reason: returnReason.trim(),
        contact: returnContact.trim(),
        status: 'pending',
        createdAt: new Date().toISOString()
      });

       setReturnSuccess('Заявка успешно отправлена! Менеджер свяжется с вами в Telegram или по телефону.');
      setReturnOrderId('');
      setReturnReason('');
      setReturnContact('');
    } catch (error) {
      console.error("Ошибка сохранения заявки на возврат:", error);
      setReturnError(`Не удалось отправить данные: ${error.message}`);
    }
  }

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    setCart([]);
  };

  const completeOrder = async (customerName, customerPhone, customerAddress) => {
    if (cart.length === 0) return;

    const orderId = Math.floor(Math.random() * 9000) + 10000;
    
    const cleanItems = cart.map(item => {
      let finalImg = '';
      if (item.images && item.selectedColor && item.images[item.selectedColor]) {
        finalImg = Array.isArray(item.images[item.selectedColor]) 
          ? item.images[item.selectedColor][0] 
          : item.images[item.selectedColor];
      } else if (item.images) {
        const allUrls = Object.values(item.images);
        finalImg = Array.isArray(allUrls[0]) ? allUrls[0][0] : allUrls[0];
      }

      return {
        id: item.id || 'unknown',
        title: item.title || 'Товар Adidas',
        price: Number(item.price) || 0,
        selectedColor: item.selectedColor || 'white',
        selectedSize: item.selectedSize || 'Не указан',
        image: finalImg || ''
      };
    });

    const orderData = {
      id: orderId,
      date: new Date().toLocaleDateString('ru-RU'),
      items: cleanItems,
      total: cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0),
      customerName: customerName || 'Анонимный покупатель',
      customerPhone: customerPhone || 'Не указан',
      customerAddress: customerAddress || 'Самовывоз из магазина',
      customerEmail: currentUser ? currentUser.email : 'Гость',
      status: 'pending'
    };

    try {
      setOrders([orderData, ...orders]);

      await addDoc(collection(db, "global_orders"), orderData);
      console.log(`Заказ №${orderId} успешно отправлен в глобальную CRM`);

      setCart([]);

    } catch (error) {
      console.error("Критическая ошибка при отправке заказа в CRM:", error);
      setCart([]);
    }
  };

  const clearUserOrdersHistory = async () => {
    const isConfirmed = window.confirm("Вы уверены, что хотите очистить полностью историю ваших заказов? Это действие нельзя отменить.");
    if (!isConfirmed) return;

    try {
      setOrders([]);

      localStorage.removeItem('adidas_orders');

      if (currentUser) {
        const userDocRef = doc(db, "user_data", currentUser.uid);
        await setDoc(userDocRef, {orders: []}, {merge: true});
      }
      console.log("Личная история заказов пользователя успешно очищена");
    } catch (error) {
      console.error("Ошибка при очистке истории заказов:", error);
    }
  };

  if (isLoadingProducts) {
    return (
      <div className="adidas-loader-container">
        <div className="adidas-premium-spinner"></div>
        <span className="adidas-loader-text">Загрузка</span>
      </div>
    );
  }

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
              products={products}
              favorites = {favorites} 
              onToggleFavorite = {toggleFavorite}
              onRemoveModel = {removeModelFromFavorites}
              setGenderFilter = {setGlobalGender}
            />)}
          {currentPage === 'catalog' && (
            <Catalog 
              onAddToCart = {addToCart} 
              onOpenProduct = {setSelectedProduct} 
              products={products}
              isLoading={isLoadingProducts}
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
              products = {products}
              globalOrders = {globalOrders}
              returnRequests = {returnRequests}
              onClearOrders = {clearUserOrdersHistory}
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
        onOpenDelivery={() => setIsDeliveryModalOpen(true)}
        onOpenReturn={() => setIsReturnModalOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
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

        {isDeliveryModalOpen && (
          <div 
            className="info-modal-overlay"
            onClick={(e) => {if (e.target.className === 'info-modal-overlay') setIsDeliveryModalOpen(false); }}
          >
            <div className="info-modal-content">
              <button className="info-modal-close-btn" onClick={() => setIsDeliveryModalOpen(false)}>&times;</button>

              <div className="info-modal-body-text">
                <h2>Доставка и оплата</h2>
                <p><strong>Курьерская доставка:</strong> Мы доставляем заказы по всей России с помощью курьерских служб СДЭК и Boxberry до двери или в пункты выдачи.</p>
                <p><strong>Сроки доставки:</strong> От 2 до 5 рабочих дней в зависимости от вашего региона. При заказе от 15 000 ₽ доставка бесплатная.</p>
                <p><strong>Способы оплаты:</strong> Вы можете безопасно оплатить заказ банковской картой прямо на сайте через нашу защищенную форму оплаты.</p>
              </div>
            </div>
          </div>
        )}

        {isReturnModalOpen && (
        <div 
          className="info-modal-overlay" 
          onClick={(e) => { if (e.target.className === 'info-modal-overlay') { setIsReturnModalOpen(false); setReturnSuccess(''); setReturnError(''); } }}
        >
          <div className="info-modal-content return-modal-width">
            <button 
              type="button"
              className="info-modal-close-btn" 
              onClick={() => { setIsReturnModalOpen(false); setReturnSuccess(''); setReturnError(''); }}
            >
              &times;
            </button>
            
            <div className="info-modal-body-text">
              <h2>Возврат товара</h2>
              
              <div className="return-rules-box">
                <p><strong>1. Сроки:</strong> Вы можете вернуть кроссовки в течение 14 дней с момента получения.</p>
                <p><strong>2. Состояние:</strong> Обувь должна сохранить товарный вид, оригинальные бирки и фирменную коробку Adidas.</p>
                <p><strong>3. Процесс:</strong> Заполните заявку ниже. После проверки менеджер пришлёт вам трек-номер для бесплатной отправки через СДЭК.</p>
              </div>

              {returnSuccess && <p className="return-status-msg success-msg">{returnSuccess}</p>}
              {returnError && <p className="return-status-msg error-msg">{returnError}</p>}

              {!returnSuccess && (
                <form onSubmit={handleReturnSubmit} className="return-interactive-form">
                  <span className="return-form-title">Заявка на возврат:</span>
                  
                  <input
                    type="text"
                    value={returnOrderId}
                    onChange={(e) => setReturnOrderId(e.target.value)}
                    placeholder="Номер вашего заказа (например: 471f323)"
                  />

                  <textarea
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    placeholder="Причина возврата (не подошел размер, цвет, брак...)"
                    rows="3"
                  />

                  <input
                    type="text"
                    value={returnContact}
                    onChange={(e) => setReturnContact(e.target.value)}
                    placeholder="Ваш Telegram или Телефон для связи"
                  />

                  <button type="submit" className="return-submit-btn">
                    Отправить заявку
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {isContactModalOpen && (
        <div 
          className="info-modal-overlay"
          onClick={(e) => {if (e.target.className === 'info-modal-overlay') setIsContactModalOpen(false);}}
        >
          <div className="info-modal-content contact-modal-width">
            <button
              type="button"
              className="info-modal-close-btn"
              onClick={() => setIsContactModalOpen(false)}
            >
              &times;
            </button>

            <div className="info-modal-body-text">
              <h2>Связаться с нами</h2>
              <p>Выберите любой удобный способ связи. Наши менеджеры ответят вам в кратчайшие сроки.</p>

              <div className="contact-links-container">
                <a href="tel:+78005553535" className="contact-premium-btn phone-btn">
                  <span className="contact-btn-label">Позвонить на горячую линию:</span>
                  <strong className="contact-btn-value">+7 (800) 555-35-35</strong>
                </a>

                <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="contact-premium-btn telegram-btn">
                  <span className="contact-btn-label">Написать в Telegram:</span>
                  <strong className="contact-btn-value">@adidas_shop_support</strong>
                </a>

                <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="contact-premium-btn gmail-btn">
                  <span className="contact-btn-label">Написать на Почту:</span>
                  <strong className="contact-btn-value">support@adidas-store.ru</strong>
                </a>
              </div>

               <div className="contact-worktime-badge">
                Режим работы поддержки: 24/7 (Круглосуточно)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;