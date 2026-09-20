function Footer({changePage, onNavigateNew}) {
    return (
        <footer className = "site-footer">
            <div className = "footer-container">
                <div className = "footer-block">
                    <h3>Продукция</h3>
                    <ul>
                        <li onClick = {onNavigateNew}>Новинки</li>
                        <li onClick = {() => changePage('about')}>О нас</li>
                        <li onClick = {() => changePage('catalog')}>Каталог</li>
                    </ul>
                </div>
                
                <div className = "footer-block">
                    <h3>Поддержка</h3>
                    <ul>
                        <li>Доставка и оплата</li>
                        <li>Возврат товара</li>
                        <li>Связаться с нами</li>
                    </ul>
                </div>

                <div className = "footer-block">
                    <h3>О нас</h3>
                    <p className = "footer-about-text">
                        Официальный интерактивный магазин оригинальной обуви Adidas.
                        Все права на дизайн и медиаматериалы принадлежат правообладателям.
                    </p>
                </div>
            </div>

            <div className = "footer-bottom">
                <p>&copy; {new Date().getFullYear()} Adidas Store.</p>
            </div>
        </footer>
    );
}

export default Footer;