import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from 'react';

interface IEmployee {
    nome: string;
    email: string;
    company: string;
    isAdministrador: boolean;
    cpf: string;
    cargo: string;
    senha: string;
}

const schema = yup.object({
    nome: yup.string().required('*Informe o nome completo do funcionario'),
    email: yup.string().required('*Email é obrigatorio'),
    company: yup.string().required('*Company é obriatoria'),
    isAdministrador: yup.boolean(),
    cpf: yup.string().required('*CPF é obrigatorio'),
    cargo: yup.string(),
    senha: yup.string(),
});

const FormEmployee = ({})

const EmployeesForms = () => {
    return (
        <>

        </>
    )
}

export default EmployeesForms