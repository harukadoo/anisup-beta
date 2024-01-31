import { useState } from 'react';
import '../signUpPages/style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export const SignUpPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userExists, setUserExists] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const checkUser = await axios.post('https://anisup-beta.onrender.com/sign-up-check', { email });

      if (checkUser.data.exists) {
        setUserExists(true);

      } else {
        if (name === '' || email === '' || password === '') {
          return;
          
        } else {
          const createUser = await axios.post('https://anisup-beta.onrender.com/', { name, email, password, saves: [], favorite: [], watched: []});
          const userId = createUser.data._id;
          console.log(createUser);
          navigate(`/main/${userId}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <div className="inner__container">
        <div className="content__container">
          <div className="form">
            <div className="form__container">
              <div className="signup-form__title">WELCOME!</div>
              <div className="signup-form__caption">
                *you must to create an account first to enjoy all the features
                of the site
              </div>

              <form className="sign-up__form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="nickname"
                  placeholder="your nickname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type="email"
                  id="email"
                  placeholder="your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  id="password"
                  placeholder="your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <p className="sign-up-form__error" style={{ display: userExists ? 'block' : 'none' }}>
                  *this user already exists
                </p>

                <div className="form__navigation">
                  <Link to={'/sign-in'} className="sign-in__link">
                    sign in
                  </Link>
                  <button type="submit" className="sign-up__button">
                    sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="background">
          <div className="background__container"></div>
        </div>
      </div>
    </div>
  );
};
