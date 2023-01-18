import { optionsMenu } from "../Pages/exportNames";

interface IOptionsMenu {
  // texto: string;
  img?: string;
  url?: string;
  disabled?: boolean;
}

export const OptionsMenu = [ { text: optionsMenu.map(x => x) } ];