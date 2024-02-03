/* eslint-disable react/no-unescaped-entities */
import '../aboutPage/style5.css'
import { Header } from '../pgcomponents/Header';
import { Footer } from '../pgcomponents/Footer';
import { useParams } from "react-router-dom";

export const AboutPage = () => {
    const { user } = useParams();

    return (
        <div className="container">
            <div className="inner__container">
                <Header userId={user} />

                <main className="about-main">
                    <div className="about-main__container">
                        <div className="about-main-background__container"></div>

                        <div className="about-main-title">
                            <div className="about-main-title__container">
                                About us
                            </div>
                        </div>

                        <div className="about-main-content">
                            <div className="about-main-content__container">
                                <div className="about-main-text">
                                    <div className="about-main-text__container">
                                        <p>
                                            Welcome to our anime platform!

                                            <br />

                                            At AniSup, we love anime and want to make it super easy for you to watch and enjoy it.
                                            Our goal is to help you discover new anime, keep track of what you've watched, and find your favorites.

                                            
                                        </p>

                                        <p>We've made our website simple to use, with cool features to make your anime experience awesome. 
                                            You can mark which shows you've seen, find new ones you might like, and hang out with other fans.</p>

                                        <p>
                                            Whether you're a big anime fan or just getting started, AniSup is here to make your anime adventure fun and easy. 
                                            Come join us and dive into the exciting world of anime today!
                                        </p>
                                    </div>
                                </div>

                                <div className="support-section">
                                    <div className="support-section__container">
                                        <div className="support-section__title">
                                            support us here:
                                        </div>

                                        <div className="support-section__nav">
                                            <a href="https://github.com/harukadoo/anisup-beta.git">
                                                <i className="fa-brands fa-github"></i>
                                            </a>

                                            <a href="https://t.me/Studio_Kachur">
                                                <i className="fa-brands fa-telegram"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    )
}