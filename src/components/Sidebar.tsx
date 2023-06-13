import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import {NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import '../styles/siderbar.scss'

export function Sidebar() {

    const { pathname } = useLocation();
    const { signOutAction } = useAuth();

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
              <CDBSidebarMenuItem icon="warehouse">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/funcionarios" className= {` ${pathname==='/funcionarios'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="address-card">Funcionários</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/cargos" className= {` ${pathname==='/cargos'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="user-plus">Cargos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/equipes" className= {` ${pathname==='/equipes'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="users">Equipes</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/viagens" className= {` ${pathname==='/viagens'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="plane">Viagens</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/pagetest" className= {` ${pathname==='/pagetest'  ? 'activeClicked': '' }`} >
              <CDBSidebarMenuItem icon="exclamation-circle"> PageTest</CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>
        <div style={{ textAlign: 'center' }}>
          <CDBSidebarFooter >
              <div
                style={{
                  padding: '20px 5px',
                  textDecoration: 'none',
                }}
              >
                <NavLink className="nav_link" to="/" onClick={() => signOutAction()}>
                    <CDBSidebarMenuItem icon="sign-out-alt">Sair</CDBSidebarMenuItem>
                </NavLink>  
              </div>
            </CDBSidebarFooter>
        </div>

      </CDBSidebar>
    </div>
  );
}
