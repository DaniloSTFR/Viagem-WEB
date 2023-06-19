import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
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

const travelRecordsForms = ({ func, data, action, handleClose}: Props) => {

    return(
        <>
        </>
    );
};
export default travelRecordsForms;