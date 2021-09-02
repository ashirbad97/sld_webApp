import React from 'react'
import {Avatar, Button, Grid, Paper, TextField} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const LoginFrame =()=>{
    const paperStyle = {padding:20, height: '50vh', width:280, margin:"10% auto 0 auto"}
    const avatarStyle = {backgroundColor:'#1bbd7e'}
    const buttonStyle = {backgroundColor:'#47b0e2', marginTop:"55px"}
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
                <Button type='submit' color='primary' fullWidth variant='contained' style={buttonStyle}>
                    Sign In
                </Button>
            </Paper>
        </Grid>
    )
}

export default LoginFrame