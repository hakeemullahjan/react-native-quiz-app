import React, { Component } from 'react';
import { View,Text, StyleSheet,ActivityIndicator,Image,Alert,Button,TouchableOpacity ,NativeModules    } from 'react-native';

export default  class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            categoryText:this.props.categoryText,
            quizData:[],
            isLoading:true,
            count:0,
            opt1Color:'#fff',
            opt2Color:'#fff',
            opt3Color:'#fff',
            opt4Color:'#fff',
            queCount:0,
            selectedOption:'',
            correctAnswerCounts:0,
            isQuizFinished:false,
            minute:0,
            second:0,
         };
         this._nextQuestion=this._nextQuestion.bind(this);
         this.startTimer = this.startTimer.bind(this)
            this.stopTimer = this.stopTimer.bind(this)
    }
    



    startTimer() {
        this.setState({
          time: this.state.time,
          start: Date.now() - this.state.time,
          isOn: true
        })

        

        this.timer = setInterval(() => {
            // this.setState({time: Date.now() - this.state.start,second:Math.round(this.state.time/1000),})
            this.setState({second:this.state.second+1})

            if(this.state.second===59){
                this.setState({minute:this.state.minute+1,second:0})
            }
        },1000)
        
        

      

      }

      stopTimer() {
        clearInterval(this.timer)
      }



    
    async componentDidMount() {
        console.log('componentDidMount')
        try {
            console.log('hi')
            const triviaApiCall = await fetch(`https://opentdb.com/api.php?amount=10&category=${this.state.categoryText}`);
            const dataSource = await triviaApiCall.json();
            console.log('category0 data source======>',dataSource.results)
            this.setState({quizData:dataSource.results, isLoading: false});
            this.startTimer();
        } 
        catch(err) {
            console.log("Error fetching data-----------", err.message);
            Alert.alert(err.message)
        }
    }
  

    
        _selectAnswer(a){
            console.log('selected answer----->',a);
            let selectedOption=this.state.selectedOption;
            this.setState({selectedOption:a})
            let queCount=this.state.queCount
            //changing answer option color
            let opt1=this.state.quizData[queCount].correct_answer;
            let opt2=this.state.quizData[queCount].incorrect_answers[0];
            let opt3=this.state.quizData[queCount].incorrect_answers[1];
            let opt4=this.state.quizData[queCount].incorrect_answers[2];
            
            console.log(opt1,opt2,opt3,opt4);

            if(a===opt1){
                this.setState({opt1Color:'#3CB371'})
                this.setState({opt2Color:'#fff'})
                this.setState({opt3Color:'#fff'})
                this.setState({opt4Color:'#fff'})
            }
            else if(a===opt2){
                this.setState({opt1Color:'#fff'})
                this.setState({opt2Color:'#3CB371'})
                this.setState({opt3Color:'#fff'})
                this.setState({opt4Color:'#fff'})
            }
            else if(a===opt3){
                this.setState({opt1Color:'#fff'})
                this.setState({opt2Color:'#fff'})
                this.setState({opt3Color:'#3CB371'})
                this.setState({opt4Color:'#fff'})
            }
            else if(a===opt4){
                this.setState({opt1Color:'#fff'})
                this.setState({opt2Color:'#fff'})
                this.setState({opt3Color:'#fff'})
                this.setState({opt4Color:'#3CB371'})
            }



        }



        _nextQuestion(){

            let correctAnswerCounts=this.state.correctAnswerCounts;
            let selectedOption=this.state.selectedOption;
            let queCount=this.state.queCount;
            let correct_answer=this.state.quizData[queCount].correct_answer;

            if(selectedOption===correct_answer){
                this.setState({correctAnswerCounts:this.state.correctAnswerCounts+1})
            }


            if(queCount===9){
                this.stopTimer()
                this._finishQuiz();
            }



            this.setState({queCount:this.state.queCount+1})
            this.setState({opt1Color:'#fff'})
            this.setState({opt2Color:'#fff'})
            this.setState({opt3Color:'#fff'})
            this.setState({opt4Color:'#fff'})

        }


        _finishQuiz(){
            console.log('quiz finished')
            this.setState({isQuizFinished:true})
        }


  render() {
      const {isLoading,quizData,opt1Color,opt2Color,opt3Color,opt4Color,queCount,selectedOption,isQuizFinished,correctAnswerCounts,minute,second}=this.state;

      console.log('selected option--------->',selectedOption)
      console.log('corrected answer counts------>',this.state.correctAnswerCounts)

    

if(isLoading){
    return (
    <View style={styles.loader}>
        <ActivityIndicator size="small" color="#0000ff"  />
        <Text>  Starting quiz...</Text>
    </View>
    )
}

else if(!isQuizFinished){
    let opt1=quizData[queCount].correct_answer;
    let opt2=quizData[queCount].incorrect_answers[0];
    let opt3=quizData[queCount].incorrect_answers[1];
    let opt4=quizData[queCount].incorrect_answers[2];

    return (
        <View style={styles.container}>
            {/* view for question number and timer */}
            <View style={{flex:0.15,flexDirection:'row',justifyContent:'space-between'}} >
                <Text style={{color:'red',fontSize:17,fontWeight:'bold'}} >{queCount+1} of 10</Text>
                {/* <Text>{quizData[0].category}</Text> */}
                <Text style={{color:'red',fontSize:17,fontWeight:'bold'}} >{minute}:{second<=9 ? `0${second}`:`${second}`}</Text>
            </View>


            <View style={{flex:0.85,margin:5,}} >

            <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>{quizData[queCount].question}</Text>                

            <Text>{'\n'}</Text>



            <TouchableOpacity  style={{backgroundColor:opt1Color,borderColor:'#C0C0C0',borderWidth:1,margin:5,padding:15,borderRadius:25,}}   onPress={this._selectAnswer.bind(this,opt1)} >
            <Text style={{fontSize:15,fontWeight:'bold'}}>{opt1}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:opt2Color,borderColor:'#C0C0C0',borderWidth:1,margin:5,padding:15,borderRadius:25,}} onPress={this._selectAnswer.bind(this,opt2)} >
            <Text style={{fontSize:15,fontWeight:'bold'}}>{opt2}</Text>
            </TouchableOpacity>

            
            {
                !!opt3 && 
                <TouchableOpacity style={{backgroundColor:opt3Color,borderColor:'#C0C0C0',borderWidth:1,margin:5,padding:15,borderRadius:25,}} onPress={this._selectAnswer.bind(this,opt3)} >
                <Text style={{fontSize:15,fontWeight:'bold'}}>{opt3}</Text>
                </TouchableOpacity>
    
            }


            {
              !!opt4 && 
              <TouchableOpacity style={{backgroundColor:opt4Color,borderColor:'#C0C0C0',borderWidth:1,margin:5,padding:15,borderRadius:25}} onPress={this._selectAnswer.bind(this,opt4)} >
              <Text style={{fontSize:17,fontWeight:'bold'}}>{opt4}</Text>
              </TouchableOpacity>

            }
            

            <View style={{marginTop:20}}>
            <Button title="Next"   onPress={this._nextQuestion}   />
            </View>
            

            </View>
            
{/*             
            <View style={{flex:0.3,}}>
            <Button title="Next" />
            </View> */}

        </View>
    );
}
else if(isQuizFinished){
    return(
        <View style={styles.finishedContainer} >

            <View>

{
    correctAnswerCounts>=5?
    <View style={{alignItems:'center'}}>
        <Image source={require('../assets/879486_green_512x512.png')} style={{width:100,height:100}} />
        <Text style={{fontSize:28,fontWeight:'bold'}}>Wow! you are brilliant</Text>
    </View>
    :
    <View style={{alignItems:'center'}}>
        <Image source={require('../assets/17c52fbb9e.png')} style={{width:100,height:100}} />
        <Text style={{fontSize:28,fontWeight:'bold'}} >Sorry! Try again</Text>
    </View>
}
<Text>{'\n'}</Text>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{alignItems:'center',margin:10}}>
<Text style={{fontSize:18,fontWeight:'bold'}}>{correctAnswerCounts}/10 ({correctAnswerCounts}0%)</Text>
<Text>Points</Text>
</View>

<View style={{alignItems:'center',margin:10}}>
<Text style={{fontSize:18,fontWeight:'bold'}}>{minute}:{second}</Text>
<Text>Time to compolete</Text>
</View>
</View>

           <Button title='Back to home' onPress={()=>NativeModules.DevSettings.reload()} />
           
            </View>            
        </View>
    )
}

    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
      marginTop:30,
      margin:8,
    //   borderWidth:2,
    },
    loader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
      },
      answerTouchableOpacity:{
        // backgroundColor:'#3CB371',
        borderColor:'#C0C0C0',borderWidth:1,margin:5,padding:15,borderRadius:25,
      },
      finishedContainer:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30,
        margin:8,
        // borderWidth:1
      },
  });
  
