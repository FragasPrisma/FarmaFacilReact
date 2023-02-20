import React from 'react';

export const PlanoContas001 = ({data}) => {
    const renderChildren = children => {
        return children.map(item => (
        <ul key={item.numeroConta}>
        <li>{item.descricao}</li>
        {item.children.length > 0 && renderChildren(item.children)}
      </ul>
    ));
  };
  
  const getChildren = numeroContaPai => {
      return data.filter(item => item.numeroContaPai === numeroContaPai);
    };
    
    const renderData = data => {
        return data.map(item => (
      <ul key={item.numeroConta}>
        <li>{item.descricao}</li>
        {item.children.length === 0 && (item.children = getChildren(item.numeroConta))}
        {item.children.length > 0 && renderChildren(item.children)}
      </ul>
    ));
  };

  return <div>{renderData(data)}</div>;
};
