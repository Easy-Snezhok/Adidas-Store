import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';

function AuthModal({ isOpen, onClose, onAuthSuccess }) {
    const [authMode, setAuthMode] = useState('login');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthError(''); 

        if (authMode === 'register') {
            if (!userName.trim()) {
                setAuthError('Пожалуйста, введите ваше имя!');
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    updateProfile(userCredential.user, {
                        displayName: userName
                    })
                    .then(() => {
                        sendEmailVerification(auth.currentUser)
                            .then(() => {
                                console.log("Письмо верификации отправлено на:", email);

                                setAlertMessage(`Ссылка для активации профиля отправлена на почту ${email}. Пожалуйста, перейдите по ссылке для подтверждения почты!`);
                                setIsAlertOpen(true);

                                auth.signOut();
                                setUserName('');
                                setEmail('');
                                setPassword('');
                            });
                    })
                    .catch((err) => {
                        setAuthError('Ошибка при создании профиля: ' + err.message);
                    });
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        setAuthError('Этот Email уже зарегистрирован!');
                    } else if (error.code === 'auth/weak-password') {
                        setAuthError('Пароль должен быть не менее 6 символов!');
                    } else {
                        setAuthError('Ошибка регистрации: ' + error.message);
                    }
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    if (!userCredential.user.emailVerified) {
                        setAuthError('Ваш Email ещё не подтверждён! Проверьте почту и перейдите по ссылке.');
                        auth.signOut(); 
                        return;
                    }

                    console.log("Успешный вход верифицированного юзера:", userCredential.user);
                    onAuthSuccess(userCredential.user);
                    onClose();
                })
                .catch((error) => {
                    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                        setAuthError('Неверный Email или пароль!');
                    } else {
                        setAuthError('Ошибка входа: ' + error.message);
                    }
                });
        }
    };

    return (
        <>
            <div 
                className={`cart-modal ${isOpen ? 'open' : ''}`} 
                id="authModal" 
                onClick={(event) => {
                    if (event.target.id === 'authModal') onClose();
                }}
            >
                <div className="cart-panel">
                    <div className="cart-header">
                        <h2>{authMode === 'login' ? 'Вход' : 'Регистрация'}</h2>
                        <button onClick={onClose} className="close-cart-btn">&times;</button>
                    </div>

                    <div className="cart-items-container" style={{ padding: '20px 0' }}>
                        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                            <button 
                                onClick={() => { setAuthMode('login'); setAuthError(''); }}
                                className={`filter-btn ${authMode === 'login' ? 'active' : ''}`}
                                style={{ flex: 1 }}
                            >
                                Вход
                            </button>
                            <button 
                                onClick={() => { setAuthMode('register'); setAuthError(''); }}
                                className={`filter-btn ${authMode === 'register' ? 'active' : ''}`}
                                style={{ flex: 1 }}
                            >
                                Регистрация
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {authMode === 'register' && (
                                <div className="input-group">
                                    <label>Ваше Имя</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder="Иван"
                                    />
                                </div>
                            )}

                            <div className="input-group">
                                <label>Ваш Email</label>
                                <input 
                                    type="email" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@mail.ru"
                                />
                            </div>

                            <div className="input-group">
                                <label>Пароль</label>
                                <input 
                                    type="password" 
                                    required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••"
                                />
                            </div>

                            {authError && (
                                <span className="input-error-text" style={{ color: '#0051BA', fontWeight: 'bold' }}>
                                    {authError}
                                </span>
                            )}

                            <button type="submit" className="checkout-btn" style={{ marginTop: '10px' }}>
                                {authMode === 'login' ? 'Войти' : 'Создать аккаунт'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div 
                className={`custom-alert-overlay ${isAlertOpen ? 'open' : ''}`}
                onClick={() => { setIsAlertOpen(false); setAuthMode('login'); }}
            >
                <div className="custom-alert-card" onClick={(e) => e.stopPropagation()}>
                    <div className="custom-alert-warning-icon" style={{ backgroundColor: '#e8f0fe', color: '#0051BA' }}>✉</div>
                    <h2>Активация аккаунта</h2>
                    <p>{alertMessage}</p>
                    <button 
                        onClick={() => { setIsAlertOpen(false); setAuthMode('login'); }} 
                        className="custom-alert-btn-cancel"
                        style={{ width: '100%' }}
                    >
                        Понятно
                    </button>
                </div>
            </div>
        </>
    );
}

export default AuthModal;