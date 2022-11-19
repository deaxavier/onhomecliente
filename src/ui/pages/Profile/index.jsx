import React, { useEffect, useState } from "react"
import { Login, Logout } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import SaveIcon from '@mui/icons-material/Save'
import {
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material"
import OnHomeDialog from "../../components/Dialog"
import { UserService } from "../../../business/services/user-service"
import { CustomerService } from "../../../business/services/customer-service"


import './index.css'



const ProfilePage = () => {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUF] = useState('')
    const [zipcode, setZipCode] = useState('')
    const [openConfirmExit, setOpenConfirmExit] = useState(false)
    const [openConfirmSave, setOpenConfirmSave] = useState(false)
    const [openAlertSave, setOpenAlertSave] = useState(false)

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const userService = new UserService()
    const customerService = new CustomerService()

    useEffect(() => {
        (async () => {
            await getInfo();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const logout = () => {
        localStorage.clear()
        navigate("/")
    }
    const getInfo = async () => {
        setLoading(true)
        let response = await userService.info();
        if (response.ok) {
            var user = JSON.parse(await response.text())
            setEmail(user.email)
        }

        response = await customerService.info();
        if (response.ok) {
            const customer = JSON.parse(await response.text())
            setId(customer.id)
            setName(customer.name)
            setAddress(customer.address)
            setZipCode(customer.zipcode)
            setCity(customer.city)
            setUF(customer.state)
        }

        setLoading(false)
    }

    const confirmExit = () => {
        setOpenConfirmExit(true)
    }

    const closeConfirmExit = () => {
        setOpenConfirmExit(false)
    }


    const closeConfirmSave = () => {
        setOpenConfirmSave(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setOpenConfirmSave(true)
    }

    const save = async () => {
        const request = { id, address, city, email, state: uf, zipcode, name }
        const response = await customerService.save(request);
        setOpenConfirmSave(false)
        if (response.ok) {
            setOpenAlertSave(true)
        }
    }

    return (
        <>
            <div className="profile">
                {loading ?
                    <>
                        <CircularProgress color="primary" />
                        Carregando ....
                    </>
                    : <> <p>Bem vindX {name}</p>
                        <Button variant="contained"
                            onClick={confirmExit}
                            startIcon={<Logout />}>Sair do sistema</Button>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <legend>Dados Cadastrais</legend>
                                <p><TextField
                                    label="Nome"
                                    variant="outlined"
                                    className="name"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />&nbsp;
                                    <TextField
                                        label="E-mail"
                                        variant="outlined"
                                        className="email"
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                    />&nbsp;
                                    <TextField
                                        label="Endereço de Cobrança"
                                        variant="outlined"
                                        className="address"
                                        onChange={e => setAddress(e.target.value)}
                                        value={address}
                                    />&nbsp;</p>
                                <p>
                                    <FormControl variant="outlined">
                                        <InputLabel id='uf-select-label'>UF</InputLabel>
                                        <Select
                                            labelId="uf-select-label"
                                            label="uf"
                                            value={uf}
                                            className="uf"

                                            onChange={e => setUF(e.target.value)}>
                                            <MenuItem value="AC">AC</MenuItem>
                                            <MenuItem value="AL">AL</MenuItem>
                                            <MenuItem value="AP">AP</MenuItem>
                                            <MenuItem value="AM">AM</MenuItem>
                                            <MenuItem value="BA">BA</MenuItem>
                                            <MenuItem value="CE">CE</MenuItem>
                                            <MenuItem value="DF">DF</MenuItem>
                                            <MenuItem value="ES">ES</MenuItem>
                                            <MenuItem value="GO">GO</MenuItem>
                                            <MenuItem value="MA">MA</MenuItem>
                                            <MenuItem value="MT">MT</MenuItem>
                                            <MenuItem value="MS">MS</MenuItem>
                                            <MenuItem value="MG">MG</MenuItem>
                                            <MenuItem value="PA">PA</MenuItem>
                                            <MenuItem value="PB">PB</MenuItem>
                                            <MenuItem value="PR">PR</MenuItem>
                                            <MenuItem value="PE">PE</MenuItem>
                                            <MenuItem value="PI">PI</MenuItem>
                                            <MenuItem value="RJ">RJ</MenuItem>
                                            <MenuItem value="RN">RN</MenuItem>
                                            <MenuItem value="RS">RS</MenuItem>
                                            <MenuItem value="RO">RO</MenuItem>
                                            <MenuItem value="RR">RR</MenuItem>
                                            <MenuItem value="SC">SC</MenuItem>
                                            <MenuItem value="SP">SP</MenuItem>
                                            <MenuItem value="SE">SE</MenuItem>
                                            <MenuItem value="TO">TO</MenuItem>
                                        </Select>
                                    </FormControl>&nbsp;
                                    <TextField
                                        label="Cidade"
                                        variant="outlined"
                                        className="city"
                                        onChange={e => setCity(e.target.value)}
                                        value={city}
                                    />&nbsp;
                                    <TextField
                                        label="CEP"
                                        variant="outlined"
                                        onChange={e => setZipCode(e.target.value)}
                                        value={zipcode}
                                    />
                                </p>
                                <Button
                                    variant="contained"
                                    color="success"
                                    type="submit"
                                    startIcon={<SaveIcon />}>Salvar</Button>
                            </fieldset>
                        </form>

                    </>
                }
            </div>
            <OnHomeDialog
                open={openConfirmExit}
                onClose={closeConfirmExit}
                onClickYes={logout}
                title="Você deseja sair do sistema?"
                noActionText="Não, desejo continuar logado"
                yesActionText="Sim, desejo sair"
                yesIcon={<Login />}
            />

            <OnHomeDialog
                open={openConfirmSave}
                onClose={closeConfirmSave}
                onClickYes={save}
                title="Você deseja salvar os dados?"
                noActionText="Não, manter os dados atuais"
                yesActionText="Sim, Atualizar e Sair"
                yesIcon={<SaveIcon />}
            />

            <OnHomeDialog
                open={openAlertSave}
                onClose={logout}
                onClickYes={logout}
                title="Dados Salvos com sucesso !! Você será deslogado do sistema"
                yesActionText="Continuar"
                yesIcon={<Logout />}
            />
        </>
    )
}

export default ProfilePage