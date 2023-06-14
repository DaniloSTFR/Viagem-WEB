import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  nomeCargo: yup.string().required("*Informe o nome do cargo"),
  descricaoCargo: yup.string(),
  isAdmPosition: yup.boolean(),
});

const PositionsForms = ({ func, data }: any) => {
  const [position, setPosition] = useState({
    nomeCargo: data ? data.nomeCargo : "",
    descricaoCargo: data ? data.descricaoCargo : "",
    isAdmPosition: data ? data.isAdmPosition : false,
  });

  const handleChange = (event: any) => {
    setPosition(event.target.value);
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
              {...register("nomeCargo")}
              placeholder="nome do cargo"
              type="text"
              onChange={handleChange}
              value={position.nomeCargo}
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-file-person"></i>
            </span>
            <input
              className="form-control"
              {...register("descricaoCargo")}
              placeholder="Descrição do cargo"
              type="text"
              onChange={handleChange}
              value={position.descricaoCargo}
              required
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                {...register("isAdministrador")}
                className="form-check-input mt-0"
                type="checkbox"
                onChange={handleChange}
                checked={position.isAdmPosition}
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
          <button type="submit" className="btn btn-success">
            Cadastrar
          </button>
        </form>
      </Modal.Body>
    </>
  );
};

export default PositionsForms;
