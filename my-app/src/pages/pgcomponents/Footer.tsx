import './style4.css'

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
              <div className="footer-quote">
                <div className="footer-quote__container">
                  <p>AniSup </p>
                  <p>— place where you can escape reality.</p>
                </div>
              </div>
  
              <div className="footer-navigation">
                <div className="footer-navigation__container">
                  <a href="https://www.youtube.com/@KachurDub">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
  
                  <a href="https://t.me/Studio_Kachur">
                    <i className="fa-brands fa-telegram"></i>
                  </a>
  
                  <a href="https://github.com/harukadoo">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </footer>
    )
}