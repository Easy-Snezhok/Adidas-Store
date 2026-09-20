import { useState } from 'react';
import { auth } from '../firebase';
import { signOut, deleteUser } from 'firebase/auth';

function Profile({ user, onLogout, orders = [] }) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [settingsError, setSettingsError] = useState('');
    
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
                    console.log("Аккаунт успешно удален из базы Firebase");
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
                        <h1>Личный кабинет</h1>
                    </div>
                    <p className="profile-subtitle-text">
                        Рады видеть вас снова, <span className="profile-user-email">{user.displayName || user.email}</span>!
                    </p>

                    <div className="profile-settings-dropdown-wrapper">
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
                                            const itemImg = item.images && item.selectedColor && item.images[item.selectedColor]
                                                ? (Array.isArray(item.images[item.selectedColor]) ? item.images[item.selectedColor][0] : item.images[item.selectedColor])
                                                : (Object.values(item.images)[0] || '');
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
                                            Итого: <span className="profile-order-total-highlight">{order.total} ₽</span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

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