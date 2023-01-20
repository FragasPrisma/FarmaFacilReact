import { TitleMainHeader } from "../HeaderMainContent/styles";
import { CardFavorite, ContainerCard, TitleFavorite } from "./styles";

interface IFavorites {
  display?: boolean;
  objectFavorites: [];
}

export function Favorites({ objectFavorites, display = false }: IFavorites) {
  return (
    <>
      {display ? (
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
