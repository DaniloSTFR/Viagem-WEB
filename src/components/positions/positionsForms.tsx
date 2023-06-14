import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { PositionsServices } from "../../services/PositionsServices";
import { Positions } from '../../types/Positions'; 

type Props = {
  func: string;
  data: Positions;
  action: string
}

interface IFormPosition {
  namePosition: string;
  descriptionPosition: string;
  isAdmPosition: Boolean;
  isActive: Boolean;
}

const schema = yup.object({
  namePosition: yup.string().required("*Informe o nome do cargo"),
  descriptionPosition: yup.string(),
  isAdmPosition: yup.boolean(),
  isActive: yup.boolean(),
});

const PositionsForms = ({ func, data, action}: Props) => {
  const positionsServices =  new PositionsServices();
  
  const [position, setPosition] = useState<Positions>({
    uid: action === 'update' ? data.uid : '',
    namePosition: action === 'update' ? data.namePosition : '', 
    descriptionPosition: action === 'update' ? data.descriptionPosition : '', 
    isAdmPosition: action === 'update' ? data.isAdmPosition : false,
    isActive: action === 'update' ? data.isActive : false,
    company: action === 'update' ? data.company : '',
  });

  const handleChange = (event: any) => {
    setPosition(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormPosition>({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async (upData: IFormPosition) => {
    console.log({ upData });
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
              {...register("namePosition")}
              placeholder="nome do cargo"
              type="text"
              onChange={handleChange}
              value={position.namePosition}
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-file-person"></i>
            </span>
            <input
              className="form-control"
              {...register("descriptionPosition")}
              placeholder="Descrição do cargo"
              type="text"
              onChange={handleChange}
              value={position.descriptionPosition}
              required
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                {...register("isAdmPosition")}
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

          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                {...register("isActive")}
                className="form-check-input mt-0"
                type="checkbox"
                onChange={handleChange}
                checked={position.isActive}
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

          <button type="submit" className="btn btn-success">
            Cadastrar
          </button>
        </form>
      </Modal.Body>
    </>
  );
};

export default PositionsForms;
