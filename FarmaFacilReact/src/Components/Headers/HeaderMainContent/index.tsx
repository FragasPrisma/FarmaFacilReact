import { ButtonReturn } from "../../Buttons/ButtonReturn";
import { ButtonIncluir } from "../../Buttons/ButtonIncluir";
import { ContainerHeaderMain, TitleMainHeader, SwitchCustom } from "./styles";
import { ChangeEvent } from 'react'

interface IOptions {
    title: string
    IncludeButton: boolean
    ReturnButton: boolean
    to?: string
    ButtonName?: string
    IncludeSwitch?: boolean
    TextSwitch?: string
    onClick?: (check: boolean) => void
}

// .Check 

export function HeaderMainContent({ title, IncludeButton, ReturnButton, to, ButtonName, IncludeSwitch, TextSwitch, onClick }: IOptions) {

    function OnChecked(check: boolean) {
        if (onClick) {
            onClick(check)
        }
    }

    return (
        <ContainerHeaderMain>
            <TitleMainHeader>{title}</TitleMainHeader>
            {IncludeSwitch &&

                <SwitchCustom>
                    <SwitchCustom.Check
                        type="switch"
                        id="1"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => OnChecked(e.target.checked)}

                    />
                </SwitchCustom>
            }
            {IncludeButton &&
                <ButtonIncluir />
            }
            {ReturnButton &&
                <ButtonReturn to={to} text={ButtonName} />
            }

        </ContainerHeaderMain>
    )
}