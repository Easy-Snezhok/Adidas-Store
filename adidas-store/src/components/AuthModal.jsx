import { useState, useEffect, useRef } from 'react';
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resendCountdown, setResendCountdown] = useState(0);
    const [registeredUserForResend, setRegisteredUserForResend] = useState(null);

    const [showPassword, setShowPassword] = useState(false);

    const timerRef = useRef(null);

    const startCountdown = () => {
        setResendCountdown(15);
        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setResendCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const handleResendVerification = async () => {
        if (resendCountdown > 0 || isSubmitting) return;

        setAuthError('');
        setIsSubmitting(true);

        try {
            const targetUser = auth.currentUser || registeredUserForResend;

            if (targetUser) {
                await sendEmailVerification(targetUser);
                console.log("Повторрное письмо верификации успешно отправлено");
                setAlertMessage(`Новая ссылка для активации успешно отправлена на вашу почу. Пожалуйта, проверьте папку Спам, если письмо долго не приходит`);
                setIsAlertOpen(true);
                startCountdown();
            } else {
                setAuthError("Сессия истекла. Пожалуйста, попробуйте войти, чтобы пришел код заново.");
            }
        } catch (err) {
            if (err.code === 'auth/too-many-requests') {
                setAuthError("Слишком много запросов! Google временно заблокировал отправку писем. Подождите пару минут.");
            } else {
                setAuthError("Не удалось отправить письмо:" + err.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        
        setAuthError(''); 
        setIsSubmitting(true);

        if (authMode === 'register') {
            if (!userName.trim()) {
                setAuthError('Пожалуйста, введите ваше имя!');
                setIsSubmitting(false);
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setRegisteredUserForResend(userCredential.user);

                    updateProfile(userCredential.user, {
                        displayName: userName
                    })
                    .then(() => {
                        sendEmailVerification(userCredential.user)
                            .then(() => {
                                console.log("Письмо верификации отправлено на:", email);

                                setAlertMessage(`Ссылка для активации профиля отправлена на почту ${email}. Пожалуйста, перейдите по ссылке для подтверждения почты!`);
                                setIsAlertOpen(true);
                                startCountdown(); 

                                setUserName('');
                            })
                            .catch((err) => {
                                setAuthError('Ошибка отправки письма верификации: ' + err.message);
                            })
                            .finally(() => {
                                setIsSubmitting(false);
                            });
                    })
                    .catch((err) => {
                        setAuthError('Ошибка при создании профиля: ' + err.message);
                        setIsSubmitting(false);
                    });
                })
                .catch((error) => {
                    setIsSubmitting(false);
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
                        
                        setRegisteredUserForResend(userCredential.user);
                        startCountdown();
                        
                        auth.signOut(); 
                        setIsSubmitting(false);
                        return;
                    }

                    console.log("Успешный вход верифицированного юзера:", userCredential.user);
                    onAuthSuccess(userCredential.user);
                    onClose();
                    setIsSubmitting(false);
                })
                .catch((error) => {
                    setIsSubmitting(false);
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
                                onClick={() => { setAuthMode('login'); setAuthError(''); setShowPassword(false); }}
                                className={`filter-btn ${authMode === 'login' ? 'active' : ''}`}
                                style={{ flex: 1 }}
                                disabled={isSubmitting}
                            >
                                Вход
                            </button>
                            <button 
                                onClick={() => { setAuthMode('register'); setAuthError(''); setShowPassword(false); }}
                                className={`filter-btn ${authMode === 'register' ? 'active' : ''}`}
                                style={{ flex: 1 }}
                                disabled={isSubmitting}
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
                                        disabled={isSubmitting}
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
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="input-group">
                                <label>Пароль</label>
                                <div className="password-input-wrapper">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        required 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••"
                                        disabled={isSubmitting}
                                        className="password-field-input"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-eye-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        title={showPassword ? "Скрыть пароль" : "Показать пароль"}
                                        disabled={isSubmitting}
                                    >
                                        {showPassword ? (
                                            <img src="icons/Closed_eye.svg"
                                            alt="Скрыть Пароль"
                                            className="password-eye-icon"
                                        />
                                        ) : (
                                            <img
                                            src="icons/Eye.svg"
                                            alt="Показать парль" 
                                            className="password-eye-icon"
                                        />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {authError && (
                                <span className="input-error-text" style={{ color: '#0051BA', fontWeight: 'bold' }}>
                                    {authError}
                                </span>
                            )}

                            {authError && authError.includes('не подтверждён') && (
                                <button
                                    type="button"
                                    className="auth-resend-link-btn"
                                    onClick={handleResendVerification}
                                    disabled={resendCountdown > 0 || isSubmitting}
                                >
                                    {resendCountdown > 0 
                                        ? `Отправить повторно через ${resendCountdown} сек.` 
                                        : 'Выслать ссылку повторно'}
                                </button>
                            )}

                            <button type="submit" className="checkout-btn" style={{ marginTop: '10px' }} disabled={isSubmitting}>
                                {isSubmitting 
                                    ? 'Ожидание...' 
                                    : (authMode === 'login' ? 'Войти' : 'Создать аккаунт')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div 
                className={`custom-alert-overlay ${isAlertOpen ? 'open' : ''}`}
                onClick={() => { if (!isSubmitting) { setIsAlertOpen(false); setAuthMode('login'); } }}
            >
                <div className="custom-alert-card" onClick={(e) => e.stopPropagation()}>
                    <div className="custom-alert-warning-icon" style={{ backgroundColor: '#e8f0fe', color: '#0051BA' }}>✉</div>
                    <h2>Активация аккаунта</h2>
                    <p>{alertMessage}</p>
                    
                    <div className="auth-alert-actions-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '15px' }}>
                        <button
                            type="button"
                            className="auth-resend-link-btn alert-version"
                            onClick={handleResendVerification}
                            disabled={resendCountdown > 0 || isSubmitting}
                        >
                            {resendCountdown > 0 
                                ? `Повторный запрос через ${resendCountdown} сек.` 
                                : '✉ Не пришло письмо? Отправить еще раз'}
                        </button>

                        <button 
                            onClick={() => { setIsAlertOpen(false); setAuthMode('login'); }} 
                            className="custom-alert-btn-cancel"
                            style={{ width: '100%' }}
                            disabled={isSubmitting}
                        >
                            Понятно
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthModal;