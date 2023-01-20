import Pagination from 'react-bootstrap/Pagination';

const Paginations = () =>{

    function RequestPaginations(number :Number){

    }

    let active = 2;
    let items = [];

    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} >
            {number}
            </Pagination.Item>,
        );
    }

    return(
        <>
            <Pagination>{items}</Pagination>
        </>
    );
}

export default Paginations;



