import { TitleMainHeader } from "../HeaderMainContent/styles";
import { CardFavorite, ContainerCard, TitleFavorite } from "./styles";

interface IFavorites {
  exibir?: boolean;
  objectFavorites: [];
}

export function Favorites({ objectFavorites, exibir = false }: IFavorites) {
  return (
    <>
      {exibir ? (
        <CardFavorite>
          <ContainerCard>
            <img src="" alt="" />
            <TitleFavorite>{objectFavorites}</TitleFavorite>
          </ContainerCard>
        </CardFavorite>
      ) : (
        <TitleMainHeader>Bem-vindo ao FarmaFacil</TitleMainHeader>
      )}
    </>
  );
}
