import { useEffect, useState } from "react";
import "../../styles/employees.scss";
import EmployeesCard from "./employeesCard";
import { Users } from "../../types/Users";
import { UsersServices } from "../../services/UsersServices";
import { PositionsServices } from "../../services/PositionsServices";

type UserArray = {
  arr: Users[];
};

type Props = {
  refreshComponent: boolean;
  setRefreshComponent: Function;
};

const EmployeesList = ({ refreshComponent, setRefreshComponent }: Props) => {
  const usersServices = new UsersServices();
  const positionsServices =  new PositionsServices();
  const [user, setUser] = useState<UserArray>({ arr: [] });
  const [show, setShow] = useState({ open: "", function: "" });
  const [showAlert, setShowAlert] = useState({
    open: "",
    text: "",
    handleFunctionAlertResponse: Function,
  });

  useEffect(() => {
    async function getAllUser() {
      try {
        const responsefirebase = await usersServices.getAllUser(
          "YTgh3NZ82IikUEnJBr9F"
        );

        const responsefirebasepositions = await positionsServices.getAllPositions('YTgh3NZ82IikUEnJBr9F');

        setUser({ arr: responsefirebase });
        console.log(user.arr);
      } catch (err: any) {
        console.log(err.message);
      }
    }
    getAllUser();
    // eslint-disable-next-line
  }, [show, refreshComponent]);

  const handleClose = () => setShow({ open: "", function: "" });
  const handleShow = (e: any) => {
    setShow({ open: e.uid, function: "ATUALIZAR DADOS DO CARGO" });
  };

  const handleCloseAlert = () => {
    setShowAlert({ open: "", text: "", handleFunctionAlertResponse: Function });
    setRefreshComponent(!refreshComponent);
  };

  return (
    <>
      <div id="employees">
        <div className="overflow-scroll list">
          <div className="row g-2">
            {user.arr.map((user) => {
              return (
                <div key={user.uid} className="col-4 mt-2">
                  <EmployeesCard receiveData={user} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesList;
