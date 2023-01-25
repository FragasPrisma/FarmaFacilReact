import React, { useState, useContext } from "react";
import { AuthProvider, AuthContext } from "./Context/auth";
import { Bairro } from "./Pages/Bairro";
import { BairroCreate } from "./Pages/Bairro/BairroCreate";
import { BairroDetails } from "./Pages/Bairro/BairroDetails";
import { BairroEdit } from "./Pages/Bairro/BairroEdit";
import { Classe } from "./Pages/Classe";
import { Dcb } from "./Pages/Dcb";
import { DcbCreate } from "./Pages/Dcb/DcbCreate";
import { DcbDetails } from "./Pages/Dcb/DcbDetails";
import { DcbEdit } from "./Pages/Dcb/DcbEdit";
import { Dci } from "./Pages/Dci";
import { DciCreate } from "./Pages/Dci/DciCreate";
import { DciDetails } from "./Pages/Dci/DciDetails";
import { DciEdit } from "./Pages/Dci/DciEdit";
import { Fornecedor } from "./Pages/Fornecedor";
import { Grupo } from "./Pages/Grupo";
import { Laboratorio } from "./Pages/Laboratorio";
import { Login } from "./Pages/Login";
import { Nbm } from "./Pages/Nbm";
import { Ncm } from "./Pages/Ncm";
import { Pbm } from "./Pages/Pbm/";
import { PbmCreate } from "./Pages/Pbm/PbmCreate";
import { PrincipioAtivo } from "./Pages/PrincipioAtivo";
import { PrincipioAtivoCreate } from "./Pages/PrincipioAtivo/PrincipioAtivoCreate";
import { PrincipioAtivoDetails } from "./Pages/PrincipioAtivo/PrincipioAtivoDetails";
import { PrincipioAtivoEdit } from "./Pages/PrincipioAtivo/PrincipioAtivoEdit";
import { Produto } from "./Pages/Produto";
import { Home } from "./Pages/Home";
import { DefaultLayout } from "./Layout/LayoutDefault";
import { Dashboard } from "./Pages/Dashboard";
import { ClasseCreate } from "./Pages/Classe/ClasseCreate";
import { ClasseDetails } from "./Pages/Classe/ClasseDetails";
import { ClasseEdit } from "./Pages/Classe/ClasseEdit";
import { PbmEdit } from "./Pages/Pbm/PbmEdit";
import { PbmDetails } from "./Pages/Pbm/PbmDetails";
import { Parametro } from "./Pages/Parametro";
import { FornecedorCreate } from "./Pages/Fornecedor/FornecedorCreate";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
              path="/bairro/details/:id"
              element={
                <Private>
                  <BairroDetails/>
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
              path="/classe/details/:id"
              element={
                <Private>
                  <ClasseDetails />
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
              path="/dcb/create"
              element={
                <Private>
                  <DcbCreate />
                </Private>
              }
            />
            <Route
              path="/dcb/details/:id"
              element={
                <Private>
                  <DcbDetails />
                </Private>
              }
            />
            <Route
              path="/dcb/edit/:id"
              element={
                <Private>
                  <DcbEdit />
                </Private>
              }
            />

            <Route
              path="/parametro"
              element={
                <Private>
                  <Parametro />
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
              path="/dci/create"
              element={
                <Private>
                  <DciCreate />
                </Private>
              }
            />
            <Route
              path="/dci/details/:id"
              element={
                <Private>
                  <DciDetails />
                </Private>
              }
            />
            <Route
              path="/dci/edit/:id"
              element={
                <Private>
                  <DciEdit />
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
              path="/principioAtivo/create"
              element={
                <Private>
                  <PrincipioAtivoCreate />
                </Private>
              } 
            />
            <Route
              path="/principioAtivo/details/:id"
              element={
                <Private>
                  <PrincipioAtivoDetails />
                </Private>
              } 
            />
            <Route
              path="/principioAtivo/edit/:id"
              element={
                <Private>
                  <PrincipioAtivoEdit />
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
