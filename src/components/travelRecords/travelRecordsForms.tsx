import { yupResolver } from "@hookform/resolvers/yup";
import { useState} from "react";
// eslint-disable-next-line
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../../styles/teams.scss";
import * as yup from "yup";
import { TravelRecordsServices } from "../../services/TravelRecordsServices";
import { TravelRecords } from '../../types/TravelRecords'; 


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
  descriptionTravelRecords: string;
  travelEmployees: string[];
}

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
  descriptionTeams: yup.string(),
  teamEmployees: yup.array(),
  isActive: yup.boolean(),
});

const TravelRecordsForms = ({ func, data, action, handleClose}: Props) => {
  const teamsServices =  new TravelRecordsServices();

  const [TravelRecords, setTravelRecords] = useState<TravelRecords>({
    uid: action === 'update' ? data.uid : '',
    location: action === 'update' ? data.location : '',
    locationData: action === 'update' ? data.locationData : undefined,
    team: action === 'update' ? data.team : '',
    teamData: action === 'update' ? data.teamData : undefined,
    travelEmployeesUsers: action === 'update' ? data.travelEmployeesUsers : undefined,
    travelEmployees: action === 'update' ? data.travelEmployees : [],
    arrivalDate: action === 'update' ? data.arrivalDate : new Date(),
    departureDate: action === 'update' ? data.departureDate : new Date(),
    company: action === 'update' ? data.company : '',
  });

    return(
        <>
        </>
    );
};

export default TravelRecordsForms;
