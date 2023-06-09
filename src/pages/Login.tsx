import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';

import { Modal, Button } from 'react-bootstrap';
import request from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import enfsenior from '../assets/images/enfsenior.svg';
import falha from '../assets/images/xfalha.svg';
import '../styles/login.scss';
import '../styles/modal.scss';

import { firebaseApp, auth, database } from '../services/firebase';
import { collection, getDocs,} from "firebase/firestore";

interface IFormInputs {
    usuario: string;
    senha: string;
  }
  
const schema = yup.object({
    usuario: yup.string().required(" *Informe o usuário."),
    senha: yup.string().min(6, " *Informe a senha, ela deve ter ao menos 6 dígitos.").required("Informe a senha.")
  });

export function Login() {

    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');
    //const {usuario, signInAction } = useAuth();
  
    const [showFalha, setShowFalha] = useState(false);
    const handleCloseFalha = () => setShowFalha(false);
    const handleShowFalha = () => setShowFalha(true);
  
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
      resolver: yupResolver(schema)
    });

    const usersCollectionRef = collection(database, "Users");

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(usersCollectionRef);
          console.log(data);
          //setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers();
      }, []);
  
/*     useEffect(() => {
      if(usuario){
        //console.log(usuario);
      }
    }, [usuario]); */
  
    const loginAction = async (data: IFormInputs) => {
  
      try {
        //await signInAction(data.usuario, data.senha);
  
        history.push('/home');//redirect aqui ou
      } catch (err) {
        if (request.isAxiosError(err) && err.response) {
          console.log((err.response.data).error);
          setErrorMessage((err.response.data).error);
          handleShowFalha();
        }
      }
  
    };
  
  
    return (
      <div className="container" id="page-auth">
        <div className="row rowheight">
          <div className="col-xl-12 aside">
  
            <div className="row" >
              <div className="divtocenter"><img src={enfsenior} alt="enf.Senior" />   </div>
            </div>
  
            <div className="row  mb-3 gap-2 col-xl-6  mx-auto" >
              <div>
                <p>Aplicação para auxiliar o enfermeiro no exercício da Sistematização da Assistência de Enfermagem (SAE) no atendimento ao idoso.</p>
              </div>
            </div>
  
            <div className="row justify-content-md-center" >
              <form onSubmit={handleSubmit(loginAction)}>
                <div className="form-floating d-grid  mb-3 gap-2 col-xl-4 mx-auto">
                  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
                    {...register("usuario", { required: true })} />
                  <label htmlFor="floatingInput">Usuário</label>
                  <h5>{errors.usuario?.message}</h5>
                </div>
  
                <div className="form-floating  d-grid mb-3 gap-2 col-xl-4 mx-auto">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                    {...register("senha", { required: true })} />
                  <label htmlFor="floatingPassword">Senha</label>
                  <h5>{errors.senha?.message}</h5>
                </div>
  
                <div className="d-grid gap-2 col-xl-3  mb-3 mx-auto">
                  <button type="submit" className="btn btn-success btn-lg">
                    Entrar
                  </button>
                  <div className="separator">ou cadastre-se</div>
                  <Link className="btn btn-primary btn-lg" to="/cadastrar">
                    Cadastrar
                  </Link>
                </div>
              </form>
            </div>
  
          </div>
        </div>
  
        <div>
          <Modal show={showFalha} onHide={handleCloseFalha}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Body>
              <p><img src={falha} alt="Falha" /></p>
              <h2>{errorMessage}</h2>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" size="lg" onClick={handleCloseFalha}>
                Voltar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  

}