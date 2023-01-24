import React, { useState, useContext } from "react";
import { AuthProvider, AuthContext } from "./Context/auth";
import { Bairro } from "./Pages/Bairro";
import { BairroCreate } from "./Pages/Bairro/BairroCreate";
import { BairroEdit } from "./Pages/Bairro/BairroEdit";
import { Classe } from "./Pages/Classe";
import { Dcb } from "./Pages/Dcb";
import { Dci } from "./Pages/Dci";
import { Fornecedor } from "./Pages/Fornecedor";
import { Grupo } from "./Pages/Grupo";
import { Laboratorio } from "./Pages/Laboratorio";
import { Login } from "./Pages/Login";
import { Nbm } from "./Pages/Nbm";
import { Ncm } from "./Pages/Ncm";
import { Pbm } from "./Pages/Pbm/";
import { PbmCreate } from "./Pages/Pbm/PbmCreate";
import { PrincipioAtivo } from "./Pages/PrincipioAtivo";
import { Produto } from "./Pages/Produto";
import { Home } from "./Pages/Home";
import { DefaultLayout } from "./Layout/LayoutDefault";
import { Dashboard } from "./Pages/Dashboard";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ClasseCreate } from "./Pages/Classe/ClasseCreate";
import { ClasseEdit } from "./Pages/Classe/ClasseEdit";
import { PbmEdit } from "./Pages/Pbm/PbmEdit";
import { FornecedorCreate } from "./Pages/Fornecedor/FornecedorCreate";
import { PbmDetails } from "./Pages/Pbm/PbmDetails";


export function AppRoutes() {
  const Private = ({ children }: any) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <Private>
                {" "}
                <DefaultLayout />{" "}
              </Private>
            }
          >
            <Route path="/dashboard" element={<Private> <Dashboard /> </Private>} />

            <Route
              path="/bairro"
              element={
                <Private>
                  <Bairro />{" "}
                </Private>
              }
            />
            <Route
              path="/bairro/create"
              element={
                <Private>
                  <BairroCreate/>
                </Private>
              }
            />
            <Route
              path="/bairro/edit/:id"
              element={
                <Private>
                  <BairroEdit/>
                </Private>
              }
            />
            <Route
              path="/classe"
              element={
                <Private>
                  <Classe />
                </Private>
              }
            />
            <Route
              path="/classe/create"
              element={
                <Private>
                  <ClasseCreate />
                </Private>
              }
            />
            <Route
              path="/classe/edit/:id"
              element={
                <Private>
                  <ClasseEdit/>
                </Private>
              }
            />

            <Route
              path="/dcb"
              element={
                <Private>
                  <Dcb />
                </Private>
              }
            />
            <Route
              path="/dci"
              element={
                <Private>
                  <Dci />
                </Private>
              }
            />
            <Route
              path="/fornecedor"
              element={
                <Private>
                  <Fornecedor />
                </Private>
              }
            />
            <Route
              path="/fornecedor/create"
              element={
                <Private>
                  <FornecedorCreate />
                </Private>
              }
            />
            <Route
              path="/grupo"
              element={
                <Private>
                  <Grupo />
                </Private>
              }
            />
            <Route
              path="/laboratorio"
              element={
                <Private>
                  <Laboratorio />
                </Private>
              }
            />
            <Route
              path="/nbm"
              element={
                <Private>
                  <Nbm />
                </Private>
              }
            />
            <Route
              path="/ncm"
              element={
                <Private>
                  <Ncm />
                </Private>
              }
            />

            <Route
              path="/pbm"
              element={
                <Private>
                  <Pbm />
                </Private>
              }
            />
            <Route
              path="/pbm/create"
              element={
                <Private>
                  <PbmCreate />
                </Private>
              }
            />

            <Route
              path="/pbm/edit/:id"
              element={
                <Private>
                  <PbmEdit />
                </Private>
              }
            />

            <Route
              path="/pbm/details/:id"
              element={
                <Private>
                  <PbmDetails/>
                </Private>
              }
            />

            <Route
              path="/principioAtivo"
              element={
                <Private>
                  <PrincipioAtivo />
                </Private>
              }
            />
            <Route
              path="/produto"
              element={
                <Private>
                  <Produto />
                </Private>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
