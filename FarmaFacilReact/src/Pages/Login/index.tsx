import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/auth";
import logo from "../../assets/img/logoFFW.jpg";
import { Container } from "./styles";

export function Login() {
  const { authenticated, login }: any = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Container>
      <div className="container_logo">
        <img src={logo} className="imagem_login"></img>
      </div>

      <div className="container_form">
        <h2 className="title_form">Entrar</h2>
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
          <div className="footer">

          <button type="submit" className="button_submit">
            Entrar
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
