import React, { useEffect } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, useLocation } from 'react-router-dom';

import '../styles/siderbar.scss'

export function Sidebar() {

    const { pathname } = useLocation();

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
            <NavLink  to="/home" className= {` ${pathname==='/home'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/funcionarios" className= {` ${pathname==='/funcionarios'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="table">Funcionários</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/cargos" className= {` ${pathname==='/cargos'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="user">Cargos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/equipes" className= {` ${pathname==='/equipes'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="user">Equipes</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/viagens" className= {` ${pathname==='/viagens'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="chart-line">Viagens</CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              to="/hero404"
              target="_blank"
              className= {` ${pathname==='/hero404'  ? 'activeClicked': '' }`} 
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
