import { Link } from 'react-router-dom';
import { useState } from 'react';
import './style4.css'

type HeaderProps = {
  userId: string | undefined;
}

export const Header = ({ userId }: HeaderProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isSearchVisible, setSearchVisible] = useState<boolean>(false);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const closeSearch = () => {
    setSearchVisible(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header-logo">
          <div className="header-logo__container">
            AniSup
          </div>
        </div>

        <div className="header-content">
          <div className="header-content__container">
            <div className="header-menu">
              <div className="header-menu__container">
                <Link to={`/about-us/${userId}`}>about us</Link>
                <Link to={`/main/${userId}`}>catalog</Link>
                <Link to={`/top100/${userId}`}>top 100</Link>
              </div>
            </div>

            <div className="header-navigation">
              <div className="header-navigation__container">

                <button className="header-navigation__btn" onClick={toggleSearch} style={{ display: isSearchVisible ? 'none' : 'block' }}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>

                <div className="header-search" style={{ display: isSearchVisible ? 'block' : 'none' }}>
                  <div className="header-search__container" >
                    <button className="header-search__close-btn" onClick={closeSearch}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>

                    <input
                      type="text"
                      className="header-search__input"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />

                    <button type="submit" className="header-search__btn">
                      <Link to={`/search-list/${userId}/${inputValue}`}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </Link>
                    </button>
                  </div>
                </div>

                <button className="header-navigation__btn">
                  <Link to={`/home/${userId}`}>
                    <i className="fa-solid fa-user"></i>
                  </Link>
                </button>

                <Link to={'/'} className="header-navigation__btn">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}