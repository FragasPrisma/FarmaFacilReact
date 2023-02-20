import { useState, useContext, ChangeEvent, useEffect } from "react";
import { AuthContext } from "../../Context/auth";
import logo from "../../assets/img/logoFFW.jpg";
import { Container, DropdownCustom } from "./styles";
import { Dropdown, Spinner } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import brasil from '../../assets/img/brasil_flag.png'
import spain from '../../assets/img/spain_flag.jpg'
import us from '../../assets/img/us_flag.jpg'
import i18n from '../../i18n';

export function Login() {

  const { authenticated, login }: any = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordPlaceHold, setPasswordPlaceHold] = useState("Senha");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation();
  const [img, setImg] = useState(brasil);
  const [textImg, setTextImg] = useState("Português")

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      setErro("E-mail inválido !");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setErro("Senha inválida !");
      setIsLoading(false);
      return;
    }
    login(email, password);
  };

  function ModificarIdioma(e: any, option: number) {
    e.preventDefault();
    
    if (option == 1) {
      setImg(brasil)
      setTextImg("Português")
      i18n.changeLanguage('pt');
    } else {
      if(option == 2){
        setImg(spain)
        setTextImg("Spanish")
        setPasswordPlaceHold("Contraseña")
        i18n.changeLanguage('es');
      }else{
        setImg(us)
        setTextImg("English")
        setPasswordPlaceHold("Password")
        i18n.changeLanguage('us');
      }
    }
  }

  return (

    <Container>
      <div className="container_logo">
        <img src={logo} className="imagem_login" />
      </div>
      <div className="container_form">
        <div className="container_lenguage">
          <h2 className="title_form">{t('login.title')}</h2>

          <Dropdown>
            <DropdownCustom split variant="" id="">
              <img src={img} /> <span className="text-image">{textImg}</span>
            </DropdownCustom>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e) => ModificarIdioma(e, 1)}>
                <img src={brasil} className="images" /> <span className="text-option">Português</span>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => ModificarIdioma(e, 2)}>
                <img src={spain} className="images" /> <span className="text-option">Spanish</span>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => ModificarIdioma(e, 3)}>
                <img src={us} className="images" /> <span className="text-option">English</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown >

        </div>
        <p className="text_acess">
          {t('login.titleInfo')}
        </p>

        <form className="form_login" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            className="inputs"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder={passwordPlaceHold.toString()}
            value={password}
            className="inputs"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-erro">{erro}</p>
          <div className="footer">
            <button type="submit" className="button_submit">
              {isLoading ?
                <Spinner animation="border" size="sm" variant="secondary" />
                :
                "Confirmar"
              }
            </button>
            <p className="esqueceu">
              {t('login.esqueceuSenha')}{" "}
              <span className="url_esqueceu_senha"> {t('login.cliqueAqui')} </span>
            </p>
          </div>
        </form>
      </div>
    </Container >
  );
}