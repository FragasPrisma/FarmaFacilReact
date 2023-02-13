import { useState, useContext } from "react";
import { AuthContext } from "../../Context/auth";
import logo from "../../assets/img/logoFFW.jpg";
import { Container } from "./styles";
import { Spinner } from "react-bootstrap";

export function Login() {

  const { authenticated, login }: any = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false)

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

  return (

    <Container>
      <div className="container_logo">
        <img src={logo} className="imagem_login" />
      </div>
      <div className="container_form">
        <div className="container_lenguage">
          <h2 className="title_form">Entrar</h2>
          <select className="select-lenguage">
            <option value={1}>Português</option>
            <option value={2}>Espanhol</option>
          </select>
        </div>
        <p className="text_acess">
          Faça Login com os dados que você inseriu durante o registro.
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
            placeholder="Senha"
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
              Esqueceu a senha?{" "}
              <span className="url_esqueceu_senha"> Clique aqui </span>
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
}
