import React, {Component} from 'react'
import {Paper, Grid, Button, Avatar} from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import Filter4Icon from '@material-ui/icons/Filter4';
import Filter5Icon from '@material-ui/icons/Filter5';
import Filter6Icon from '@material-ui/icons/Filter6';
import Filter7Icon from '@material-ui/icons/Filter7';
import Filter8Icon from '@material-ui/icons/Filter8';
import InfoIcon from '@material-ui/icons/Info';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Dialog from '@material-ui/core/Dialog';



class MainModulePage extends Component {
    state={
        isDashboardClicked : false,
        isInfoClicked : false,
        totalPlaytime : 470,
        totalSessions : 94,
        currentRank : 4
    }

    popupDasboard = () =>{
        this.setState({
            isDashboardClicked: true
        })
    }

    popupInfo = () =>{
        this.setState({
            isInfoClicked: true
        })
    }

    handleClose = () =>{
        this.setState({
            isDashboardClicked: false,
            isInfoClicked: false
        })
    }

    render(){
        const avatarStyle = {backgroundColor:'#77DD77'}
        const paperStyle = {padding:20, height: '40px', width:320, margin:"0 auto 0 auto", marginTop:"20px"}
        return (
            <Grid>
                <Paper elevation={3} style={{padding:20, height: '40px', backgroundColor:'#Fddfe0'}}>
                    <Grid container item xs={12}>
                        <Grid container item xs={2} style={{alignItems:'center', justifyContent:'center'}}>
                            <Button type='submit' color='primary' style={{marginTop:"-20px"}}
                                onClick={()=>this.popupDasboard()}>
                                <DashboardIcon style={{ fontSize: 35, color: '#ff4b4b' }}/>
                            </Button>
                        </Grid>
                        <Grid container item xs={8} style={{alignItems:'center', justifyContent:'center'}}>
                            <h1 align= {'center'} style={{marginTop:"0px", fontFamily: 'MMA Champ'}}>Welcome!</h1>
                        </Grid>
                        <Grid container item xs={2}>
                            <Button type='submit' color='primary' style={{marginTop:"-20px"}}
                                onClick={()=>this.popupInfo()}>
                                <InfoIcon style={{ fontSize: 35, color: '#ff4b4b' }}/>
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Dialog open={this.state.isDashboardClicked} onClose={()=>this.handleClose()} aria-labelledby="form-dialog-title">
                    <Paper elevation={3} align='center' style={{padding:2, height: '360px', width:300, margin:"0 auto 0 auto", marginTop:"0px"}}>
                        <DashboardIcon style={{ fontSize: 35, color: '#ff4b4b', marginTop:"20px" }}/>
                        <Grid align='center' container item xs={12} style={{marginTop:"20px"}}>
                            <Grid container item xs={6} style={{alignItems:'center', justifyContent:'center'}}>
                                <Paper elevation={3} align='center' style={{padding:20, height: '60px', width:60, margin:"0 auto 0 auto", marginTop:"0px"}}>
                                    <h1 style={{marginTop:"-10px", fontFamily: 'MMA Champ'}}>{this.state.totalPlaytime}</h1>
                                    <h4 style={{fontFamily: 'MMA Champ'}}>Playtime</h4>
                                </Paper>
                            </Grid>
                            <Grid container item xs={6} style={{alignItems:'center', justifyContent:'center'}}>
                                <Paper elevation={3} style={{padding:20, height: '60px', width:60, margin:"0 auto 0 auto", marginTop:"0px"}}>
                                    <h1 style={{marginTop:"-10px", fontFamily: 'MMA Champ'}}>{this.state.totalSessions}</h1>
                                    <h4 style={{fontFamily: 'MMA Champ'}}>Sessions</h4>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid align="center" style={{marginTop:"20px"}}>
                        <Paper elevation={3} style={{padding:20, height: '60px', width:60, margin:"0 auto 0 auto", marginTop:"0px"}}>
                                    <h1 style={{marginTop:"-10px", fontFamily: 'MMA Champ'}}>{this.state.currentRank}</h1>
                                    <h4 style={{fontFamily: 'MMA Champ'}}>Level</h4>
                                </Paper>
                        </Grid>
                        <Button type='submit' color='primary' variant='contained' style={{marginTop:"15px", backgroundColor:'#47b0e2'}}
                            onClick={()=>this.handleClose()}>
                            close
                        </Button>
                    </Paper>
                </Dialog>
                <Dialog open={this.state.isInfoClicked} onClose={()=>this.handleClose()} aria-labelledby="form-dialog-title">
                    <Paper elevation={3} align='center' style={{padding:2, height: '360px', width:300, margin:"0 auto 0 auto", marginTop:"0px"}}>
                        <InfoIcon style={{ fontSize: 35, color: '#ff4b4b', marginTop:"20px" }}/>
                        <Grid style={{height: '220px'}}>
                            <h3>Some info ...</h3>
                            <h3>Some info ...</h3>
                            <h3>Some info ...</h3>
                            <h3>Some info ...</h3>
                        </Grid>
                        <Button type='submit' color='primary' variant='contained' style={{marginTop:"15px", backgroundColor:'#47b0e2'}}
                            onClick={()=>this.handleClose()}>
                            close
                        </Button>
                    </Paper>
                </Dialog>
                <Paper elevation={3} style={paperStyle}>
                    <Grid container item xs={12}>
                        <Grid container item xs={2}>
                            {1<=this.state.currentRank ?
                                <Filter1Icon style={{ fontSize: 35, color: '#00BFFF' }}/>
                                :
                                <Filter1Icon style={{ fontSize: 35, color: '#bdbdbd' }}/>
                            }
                        </Grid>
                        <Grid container item xs={8}>
                            {1<=this.state.currentRank ?
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ'}}>MODULE 1</h1>
                                :
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ', color: '#bdbdbd' }}>MODULE 1</h1>
                            }
                        </Grid>
                        <Grid container item xs={2}>
                            <Button type='submit' color='primary' style={{marginTop:"-20px"}}>
                                {1<=this.state.currentRank ?
                                    <Avatar style={avatarStyle}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                    :
                                    <Avatar style={{backgroundColor: '#bdbdbd'}}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={3} style={paperStyle}>
                    <Grid container item xs={12}>
                        <Grid container item xs={2}>
                            {2<=this.state.currentRank ?
                                <Filter2Icon style={{ fontSize: 35, color: '#6A0DAD' }}/>
                                :
                                <Filter2Icon style={{ fontSize: 35, color: '#bdbdbd' }}/>
                            }
                        </Grid>
                        <Grid container item xs={8}>
                            {2<=this.state.currentRank ?
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ'}}>MODULE 2</h1>
                                :
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ', color: '#bdbdbd' }}>MODULE 2</h1>
                            }
                        </Grid>
                        <Grid container item xs={2}>
                            <Button type='submit' color='primary' style={{marginTop:"-20px"}}>
                                {2<=this.state.currentRank ?
                                    <Avatar style={avatarStyle}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                    :
                                    <Avatar style={{backgroundColor: '#bdbdbd'}}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={3} style={paperStyle}>
                    <Grid container item xs={12}>
                        <Grid container item xs={2}>
                            {3<=this.state.currentRank ?
                                <Filter3Icon style={{ fontSize: 35, color: '#FDD017' }}/>
                                :
                                <Filter3Icon style={{ fontSize: 35, color: '#bdbdbd' }}/>
                            }
                        </Grid>
                        <Grid container item xs={8}>
                            {3<=this.state.currentRank ?
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ'}}>MODULE 3</h1>
                                :
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ', color: '#bdbdbd' }}>MODULE 3</h1>
                            }
                        </Grid>
                        <Grid container item xs={2}>
                            <Button type='submit' color='primary' style={{marginTop:"-20px"}}>
                                {3<=this.state.currentRank ?
                                    <Avatar style={avatarStyle}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                    :
                                    <Avatar style={{backgroundColor: '#bdbdbd'}}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={3} style={paperStyle}>
                    <Grid container item xs={12}>
                        <Grid container item xs={2}>
                            {4<=this.state.currentRank ?
                                <Filter4Icon style={{ fontSize: 35, color: '#FF5F1F' }}/>
                                :
                                <Filter4Icon style={{ fontSize: 35, color: '#bdbdbd' }}/>
                            }
                        </Grid>
                        <Grid container item xs={8}>
                            {4<=this.state.currentRank ?
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ'}}>MODULE 4</h1>
                                :
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ', color: '#bdbdbd' }}>MODULE 4</h1>
                            }
                        </Grid>
                        <Grid container item xs={2}>
                            <Button type='submit' color='primary' style={{marginTop:"-20px"}}>
                                {4<=this.state.currentRank ?
                                    <Avatar style={avatarStyle}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                    :
                                    <Avatar style={{backgroundColor: '#bdbdbd'}}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={3} style={paperStyle}>
                    <Grid container item xs={12}>
                        <Grid container item xs={2}>
                            {5<=this.state.currentRank ?
                                <Filter5Icon style={{ fontSize: 35, color: '#F67280' }}/>
                                :
                                <Filter5Icon style={{ fontSize: 35, color: '#bdbdbd' }}/>
                            }
                        </Grid>
                        <Grid container item xs={8}>
                            {5<=this.state.currentRank ?
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ'}}>MODULE 5</h1>
                                :
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ', color: '#bdbdbd' }}>MODULE 5</h1>
                            }
                        </Grid>
                        <Grid container item xs={2}>
                            <Button type='submit' color='primary' style={{marginTop:"-20px"}}>
                                {5<=this.state.currentRank ?
                                    <Avatar style={avatarStyle}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                    :
                                    <Avatar style={{backgroundColor: '#bdbdbd'}}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={3} style={paperStyle}>
                    <Grid container item xs={12}>
                        <Grid container item xs={2}>
                            {6<=this.state.currentRank ?
                                <Filter6Icon style={{ fontSize: 35, color: '#EDDA74' }}/>
                                :
                                <Filter6Icon style={{ fontSize: 35, color: '#bdbdbd' }}/>
                            }
                        </Grid>
                        <Grid container item xs={8}>
                            {6<=this.state.currentRank ?
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ'}}>MODULE 6</h1>
                                :
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ', color: '#bdbdbd' }}>MODULE 6</h1>
                            }
                        </Grid>
                        <Grid container item xs={2}>
                            <Button type='submit' color='primary' style={{marginTop:"-20px"}}>
                                {6<=this.state.currentRank ?
                                    <Avatar style={avatarStyle}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                    :
                                    <Avatar style={{backgroundColor: '#bdbdbd'}}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={3} style={paperStyle}>
                    <Grid container item xs={12}>
                        <Grid container item xs={2}>
                            {7<=this.state.currentRank ?
                                <Filter7Icon style={{ fontSize: 35, color: '#7D0552' }}/>
                                :
                                <Filter7Icon style={{ fontSize: 35, color: '#bdbdbd' }}/>
                            }
                        </Grid>
                        <Grid container item xs={8}>
                            {7<=this.state.currentRank ?
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ'}}>MODULE 7</h1>
                                :
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ', color: '#bdbdbd' }}>MODULE 7</h1>
                            }
                        </Grid>
                        <Grid container item xs={2}>
                            <Button type='submit' color='primary' style={{marginTop:"-20px"}}>
                                {7<=this.state.currentRank ?
                                    <Avatar style={avatarStyle}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                    :
                                    <Avatar style={{backgroundColor: '#bdbdbd'}}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={3} style={{padding:20, height: '40px', width:320, margin:"0 auto 0 auto", marginTop:"20px", marginBottom:"20px"}}>
                    <Grid container item xs={12}>
                        <Grid container item xs={2}>
                            {8<=this.state.currentRank ?
                                <Filter8Icon style={{ fontSize: 35, color: '#00CED1' }}/>
                                :
                                <Filter8Icon style={{ fontSize: 35, color: '#bdbdbd' }}/>
                            }
                        </Grid>
                        <Grid container item xs={8}>
                            {8<=this.state.currentRank ?
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ'}}>MODULE 8</h1>
                                :
                                <h1 style={{marginTop:"0px", textAlign: "left", fontFamily: 'MMA Champ', color: '#bdbdbd' }}>MODULE 8</h1>
                            }
                        </Grid>
                        <Grid container item xs={2}>
                            <Button type='submit' color='primary' style={{marginTop:"-20px"}}>
                                {8<=this.state.currentRank ?
                                    <Avatar style={avatarStyle}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                    :
                                    <Avatar style={{backgroundColor: '#bdbdbd'}}>
                                        <ArrowForwardIosIcon/>
                                    </Avatar>
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

export default MainModulePage;
