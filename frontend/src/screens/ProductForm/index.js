import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'reactstrap'
import { toastr } from 'react-redux-toastr'
import { Link } from 'react-router-dom';

import InputLabel from '../../components/InputLabel'
import api from '../../services/products'

export default function StudentList(props) {
  

  const [id, setId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    image: null,
    active: true
  });

  useEffect(() => {
    const id = props.match.params.id;
    if (!!id) {
      setId(id);
      api.get(id).then(response => {
        setForm({ ...response })
      })
        .catch(err => {
          toastr.error('Error', `${err}`)
          props.history.push('/products')
        })
    }
  }, [props]);


  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value
    });
  }

  function handleCheckBoxChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    setForm({
      ...form,
      [name]: value
    });
  }

  function handleFileChange(event) {
    const target = event.target;
    const value = target.files[0];
    const name = target.name;

    setForm({
      ...form,
      [name]: value
    });
  }

  async function handleSave(event) {
    event.preventDefault() // Stop form submit

    await api.save(form, id)
      .then(resp => {
        toastr.success('Sucesso', 'Operação Realizada com sucesso.')
        props.history.push('/products')
      })
      .catch(err => {
        toastr.error('Error', `${err}`)
      })
  }

  return (
    <>
      <h1>Cadastrar Produto</h1>
      <Row>
        <Form className="col-sm-12 col-lg-6">
          <Row>
            <Col>
              <InputLabel label="Nome" name="name" type="text" placeholder="Informe o nome do produto" value={form.name} onChange={handleInputChange} />
            </Col>
            <Col>
              <InputLabel label="Preço" name="price" type="number" placeholder="Informe o valor do produto" value={form.price} onChange={handleInputChange} />
            </Col>
          </Row>

          <Row>
            <Col >
              <InputLabel label="Descrição" name="description" type="textarea" placeholder="Informe a descrição do produto" value={form.description} onChange={handleInputChange} />
            </Col >
          </Row>

          <Row>
            <Col >
              <InputLabel label="Foto de Capa" name="image" type="file" value={form.image} onChange={handleFileChange} />
            </Col >
          </Row>

          <Row>
            <Col >
              <InputLabel label="Ativo" name="active" type="switch" value={form.active} onChange={handleCheckBoxChange} />
            </Col >
          </Row>

          <Link className="default btn" to="/products">
            Cancelar
                  </Link>

          <Button variant="primary" onClick={handleSave}>
            Salvar
                  </Button>
        </Form>
      </Row>
    </>
  )
}