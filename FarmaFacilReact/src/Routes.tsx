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
import { LaboratorioCreate } from "./Pages/Laboratorio/LaboratorioCreate";
import { LaboratorioDetails } from "./Pages/Laboratorio/LaboratorioDetails";
import { LaboratorioEdit } from "./Pages/Laboratorio/LaboratorioEdit";
import { Login } from "./Pages/Login";
import { Nbm } from "./Pages/Nbm";
import { NbmCreate } from "./Pages/Nbm/NbmCreate";
import { NbmDetails } from "./Pages/Nbm/NbmDetails";
import { NbmEdit } from "./Pages/Nbm/NbmEdit";
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
import { FornecedorEdit } from "./Pages/Fornecedor/FornecedorEdit";
import { FornecedorDetails } from "./Pages/Fornecedor/FornecedorDetails";
import { Especialidade } from "./Pages/Especialidade";
import { EspecialidadeCreate } from "./Pages/Especialidade/EspecialidadeCreate";
import { EspecialidadeDetails } from "./Pages/Especialidade/EspecialidadeDetails";
import { EspecialidadeEdit } from "./Pages/Especialidade/EspecialidadeEdit";
import { TipoContato } from "./Pages/TipoContato";
import { TipoContatoCreate } from "./Pages/TipoContato/TipoContatoCreate";
import { TipoContatoDetails } from "./Pages/TipoContato/TipoContatoDetails";
import { TipoContatoEdit } from "./Pages/TipoContato/TipoContatoEdit";
import { TipoJustificativa } from "./Pages/TipoJustificativa";
import { TipoJustificativaCreate } from "./Pages/TipoJustificativa/TipoJustificativaCreate";
import { TipoJustificativaDetails } from "./Pages/TipoJustificativa/TipoJustificativaDetails";
import { TipoJustificativaEdit } from "./Pages/TipoJustificativa/TipoJustificativaEdit";
import { Cidade } from "./Pages/Cidade";
import { CidadeCreate } from "./Pages/Cidade/CidadeCreate";
import { CidadeEdit } from "./Pages/Cidade/CidadeEdit";
import { CidadeDetails } from "./Pages/Cidade/CidadeDetails";
import { Farmacopeia } from "./Pages/Farmacopeia";
import { FarmacopeiaCreate } from "./Pages/Farmacopeia/FarmacopeiaCreate";
import { FarmacopeiaEdit } from "./Pages/Farmacopeia/FarmacopeiaEdit";
import { FarmacopeiaDetails } from "./Pages/Farmacopeia/FarmacopeiaDetails";
import { Ensaio } from "./Pages/Ensaio";
import { EnsaioCreate } from "./Pages/Ensaio/EnsaioCreate";
import { EnsaioEdit } from "./Pages/Ensaio/EnsaioEdit";
import { EnsaioDetails } from "./Pages/Ensaio/EnsaioDetails";
import { EspecificacaoCapsula } from "./Pages/EspecificacaoCapsula.tsx";
import { EspecificacaoCreate } from "./Pages/EspecificacaoCapsula.tsx/EspecificacaoCreate";
import { EspecificacaoEdit } from "./Pages/EspecificacaoCapsula.tsx/EspecificacaoEdit";
import { EspecificacaoDetails } from "./Pages/EspecificacaoCapsula.tsx/EspecificacaoDetails";
import { PosAdquirente } from "./Pages/PosAdquirente";
import { PosAdquirenteCreate } from "./Pages/PosAdquirente/PosAdquirenteCreate";
import { PosAdquirenteEdit } from "./Pages/PosAdquirente/PosAdquirenteEdit";
import { PosAdquirenteDetails } from "./Pages/PosAdquirente/PosAdquirenteDetails";
import { AdministradoraDeCartao } from "./Pages/AdministradoCartao";
import { Posologia } from "./Pages/Posologia";
import { PosologiaCreate } from "./Pages/Posologia/PosologiaCreate";
import { PosologiaDetails } from "./Pages/Posologia/PosologiaDetails";
import { PosologiaEdit } from "./Pages/Posologia/PosologiaEdit";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdministradoraCartaoCreate } from "./Pages/AdministradoCartao/AdministradoraCartaoCreate";
import { AdministradoraCartaoEdit } from "./Pages/AdministradoCartao/AdministradoraCartaoEdit";
import { AdministradoraCartaoDetails } from "./Pages/AdministradoCartao/AdministradoraCartaoDetails";
import { Motivo } from "./Pages/Motivo";
import { MotivoCreate } from "./Pages/Motivo/MotivoCreate";
import { MotivoEdit } from "./Pages/Motivo/MotivoEdit";
import { MotivoDetails } from "./Pages/Motivo/MotivoDetails";
import { Pais } from "./Pages/Pais";
import { PaisCreate } from "./Pages/Pais/PaisCreate";
import { PaisEdit } from "./Pages/Pais/PaisEdit";
import { PaisDetails } from "./Pages/Pais/PaisDetails";

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
              path="/administradoracartao"
              element={
                <Private>
                  <AdministradoraDeCartao />
                </Private>
              }
            />

            <Route
              path="/administradoracartao/create"
              element={
                <Private>
                  <AdministradoraCartaoCreate />
                </Private>
              }
            />

            <Route
              path="/administradoracartao/edit/:id"
              element={
                <Private>
                  <AdministradoraCartaoEdit />
                </Private>
              }
            />

            <Route
              path="/administradoracartao/details/:id"
              element={
                <Private>
                  <AdministradoraCartaoDetails />
                </Private>
              }
            />

            <Route
              path="/cidade"
              element={
                <Private>
                  <Cidade />{" "}
                </Private>
              }
            />

            <Route
              path="/cidade/edit/:id"
              element={
                <Private>
                  <CidadeEdit />{" "}
                </Private>
              }
            />

            <Route
              path="/cidade/details/:id"
              element={
                <Private>
                  <CidadeDetails />{" "}
                </Private>
              }
            />

            <Route
              path="/cidade/create"
              element={
                <Private>
                  <CidadeCreate />{" "}
                </Private>
              }
            />

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
                  <BairroCreate />
                </Private>
              }
            />
            <Route
              path="/bairro/details/:id"
              element={
                <Private>
                  <BairroDetails />
                </Private>
              }
            />
            <Route
              path="/bairro/edit/:id"
              element={
                <Private>
                  <BairroEdit />
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
                  <ClasseEdit />
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
              path="/fornecedor/edit/:id"
              element={
                <Private>
                  <FornecedorEdit />
                </Private>
              }
            />
            <Route
              path="/fornecedor/details/:id"
              element={
                <Private>
                  <FornecedorDetails />
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
              path="/laboratorio/create"
              element={
                <Private>
                  <LaboratorioCreate />
                </Private>
              }
            />
            <Route
              path="/laboratorio/details/:id"
              element={
                <Private>
                  <LaboratorioDetails />
                </Private>
              }
            />
            <Route
              path="/laboratorio/edit/:id"
              element={
                <Private>
                  <LaboratorioEdit />
                </Private>
              }
            />

            <Route
              path="/motivo"
              element={
                <Private>
                  <Motivo />
                </Private>
              }
            />

            <Route
              path="/motivo/create"
              element={
                <Private>
                  <MotivoCreate />
                </Private>
              }
            />

            <Route
              path="/motivo/edit/:id"
              element={
                <Private>
                  <MotivoEdit />
                </Private>
              }
            />

            <Route
              path="/motivo/details/:id"
              element={
                <Private>
                  <MotivoDetails />
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
              path="/nbm/create"
              element={
                <Private>
                  <NbmCreate />
                </Private>
              }
            />
            <Route
              path="/nbm/details/:id"
              element={
                <Private>
                  <NbmDetails />
                </Private>
              }
            />
            <Route
              path="/nbm/edit/:id"
              element={
                <Private>
                  <NbmEdit />
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
              path="/farmacopeia"
              element={
                <Private>
                  <Farmacopeia />
                </Private>
              }
            />

            <Route
              path="/farmacopeia/create"
              element={
                <Private>
                  <FarmacopeiaCreate />
                </Private>
              }
            />

            <Route
              path="/farmacopeia/edit/:id"
              element={
                <Private>
                  <FarmacopeiaEdit />
                </Private>
              }
            />

            <Route
              path="/farmacopeia/details/:id"
              element={
                <Private>
                  <FarmacopeiaDetails />
                </Private>
              }
            />

            <Route
              path="/ensaio"
              element={
                <Private>
                  <Ensaio />
                </Private>
              }
            />
            <Route
              path="/ensaio/create"
              element={
                <Private>
                  <EnsaioCreate />
                </Private>
              }
            />

            <Route
              path="/ensaio/edit/:id"
              element={
                <Private>
                  <EnsaioEdit />
                </Private>
              }
            />

            <Route
              path="/ensaio/details/:id"
              element={
                <Private>
                  <EnsaioDetails />
                </Private>
              }
            />

            <Route
              path="/especificacaocapsula"
              element={
                <Private>
                  <EspecificacaoCapsula />
                </Private>
              }
            />

            <Route
              path="/especificacaocapsula/create"
              element={
                <Private>
                  <EspecificacaoCreate />
                </Private>
              }
            />

            <Route
              path="/especificacaocapsula/edit/:id"
              element={
                <Private>
                  <EspecificacaoEdit />
                </Private>
              }
            />

            <Route
              path="/especificacaocapsula/details/:id"
              element={
                <Private>
                  <EspecificacaoDetails />
                </Private>
              }
            />

            <Route
              path="/posadquirente"
              element={
                <Private>
                  <PosAdquirente />
                </Private>
              }
            />

            <Route
              path="/posadquirente/create"
              element={
                <Private>
                  <PosAdquirenteCreate />
                </Private>
              }
            />

            <Route
              path="/posadquirente/edit/:id"
              element={
                <Private>
                  <PosAdquirenteEdit />
                </Private>
              }
            />

            <Route
              path="/posadquirente/details/:id"
              element={
                <Private>
                  <PosAdquirenteDetails />
                </Private>
              }
            />

            <Route
              path="/pais"
              element={
                <Private>
                  <Pais />
                </Private>
              }
            />

            <Route
              path="/pais/create"
              element={
                <Private>
                  <PaisCreate />
                </Private>
              }
            />

            <Route
              path="/pais/edit/:id"
              element={
                <Private>
                  <PaisEdit />
                </Private>
              }
            />
            <Route
              path="/pais/details/:id"
              element={
                <Private>
                  <PaisDetails />
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
                  <PbmDetails />
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
            <Route
              path="/especialidade"
              element={
                <Private>
                  <Especialidade />
                </Private>
              }
            />
            <Route
              path="/especialidade/create"
              element={
                <Private>
                  <EspecialidadeCreate />
                </Private>
              }
            />
            <Route
              path="/especialidade/details/:id"
              element={
                <Private>
                  <EspecialidadeDetails />
                </Private>
              }
            />
            <Route
              path="/especialidade/edit/:id"
              element={
                <Private>
                  <EspecialidadeEdit />
                </Private>
              }
            />
            <Route
              path="/tipoContato"
              element={
                <Private>
                  <TipoContato />
                </Private>
              }
            />
            <Route
              path="/tipoContato/create"
              element={
                <Private>
                  <TipoContatoCreate />
                </Private>
              }
            />
            <Route
              path="/tipoContato/details/:id"
              element={
                <Private>
                  <TipoContatoDetails />
                </Private>
              }
            />
            <Route
              path="/tipoContato/edit/:id"
              element={
                <Private>
                  <TipoContatoEdit />
                </Private>
              }
            />
            <Route
              path="/tipoJustificativa"
              element={
                <Private>
                  <TipoJustificativa />
                </Private>
              }
            />
            <Route
              path="/tipoJustificativa/create"
              element={
                <Private>
                  <TipoJustificativaCreate />
                </Private>
              }
            />
            <Route
              path="/tipoJustificativa/details/:id"
              element={
                <Private>
                  <TipoJustificativaDetails />
                </Private>
              }
            />
            <Route
              path="/tipoJustificativa/edit/:id"
              element={
                <Private>
                  <TipoJustificativaEdit />
                </Private>
              }
            />
            <Route
              path="/posologia"
              element={
                <Private>
                  <Posologia />
                </Private>
              }
            />
            <Route
              path="/posologia/create"
              element={
                <Private>
                  <PosologiaCreate />
                </Private>
              }
            />
            <Route
              path="/posologia/details/:id"
              element={
                <Private>
                  <PosologiaDetails />
                </Private>
              }
            />
            <Route
              path="/posologia/edit/:id"
              element={
                <Private>
                  <PosologiaEdit />
                </Private>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
