import React from "react"
import { ArrowBack } from "@mui/icons-material"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material"


const OnHomeDialog = props => {
    let noActionButton
    if (props.noActionText) {
        noActionButton = <Button color="error"
            onClick={props.onClose}
            startIcon={<ArrowBack />}>{props.noActionText}</Button>
    }
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle>
                OnHome
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.title}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {noActionButton}
                <Button color="info"
                    variant="contained"
                    onClick={props.onClickYes}
                    autoFocus
                    startIcon={props.yesIcon}>
                    {props.yesActionText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default OnHomeDialog