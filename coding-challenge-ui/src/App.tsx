import React, { useState } from "react";
import Table from './Table'
import { hasFlag } from 'country-flag-icons'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import styled from "styled-components";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #cccccc;
`;

const AppHeader = styled.header`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 2rem;
`;

const HeaderText = styled.h1`
  font-family: "Roboto", sans-serif;
`;

const H3Text = styled.h3`
  font-family: "Roboto", sans-serif;
`;

const Username = styled.span`
  font-family: "Roboto", sans-serif;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;
  padding-bottom: 20px;
  margin-top: 40px; 
`;

interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<any | null>(null);

  React.useEffect(() => {
    fetch("http://localhost:8080/user")
      .then((results) => results.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  React.useEffect(() => {
    fetch("http://localhost:8080/sales")
      .then((results) => results.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'MARKETPLACE',
        accessor: 'marketplace', 
        Cell: ({row: {original}} : {row: any, original: any}) => {
          let country = getUnicodeFlagIcon(original.country);
          //Special handler for UK
          if (original.country=='UK'){
            country = getUnicodeFlagIcon("GB");
          }
          return (
            <div>
              <span> {country}</span>
              <span> {original.marketplace}</span>
            </div>
          )
        }
      },
      {
        Header: 'STORE',
        accessor: 'store',
      },
      {
        Header: 'ORDER ID',
        accessor: 'orderId', 
      },
      {
        Header: 'ORDER VALUE',
        accessor: 'orderValue',
        Cell: ({row: {original}} : {row: any, original: any}) => {
          return (
            <span> ${original.daysOverdue}</span>
          )
        } 
      },
      {
        Header: 'ITEMS',
        accessor: 'items', 
      },
      {
        Header: 'DESTINATION',
        accessor: 'destination', 
      },
      {
        Header: 'DAYS OVERDUE',
        accessor: 'daysOverdue', 
        Cell: ({row: {original}} : {row: any, original: any}) => {
          return (
            <span style={{color:'red'}}> {original.daysOverdue}</span>
          )
        }
      },
    ],
    []
  )

  return (
    <AppWrapper>
      <AppHeader>
        <HeaderText>Analytics Dashboard</HeaderText>
        <Username>Welcome, {user ? user.firstName : "Guest"}!</Username>
      </AppHeader>
        <Content>
          <H3Text>Overdue Orders</H3Text>
          {orders ? (<Table columns={columns} data={orders}/>):(null) }
        </Content>
    </AppWrapper>
  );
};

export default App;
