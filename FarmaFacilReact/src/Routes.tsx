import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import { NcmCreate } from "./Pages/Ncm/NcmCreate/NcmCreate";
import { NcmDetails } from "./Pages/Ncm/NcmDetails/NcmDetails"; 
import { NcmEdit } from "./Pages/Ncm/NcmEdit/NcmEdit"; 
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
import { FornecedorCreate } from "./Pages/Fornecedor/FornecedorCreate/FornecedorCreate";
import { FornecedorEdit } from "./Pages/Fornecedor/FornecedorEdit/FornecedorEdit";
import { FornecedorDetails } from "./Pages/Fornecedor/FornecedorDetails/FornecedorDetails";
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
import { FuncionarioLaboratorio } from "./Pages/FuncionarioLaboratorio";
import { FuncionarioLaboratorioCreate } from "./Pages/FuncionarioLaboratorio/FuncionarioLaboratorioCreate";
import { FuncionarioLaboratorioEdit } from "./Pages/FuncionarioLaboratorio/FuncionarioLaboratorioEdit";
import { FuncionarioLaboratorioDetails } from "./Pages/FuncionarioLaboratorio/FuncionarioLaboratorioDetails";
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
import { Tributo } from "./Pages/Tributo";
import { TributoCreate } from "./Pages/Tributo/TributoCreate";
import { TributoEdit } from "./Pages/Tributo/TributoEdit";
import { TributoDetails } from "./Pages/Tributo/TributoDetails";
import { EtapaCreate } from "./Pages/Etapa/EtapaCreate";
import { EtapaDetails } from "./Pages/Etapa/EtapaDetails";
import { EtapaEdit } from "./Pages/Etapa/EtapaEdit";
import { Etapa } from "./Pages/Etapa";
import { Portador } from "./Pages/Portador";
import { PortadorCreate } from "./Pages/Portador/PortadorCreate";
import { PortadorEdit } from "./Pages/Portador/PortadorEdit";
import { PortadorDetails } from "./Pages/Portador/PortadorDetails";
import { ContaCorrente } from "./Pages/ContaCorrente";
import { ContaCorrenteCreate } from "./Pages/ContaCorrente/ContaCorrenteCreate";
import { ContaCorrenteEdit } from "./Pages/ContaCorrente/ContaCorrenteEdit";
import { ContaCorrenteDetails } from "./Pages/ContaCorrente/ContaCorrenteDetails";
import { MensagemPadrao } from "./Pages/MensagemPadrao";
import { MensagemPadraoCreate } from "./Pages/MensagemPadrao/MensagemPadraoCreate";
import { MensagemPadraoEdit } from "./Pages/MensagemPadrao/MensagemPadraoEdit";
import { MensagemPadraoDetials } from "./Pages/MensagemPadrao/MensagemPadraoDetails";
import { Bula } from "./Pages/Bula";
import { BulaCreate } from "./Pages/Bula/BulaCreate";
import { BulaEdit } from "./Pages/Bula/BulaEdit";
import { BulaDetails } from "./Pages/Bula/BulaDetails";
import { Metodo } from "./Pages/Metodo";
import { MetodoCreate } from "./Pages/Metodo/MetodoCreate";
import { MetodoEdit } from "./Pages/Metodo/MetodoEdit";
import { MetodoDetails } from "./Pages/Metodo/MetodoDetails";
import { FormaDepagamento } from "./Pages/FormaPagamento";
import { MaquinaPos } from "./Pages/MaquinaPos";
import { MaquinaPosCreate } from './Pages/MaquinaPos/MaquinaPosCreate';
import { MaquinaPosDetails } from './Pages/MaquinaPos/MaquinaPosDetails';
import { MaquinaPosEdit } from './Pages/MaquinaPos/MaquinaPosEdit';
import { FormaPagamentoCreate } from "./Pages/FormaPagamento/FormaPagamentoCreate";
import { FormaPagamentoEdit } from "./Pages/FormaPagamento/FormaPagamentoEdit";
import { FormaPagamentoDetails } from "./Pages/FormaPagamento/FormaPagamentoDetails";
import { Transportador } from "./Pages/Transportador";
import { TransportadorCreate } from "./Pages/Transportador/TransportadorCreate";
import { BancoEdit } from "./Pages/Banco/BancoEdit";
import { Turno } from "./Pages/Turno";
import { TurnoCreate } from "./Pages/Turno/TurnoCreate";
import { TurnoDetails } from "./Pages/Turno/TurnoDetails";
import { TurnoEdit } from "./Pages/Turno/TurnoEdit";
import { BancoDetails } from "./Pages/Banco/BancoDetails";
import { BancoCreate } from "./Pages/Banco/BancoCreate";
import { Banco } from "./Pages/Banco";
import { TransportadorEdit } from "./Pages/Transportador/TransportadorEdit";
import { TransportadorDetails } from "./Pages/Transportador/TransportadorDetails";
import { NaturezaDeOperecao } from "./Pages/NaturezaOperacao";
import { NaturezaOperacaoCreate } from "./Pages/NaturezaOperacao/NaturezaOperacaoCreate";
import { NaturezaOperacaoEdit } from "./Pages/NaturezaOperacao/NaturezaOperacaoEdit";
import { NaturezaOperacaoDetails } from "./Pages/NaturezaOperacao/NaturezaOperacaoDetails";
import { Visitador } from "./Pages/Visitador";
import { VisitadorCreate } from "./Pages/Visitador/VisitadorCreate";
import { VisitadorDetails } from "./Pages/Visitador/VisitadorDetails";
import { VisitadorEdit } from "./Pages/Visitador/VisitadorEdit";
import { Contabilista } from "./Pages/Contabilista";
import { ContabilistaCreate } from "./Pages/Contabilista/ContabilistaCreate";
import { ContabilistaEdit } from "./Pages/Contabilista/ContabilistaEdit";
import { ContabilistaDetails } from "./Pages/Contabilista/ContabilistaDetails";
import { Categoria } from "./Pages/Categoria";
import { CategoriaCreate } from "./Pages/Categoria/CategoriaCreate";
import { CategoriaEdit } from "./Pages/Categoria/CategoriaEdit";
import { CategoriaDetails } from "./Pages/Categoria/CategoriaDetails";
import { Estado } from "./Pages/Estado";
import { EstadoCreate } from "./Pages/Estado/EstadoCreate";
import { EstadoEdit } from "./Pages/Estado/EstadoEdit";
import { EstadoDetails } from "./Pages/Estado/EstadoDetails";
import { ListaControlado } from "./Pages/ListaControlado";
import { ListaControladoCreate } from "./Pages/ListaControlado/ListaControladoCreate";
import { ListaControladoEdit } from "./Pages/ListaControlado/ListaControladoEdit";
import { ListaControladoDetails } from "./Pages/ListaControlado/ListaControladoDetails";
import { Banner } from "./Pages/Banner";
import { BannerCreate } from "./Pages/Banner/BannerCreate";
import { BannerEdit } from "./Pages/Banner/BannerEdit";
import { BannerDetails } from "./Pages/Banner/BannerDetails";
import { Unidade } from "./Pages/Unidade";
import { UnidadeCreate } from "./Pages/Unidade/UnidadeCreate";
import { UnidadeEdit } from "./Pages/Unidade/UnidadeEdit";
import { UnidadeDetails } from "./Pages/Unidade/UnidadeDetails";
import { Prescritor } from "./Pages/Prescritor";
import { PrescritorCreate } from "./Pages/Prescritor/PrescritorCreate/PrescritorCreate";
import { PrescritorEdit } from "./Pages/Prescritor/PrescritorEdit/PrescritorEdit";
import { PrescritorDetails } from "./Pages/Prescritor/PrescritorDetails/PrescritorDetails";
import { TabelaFloral } from "./Pages/TabelaFloral";
import { TabelaFloralCreate } from "./Pages/TabelaFloral/TabelaFloralCreate";
import { TabelaFloralEdit } from "./Pages/TabelaFloral/TabelaFloralEdit";
import { TabelaFloralDetails } from "./Pages/TabelaFloral/TabelaFloralDetails";
import { GrupoCreate } from "./Pages/Grupo/GrupoCreate/GrupoCreate";
import { GrupoEdit } from "./Pages/Grupo/GrupoEdit/GrupoEdit";
import { GrupoDetails } from "./Pages/Grupo/GrupoDetails/GrupoDetails";
import { Convenio } from "./Pages/Convenio";
import { ConvenioCreate } from "./Pages/Convenio/ConvenioCreate/ConvenioCreate";
import { ConvenioEdit } from "./Pages/Convenio/ConvenioEdit/ConvenioEdit";
import { ConvenioDetails } from "./Pages/Convenio/ConvenioDetails/ConvenioDetails";
import { FormaFarmaceutica } from "./Pages/FormaFarmaceutica";
import { FormaFarmaceuticaCreate } from "./Pages/FormaFarmaceutica/FormaFarmaceuticaCreate/FormaFarmaceuticaCreate";
import { FormaFarmaceuticaEdit } from "./Pages/FormaFarmaceutica/FormaFarmaceuticaEdit/FormaFarmaceuticaEdit";
import { FormaFarmaceuticaDetails } from "./Pages/FormaFarmaceutica/FormaFarmaceuticaDetails/FormaFarmaceuticaDetails";
import { ContasAPagar } from "./Pages/ContasAPagar";
import { RelatorioContasPagas } from "./Pages/RelatorioContasPagas";
import { RelatorioContasAPagar } from "./Pages/RelatorioContasAPagar";
import { ContasAPagarCreate } from "./Pages/ContasAPagar/ContasAPagarCreate";
import { ContasAPagarEdit } from "./Pages/ContasAPagar/ContasAPagarEdit";
import { ContasAPagarDetails } from "./Pages/ContasAPagar/ContasAPagarDetails";
import { ContasAPagarPagar } from "./Pages/ContasAPagar/ContasAPagarPagar";
import { ContasAPagarCancelarPagamento } from "./Pages/ContasAPagar/ContasAPagarCancelarPagamento";
import { ManutencaoCompras } from "./Pages/Compras";

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
              path="/administradoradecartao"
              element={
                <Private>
                  <AdministradoraDeCartao />
                </Private>
              }
            />

            <Route
              path="/administradoradecartao/create"
              element={
                <Private>
                  <AdministradoraCartaoCreate />
                </Private>
              }
            />

            <Route
              path="/administradoradecartao/edit/:id"
              element={
                <Private>
                  <AdministradoraCartaoEdit />
                </Private>
              }
            />

            <Route
              path="/administradoradecartao/details/:id"
              element={
                <Private>
                  <AdministradoraCartaoDetails />
                </Private>
              }
            />
            <Route
              path="/contasapagar"
              element={
                <Private>
                  <ContasAPagar />{" "}
                </Private>
              }
            />
            <Route
              path="/duplicatascontasapagar/edit/:id"
              element={
                <Private>
                  <ContasAPagarEdit />{" "}
                </Private>
              }
            />
            <Route
              path="/duplicatascontasapagar/details/:id"
              element={
                <Private>
                  <ContasAPagarDetails />{" "}
                </Private>
              }
            />
            <Route
              path="/duplicatascontasapagar/pagar/:id"
              element={
                <Private>
                  <ContasAPagarPagar />{" "}
                </Private>
              }
            />
            <Route
              path="/duplicatascontasapagar/cancelarpagamento/:id"
              element={
                <Private>
                  <ContasAPagarCancelarPagamento />{" "}
                </Private>
              }
            />
            <Route
              path="/contasapagar/create"
              element={
                <Private>
                  <ContasAPagarCreate />{" "}
                </Private>
              }
            />
            <Route
              path="/banner"
              element={
                <Private>
                  <Banner />{" "}
                </Private>
              }
            />
            <Route
              path="/banner/create"
              element={
                <Private>
                  <BannerCreate />{" "}
                </Private>
              }
            />
            <Route
              path="/banner/edit/:id"
              element={
                <Private>
                  <BannerEdit />{" "}
                </Private>
              }
            />
            <Route
              path="/banner/details/:id"
              element={
                <Private>
                  <BannerDetails />{" "}
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
              path="/bula"
              element={
                <Private>
                  <Bula />{" "}
                </Private>
              }
            />
            <Route
              path="/bula/create"
              element={
                <Private>
                  <BulaCreate />{" "}
                </Private>
              }
            />
            <Route
              path="/bula/edit/:id"
              element={
                <Private>
                  <BulaEdit />{" "}
                </Private>
              }
            />
            <Route
              path="/bula/details/:id"
              element={
                <Private>
                  <BulaDetails />{" "}
                </Private>
              }
            />
            <Route
              path="/categoria"
              element={
                <Private>
                  <Categoria />
                </Private>
              }
            />
            <Route
              path="/categoria/create"
              element={
                <Private>
                  <CategoriaCreate />
                </Private>
              }
            />
            <Route
              path="/categoria/edit/:id"
              element={
                <Private>
                  <CategoriaEdit />
                </Private>
              }
            />
            <Route
              path="/categoria/details/:id"
              element={
                <Private>
                  <CategoriaDetails />
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
              path="/contabilista"
              element={
                <Private>
                  <Contabilista />
                </Private>
              }
            />
            <Route
              path="/contabilista/create"
              element={
                <Private>
                  <ContabilistaCreate />
                </Private>
              }
            />
            <Route
              path="/contabilista/edit/:id"
              element={
                <Private>
                  <ContabilistaEdit />
                </Private>
              }
            />
            <Route
              path="/contabilista/details/:id"
              element={
                <Private>
                  <ContabilistaDetails />
                </Private>
              }
            />
            <Route
              path="/formafarmaceutica"
              element={
                <Private>
                  <FormaFarmaceutica />
                </Private>
              }
            />
            <Route
              path="/formafarmaceutica/create"
              element={
                <Private>
                  <FormaFarmaceuticaCreate />
                </Private>
              }
            />
            <Route
              path="/formafarmaceutica/edit/:id"
              element={
                <Private>
                  <FormaFarmaceuticaEdit />
                </Private>
              }
            />
            <Route
              path="/formafarmaceutica/details/:id"
              element={
                <Private>
                  <FormaFarmaceuticaDetails />
                </Private>
              }
            />
            <Route
              path="/convenio"
              element={
                <Private>
                  <Convenio />
                </Private>
              }
            />
            <Route
              path="/convenio/create"
              element={
                <Private>
                  <ConvenioCreate />
                </Private>
              }
            />
            <Route
              path="/convenio/edit/:id"
              element={
                <Private>
                  <ConvenioEdit />
                </Private>
              }
            />
            <Route
              path="/convenio/details/:id"
              element={
                <Private>
                  <ConvenioDetails />
                </Private>
              }
            />
            <Route
              path="/contacorrente"
              element={
                <Private>
                  <ContaCorrente />
                </Private>
              }
            />
            <Route
              path="/contacorrente/create"
              element={
                <Private>
                  <ContaCorrenteCreate />
                </Private>
              }
            />
            <Route
              path="/contacorrente/edit/:id"
              element={
                <Private>
                  <ContaCorrenteEdit />
                </Private>
              }
            />
            <Route
              path="/contacorrente/details/:id"
              element={
                <Private>
                  <ContaCorrenteDetails />
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
              path="/grupo/create"
              element={
                <Private>
                  <GrupoCreate />
                </Private>
              }
            />
            <Route
              path="/grupo/edit/:id"
              element={
                <Private>
                  <GrupoEdit />
                </Private>
              }
            />
            <Route
              path="/grupo/details/:id"
              element={
                <Private>
                  <GrupoDetails />
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
              path="/listacontrolado"
              element={
                <Private>
                  <ListaControlado />
                </Private>
              }
            />
            <Route
              path="/listacontrolado/create"
              element={
                <Private>
                  <ListaControladoCreate />
                </Private>
              }
            />
            <Route
              path="/listacontrolado/edit/:id"
              element={
                <Private>
                  <ListaControladoEdit />
                </Private>
              }
            />
            <Route
              path="/listacontrolado/details/:id"
              element={
                <Private>
                  <ListaControladoDetails />
                </Private>
              }
            />
            <Route
              path="/metodo"
              element={
                <Private>
                  <Metodo />
                </Private>
              }
            />
            <Route
              path="/metodo/create"
              element={
                <Private>
                  <MetodoCreate />
                </Private>
              }
            />
            <Route
              path="/metodo/edit/:id"
              element={
                <Private>
                  <MetodoEdit />
                </Private>
              }
            />
            <Route
              path="/metodo/details/:id"
              element={
                <Private>
                  <MetodoDetails />
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
              path="/mensagenspadrao"
              element={
                <Private>
                  <MensagemPadrao />
                </Private>
              }
            />

            <Route
              path="/mensagenspadrao/create"
              element={
                <Private>
                  <MensagemPadraoCreate />
                </Private>
              }
            />
            <Route
              path="/mensagenspadrao/edit/:id"
              element={
                <Private>
                  <MensagemPadraoEdit />
                </Private>
              }
            />
            <Route
              path="/mensagenspadrao/details/:id"
              element={
                <Private>
                  <MensagemPadraoDetials />
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
              path="/ncm/create"
              element={
                <Private>
                  <NcmCreate />
                </Private>
              }
            />

            <Route
              path="/ncm/edit/:id"
              element={
                <Private>
                  <NcmEdit />
                </Private>
              }
            />

            <Route
              path="/ncm/details/:id"
              element={
                <Private>
                  <NcmDetails />
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
              path="/formadepagamento"
              element={
                <Private>
                  <FormaDepagamento />
                </Private>
              }
            />
            <Route
              path="/formadepagamento/create"
              element={
                <Private>
                  <FormaPagamentoCreate />
                </Private>
              }
            />
            <Route
              path="/formadepagamento/edit/:id"
              element={
                <Private>
                  <FormaPagamentoEdit />
                </Private>
              }
            />
            <Route
              path="/formadepagamento/details/:id"
              element={
                <Private>
                  <FormaPagamentoDetails />
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
              path="/naturezadeoperacao"
              element={
                <Private>
                  <NaturezaDeOperecao />
                </Private>
              }
            />
            <Route
              path="/naturezadeoperacao/create"
              element={
                <Private>
                  <NaturezaOperacaoCreate />
                </Private>
              }
            />

            <Route
              path="/naturezadeoperacao/edit/:id"
              element={
                <Private>
                  <NaturezaOperacaoEdit />
                </Private>
              }
            />
            <Route
              path="/naturezadeoperacao/details/:id"
              element={
                <Private>
                  <NaturezaOperacaoDetails />
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
              path="/portador"
              element={
                <Private>
                  <Portador />
                </Private>
              }
            />
            <Route
              path="/portador/create"
              element={
                <Private>
                  <PortadorCreate />
                </Private>
              }
            />
            <Route
              path="/portador/edit/:id"
              element={
                <Private>
                  <PortadorEdit />
                </Private>
              }
            />
            <Route
              path="/portador/details/:id"
              element={
                <Private>
                  <PortadorDetails />
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
              path="/transportador"
              element={
                <Private>
                  <Transportador />
                </Private>
              }
            />
            <Route
              path="/transportador/create"
              element={
                <Private>
                  <TransportadorCreate />
                </Private>
              }
            />
            <Route
              path="/transportador/edit/:id"
              element={
                <Private>
                  <TransportadorEdit />
                </Private>
              }
            />
            <Route
              path="/transportador/details/:id"
              element={
                <Private>
                  <TransportadorDetails />
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
              path="/tributo"
              element={
                <Private>
                  <Tributo />
                </Private>
              }
            />
            <Route
              path="/tributo/create"
              element={
                <Private>
                  <TributoCreate />
                </Private>
              }
            />

            <Route
              path="/tributo/edit/:id"
              element={
                <Private>
                  <TributoEdit />
                </Private>
              }
            />

            <Route
              path="/tributo/details/:id"
              element={
                <Private>
                  <TributoDetails />
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
              path="/maquinapos"
              element={
                <Private>
                  <MaquinaPos />
                </Private>
              }
            />
            <Route
              path="/maquinapos/create"
              element={
                <Private>
                  <MaquinaPosCreate />
                </Private>
              }
            />
            <Route
              path="/maquinapos/details/:id"
              element={
                <Private>
                  <MaquinaPosDetails />
                </Private>
              }
            />
            <Route
              path="/maquinapos/edit/:id"
              element={
                <Private>
                  <MaquinaPosEdit />
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
            <Route
              path="/funcionarioLaboratorio"
              element={
                <Private>
                  <FuncionarioLaboratorio />
                </Private>
              }
            />
            <Route
              path="/funcionarioLaboratorio/create"
              element={
                <Private>
                  <FuncionarioLaboratorioCreate />
                </Private>
              }
            />
            <Route
              path="/funcionarioLaboratorio/details/:id"
              element={
                <Private>
                  <FuncionarioLaboratorioDetails />
                </Private>
              }
            />
            <Route
              path="/funcionarioLaboratorio/edit/:id"
              element={
                <Private>
                  <FuncionarioLaboratorioEdit />
                </Private>
              }
            />
            <Route
              path="/etapa"
              element={
                <Private>
                  <Etapa />
                </Private>
              }
            />
            <Route
              path="/etapa/create"
              element={
                <Private>
                  <EtapaCreate />
                </Private>
              }
            />
            <Route
              path="/etapa/details/:id"
              element={
                <Private>
                  <EtapaDetails />
                </Private>
              }
            />
            <Route
              path="/etapa/edit/:id"
              element={
                <Private>
                  <EtapaEdit />
                </Private>
              }
            />
            <Route
              path="/unidade"
              element={
                <Private>
                  <Unidade />
                </Private>
              }
            />
            <Route
              path="/unidade/create"
              element={
                <Private>
                  <UnidadeCreate />
                </Private>
              }
            />
            <Route
              path="/unidade/edit/:id"
              element={
                <Private>
                  <UnidadeEdit />
                </Private>
              }
            />
            <Route
              path="/unidade/details/:id"
              element={
                <Private>
                  <UnidadeDetails />
                </Private>
              }
            />
            <Route
              path="/banco"
              element={
                <Private>
                  <Banco />
                </Private>
              }
            />
            <Route
              path="/banco/create"
              element={
                <Private>
                  <BancoCreate />
                </Private>
              }
            />
            <Route
              path="/banco/details/:id"
              element={
                <Private>
                  <BancoDetails />
                </Private>
              }
            />
            <Route
              path="/banco/edit/:id"
              element={
                <Private>
                  <BancoEdit />
                </Private>
              }
            />
            <Route 
              path="/turno"
              element={
                <Private>
                  <Turno />
                </Private>
              }
            />
            <Route 
              path="/turno/create"
              element={
                <Private>
                  <TurnoCreate />
                </Private>
              }
            />
            <Route 
              path="/turno/details/:id"
              element={
                <Private>
                  <TurnoDetails />
                </Private>
              }
            />
            <Route 
              path="/turno/edit/:id"
              element={
                <Private>
                  <TurnoEdit />
                </Private>
              }
            />
            <Route 
              path="/visitador"
              element={
                <Private>
                  <Visitador />
                </Private>
              }
            />
            <Route 
              path="/visitador/create"
              element={
                <Private>
                  <VisitadorCreate />
                </Private>
              }
            />
            <Route 
              path="/visitador/details/:id"
              element={
                <Private>
                  <VisitadorDetails />
                </Private>
              }
            />
            <Route 
              path="/visitador/edit/:id"
              element={
                <Private>
                  <VisitadorEdit />
                </Private>
              }
            />
            <Route 
              path="/prescritor"
              element={
                <Private>
                  <Prescritor />
                </Private>
              }
            />
            <Route 
              path="/tabelafloral"
              element={
                <Private>
                  <TabelaFloral />
                </Private>
              }
            />
            <Route 
              path="/tabelafloral/create"
              element={
                <Private>
                  <TabelaFloralCreate />
                </Private>
              }
            />
            <Route 
              path="/tabelafloral/edit/:id"
              element={
                <Private>
                  <TabelaFloralEdit />
                </Private>
              }
            />
            <Route 
              path="/tabelafloral/details/:id"
              element={
                <Private>
                  <TabelaFloralDetails />
                </Private>
              }
            />
            <Route 
              path="/prescritor/create"
              element={
                <Private>
                  <PrescritorCreate />
                </Private>
              }
            />
            <Route 
              path="/prescritor/edit/:id"
              element={
                <Private>
                  <PrescritorEdit />
                </Private>
              }
            />
            <Route 
              path="/prescritor/details/:id"
              element={
                <Private>
                  <PrescritorDetails />
                </Private>
              }
            />
            <Route 
              path="/estado"
              element={
                <Private>
                  <Estado />
                </Private>
              }
            />
            <Route 
              path="/estado/create"
              element={
                <Private>
                  <EstadoCreate />
                </Private>
              }
            />
            <Route 
              path="/estado/details/:id"
              element={
                <Private>
                  <EstadoDetails />
                </Private>
              }
            />
            <Route 
              path="/estado/edit/:id"
              element={
                <Private>
                  <EstadoEdit />
                </Private>
              }
            />
            <Route
              path="/contaspagas"
              element={
                <Private>
                  <RelatorioContasPagas />
                </Private>
              }
            />
            <Route
              path="/contaspagar"
              element={
                <Private>
                  <RelatorioContasAPagar />
                </Private>
              }
            />
            <Route 
              path="/compras"
              element={
                <Private>
                  <ManutencaoCompras />
                </Private>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
