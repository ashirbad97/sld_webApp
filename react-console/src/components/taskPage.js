import React, {Component} from 'react'
import { Grid , Paper, Button, ButtonGroup} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MicNoneIcon from '@material-ui/icons/MicNone';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TimerIcon from '@material-ui/icons/Timer';
import Dialog from '@material-ui/core/Dialog';


let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = 'en-IN';
recognition.interimResults = false;

class TaskPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            soundSelected : "S",
            firstWord : "city",
            secondWord : "house",
            thirdWord : "snake",
            fourthWord : "glass",
            fifthWord : "palace",
            soundheard : false,
            soundheard1 : false,
            currentlyOnListen : [true,false,false,false,false,false,false,false,false,false,false],
            upper : true,
            time : {},
            moduleNumber : 1,
            youSaid : "",
            choicesLeft : 3,
            correctWordSpoken : false,
            started : false,
            isTimeOver : false,
            time1 : {"s" : 5}
        };
        this.timer=0;
        this.timer1=0;
        this.started = false
    }


    componentDidMount() {
        this.setState({ time: {
            "m": 5,
            "s": 0
          },
            seconds : 300 });
        
    }

    startTimer=()=> {
        if (this.timer === 0 && this.state.seconds > 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
    }

    startTimer1=()=>{
        if (this.timer1 === 0 && this.state.time1.s > 0) {
            this.timer1 = setInterval(this.countDown1, 1000);
          }
    }

    secondsToTime=(secs)=>{
        let minutes = Math.floor(secs / 60);
        let divisor_for_seconds = secs % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        let obj = {
          "m": minutes,
          "s": seconds
        };
        return obj;
      }

    countDown1=()=> {
        let seconds = this.state.time1.s - 1;
        this.setState({
            time1 : {"s":seconds},
        });
        if (seconds === 0) { 
          clearInterval(this.timer1);
          this.props.redirectToBlankPage();
        }
    }

    countDown=()=> {
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
        if (seconds === 0) { 
          clearInterval(this.timer);
          this.setState({isTimeOver : true});
          this.startTimer1();
        }
    }

    soundClicked =(word,index)=>{
        this.setState({
            soundheard : true
        });
        if(index>0){
            let url = "http://localhost:5000/assets/audio/tts/" + word.toLowerCase()+".mp3"
            let audio = new Audio(url);
            audio.play();
        }
        if(index===0){
            let url = "http://localhost:5000/assets/audio/l" + this.state.moduleNumber+"/"+ word.toLowerCase()+".m4a"
            let audio = new Audio(url);
            audio.play();
        }
    }

    soundClicked1=(word)=>{
        if(this.started===true){
            recognition.stop();
        }
        this.started = true
        this.resultEval(word)
    }

    resultEval=(word)=>{
        try{
            recognition.start();
            recognition.onresult = event =>{
                let result = event.results[0][0].transcript.toLowerCase();
                this.setState({
                    youSaid : result
                })
                if(result===word){
                    this.setState({ correctWordSpoken : true })
                }
                else if(result!==word && this.state.choicesLeft>0){
                    this.setState({ choicesLeft : this.state.choicesLeft-1 })
                }
            }
        }
        catch{
            this.started = false
            recognition.stop();
        }
    }

    activateListen = (index) => {
        let arr = this.state.currentlyOnListen
        if(index<11)
            arr[index] = true
        arr[index-1] = false
        this.setState({
            currentlyOnListen : arr,
            soundheard : false,
            soundheard1 : false,
            correctWordSpoken : false,
            choicesLeft : 3,
            youSaid : ""
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
                        <p style={{fontSize: 60, marginTop:"0px"}}>{word.toLowerCase()}</p>
                    </Grid>
                    <Grid style={{height:"60px"}}>
                        <IconButton style={{backgroundColor:'#1cb0f6'}}
                                onClick={()=> this.soundClicked(word,index)}>
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
                <p style={{fontSize: 20, marginTop:"40px"}}>You Said : {this.state.youSaid}</p>
                <Paper elevation={3} style={paperStyle}>
                    <Grid style={{height:"160px"}}>
                        <Grid container item xs={12}>
                            <Grid container item xs={8} style={{alignItems:'center', justifyContent:'center'}}>
                                {this.state.choicesLeft===3 &&
                                    <CancelIcon style={{ fontSize: 40, color: '#bdbdbd' }}/>
                                }
                                {this.state.choicesLeft<3 &&
                                    <CancelIcon style={{ fontSize: 40, color: '#FF6347' }}/>
                                }
                                {this.state.choicesLeft>=2 &&
                                    <CancelIcon style={{ fontSize: 40, color: '#bdbdbd' }}/>
                                }
                                {this.state.choicesLeft<2 &&
                                    <CancelIcon style={{ fontSize: 40, color: '#FF6347' }}/>
                                }
                                {this.state.choicesLeft>=1 &&
                                    <CancelIcon style={{ fontSize: 40, color: '#bdbdbd' }}/>
                                }
                                {this.state.choicesLeft<1 &&
                                    <CancelIcon style={{ fontSize: 40, color: '#FF6347' }}/>
                                }
                            </Grid>
                            <Grid container item xs={4} style={{alignItems:'center', justifyContent:'center'}}>
                                {this.state.correctWordSpoken &&
                                    <CheckCircleIcon style={{ fontSize: 40, color: '#58cc02' }}/>
                                }
                                {!this.state.correctWordSpoken &&
                                    <CheckCircleIcon style={{ fontSize: 40, color: '#bdbdbd' }}/>
                                }
                            </Grid>
                        </Grid>
                        <p style={{fontSize: 60, marginTop:"0px"}}>{word.toLowerCase()}</p>
                    </Grid>
                    <Grid style={{height:"60px"}}>
                        {(this.state.choicesLeft>0) &&
                            <IconButton style={{backgroundColor:'#1cb0f6'}}
                                    onClick={()=> this.soundClicked1(word)}>
                                <MicNoneIcon style={{ color: '#ffffff' }}></MicNoneIcon>
                            </IconButton>
                        }
                        {(this.state.choicesLeft===0) &&
                            <IconButton style={{backgroundColor:'#1cb0f6'}}>
                                <MicNoneIcon style={{ color: '#ffffff' }}></MicNoneIcon>
                            </IconButton>
                        }
                    </Grid>
                </Paper>
                {
                    this.state.correctWordSpoken && index!==10 &&
                    <Button type='submit' color='primary' size="large" variant='contained' style={{backgroundColor:'#58cc02',  marginTop:"60px"}}
                            onClick={()=> this.activateListen(index+1)}>
                        <span style={{fontWeight: 600, width:220}}>Next</span>
                    </Button>
                }
                {
                    this.state.correctWordSpoken && index===10 &&
                    <Button type='submit' color='primary' size="large" variant='contained' style={{backgroundColor:'#58cc02',  marginTop:"60px"}}>
                        <span style={{fontWeight: 600, width:220}}>Finish Task</span>
                    </Button>
                }
            </Grid>
        )
    }

    check=()=>{
        if(this.state.choicesLeft===0){
            this.setState({isTimeOver : true});
            this.startTimer1();
        }
    }

    twoDigit=(sec)=>{
        return (String(sec).length===2 ? sec : ("0"+String(sec)))
    }
    

    render=()=>{
        const paperStyle = {padding:20, height: '220px', width:220, margin:"0 auto 0 auto", marginTop:"70px"};
        this.startTimer();
        if(!this.state.isTimeOver)
            {this.check(); }
        return (
            <Grid>
                <Paper elevation={3} style={{padding:0, height: '0px', backgroundColor:'#d7ffb8'}}></Paper>

                <Grid style={{alignItems:'center', justifyContent:'center', marginTop:"20px"}}>
                    <TimerIcon style={{ fontSize: 30 }}/>
                </Grid>
                <Grid style={{alignItems:'center', justifyContent:'center', marginTop:"-20px", marginBottom:"10px"}}>
                    <p style={{ fontSize: 20 }}>{this.state.time.m} : {this.twoDigit(this.state.time.s)}</p>
                </Grid>
                <Dialog open={this.state.isTimeOver} aria-labelledby="form-dialog-title">
                    <Paper elevation={3} align='center' style={{padding:2, height: '300px', width:260, margin:"0 auto 0 auto", marginTop:"0px"}}>
                    <p style={{fontSize: 40, marginTop:"30px"}}>Session Over!</p>
                    {this.state.time1.s}
                    </Paper>
                </Dialog>
                {
                    this.state.currentlyOnListen[0] &&
                    <Grid>
                        <Paper elevation={3} style={paperStyle}>
                            <Grid style={{height:"160px"}}>
                                 <p style={{fontSize: 45, marginTop:"0px"}}>/{this.state.soundSelected.toLowerCase()}/</p>
                            </Grid>
                            <Grid style={{height:"60px"}}>
                                <IconButton style={{backgroundColor:'#1cb0f6'}}
                                        onClick={()=> this.soundClicked(this.state.soundSelected,0)}>
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