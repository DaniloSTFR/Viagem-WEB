import { Sidebar } from "../components/Sidebar";
import { UsersServices } from "../services/UsersServices"; 
import { PositionsServices } from "../services/PositionsServices"; 
import { TeamsServices } from "../services/TeamsServices"; 
import { TravelRecordsServices } from "../services/TravelRecordsServices"; 
import { Button } from "react-bootstrap";

export function PageTest() {
    // eslint-disable-next-line
    const usersServices =  new UsersServices();
    // eslint-disable-next-line
    const positionsServices =  new PositionsServices();
    // eslint-disable-next-line
    const teamsServices =  new TeamsServices();
    // eslint-disable-next-line
    const travelRecordsServices =  new TravelRecordsServices();
    
    const testServices = async () => {

/*         const listUsers = await usersServices.getAllUser('YTgh3NZ82IikUEnJBr9F')
        console.log(listUsers);

        const listPositions = await positionsServices.getAllPositions('YTgh3NZ82IikUEnJBr9F')
        console.log(listPositions); */

/*         const oneTeama = await teamsServices.findTeamsByUid('8mGX2YMHaHmol6bVT63i')
        console.log(oneTeama);

        const listTeams = await teamsServices.getAllTeams('YTgh3NZ82IikUEnJBr9F')
        console.log(listTeams);  */

        const listTravelRecords = await travelRecordsServices.getAllTravelRecords('YTgh3NZ82IikUEnJBr9F')
        console.log(listTravelRecords);



        //console.log(listTeams[0].teamEmployees);
/*         const newPosition = await positionsServices.createPositions({
            namePosition: 'Gerente', 
            descriptionPosition: 'Gerente de setor.',
            isAdmPosition: true,
            company:'YTgh3NZ82IikUEnJBr9F'});
        const onePosition = await positionsServices.findPositionsByUid(newPosition);
        console.log(onePosition); */

      };

    return(
        <div id="pages">
            <aside>
                <Sidebar/>
            </aside>
            <main className = "content">
                          <div className="d-grid gap-2 d-md-flex justify-content-md-start setmarginbottom">
              <Button
                type="button"
                className="btn btn-success btn-sm"
                onClick={testServices}
              >
                Teste de service
              </Button>
          </div>
            </main>
        </div>
    );

}