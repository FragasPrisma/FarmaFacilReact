import Pagination from 'react-bootstrap/Pagination';
import { ContainerPaginations } from './styles';

interface IPaginations {
    pagina :number;
    qtdPagina :number;
    Reload: (number:number) => void
}

//Teste 

const Paginations = ({pagina,qtdPagina,Reload} : IPaginations) =>{

    let items = [];

    function ReloadPage(number:number){
        Reload(number);
    }

    for (let number = 1; number <= qtdPagina; number++) {
      items.push(
          <Pagination.Item key={number} active={number === pagina} onClick={() => {ReloadPage(number)}}>
              {number}
          </Pagination.Item>
      );
    }

    return(
        
        <ContainerPaginations>
            {qtdPagina >= 1 ? 
            <Pagination>{items}</Pagination> : <></>}
        </ContainerPaginations>
        
    );
}

export default Paginations;



