import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';

import { Modal, Button } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAuth } from '../hooks/useAuth';

import enfsenior from '../assets/images/enfsenior.svg';
import falha from '../assets/images/xfalha.svg';
import '../styles/login.scss';
import '../styles/modal.scss';

interface IFormInputs {
    email: string;
    senha: string;
  }
  
const schema = yup.object({
    email: yup.string().email("E-mail inválido.").required("Informe o e-mail."),
    senha: yup.string().min(6, " *Informe a senha, ela deve ter ao menos 6 dígitos.").required("Informe a senha.")
  });

export function Login() {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const { user, signInAction } = useAuth()
  
    const [showFalha, setShowFalha] = useState(false);
    const handleCloseFalha = () => setShowFalha(false);
    const handleShowFalha = () => setShowFalha(true);
  
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
      resolver: yupResolver(schema)
    });

  
    useEffect(() => {
      if(user){
        console.log(user);
      }
    }, [user]);
  
    const loginAction = async (data: IFormInputs) => {
  
      try {
        const isLogged = await signInAction(data.email, data.senha);

        if (isLogged) {
          navigate('/home');//redirect aqui ou
        } else {
          throw new Error('E-mail ou senha incorretos!')
        }

      } catch (err:any) {
        console.log(err.message);
        setErrorMessage('E-mail ou senha incorretos!');
        handleShowFalha();

/*         if (request.isAxiosError(err) && err.response) {
          console.log((err.response.data).error);
          setErrorMessage((err.response.data).error);
          handleShowFalha();
        } */
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
                  <input type="email" className="form-control" id="inputEmail" placeholder="name@example.com"
                    {...register("email", { required: true })} />
                  <label htmlFor="inputEmail">Usuário( E-mail )</label>
                  <h5>{errors.email?.message}</h5>
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