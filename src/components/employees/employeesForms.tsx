import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";

interface IEmployee {
  nome: string;
  email: string;
  company: string;
  isAdministrador: boolean;
  cpf: string;
  cargo: string;
  senha: string;
}

const positions = [
  {
    id: 1,
    nomeCargo: 'Master',
    descricaoCargo: 'master',
    isAdmPosition: true
  }
]

const schema = yup.object({
  nome: yup.string().required("*Informe o nome completo do funcionario"),
  email: yup.string().required("*Email é obrigatorio"),
  company: yup.string().required("*Company é obriatoria"),
  isAdministrador: yup.boolean(),
  cpf: yup.string().required("*CPF é obrigatorio"),
  cargo: yup.string(),
  senha: yup.string().min(8).max(32).required(),
});

const EmployeesForms = ({ func, data }: any) => {
  const [employee, setEmployee] = useState({
    nome: data ? data.nome : "",
    email: data ? data.email : "",
    company: data ? data.company : "",
    isAdministrador: data ? data.isAdministrador : false,
    isActive: data ? data.isActive : false,
    cpf: data ? data.cpf : "",
    cargo: data ? data.cargo : "",
    senha: data ? data.senha : "",
  });

  const handleChange = (event: any) => {
    if (typeof (event) === 'string') {
      employee.cargo = event;
      console.log(employee)
    } else {
      setEmployee(event.target.value);
    }

  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (data: any) => {
    console.log({ data });
    reset();
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{func}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-file-person"></i>
            </span>
            <input
              className="form-control"
              {...register("nome")}
              placeholder="nome completo"
              type="text"
              onChange={handleChange}
              value={employee.nome}
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              className="form-control"
              {...register("email")}
              placeholder="email"
              type="email"
              onChange={handleChange}
              value={employee.email}
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-building"></i>
            </span>
            <input
              className="form-control"
              {...register("company")}
              placeholder="empresa"
              type="text"
              onChange={handleChange}
              value={employee.company}
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-file-person"></i>
            </span>
            <input
              className="form-control"
              {...register("cpf")}
              placeholder="cpf"
              type="text"
              onChange={handleChange}
              value={employee.cpf}
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-archive"></i>
            </span>
            <DropdownButton
              title="Cargos"
              id="dropdown-menu-align-right"
              onSelect={handleChange}
              variant="secondary"
            >
              {
                positions.map(pos => {
                  return (
                    <Dropdown.Item key={pos.id} eventKey={pos.id} value={pos}>{pos.nomeCargo}</Dropdown.Item>
                  )
                })
              }
            </DropdownButton>

          </div>
          {func === "NOVO USUARIO" ? (
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-lock"></i>
              </span>
              <input
                {...register("senha")}
                placeholder="senha"
                className="form-control"
                type="password"
                onChange={handleChange}
                value={employee.senha}
                required
              />{" "}
            </div>
          ) : null}
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                {...register("isAdministrador")}
                className="form-check-input mt-0"
                type="checkbox"
                onChange={handleChange}
                checked={employee.isAdministrador}
                aria-label="Checkbox for following text input"
              />
            </div>
            <input
              type="text"
              disabled
              className="form-control"
              aria-label="Administrador"
              placeholder="Administrador"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                {...register("isAdministrador")}
                className="form-check-input mt-0"
                type="checkbox"
                onChange={handleChange}
                checked={employee.isActive}
                aria-label="Checkbox for following text input"
              />
            </div>
            <input
              type="text"
              disabled
              className="form-control"
              aria-label="Ativo"
              placeholder="Ativo"
            />
          </div>

          {func === "NOVO USUARIO" ? (
            <button type="submit" className="btn btn-success">
              Cadastrar
            </button>
          ) : (
            <button type="submit" className="btn btn-success">
              Salvar
            </button>
          )}
        </form>
      </Modal.Body>
    </>
  );
};

export default EmployeesForms;
