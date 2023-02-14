import { useState, useContext, ChangeEvent, useEffect } from "react";
import { AuthContext } from "../../Context/auth";
import logo from "../../assets/img/logoFFW.jpg";
import { Container } from "./styles";
import { Spinner } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

export function Login() {

  const { authenticated, login }: any = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [ptBr, setPtBr] = useState(false);
  const { t } = useTranslation();
  const [placHolder, setPlaceHolder] = useState(t('login.password'))

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

  function MudarLenguage(e: any) {
    e.preventDefault();
    if (ptBr) {
      setPtBr(false)
      i18n.changeLanguage('pt');
    } else {
      setPtBr(true)
      i18n.changeLanguage('es');
    }
    setPlaceHolder(t('login.password'))
  }

  return (

    <Container>
      <div className="container_logo">
        <img src={logo} className="imagem_login" />
      </div>
      <div className="container_form">
        <div className="container_lenguage">
          <h2 className="title_form">{t('login.title')}</h2>
          <select className="select-lenguage" onChange={(e) => MudarLenguage(e)}>
            <option value={1} >Português</option>
            <option value={2} >Espanhol</option>
          </select>
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
            //placeholder={placHolder}
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
    </Container>
  );
}
