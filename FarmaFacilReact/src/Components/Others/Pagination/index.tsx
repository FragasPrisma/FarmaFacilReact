import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { ContainerPaginations } from './styles';
interface IPaginations {
    pagina :number;
    qtdPagina :number;
    Reload: (number:number) => void;
}

const Paginations = ({pagina,qtdPagina,Reload} : IPaginations) =>{

    let itens:any[] = [];

    const [paginas,setPaginas] = useState(0);
    const [itensNovos,setItensNovos] = useState(itens);

    let qtdPaginaStatic = qtdPagina;
    var qtdPaginaInicial = 0;
    var qdtPagAtual = 0;

    qtdPagina = qtdPagina > 5 ? 5 : qtdPagina;

    function ReloadPage(number:number){
        setPaginas(number)
        Reload(number);
    };

    useEffect(() =>{

        if(itens){
        
            const paginationArray = () => {  

                if((pagina >= 5 && qtdPaginaStatic > 5)){

                    if((pagina + 2) > qtdPaginaStatic ){
                        qdtPagAtual = qtdPaginaStatic;
                        qtdPaginaInicial = qtdPaginaStatic - 4;
                    }else{
                        qdtPagAtual = pagina + 2;
                        qtdPaginaInicial = pagina - 2;
                    }

                    for (let number = qtdPaginaInicial; number <= qdtPagAtual; number++) {
                        itens.push(
                            <Pagination.Item key={number} active={number === pagina} onClick={() => {ReloadPage(number)}}>
                                {number}
                            </Pagination.Item>
                        );
                    }

                }else{

                    for (let number = 1; number <= qtdPagina; number++) {
                        itens.push(
                            <Pagination.Item key={number} active={number === pagina} onClick={() => {ReloadPage(number)}}>
                                {number}
                            </Pagination.Item>
                        );
                    }
                }

                if(qtdPaginaStatic > 5){
                    itens.push(<Pagination.Last className='EllipsisBackGroud' onClick={() => {ReloadPage(qtdPaginaStatic)}} />)
                    itens.unshift(<Pagination.First className='EllipsisBackGroud' onClick={() => {ReloadPage(1)}} />)
                }

                setItensNovos(itens)

            };
    
            paginationArray();
        }


    },[pagina,qtdPagina])

    return(
        <ContainerPaginations>
            {itensNovos ? itensNovos.map((item, index) =>(<Pagination key={index}>{item}</Pagination>)) : <></>}
        </ContainerPaginations>
    );
}

export default Paginations;



