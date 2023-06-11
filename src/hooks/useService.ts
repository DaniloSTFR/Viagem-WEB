import { useContext } from 'react';
import { ServiceContext } from '../contexts/ServiceContext'

export function useService() {
  const value = useContext(ServiceContext)

  return value;
}