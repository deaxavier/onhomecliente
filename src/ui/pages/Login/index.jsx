import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, LinearProgress, TextField } from "@mui/material"
import { Login } from "@mui/icons-material";
import { UserService } from "../../../business/services/user-service"
import { Enviroment } from "../../../business/configs/enviroment"
import { IsValidEmail }  from "../../../business/helpers/email"
import './index.css'

const LoginPage = () => {
    const [userName, setUserName] = useState('')
    const [userError, setUserError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [loginError, SetLoginError] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const enviroment = new Enviroment()
    const service = new UserService();

    useEffect(() => {
        const token = localStorage.getItem(enviroment.token_key)
        if (token && token !== '') {
            navigate('app')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        SetLoginError(false)
        localStorage.clear()
        let haveError = false

        if (!isValidUserName(userName)) haveError = true
        if (!isValidPassword(password)) haveError = true
        if (haveError) return false

        const response = await service.login(userName, password);
        if (response.ok) {
            const token = await response.text()
            localStorage.setItem(enviroment.token_key, token)
            await validCanLogin()
        }
        else {
            SetLoginError(true)
        }
        setLoading(false)
    }

    const onChangeUser = e => {
        const userName = e.target.value
        isValidUserName(userName)
        setUserName(userName)
    }

    const onChangePassword = e => {
        const password = e.target.value
        isValidPassword(password)
        setPassword(password)
    }

    const isValidPassword = password => {
        if (password === '') {
            setPasswordError(true)
            return false
        }
        else {
            setPasswordError(false)
            return true
        }
    }

    const isValidUserName = userName => {
        if (userName === '') {
            setUserError(true)
            return false
        }
        else {
            if (IsValidEmail(userName)) {
                setUserError(false)
                return true
            }
            else {
                setUserError(true)
                return false
            }
        }
    }


    const validCanLogin = async () => {
        const response = await service.info();
        if (response.ok) {
            var user = JSON.parse(await response.text())
            if (user.profile.id === 100) {
                navigate("app")
            }
            else {

                localStorage.clear()
                SetLoginError(true)
            }

        } else {
            localStorage.clear()
            console.log(response)
        }
    }

    return (
        <form onSubmit={handleSubmit} >
            <div className="login">
                <div className="box">
                    <div className="content">
                        <h2>Insira suas credenciais</h2>
                        {loginError && 
                        <Alert severity="error">Usuário ou Senha inválido(s)</Alert>}
                        {loading && <LinearProgress color="primary" />}
                        <p>
                            <TextField
                                onChange={e => onChangeUser(e)}
                                error={userError}
                                value={userName}
                                label="E-mail"
                                variant="outlined"
                                helperText={userError ? "E-mail inválido" : ""}
                                fullWidth />
                        </p>
                        <p><TextField
                            onChange={e => onChangePassword(e)}
                            error={passwordError}
                            value={password}
                            label="Senha"
                            variant="outlined"
                            helperText={passwordError ? "Senha é obrigatória" : ""}
                            fullWidth
                            type="password" />
                        </p>
                    </div>
                    <div className="footer">
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            startIcon={<Login />}
                            type="submit">
                            Acessar
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default LoginPage