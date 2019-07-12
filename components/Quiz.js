import React, { Component } from 'react';
import { View,Text, StyleSheet,ActivityIndicator,Image,Alert,Button,TouchableOpacity } from 'react-native';

export default  class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            categoryText:this.props.categoryText,
            quizData:[],
            isLoading:true,
            count:0,
         };
    }
    


    
    async componentDidMount() {
        console.log('componentDidMount')
        try {
            console.log('hi')
            const triviaApiCall = await fetch(`https://opentdb.com/api.php?amount=10&category=${this.state.categoryText}`);
            const dataSource = await triviaApiCall.json();
            console.log('category0 data source======>',dataSource.results)
            this.setState({quizData:dataSource.results, isLoading: false});
        } 
        catch(err) {
            console.log("Error fetching data-----------", err.message);
            Alert.alert(err.message)
        }
    }
  


  render() {
      const {isLoading,quizData}=this.state;

if(isLoading){
    return (
    <View style={styles.loader}>
        <ActivityIndicator size="small" color="#0000ff"  />
        <Text>  Starting quiz...</Text>
    </View>
    )
}

else{
    return (
        <View style={styles.container}>
            {/* view for question number and timer */}
            <View style={{flex:0.15,flexDirection:'row',justifyContent:'space-between'}} >
                <Text style={{color:'red',fontSize:17,fontWeight:'bold'}} >2 of 10</Text>
                {/* <Text>{quizData[0].category}</Text> */}
                <Text style={{color:'red',fontSize:17,fontWeight:'bold'}} >1:02</Text>
            </View>


            <View style={{flex:0.85,margin:5,}} >

            <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>{quizData[0].question}</Text>                

            <Text>{'\n'}</Text>

            <TouchableOpacity style={{backgroundColor:'#3CB371',borderColor:'#C0C0C0',borderWidth:1,margin:5,padding:15,borderRadius:25}} >
            <Text style={{fontSize:15,fontWeight:'bold'}}>{quizData[0].correct_answer}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderColor:'#C0C0C0',borderWidth:1,margin:5,padding:15,borderRadius:25}} >
            <Text style={{fontSize:15,fontWeight:'bold'}}>{quizData[0].incorrect_answers[0]}</Text>
            </TouchableOpacity>

            
            <TouchableOpacity style={{borderColor:'#C0C0C0',borderWidth:1,margin:5,padding:15,borderRadius:25}} >
            <Text style={{fontSize:15,fontWeight:'bold'}}>{quizData[0].incorrect_answers[1]}</Text>
            </TouchableOpacity>


            <TouchableOpacity style={{borderColor:'#C0C0C0',borderWidth:1,margin:5,padding:15,borderRadius:25}} >
            <Text style={{fontSize:17,fontWeight:'bold'}}>{quizData[0].incorrect_answers[2]}</Text>
            </TouchableOpacity>

            
            
            <Button title="Next" />

            </View>
            
{/*             
            <View style={{flex:0.3,}}>
            <Button title="Next" />
            </View> */}

        </View>
    );
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
      }
  });
  
