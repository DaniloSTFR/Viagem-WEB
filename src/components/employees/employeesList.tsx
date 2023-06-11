import React, { useState } from 'react'
import '../../styles/employees.scss'
import EmployeesCard from './employeesCard';

const list = [
    {
        id: 1,
        nome: 'Funcionario 1',
        email: 'funcionario1@email.com',
        company: 'Teste company',
        isAdministrador: false,
        cpf: '78587589008',
        cargo: 'TI',
        isActive: true,
    },
    {
        id: 2,
        nome: 'Funcionario 2',
        email: 'funcionario2@email.com',
        company: 'Teste company',
        isAdministrador: false,
        cpf: '76727267065',
        cargo: 'RH',
        isActive: true,
    },
    {
        id: 3,
        nome: 'Funcionario 3',
        email: 'funcionario3@email.com',
        company: 'Teste company',
        isAdministrador: true,
        cpf: '56826878097',
        cargo: 'TI',
        isActive: true,
    },
    {
        id: 4,
        nome: 'Funcionario 4',
        email: 'funcionario4@email.com',
        company: 'Teste company',
        isAdministrador: true,
        cpf: '84255298084',
        cargo: 'TI',
        isActive: true,
    },
    {
        id: 5,
        nome: 'Funcionario 5',
        email: 'funcionario5@email.com',
        company: 'Teste company',
        isAdministrador: false,
        cpf: '84255298084',
        cargo: 'TI',
        isActive: false,
    },
];

const EmployeesList = () => {
    const [data, setData] = useState('');

    const receiveData = (data: any) => {
        setData(data);
    }
    return (
        <>
            <div id='employees'>
                <div className="overflow-scroll list">
                    <div className="row g-2">
                        {list.map(list => {
                            return (
                                <div key={list.id} className="col-4 mt-2">
                                    <EmployeesCard receiveData={list} />
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </>
    )
}

export default EmployeesList