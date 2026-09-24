import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { signOut, deleteUser } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

function Profile({ user, onLogout, orders = [], products = [], globalOrders = [] }) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [settingsError, setSettingsError] = useState('');

    const [userRole, setUserRole] = useState('user');
    const [isAdminView, setIsAdminView] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState('');

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('classic');
    const [gender, setGender] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [isNew, setIsNew] = useState(false);

    const [colorsInput, setColorsInput] = useState([
        { id: 'init_white', name: 'white', value: '#ffffff', images: ['', '', '', ''] }
    ]);

    const [adminSuccessMessage, setAdminSuccessMessage] = useState('');
    const [adminErrorMessage, setAdminErrorMessage] = useState('');

     const totalSalesSum = Array.isArray(globalOrders) 
        ? globalOrders.reduce((sum, order) => sum + (Number(order.total) || 0), 0)
        : 0;

    const completedSalesSum = Array.isArray(globalOrders)
        ? globalOrders.filter(order => order.status === 'completed').reduce((sum, order) => sum + (Number(order.total) || 0), 0)
        : 0;

    useEffect(() => {
        const checkAdminRole = async () => {
            if (!user) return;
            try {
                const userDocRef = doc(db, "users_data", user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const data = userDocSnap.data();
                    if (data.role === 'admin') {
                        setUserRole('admin');
                        console.log("Доступ подтвержден: Вы вошли как Администратор системы.");
                    }
                }
            } catch (error) {
                console.log("Ошибка проверки прав админа:", error);
            }
        };
        checkAdminRole();
    }, [user]);

    const handleProductSelectForEdit = (productId) => {
        setSelectedProductId(productId);
        
        if (!productId) {
            setTitle('');
            setPrice('');
            setCategory('classic');
            setGender([]);
            setSizes([]);
            setIsNew(false);
            setColorsInput([{ id: 'init_white', name: 'white', value: '#ffffff', images: ['', '', '', ''] }]);
            return;
        }

        const currentProduct = products.find(p => p.id === productId);
        
        if (currentProduct) {
            setTitle(currentProduct.title || '');
            setPrice(currentProduct.price || '');
            setCategory(currentProduct.category || 'classic');
            setGender(currentProduct.gender || []);
            setSizes(currentProduct.sizes || []);
            setIsNew(currentProduct.isNew || false);


            if (currentProduct.colors && currentProduct.colors.length > 0) {
                const loadedColors = currentProduct.colors.map((colorObj, idx) => {
                    const existingImages = currentProduct.images && currentProduct.images[colorObj.name]
                        ? currentProduct.images[colorObj.name]
                        : ['', '', '', ''];
                    
                    const fullImagesArray = [...existingImages, '', '', '', ''].slice(0, 4);

                    return {
                        id: `color_loaded_${idx}_${Date.now()}`,
                        name: colorObj.name,
                        value: colorObj.value,
                        images: fullImagesArray
                    };
                });
                setColorsInput(loadedColors);
            } else {
                setColorsInput([{ id: 'init_white', name: 'white', value: '#ffffff', images: ['', '', '', ''] }]);
            }
        }
    };

    const handleGenderChange = (val) => {
        if (gender.includes(val)) {
            setGender(gender.filter(g => g !== val));
        } else {
            setGender([...gender, val]);
        }
    };

    const handleSizeChange = (sizeNum) => {
        if (sizes.includes(sizeNum)) {
            setSizes(sizes.filter(s => s !== sizeNum));
        } else {
            setSizes([...sizes, sizeNum].sort((a, b) => a - b));
        }
    };

    const addColorField = () => {
        const newId = `color_${Date.now()}`; 
        setColorsInput([
            ...colorsInput, 
            { id: newId, name: `color_${colorsInput.length + 1}`, value: '#ffffff', images: ['', '', '', ''] }
        ]);
    };

    const removeColorField = (id) => {
        if (colorsInput.length <= 1) {
            return;
        }
        setColorsInput(colorsInput.filter(color => color.id !== id));
    }

    const handleColorPropertyChange = (id, field, value) => {
        setColorsInput(colorsInput.map(color => 
            color.id === id ? { ...color, [field]: value } : color
        ));
    };

    const handleColorImageChange = (id, imgIdx, value) => {
        setColorsInput(colorsInput.map(color => {
            if (color.id === id) {
                const updatedImages = [...color.images];
                updatedImages[imgIdx] = value;
                return { ...color, images: updatedImages };
            }
            return color;
        }));
    };

     const handleDeleteProduct = async () => {
        if (!selectedProductId) return;

        const isConfirmed = window.confirm(`Вы уверены, что хотите НАВСЕГДА удалить модель "${title}" с витрины Adidas Store?`);
        if (!isConfirmed) return;

        setAdminSuccessMessage('');
        setAdminErrorMessage('');

        try {
            const productDocRef = doc(db, "products", selectedProductId);
            
            await deleteDoc(productDocRef);

            setAdminSuccessMessage(`Кроссовки "${title}" успешно удалены из базы данных и с витрины`);
            
            setTitle('');
            setPrice('');
            setCategory('classic');
            setGender([]);
            setSizes([]);
            setIsNew(false);
            setIsEditMode(false);
            setSelectedProductId('');
            setColorsInput([
                { id: 'init_white', name: 'white', value: '#ffffff', images: ['', '', '', ''] }
            ]);

        } catch (error) {
            setAdminErrorMessage(`Не удалось удалить товар с витрины: ${error.message}`);
        }
    };

    const handleUpdateOrderStatus = async (cloudOrderId) => {
        if (!cloudOrderId) return;

        try {
            const orderDocRef = doc(db, "global_orders", cloudOrderId);

            await updateDoc(orderDocRef, {
                status: 'completed'
            });

            console.log(`Статус заказа ${cloudOrderId} успешно обновлен на выполненый`);
        } catch (error) {
            console.error("Ошибка при обновлении статуса заказа в CRM:", error);
            window.alert('Не удалось обновить статус заказа:' + error.message);
        }
    }

    const handleAddProductSubmit = async (e) => {
        e.preventDefault();
        setAdminSuccessMessage('');
        setAdminErrorMessage('');

        const parsedPrice = Number(price);
        if (!title || !price || isNaN(parsedPrice) || parsedPrice <= 0 || gender.length === 0 || sizes.length === 0) {
            setAdminErrorMessage('Пожалуйста, заполните основные поля (цена должна быть > 0), выберите гендер и размеры!');
            return;
        }

        const cleanImages = {};
        colorsInput.forEach(color => {
            const filledUrls = color.images.filter(url => url.trim() !== '');
            if (filledUrls.length > 0 && color.name.trim() !== '') {
                cleanImages[color.name.trim()] = filledUrls;
            }
        });

        const cleanColorsForFirestore = colorsInput.map(({ name, value }) => ({ name, value }));

        try {
            const productData = {
                title: title,
                price: parsedPrice,
                category: category,
                gender: Array.isArray(gender) ? gender : [gender],
                sizes: sizes,
                images: cleanImages,
                colors: cleanColorsForFirestore,
                isNew: isNew
            };

            if (isEditMode && selectedProductId) {

                const productDocRef = doc(db, "products", selectedProductId);
                await updateDoc(productDocRef, productData);
                
                setAdminSuccessMessage(`Кроссовки "${title}" успешно обновлены в облаке`);
            } else {

                await addDoc(collection(db, "products"), productData);
                
                setAdminSuccessMessage(`Кроссовки "${title}" успешно добавлены в облако`);
            }

            setTitle('');
            setPrice('');
            setCategory('classic');
            setGender([]);
            setSizes([]);
            setIsNew(false);
            setIsEditMode(false);
            setSelectedProductId('');
            setColorsInput([
                { id: 'init_white', name: 'white', value: '#ffffff', images: ['', '', '', ''] }
            ]);

        } catch (error) {
            setAdminErrorMessage(`Не удалось сохранить изменения: ${error.message}`);
        }
    };
    
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Пользователь успешно вышел");
                onLogout(); 
            })
            .catch((error) => {
                console.error("Ошибка при выходе:", error.message);
            });
    };

    const handleConfirmDelete = () => {
        setSettingsError('');
        const currentUser = auth.currentUser;

        if (currentUser) {
            deleteUser(currentUser)
                .then(() => {
                    console.log("Аккаунт успешно удален");
                    setIsConfirmOpen(false);
                    onLogout();
                })
                .catch((error) => {
                    console.error("Ошибка удаления аккаунта:", error.code);
                    setIsConfirmOpen(false);
                    if (error.code === 'auth/requires-recent-login') {
                        setSettingsError('В целях безопасности выйдите из аккаунта и войдите заново перед его удалением!');
                    } else {
                        setSettingsError('Не удалось удалить аккаунт: ' + error.message);
                    }
                });
        }
    };

    if (!user) {
        return (
            <main className="profile-main-page profile-empty">
                <h2>Пожалуйста, войдите в аккаунт</h2>
            </main>
        );
    }

    return (
        <main className="profile-main-page">
            <div className="profile-container">
                
                <section className="profile-hero-section">
                    <div className="profile-header-title-wrapper">
                        <h1>{isAdminView ? "Панель Администратора": "Личный кабинет"}</h1>
                    </div>
                    <p className="profile-subtitle-text">
                        Рады видеть вас снова, <span className="profile-user-email">{user.displayName || user.email}</span>!
                    </p>

                    <div className="profile-settings-dropdown-wrapper">
                        {userRole === 'admin' && (
                            <button
                                className={`admin-toggle-btn ${isAdminView ? 'active' : ''}`}
                                onClick={() => setIsAdminView(!isAdminView)}
                                title={isAdminView ? "Вернуться в кабинет" : "Открыть управление магазином"}
                            >
                                <img src="icons/Admin.svg" alt="Администратор" className="admin-svg-icon" />
                            </button>
                        )}

                        <button 
                            className={`profile-settings-toggle-btn ${isSettingsOpen ? 'rotated' : ''}`}
                            onClick={() => { setIsSettingsOpen(!isSettingsOpen); setSettingsError(''); }}
                            title="Настройки профиля"
                        >
                            <img src="icons/Setting_icon.svg" alt="Настройки" />
                        </button>
                        
                        {isSettingsOpen && (
                            <div className="profile-card-section profile-settings-panel">
                                <div className="profile-settings-info">
                                    <h2>Настройки безопасности</h2>
                                    <p className="profile-status-label">
                                        Здесь вы можете полностью управлять своими персональными данными в Adidas Store.
                                    </p>
                                    {settingsError && (
                                        <p className="profile-settings-error-text">{settingsError}</p>
                                    )}
                                </div>
                                <button onClick={() => setIsConfirmOpen(true)} className="profile-delete-btn">
                                    Удалить аккаунт
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {isAdminView ? (
                    
                    <div className="admin-dashboard-grid">
                        <aside className="admin-left-sidebar">
                            <div className="admin-user-status">
                                <h2>Панель управления</h2>
                                <p className="profile-status-label">
                                    Сессия:  <span className="profile-status-highlight">Root Admin</span>
                                </p>
                            </div>

                            <div className="admin-analytics-dashboard">
                                <div className="admin-analytics-card">
                                    <span className="admin-analytics-label">Общий оборот</span>
                                    <strong className="admin-analytics-value">{totalSalesSum} ₽</strong>
                                </div>
                                <div className="admin-analytics-card completed-profit">
                                    <span className="admin-analytics-label">Чистая выручка</span>
                                    <strong className="admin-analytics-value">{completedSalesSum} ₽</strong>
                                </div>
                            </div>
                        </aside>

                        <div className="admin-main-content-flow">
                            <section className="profile-card-section admin-workspace-panel">
                                {adminSuccessMessage && <p className="admin-status-success">{adminSuccessMessage}</p>}
                        {adminErrorMessage && <p className="admin-status-error">{adminErrorMessage}</p>}
                         <form onSubmit={handleAddProductSubmit} className="admin-add-product-form">
                            <div className="admin-mode-toggle-group">
                                <label className="admin-clickable-label">
                                    <input
                                        type="radio"
                                        name="adminMode"
                                        checked={!isEditMode}
                                        onChange={() => {
                                            setIsEditMode(false);
                                            handleProductSelectForEdit('');
                                        }}
                                    />
                                    Добавить новый товар
                                </label>
                                <label className="admin-clickable-label">
                                    <input
                                        type="radio"
                                        name="adminMode"
                                        checked={isEditMode}
                                        onChange={() => {
                                            setIsEditMode(true);
                                            handleProductSelectForEdit('');
                                        }}
                                    />
                                    Редактировать существующий
                                </label>
                            </div>

                            {isEditMode && (
                                <div className="admin-input-group">
                                    <label>Выбери модель для изменения расцветки:</label>
                                    <select 
                                        value={selectedProductId} 
                                        onChange={(e) => handleProductSelectForEdit(e.target.value)}
                                    >
                                        <option value="">-- Выбери кроссовки из списка --</option>
                                        {Array.isArray(products) && products.map((prod, idx) => {
                                            const optionId = prod.id || `fallback_index_${idx}`;
                                            const optionTitle = prod.title || 'Модель без названия';
                                            const optionCategory = prod.category || 'classic';
                                            
                                            return (
                                                <option key={optionId} value={optionId}>
                                                    {optionTitle} ({optionCategory})
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            )}

                             <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Adidas Samba OG"
                            />

                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="14990"
                            />

                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="classic">Classic (Классика)</option>
                                <option value="sport">Sport (Спорт)</option>
                            </select>

                            <div className="admin-input-group">
                                <label className="admin-clickable-label-checkbox">
                                    <input
                                        type="checkbox" 
                                        className="checkbox"
                                        checked={isNew} 
                                        onChange={(e) => setIsNew(e.target.checked)} 
                                    />
                                    Отметить маркой НОВОЕ
                                </label>
                            </div>

                            <div className="admin-section-label">Целевая аудитория (Гендер):</div>
                            <div className="admin-checkbox-selector-grid">
                                {['men', 'women', 'kids'].map((gId) => (
                                    <label key={gId} className="admin-selectable-checkbox-item">
                                        <input 
                                            type="checkbox" 
                                            checked={gender.includes(gId)} 
                                            onChange={() => handleGenderChange(gId)} 
                                        />
                                        {gId === 'men' && 'Мужское'}
                                        {gId === 'women' && 'Женское'}
                                        {gId === 'kids' && 'Детям'}
                                    </label>
                                ))}
                            </div>

                            <div className="admin-section-label">Доступные размеры на складе:</div>
                            <div className="admin-checkbox-selector-grid sizes-grid">
                                {[27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43].map((sizeNum) => (
                                    <label key={sizeNum} className="admin-selectable-checkbox-item size-box-item">
                                        <input 
                                            type="checkbox" 
                                            checked={sizes.includes(sizeNum)} 
                                            onChange={() => handleSizeChange(sizeNum)} 
                                        />
                                        {sizeNum}
                                    </label>
                                ))}
                            </div>

                            <div className="admin-builder-header">
                                <span>Конструктор расцветок и ракурсов картинок:</span>
                                <button type="button" onClick={addColorField} className="admin-add-color-btn">+ Добавить цвет</button>
                            </div>

                            {colorsInput.map((colorObj) => (
                                <div key={colorObj.id} className="admin-color-row-card">

                                    <div сlassName="admin-color-card-header">
                                        <button
                                            type="button"
                                            className="admin-delete-color-btn"
                                            onClick={() => removeColorField(colorObj.id)}
                                        >
                                            - Удалить цвет
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        value={colorObj.name}
                                        onChange={(e) => handleColorPropertyChange(colorObj.id, 'name', e.target.value)}
                                        placeholder="white, black, castomGreen"
                                    />

                                    <input
                                        type="text"
                                        value={colorObj.value}
                                        onChange={(e) => handleColorPropertyChange(colorObj.id, 'value', e.target.value)}
                                        placeholder="#ffffff или linear-gradient(...)"
                                    />

                                    <div className="admin-images-inputs-row">
                                        {[0, 1, 2, 3].map((imgIdx) => (
                                            <input
                                                key={imgIdx}
                                                type="text"
                                                value={colorObj.images[imgIdx] || ''}
                                                onChange={(e) => handleColorImageChange(colorObj.id, imgIdx, e.target.value)}
                                                placeholder={`images/ракурс_${imgIdx + 1}.png`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="admin-form-actions-group">
                                <button type="submit" className="admin-submit-form-btn">
                                    {isEditMode ? "Сохранить изменения" : "Опубликовать на витрине"}
                                </button>

                                {isEditMode && selectedProductId && (
                                    <button 
                                        type="button" 
                                        className="admin-global-delete-product-btn"
                                        onClick={handleDeleteProduct}
                                    >
                                        Удалить товар с витрины
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="admin-crm-orders-section">
                            <h3 className="admin-crm-title">Входящие заказы покупателей</h3>

                            {(!globalOrders || globalOrders.length === 0) ? (
                                <p className="admin-crm-empty-text">Новых заказов в магазине пока нет.</p>
                            ) : (
                                <div className="admin-crm-orders-list">
                                    {globalOrders.map((gOrder) => {
                                        const orderKey = gOrder.cloudOrderId || `crm_order_${gOrder.id}`;

                                        return (
                                            <div key={orderKey} className="admin-crm-order-card">
                                                <div className="admin-crm-order-header">
                                                    <span className="admin-crm-order-number">Заказ №{gOrder.id}</span>
                                                    <span className="admin-crm-order-date">{gOrder.date}</span>
                                                </div>

                                                <div className="admin-crm-customer-info">
                                                    <div className="admin-crm-customer-row">
                                                        <span>Имя клиента:</span> <strong>{gOrder.customerName || 'Не указан'}</strong>
                                                    </div>

                                                     <div className="admin-crm-customer-row">
                                                        <span>Телефон:</span> <strong>{gOrder.customerPhone || 'Не указан'}</strong>
                                                    </div>

                                                    <div className="admin-crm-customer-row">
                                                        <span>Адрес:</span> <strong>{gOrder.customerAddress || 'Не указан'}</strong>
                                                    </div>

                                                    <div className="admin-crm-customer-row">
                                                        <span>Email аккаунта:</span> <strong className="admin-crm-email-text">{gOrder.customerEmail}</strong>
                                                    </div>
                                                </div>

                                                <div className="admin-crm-order-items">
                                                    {Array.isArray(gOrder.items) && gOrder.items.map((item, idx) => {
                                                        const itemImg = Array.isArray(item.image) ? item.image[0] : item.image;
                                                        return (
                                                            <div key={`${orderKey}_item_${idx}`} className="admin-crm-item-row">
                                                                <img src={itemImg || 'icon/Basket.svg'} alt={item.title} className="admin-crm-item-img" />
                                                                <div className="admin-crm-item-details">
                                                                    <h4>{item.title}</h4>
                                                                    <p>Размер: {item.selectedSize} |</p>
                                                                </div>
                                                                <span className="admin-crm-item-price">{item.price} <span className="currency-rub">₽</span></span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div className="admin-crm-order-footer">
                                                    <div className="admin-crm-status-wrapper">
                                                        <span className={`admin-crm-status-badge ${gOrder.status === 'completed' ? 'completed' : 'pending'}`}>
                                                            {gOrder.status === 'completed' ? 'Выполнен' : 'В обработке'}
                                                        </span>

                                                        {gOrder.status !== 'completed' && (
                                                            <button
                                                                type="button"
                                                                className="admin-crm-complete-order-btn"
                                                                onClick={() => handleUpdateOrderStatus(gOrder.cloudOrderId)}
                                                            >
                                                                Завершить
                                                            </button>
                                                        )}
                                                    </div>
                                                    <span className="admin-crm-total">Итого: <strong>{gOrder.total} <span className="currency-rub">₽</span></strong></span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            </div>
                            </section>
                        </div>
                    </div>
                ) : (
                    <>
                    <section className="profile-card-section">
                        <div className="profile-user-status">
                            <h2>Ваш профиль</h2>
                            <p className="profile-status-label">
                                Статус аккаунта: <span className="profile-status-highlight">Официальный клиент Adidas Store</span>
                            </p>
                        </div>
                        <button onClick={handleLogout} className="profile-logout-btn">
                            Выйти из аккаунта
                        </button>
                    </section>

                    <section className="profile-history-section">
                        <h2>История заказов</h2>
                        
                        {orders.length === 0 ? (
                            <div className="profile-orders-placeholder">
                                <img src="icons/Basket.svg" alt="No orders" className="profile-empty-icon" />
                                <p className="profile-empty-title">Вы еще не совершили ни одного заказа.</p>
                                <p className="profile-empty-subtitle">Все ваши будущие покупки в Adidas Store отобразятся здесь.</p>
                            </div>
                        ) : (
                            <div className="profile-orders-list-wrapper">
                                {orders.map((order) => (
                                    <div key={order.id} className="profile-order-card">
                                        <div className="profile-order-card-header">
                                            <span className="profile-order-number">Заказ №{order.id}</span>
                                            <span className="profile-order-date">Дата: {order.date}</span>
                                        </div>
                                        
                                        <div className="profile-order-items-list">
                                            {order.items.map((item, idx) => {
                                                 const itemImg = item.image 
                                                    ? (Array.isArray(item.image) ? item.image[0] : item.image)
                                                    : (item.images && item.selectedColor && item.images[item.selectedColor]
                                                        ? (Array.isArray(item.images[item.selectedColor]) ? item.images[item.selectedColor][0] : item.images[item.selectedColor])
                                                        : (item.images ? Object.values(item.images)[0][0] || Object.values(item.images)[0] : '') || '');
                                                return (
                                                    <div key={idx} className="profile-order-item-row">
                                                        <img src={itemImg} alt={item.title} className="profile-order-item-img" />
                                                        <div className="profile-order-item-info">
                                                            <h4>{item.title}</h4>
                                                            <span className="profile-order-item-size">Размер: {item.selectedSize || 'Не указан'}</span>
                                                        </div>
                                                        <span className="profile-order-item-price">{item.price} ₽</span>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="profile-order-card-footer">
                                            <span className="profile-order-status">
                                                Статус: <span className="profile-order-status-highlight">В обработке менеджером</span>
                                            </span>
                                            <span className="profile-order-total-sum">
                                                Итого: <span className="profile-order-total-highlight">{order.total} <span className="currency-rub">₽</span></span>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                    </>
                )}

            </div>

            <div 
                className={`custom-alert-overlay ${isConfirmOpen ? 'open' : ''}`}
                onClick={(e) => { if (e.target.className.includes('custom-alert-overlay')) setIsConfirmOpen(false); }}
            >
                <div className="custom-alert-card">
                    <div className="custom-alert-warning-icon">⚠</div>
                    <h2>Удаление аккаунта</h2>
                    <p>Вы уверены, что хотите НАВСЕГДА удалить свой профиль? Это действие сотрет все ваши данные, и его нельзя будет отменить.</p>
                    <div className="custom-alert-actions">
                        <button onClick={() => setIsConfirmOpen(false)} className="custom-alert-btn-cancel">
                            Отмена
                        </button>
                        <button onClick={handleConfirmDelete} className="custom-alert-btn-confirm">
                            Да, удалить
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Profile;