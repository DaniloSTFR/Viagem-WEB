import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

import '../styles/siderbar.scss'

type SidebarProps = {
  id: string;
} 

export function Sidebar(props: SidebarProps) {

  console.log(props.id);


  return (
    <div
      style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333" className={''} breakpoint={0} toggled={false} minWidth={'100px'} maxWidth={'200px'}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink  to="/home" className= {` ${props.id==='home'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/funcionarios" className= {` ${props.id==='funcionarios'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="table">Funcionários</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/cargos" className= {` ${props.id==='cargos'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="user">Cargos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/equipes" className= {` ${props.id==='equipes'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="user">Equipes</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/viagens" className= {` ${props.id==='viagens'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="chart-line">Viagens</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              to="/hero404"
              target="_blank"
              className= {` ${props.id==='hero404'  ? 'activeClicked': '' }`} 
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                404 page
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <div style={{ textAlign: 'center' }}>
          <CDBSidebarFooter >
              <div
                style={{
                  padding: '20px 5px',
                }}
              >
                Sidebar Footer
              </div>
            </CDBSidebarFooter>
        </div>

      </CDBSidebar>
    </div>
  );
}
