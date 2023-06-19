import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Dropdown, DropdownButton, Form, Modal } from "react-bootstrap";
import { Positions } from "../../types/Positions";
import { UsersServices } from "../../services/UsersServices";
import { PositionsServices } from "../../services/PositionsServices";
import { TeamsServices } from "../../services/TeamsServices";
import { Teams } from "../../types/Teams";

interface IEmployee {
  fullName: string;
  email: string;
  company: string;
  isAdmin: boolean;
  cpf: string;
  position: string;
  password: string;
  team: string;
}

type PositionsArray = {
  arr: Positions[];
};
type TeamsArray = {
  arr: Teams[];
};

const schema = yup.object({
  fullName: yup
    .string()
    .required("*Informe o fullName completo do funcionario"),
  email: yup.string().required("*Email é obrigatorio"),
  company: yup.string(),
  isAdmin: yup.boolean(),
  cpf: yup.string().required("*CPF é obrigatorio"),
  position: yup.string(),
  team: yup.string(),
  password: yup.string().min(8).max(32).required(),
});

const EmployeesForms = ({
  func,
  data,
  action,
  handleClose,
  refreshComponent,
  setRefreshComponent,
}: any) => {
  const userServices = new UsersServices();
  const positionsServices = new PositionsServices();
  const teamsServices = new TeamsServices();
  const [positions, setPositions] = useState<PositionsArray>({ arr: [] });
  const [show, setShow] = useState({ open: "", function: "" });
  const [teams, setTeams] = useState<TeamsArray>({ arr: [] });
  const [employee, setEmployee] = useState({
    uid: data ? data.uid : "",
    fullName: data ? data.fullName : "",
    email: data ? data.email : "",
    company: data ? data.company : "",
    isAdmin: data ? data.isAdmin : false,
    isActive: data ? data.isActive : false,
    cpf: data ? data.cpf : "",
    team: data ? data.team : "",
    position: data ? data.position : "",
    password: data ? data.password : "",
  });

  const handleChange = (event: any) => {
    setEmployee(event.target.value);
  };

  useEffect(() => {
    async function getAllPositions() {
      try {
        const responsePositionFirebase =
          await positionsServices.getAllPositions("YTgh3NZ82IikUEnJBr9F");
        const responseTeamFirebase = await teamsServices.getAllTeams(
          "YTgh3NZ82IikUEnJBr9F"
        );
        setPositions({ arr: responsePositionFirebase });
        setTeams({ arr: responseTeamFirebase });
      } catch (err: any) {
        console.log(err.message);
      }
    }
    getAllPositions();
    // eslint-disable-next-line
  }, [show, refreshComponent]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEmployee>({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async (data: any) => {
    console.log(data);
    try {
      if (action === "new") {
        const uidNewEmployee = await userServices.createUser({
          fullName: data.fullName,
          cpf: data.cpf,
          email: data.email,
          isActive: data.isActive,
          isAdmin: data.isAdmin,
          position: data.position,
          teams: data.team,
          company: data.company,
          password: data.password,
        });
        reset();
        if (uidNewEmployee) handleClose();
      } else if (action === "udpate") {
        await userServices.updateUser(employee.uid, {
          fullName: data.fullName,
          cpf: data.cpf,
          email: data.email,
          isActive: data.isActive,
          isAdmin: data.isAdmin,
          position: data.position,
          teams: data.team,
          company: data.company,
        });
        handleClose();
      }
    } catch (err) {
      console.error(err);
    }
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
              {...register("fullName")}
              placeholder="nome completo"
              type="text"
              onChange={handleChange}
              value={employee.fullName}
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
            <Form.Select
              {...register("position")}
              onChange={handleChange}
              aria-label="Cargo"
            >
              <option>Selecione um cargo</option>
              {positions.arr.map((pos) => {
                return (
                  <option key={pos.uid} value={pos.uid}>
                    {pos.namePosition}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-archive"></i>
            </span>
            <Form.Select
              {...register("team")}
              onChange={handleChange}
              aria-label="Cargo"
            >
              <option>Selecione uma equipe</option>
              {teams.arr.map((team) => {
                return (
                  <option key={team.uid} value={team.uid}>
                    {team.nameTeams}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          {func === "NOVO USUARIO" ? (
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-lock"></i>
              </span>
              <input
                {...register("password")}
                placeholder="Senha"
                className="form-control"
                type="password"
                onChange={handleChange}
                value={employee.password}
                required
              />{" "}
            </div>
          ) : null}
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                {...register("isAdmin")}
                className="form-check-input mt-0"
                type="checkbox"
                onChange={handleChange}
                checked={employee.isAdmin}
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
                {...register("isAdmin")}
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
          <button
            type="submit"
            className={action === "new" ? "btn btn-success" : "btn btn-primary"}
          >
            {action === "new" ? "Cadastrar" : "Atualizar"}
          </button>
        </form>
      </Modal.Body>
    </>
  );
};

export default EmployeesForms;
