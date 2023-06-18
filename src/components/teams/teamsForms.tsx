import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
// eslint-disable-next-line
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../../styles/teams.scss";
import * as yup from "yup";
import { TeamsServices } from "../../services/TeamsServices";
import { Teams } from '../../types/Teams'; 

type Props = {
  func: string;
  data: Teams;
  action: string;
  handleClose : Function;
}

interface IFormTeams{
  nameTeams: string;
  descriptionTeams: string;
  teamEmployees: string[];
  isActive: boolean;
}

const schema = yup.object({
  nameTeams: yup.string().required("*Informe o nome da equipe"),
  descriptionTeams: yup.string(),
  teamEmployees: yup.array(),
  isActive: yup.boolean(),
});

const TeamsForms = ({ func, data, action, handleClose}: Props) => {
  const teamsServices =  new TeamsServices();

  const [teams, setTeams] = useState<Teams>({
    uid: action === 'update' ? data.uid : '',
    nameTeams: action === 'update' ? data.nameTeams : '',
    descriptionTeams: action === 'update' ? data.descriptionTeams : '',
    teamEmployeesUsers: action === 'update' ? data.teamEmployeesUsers : [],
    teamEmployees: action === 'update' ? data.teamEmployees : [],
    company: action === 'update' ? data.company : '',
    isActive: action === 'update' ? data.isActive : false,
  });

  const [employess, setEmployees] = useState<any>(action === 'update' ? data.teamEmployeesUsers : []);

// eslint-disable-next-line
  let queue: any;

  /* const employeeList = [
    {
      id: 1,
      nome: "Funcionario 1",
      email: "funcionario1@email.com",
      company: "Teste company",
      isAdministrador: false,
      cpf: "78587589008",
      cargo: "TI",
      isActive: true,
    },
    {
      id: 2,
      nome: "Funcionario 2",
      email: "funcionario2@email.com",
      company: "Teste company",
      isAdministrador: false,
      cpf: "76727267065",
      cargo: "RH",
      isActive: true,
    },
    {
      id: 3,
      nome: "Funcionario 3",
      email: "funcionario3@email.com",
      company: "Teste company",
      isAdministrador: true,
      cpf: "56826878097",
      cargo: "TI",
      isActive: true,
    },
    {
      id: 4,
      nome: "Funcionario 4",
      email: "funcionario4@email.com",
      company: "Teste company",
      isAdministrador: true,
      cpf: "84255298084",
      cargo: "TI",
      isActive: true,
    },
    {
      id: 5,
      nome: "Funcionario 5",
      email: "funcionario5@email.com",
      company: "Teste company",
      isAdministrador: false,
      cpf: "84255298084",
      cargo: "TI",
      isActive: false,
    },
  ]; */

  const handleChange = (event: any) => {
    
    setTeams({
      uid: teams.uid,
      nameTeams: event.target.name === 'nameTeams' ? event.target.value : teams.nameTeams, 
      descriptionTeams: event.target.name === 'descriptionTeams' ? event.target.value : teams.descriptionTeams, 
      teamEmployeesUsers: event.target.name === 'teamEmployeesUsers' ? event.teamEmployeesUsers : teams.teamEmployeesUsers,//---
      teamEmployees: event.target.name === 'teamEmployees' ? event.teamEmployees : teams.teamEmployees ,//-----
      isActive: event.target.name === 'isActive' ? !teams.isActive : teams.isActive,
      company: teams.company,
    });
  };

// eslint-disable-next-line
  const handleQueue = (event: any) => {
    const queue = JSON.parse(event);
    setEmployees((employess: any) => [...employess, queue]);
    console.log(employess);
    teams.teamEmployeesUsers = employess;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormTeams>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (teamsData: IFormTeams) => {
    try {
      if (action === 'new') {
        const uidNewTeam = await teamsServices.createTeams(
          {
            nameTeams: teamsData.nameTeams,
            descriptionTeams: teamsData.descriptionTeams,
            teamEmployees: [],
            isActive: teamsData.isActive,
            company: teams.company
          });
        reset();
        if(uidNewTeam) handleClose();
      }else if(action === 'update'){
        await teamsServices.updateTeams(teams.uid, teams);
        handleClose();
      }     
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{func}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id='form-teams' onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-file-person"></i>
            </span>
            <input
              className="form-control"
              {...register("nameTeams")}
              placeholder="Nome da equipe"
              type="text"
              onChange={handleChange}
              value={teams.nameTeams}
              required
            /><h5>{errors.nameTeams?.message}</h5>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-file-person"></i>
            </span>
            <input
              className="form-control"
              {...register("descriptionTeams")}
              placeholder="Descrição da equipe"
              type="text"
              onChange={handleChange}
              value={teams.descriptionTeams}
              required
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                {...register("isActive")}
                className="form-check-input mt-0"
                type="checkbox"
                onChange={handleChange}
                checked={teams.isActive}
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
{/*           <div className="buttons">
            <DropdownButton
              title="Funcionarios"
              id="dropdown-menu-align-right"
              onSelect={handleQueue}
              variant="secondary"
            >
              {employeeList.map((pos) => {
                return (
                  <Dropdown.Item
                    key={pos.id}
                    eventKey={JSON.stringify(pos)}
                    value={pos}
                  >
                    {pos.nome}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </div> */}
          {action === 'update' ? 
              <table className="table table-form table-bordered table-striped mb-0">
                <thead className="sticky-top">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">NomeFuncionario</th>
                    <th scope="col">Cargo</th>
                    <th scope="col">Admin</th>
                  </tr>
                </thead>
                <tbody>
                  {employess.map((employees: any, index: any) => {
                    return (
                        <tr key={employees.uid}>
                          <th scope="row">{index+1}</th>
                          <td>{employees.fullName}</td>
                          <td>{employees.positionData? employees.positionData.namePosition: 'Não definido'}</td>
                          <th>
                            <input
                              disabled
                              type="checkbox"
                              checked={employees.isActive}
                            ></input>
                          </th>
                        </tr>
                    );
                  })}
                </tbody>
              </table>
          : ''}
          <button type="submit" className= { action === 'new' ? 'btn btn-success ' : 'btn btn-primary'}>
            { action === 'new' ? 'Cadastrar' : 'Atualizar'}
          </button>
        </form>
      </Modal.Body>
    </>
  );
};

export default TeamsForms;
