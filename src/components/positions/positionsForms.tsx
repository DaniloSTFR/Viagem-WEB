import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { PositionsServices } from "../../services/PositionsServices";
import { Positions } from '../../types/Positions'; 

type Props = {
  func: string;
  data: Positions;
  action: string;
  handleClose : Function;
}

interface IFormPosition {
  namePosition: string;
  descriptionPosition: string;
  isAdmPosition: boolean;
  isActive: boolean;
}

const schema = yup.object({
  namePosition: yup.string().required("*Informe o nome do cargo"),
  descriptionPosition: yup.string(),
  isAdmPosition: yup.boolean(),
  isActive: yup.boolean(),
});

const PositionsForms = ({ func, data, action, handleClose}: Props) => {
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
    setPosition({
      uid: position.uid,
      namePosition: event.target.name === 'namePosition' ? event.target.value : position.namePosition, 
      descriptionPosition: event.target.name === 'descriptionPosition' ? event.target.value : position.descriptionPosition, 
      isAdmPosition: event.target.name === 'isAdmPosition' ?  !position.isAdmPosition : position.isAdmPosition,
      isActive: event.target.name === 'isActive' ? !position.isActive : position.isActive,
      company: position.company,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormPosition>({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async (positionData: IFormPosition) => {
    try {
      if (action === 'new') {
        const uidNewPosition = await positionsServices.createPositions(
          {
            namePosition: positionData.namePosition,
            descriptionPosition: positionData.descriptionPosition,
            isAdmPosition: positionData.isAdmPosition,
            isActive: positionData.isActive,
            company: position.company
          });
        reset();
        if(uidNewPosition) handleClose();
      }else if(action === 'update'){
        await positionsServices.updatePositions(position.uid, position);
        handleClose();
      }     
    } catch (err: any) {
      console.log(err.message);
    }
  };

  //console.log(position);
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
              placeholder="Nome do cargo"
              type="text"
              onChange={handleChange}
              value={position.namePosition}
              required
            /><h5>{errors.namePosition?.message}</h5>
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
          <button type="submit" className= { action === 'new' ? 'btn btn-success' : 'btn btn-primary'}>
            { action === 'new' ? 'Cadastrar' : 'Atualizar'}
          </button>
        </form>
      </Modal.Body>
    </>
  );
};

export default PositionsForms;
