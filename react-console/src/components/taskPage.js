import React, {Component} from 'react'
import { Grid , Paper, Button, ButtonGroup} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MicNoneIcon from '@material-ui/icons/MicNone';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TimerIcon from '@material-ui/icons/Timer';

class TaskPage extends Component {

    constructor() {
        super();
        this.state = {
            soundSelected : "D",
            firstWord : "dog",
            secondWord : "done",
            thirdWord : "cuddle",
            fourthWord : "good",
            fifthWord : "should",
            soundheard : false,
            currentlyOnListen : [true,false,false,false,false,false,false,false,false,false,false],
            upper : true
        };
    }

    soundClicked =()=>{
        this.setState({
            soundheard : true
        })
    }

    activateListen = (index) => {
        let arr = this.state.currentlyOnListen
        if(index<11)
            arr[index] = true
        arr[index-1] = false
        this.setState({
            currentlyOnListen : arr,
            soundheard : false
        })
    }

    changeUpper = () => {
        let up=this.state.upper
        this.setState({
            upper : !up
        })
    }

    renderListeningCards=(word, index)=>{
        const paperStyle = {padding:20, height: '220px', width:220, margin:"0 auto 0 auto", marginTop:"70px"}
        return (
            <Grid>
                <Paper elevation={3} style={paperStyle}>
                    <Grid style={{height:"160px"}}>
                        {
                            !this.state.upper &&
                            <p style={{fontSize: 60, marginTop:"0px"}}>{word.toLowerCase()}</p>
                        }
                        {
                            this.state.upper &&
                            <p style={{fontSize: "50px", marginTop:"0px"}}>{word.toUpperCase()}</p>
                        }
                    </Grid>
                    <Grid style={{height:"60px"}}>
                        <IconButton style={{backgroundColor:'#1cb0f6'}}
                                onClick={()=> this.soundClicked()}>
                            <PlayArrowIcon style={{ color: '#ffffff' }}></PlayArrowIcon>
                        </IconButton>
                    </Grid>
                </Paper>
                {
                    this.state.soundheard &&
                    <Button type='submit' color='primary' size="large" variant='contained' style={{backgroundColor:'#58cc02',  marginTop:"60px"}}
                            onClick={()=> this.activateListen(index+1)}>
                        <span style={{fontWeight: 600, width:220}}>Next</span>
                    </Button>
                }
            </Grid>
        )
    }

    renderResponseCards=(word, index)=>{
        const paperStyle = {padding:20, height: '220px', width:220, margin:"0 auto 0 auto", marginTop:"10px"}
        return(
            <Grid>
                <p style={{fontSize: 20, marginTop:"40px"}}>You Said : ...</p>
                <Paper elevation={3} style={paperStyle}>
                    <Grid style={{height:"160px"}}>
                        <Grid container item xs={12}>
                            <Grid container item xs={8} style={{alignItems:'center', justifyContent:'center'}}>
                                <CancelIcon style={{ fontSize: 40, color: '#bdbdbd' }}/>
                                <CancelIcon style={{ fontSize: 40, color: '#bdbdbd' }}/>
                                <CancelIcon style={{ fontSize: 40, color: '#bdbdbd' }}/>
                            </Grid>
                            <Grid container item xs={4} style={{alignItems:'center', justifyContent:'center'}}>
                                <CheckCircleIcon style={{ fontSize: 40, color: '#bdbdbd' }}/>
                            </Grid>
                        </Grid>
                        {
                            !this.state.upper &&
                            <p style={{fontSize: 60, marginTop:"0px"}}>{word.toLowerCase()}</p>
                        }
                        {
                            this.state.upper &&
                            <p style={{fontSize: "50px", marginTop:"0px"}}>{word.toUpperCase()}</p>
                        }
                    </Grid>
                    <Grid style={{height:"60px"}}>
                        <IconButton style={{backgroundColor:'#1cb0f6'}}
                                onClick={()=> this.soundClicked()}>
                            <MicNoneIcon style={{ color: '#ffffff' }}></MicNoneIcon>
                        </IconButton>
                    </Grid>
                </Paper>
                {
                    this.state.soundheard && index!==10 &&
                    <Button type='submit' color='primary' size="large" variant='contained' style={{backgroundColor:'#58cc02',  marginTop:"60px"}}
                            onClick={()=> this.activateListen(index+1)}>
                        <span style={{fontWeight: 600, width:220}}>Next</span>
                    </Button>
                }
                {
                    this.state.soundheard && index===10 &&
                    <Button type='submit' color='primary' size="large" variant='contained' style={{backgroundColor:'#58cc02',  marginTop:"60px"}}>
                        <span style={{fontWeight: 600, width:220}}>Finish Task</span>
                    </Button>
                }
            </Grid>
        )
    }

    render=()=>{
        const paperStyle = {padding:20, height: '220px', width:220, margin:"0 auto 0 auto", marginTop:"70px"}
        return (
            <Grid>
                <Paper elevation={3} style={{padding:0, height: '0px', backgroundColor:'#d7ffb8'}}></Paper>
                
                <Grid container item xs={12} style={{marginTop:"10px"}}>
                    <Grid container item xs={6} style={{alignItems:'center', justifyContent:'right'}}>
                        <TimerIcon style={{ fontSize: 40 }}/>
                    </Grid>
                    <Grid container item xs={6} style={{alignItems:'center', justifyContent:'left'}}>
                        <p style={{ fontSize: 30 }}> : ...</p>
                    </Grid>
                </Grid>
                {
                    this.state.upper &&
                    <ButtonGroup style={{marginTop:"30px", }}>
                        <Button style={{backgroundColor:'#1cb0f6', color: "#ffffff", width:130, fontWeight: 600}}>Upper</Button>
                        <Button variant="outlined" style={{backgroundColor:'#ffffff', width:130}}
                                onClick={()=> this.changeUpper()}>
                            Lower
                        </Button>
                    </ButtonGroup>
                }
                {
                    !this.state.upper &&
                    <ButtonGroup style={{marginTop:"30px"}}>
                        <Button style={{backgroundColor:'#ffffff', width:130}}
                                onClick={()=> this.changeUpper()}>
                            Upper
                        </Button>
                        <Button variant="outlined" style={{backgroundColor:'#1cb0f6', color: "#ffffff", width:130, fontWeight: 600}}>Lower</Button>
                    </ButtonGroup>
                }
                {
                    this.state.currentlyOnListen[0] &&
                    <Grid>
                        <Paper elevation={3} style={paperStyle}>
                            <Grid style={{height:"160px"}}>
                                {
                                    !this.state.upper &&
                                    <p style={{fontSize: 45, marginTop:"0px"}}>/{this.state.soundSelected.toLowerCase()}/</p>
                                }
                                {
                                    this.state.upper &&
                                    <p style={{fontSize: 45, marginTop:"0px"}}>/{this.state.soundSelected.toUpperCase()}/</p>
                                }
                            </Grid>
                            <Grid style={{height:"60px"}}>
                                <IconButton style={{backgroundColor:'#1cb0f6'}}
                                        onClick={()=> this.soundClicked()}>
                                    <PlayArrowIcon style={{ color: '#ffffff' }}></PlayArrowIcon>
                                </IconButton>
                            </Grid>
                        </Paper>
                        {
                            this.state.soundheard &&
                            <Button type='submit' color='primary' size="large" variant='contained' style={{backgroundColor:'#58cc02',  marginTop:"60px"}}
                                    onClick={()=> this.activateListen(1)}>
                                <span style={{fontWeight: 600, width:220}}>Next</span>
                            </Button>
                        }
                    </Grid>
                }
                {
                    this.state.currentlyOnListen[1] && this.renderListeningCards(this.state.firstWord,1)
                }
                {
                    this.state.currentlyOnListen[2] && this.renderListeningCards(this.state.secondWord,2)
                }
                {
                    this.state.currentlyOnListen[3] && this.renderListeningCards(this.state.thirdWord,3)
                }
                {
                    this.state.currentlyOnListen[4] && this.renderListeningCards(this.state.fourthWord,4)
                }
                {
                    this.state.currentlyOnListen[5] && this.renderListeningCards(this.state.fifthWord,5)
                }
                {
                    this.state.currentlyOnListen[6] && this.renderResponseCards(this.state.firstWord,6)
                }
                {
                    this.state.currentlyOnListen[7] && this.renderResponseCards(this.state.secondWord,7)
                }
                {
                    this.state.currentlyOnListen[8] && this.renderResponseCards(this.state.thirdWord,8)
                }
                {
                    this.state.currentlyOnListen[9] && this.renderResponseCards(this.state.fourthWord,9)
                }
                {
                    this.state.currentlyOnListen[10] && this.renderResponseCards(this.state.fifthWord ,10)
                }
            </Grid>
        )
    }

}

export default TaskPage;