import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Enviroment } from "./business/configs/enviroment"
import Header from './ui/components/Header'
import Menu from './ui/components/Menu'
import './OnHomeApp.css'


const OnHomeApp = () => {
  const enviroment = new Enviroment()
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(enviroment.token_key)
    if (!token || token === '') {
      navigate("/")
    }

  })

  return (
    <>
      <Header />
      <div className="content">
        <Menu />
        <div className="main">
          <Outlet />
        </div>
      </div>
    </>
  );
}


export default OnHomeApp