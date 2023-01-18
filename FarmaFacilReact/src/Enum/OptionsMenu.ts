import { namesItemsMenu } from "../Pages/namesItemsMenu";

interface IOptionsMenu {
  // texto: string;
  img?: string;
  url?: string;
  disabled?: boolean;
}



export const OptionsMenu = [ { text: namesItemsMenu.map(x => x) } ];


