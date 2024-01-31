import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../signInPage/style2.css';

export const SignInPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await axios.post('https://anisup-beta.onrender.com/sign-in', { email, password });

      if (result.data.status === "Success") {
        const userId = result.data._id;
        navigate(`/main/${userId}`);

      } else if (result.data === "incorrect password") {
        setError('incorrect password');
        
      } else if (result.data === "no user existed") {
        setError('no user existed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const emailBorderStyle: React.CSSProperties = error === 'no user existed' ? { borderColor: 'red' } : {};
  const passwordBorderStyle: React.CSSProperties = error === 'incorrect password' ? { borderColor: 'red' } : {};

  return (
    <div className="sign-in-container">
      <div className="inner__container">
        <div className="content__container">
          <div className="form">
            <div className="form__container">
              <div className="form__title">NICE TO SEE YOU!</div>
              <div className="form__caption">*sign in to your account</div>

              <form className="sign-in__form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  id="email"
                  placeholder="your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={emailBorderStyle}
                />

                <input
                  type="password"
                  id="password"
                  placeholder="your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={passwordBorderStyle}
                />

                <div className="form__navigation">
                  <Link to={'/'} className="sign-up__link">
                    sign up
                  </Link>
                  <button type="submit" className="sign-in__button">
                    sign in
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
