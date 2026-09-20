import {useState} from 'react';

function Header({changePage, openCart, cartCount, favCount, onNavigateNew, openAuth, user}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavigate = (page) => {
        changePage(page);
        setIsMenuOpen(false);
    };

    return (
         <header>
            <div
                className = {`hamburger-icon-btn ${isMenuOpen ? 'open' : ''}`}
                onClick = {() => setIsMenuOpen(!isMenuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className = {`nav-menu-list ${isMenuOpen ? 'mobile-open' : ''}`}>
                <li onClick = {() => {onNavigateNew(); setIsMenuOpen(false);}}>Новинки</li>
                <li onClick = {() => handleNavigate('about')}>О нас</li>
                <li onClick={() => handleNavigate('catalog')}>Каталог</li>
            </ul>
            
            <div onClick={() => handleNavigate('home')} className="header-logo-link">
                <img src="icons/Logo_Adidas_little.svg" alt="logotip" className="logotip" />
            </div>

            <div className="header-right-icons">

                <div
                    onClick={() => {
                        if (user) {
                            handleNavigate('profile');
                        } else {
                            openAuth();
                        } 
                    }}

                    className="profile-icon-wrapper"
                >
                    <img
                        src="icons/icon_user.svg"
                        className="icon-user"
                        alt="profile"
                    />

                    {user && (
                        <span
                            className="user-online-dot"
                        >
                        </span>
                    )}
                </div>
                <div onClick={() => changePage('favorites')} className="favorite-icon-wrapper">
                    <img src="icons/icon_heart.svg" className="icon-heart" alt="favorites" />
                    {favCount > 0 && (
                        <span className = "favorite-badge">{favCount}</span>
                    )}
                </div>

                <div onClick={openCart} className="cart-icon-wrapper">
                    <img src="icons/Basket.svg" className="icon-basket" alt="basket badge" />
                    {cartCount > 0 && (
                        <span className="basket-badge">{cartCount}</span>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;