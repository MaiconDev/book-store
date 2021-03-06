import React, { useState, useEffect } from 'react'
import api from '../../services/products'
import { toastr } from 'react-redux-toastr'
import { Link } from 'react-router-dom';

import { Table, Button } from 'reactstrap'

export default function StudentList() {
  const [list, setList] = useState([]);

  function handleLoadList() {
    api.list().then(result => {
      setList(result)
    })
  }

  async function deleteProduct(product_id) {
    const res = await api.delete(product_id)
    if (res) {
      toastr.success('Sucesso', 'Exclusão realizada com exito!')
    } else {
      toastr.error('Error', `Não foi possivel excluir!`)
    }
  }

  async function handleDelete(product_id) {
    const toastrConfirmOptions = {
      onOk: () => deleteProduct(product_id),
      onCancel: () => { }
    };
    toastr.confirm('Você tem certeza sobre isso?', toastrConfirmOptions);
  }

  useEffect(() => {
    handleLoadList()
  }, []);

  return (
    <>
      <h1>Listar Produtos</h1>
      <Link className="btn-primary btn" to="products/new">Novo</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ativo</th>
            <th>Data de Criação</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.active ? "Sim" : "Não"}</td>
              <td>{item.createdAt}</td>
              <td className='options'>
                <Link to={`/products/edit/${item.id}`} className="btn btn-primary mr-1"><i className="fa fa-edit" /></Link>
                <Button onClick={e => handleDelete(item.id)} className="btn btn-danger"><i className="fa fa-trash-o" /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}