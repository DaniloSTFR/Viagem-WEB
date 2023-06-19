import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect} from "react";
// eslint-disable-next-line
import { Dropdown, DropdownButton, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../../styles/teams.scss";
import * as yup from "yup";
import { TravelRecordsServices } from "../../services/TravelRecordsServices";
import { LocationsServices } from "../../services/LocationsServices";
import { TeamsServices } from "../../services/TeamsServices";
import { TravelRecords } from '../../types/TravelRecords'; 
import { Locations } from '../../types/Locations'; 
import { Teams } from "../../types/Teams";
import { locales } from "moment";
import DateInput from "../shared/DateInput";
import "react-datepicker/dist/react-datepicker.css";

type ValuePiece = Date | null;

type Props = {
  func: string;
  data: TravelRecords;
  action: string;
  handleClose : Function;
}

interface IFormTravelRecords{
  arrivalDate: string;
  departureDate: string;
  team: string;
  state: string;
  city: string;
  travelEmployees: string[];
}

type TeamsArray = {
  arr: Teams[];
};

const statesBrazil = [
  {uf:'AC', nameUF: 'Acre'},
  {uf:'AL', nameUF: 'Alagoas'},
  {uf:'AP', nameUF: 'Amapá'},
  {uf:'AM', nameUF: 'Amazonas'},
  {uf:'BA', nameUF: 'Bahia'},
  {uf:'CE', nameUF: 'Ceará'},
  {uf:'DF', nameUF: 'Distrito Federal'},
  {uf:'ES', nameUF: 'Espírito Santo'},
  {uf:'GO', nameUF: 'Goiás'},
  {uf:'MA', nameUF: 'Maranhão'},
  {uf:'MT', nameUF: 'Mato Grosso'},
  {uf:'MS', nameUF: 'Mato Grosso do Sul'},
  {uf:'MG', nameUF: 'Minas Gerais'},
  {uf:'PA', nameUF: 'Pará'},
  {uf:'PB', nameUF: 'Paraíba'},
  {uf:'PR', nameUF: 'Paraná'},
  {uf:'PE', nameUF: 'Pernambuco'},
  {uf:'PI', nameUF: 'Piauí'},
  {uf:'RJ', nameUF: 'Rio de Janeiro'},
  {uf:'RN', nameUF: 'Rio Grande do Norte'},
  {uf:'RS', nameUF: 'Rio Grande do Sul'},
  {uf:'RO', nameUF: 'Rondônia'},
  {uf:'RR', nameUF: 'Roraima'},
  {uf:'SC', nameUF: 'Santa Catarina'},
  {uf:'SP', nameUF: 'São Paulo'},
  {uf:'SE', nameUF: 'Sergipe'},
  {uf:'TO', nameUF: 'Tocantins'}
];
  

const schema = yup.object({
  arrivalDate: yup.string().required("*Informe a de Ida"),
  departureDate: yup.string().required("*Informe a de Volta"),
  team: yup.string(),
  state: yup.string(),
  city: yup.string(),
  travelEmployees: yup.array(),
  
});

const TravelRecordsForms = ({ func, data, action, handleClose}: Props) => {
  const travelRecordsServices =  new TravelRecordsServices();
  const locationsServices =  new LocationsServices();
  const teamsServices = new TeamsServices();

  const [travelRecords, setTravelRecords] = useState<TravelRecords>({
    uid: action === 'update' ? data.uid : '',
    location: action === 'update' ? data.location : '',
    locationData: action === 'update' ? data.locationData : undefined,
    team: action === 'update' ? data.team : '',
    teamData: action === 'update' ? data.teamData : undefined,
    travelEmployeesUsers: action === 'update' ? data.travelEmployeesUsers : undefined,
    travelEmployees: action === 'update' ? data.travelEmployees : [],
    arrivalDate: action === 'update' ? data.arrivalDate : new Date(),
    departureDate: action === 'update' ? data.departureDate : new Date(),
    company: action === 'update' ? data.company : 'YTgh3NZ82IikUEnJBr9F',
  });
  const [teams, setTeams] = useState<TeamsArray>({ arr: [] });
  const [travelEmployeesUsers, setTravelEmployeesUsers] = useState<any>(action === 'update' ? data.travelEmployeesUsers : []);
  const [arrivalDate, setArrivalDateDate] = useState<ValuePiece>(action === 'update' ? data.arrivalDate : new Date());
  const [departureDate, setDepartureDate] = useState<ValuePiece>(action === 'update' ? data.departureDate : new Date());

  const [locationData, setLocationData] = useState<Locations>({
        uid: action === 'update' ? data.location : '',
        city: action === 'update' && data.locationData? data.locationData.city : '',
        country: action === 'update' && data.locationData? data.locationData.country : '',
        state: action === 'update' && data.locationData? data.locationData.state : '',
        company: action === 'update' ? data.team : 'YTgh3NZ82IikUEnJBr9F',
  });

  useEffect(() => {
    async function getAllTeams() {
      try {
        const responsefirebase = await teamsServices.getAllTeams('YTgh3NZ82IikUEnJBr9F');
        setTeams({ arr: responsefirebase });
      } catch (err: any) {
        console.log(err.message);
      }
    }
    getAllTeams();
    // eslint-disable-next-line    
  }, [travelRecords.team]);


  // eslint-disable-next-line
    let queue: any;
    const handleDepartureDate = (event: any) => {
      console.log(event);
      setDepartureDate(event);
    }

    const handleArrivalDate = (event: any) => {
      console.log(event);
      setArrivalDateDate(event);
    }
  
    const handleChange = (event: any) => {

      console.log(event.target.name);

      let local:Locations = {
        uid: action === 'update' ? locationData.uid : '',
        city: action === 'update' && locationData.city? locationData.city : '',
        country: action === 'update' && locationData.country? locationData.country : '',
        state: action === 'update' && locationData.state? locationData.state : '',
        company: action === 'update' ? locationData.company : 'YTgh3NZ82IikUEnJBr9F',
      }
      if(  event.target.name === 'state'|| event.target.name === 'city'){
        console.log(event.target.value);
        local = {
          uid: local.uid ? local.uid : locationData.uid,
          city: event.target.name === 'city' ? event.target.value : locationData.city, 
          country: 'Brasil',
          state: event.target.name === 'state' ? event.target.value : locationData.state,
          company: local.company,
        }

      }

      setLocationData(local);
      
      setTravelRecords({
        uid: travelRecords.uid,
        location: travelRecords.location,
        locationData: local,
        team:  event.target.name === 'teams' ? event.target.value : travelRecords.team,
        teamData: travelRecords.teamData, //<----------- update
        travelEmployeesUsers: action === 'update' ? data.travelEmployeesUsers : undefined,
        travelEmployees: travelRecords.travelEmployees, //<--------------- update
        arrivalDate: arrivalDate as Date,
        departureDate: departureDate as Date,
        company: travelRecords.company,
      });
    };
  
  // eslint-disable-next-line
 
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<IFormTravelRecords>({
      resolver: yupResolver(schema),
    });
  
    const onSubmitHandler = async (teamsData: IFormTravelRecords) => {
      try {
        if (action === 'new') {

          const newLocation = await locationsServices.createLocations(locationData);

          const uidNewTravel= await travelRecordsServices.createTravelRecords(
            {
              location: newLocation, 
              team: travelRecords.team, 
              travelEmployees: travelRecords.travelEmployees, //<-----
              arrivalDate: travelRecords.arrivalDate, 
              departureDate: travelRecords.departureDate, 
              company: 'YTgh3NZ82IikUEnJBr9F'
            });
          reset();
          if(uidNewTravel) handleClose();

        }else if(action === 'update'){
          await travelRecordsServices.updateTravelRecords(travelRecords.uid, travelRecords);
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
              Ida:
            </span>
            <DateInput
              value={departureDate}
              startdate={departureDate}
              onChange={handleDepartureDate}
              id="departureDate"
              name="departureDate"
              type="date"
              className="form-control"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Volta:
            </span>
            <DateInput
              value={arrivalDate}
              startdate={arrivalDate}
              onChange={handleArrivalDate}
              id="departureDate"
              name="departureDate"
              type="date"
              className="form-control"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-archive"></i>
            </span>
            <Form.Select
              {...register("state")}
              onChange={handleChange}
              aria-label="Cargo"
              value={locationData.state}
            >
              <option>Selecione o estado</option>
              {statesBrazil.map((state) => {
                return (
                  <option key={state.uf} value={state.uf}  >
                    {state.nameUF}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-file-person"></i>
            </span>
            <input
              className="form-control"
              {...register("city")}
              placeholder="Cidade"
              type="text"
              onChange={handleChange}
              value={locationData.city}
              required
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-archive"></i>
            </span>
            <Form.Select
              {...register("team")}
              onChange={handleChange}
              aria-label="Cargo"
              value={travelRecords.team}
            >
              <option>Selecione a equipe</option>
              {teams.arr.map((tm) => {
                return (
                  <option key={tm.uid} value={tm.uid}  >
                    {tm.nameTeams}
                  </option>
                );
              })}
            </Form.Select>
          </div>

         {/*             <div className="input-group mb-3">
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
            </div> */}

          {action === 'update' ?
            <table className="table table-form table-bordered table-striped mb-0">
              <thead className="sticky-top">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">NomeFuncionario</th>
                  <th scope="col">Cargo</th>
                  <th scope="col">Presente na<br />Viagem</th>
                </tr>
              </thead>
              <tbody>
                {travelEmployeesUsers.map((employees: any, index: any) => {
                  return (
                    <tr key={employees.uid}>
                      <th scope="row">{index + 1}</th>
                      <td>{employees.simpleName}</td>
                      <td>{employees.positionData ? employees.positionData.namePosition : 'Não definido'}</td>
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

          <button type="submit" className={action === 'new' ? 'btn btn-success ' : 'btn btn-primary'}>
            {action === 'new' ? 'Cadastrar' : 'Atualizar'}
          </button>
        </form>
      </Modal.Body>
    </>
  );
};

export default TravelRecordsForms;
