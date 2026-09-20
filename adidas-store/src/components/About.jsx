function About() {
    return (
        <main className="about-main-page">
            <div className="about-container">
                <section className="about-hero">
                    <h1>ADIDAS STORE</h1>
                    <p className="about-subtitle">МЫ МЕНЯЕМ ЖИЗНЬ ЧЕРЕЗ СПОРТ</p>
                </section>

                <section className="about-section">
                    <h2>Наша история</h2>
                    <p>
                        Бренд Adidas — это больше, чем просто спортивная одежда и обувь.
                        Это мировая история побед, инноваций и уличной культуры, начавшаяся в Германии.
                        Мы создаем легендарные силуэты, такие как Superstar, Samba и Gazelle,
                        которые объединяют атлетов и фанатов моды по всему миру.
                    </p>
                </section>

                <section className="about-section about-grid">
                    <div className="about-info-block">
                        <h3>Флагманский магазин</h3>
                        <p>г. Москва, ул. Кузнецкий Мост, д. 7</p>
                        <p>Ежедневно: с 10:00 до 22:00</p>
                    </div>

                    <div className="about-info-block">
                        <h3>Контакты</h3>
                        <p>Телефон поддержки: +7 (800) 555 - 35 - 35</p>
                        <p>Email: support@adidas-store.ru</p>
                    </div>
                </section>

                <section className="about-section about-map-section">
                    <h2>Мы на карте</h2>
                    <div className="map-wrapper">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aff299c609ff343c1e4a937e0477734b2c94bf8ff6fb64aff0d84691c9e139223&amp;source=constructor"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen={true}
                            title="Adidas Store на карте"
                        ></iframe>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default About;