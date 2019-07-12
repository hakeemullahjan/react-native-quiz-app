import React from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity,Image,ImageBackground,ActivityIndicator } from 'react-native';
import DetectFace from './components/DetectFace';
import Quiz from './components/Quiz';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isCameraOpen:false,
      isQuizStart:false,
      quizData:[],
      isLoading:true,
      categoryText:0,
      isWallpaper:true,
    };
    this._backCamera=this._backCamera.bind(this);
    this._startTheQuiz=this._startTheQuiz.bind(this);

  }



    componentDidMount(){
      setTimeout(()=>{
        this.setState({isWallpaper:false})
      },3000)
    } 



  _backCamera(isCameraOpen){
    console.log('isCameraOpen=====>',isCameraOpen);
    this.setState({isCameraOpen:isCameraOpen})
  }

  _startTheQuiz(isQuizStart){
    console.log('isQuizStart======>',isQuizStart)
    this.setState({isQuizStart:isQuizStart})
  
  }

  _handleCategoryText(cat){
    console.log(cat);
    this.setState({categoryText:cat,isCameraOpen:true})
  }





  render(){
    const {isCameraOpen,isQuizStart,categoryText,isWallpaper}=this.state;
    // console.log(this.state.categoryText)
    // console.log('rendering quiz data--------->',this.state.quizData)
    if(isWallpaper){
      // return <Image source={require('./assets/b30da6743a707ff361f3f07e7736c2a2.jpg')} style={{width:'100%',height:'100%'}} />
      
      return(
      <ImageBackground source={require('./assets/99570cb3499312649e672ddb400a014f.jpg')} style={{width: '100%', height: '100%'}}>
      
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text style={{ fontSize:40,fontWeight:'bold'}}>QUIZ WHIZ ⚡</Text>
      <Text  >by HAKEEMULLAH JAN YOUSUFZAI</Text>
      <ActivityIndicator size="large" color="#000000" />
      </View>
      
       </ImageBackground>
      )
      
    }

    else if(isCameraOpen){
      return <DetectFace _backCamera={this._backCamera} _startTheQuiz={this._startTheQuiz} ></DetectFace> 
    }
    
    else if(isQuizStart && !isCameraOpen){
      return <Quiz categoryText={categoryText} ></Quiz>
    }

    else if(!isCameraOpen && !isQuizStart){
      return (
        <View style={styles.container}>
          <Text style={{fontSize:30,fontWeight:'bold'}} >QUIZ WHIZ ⚡</Text>
          {/* <Button title='detect face' onPress={()=>this.setState({isCameraOpen:true})} /> */}


<Text>{'\n'}</Text>
<Text>{'\n'}</Text>
<Text>{'\n'}</Text>




          <View style={styles.category}>
            
<TouchableOpacity style={styles.categoryTouchableOpacity} onPress={this._handleCategoryText.bind(this,9)} >
<Image source={require('./assets/categories/mzl.hyrksjtg.jpg')} style={styles.categoryImage}   />
<Text style={styles.categoryText}>General</Text>
<Text style={styles.categoryText}>Knowledge</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.categoryTouchableOpacity} onPress={this._handleCategoryText.bind(this,18)}>
<Image source={require('./assets/categories/computer-science.jpeg')} style={styles.categoryImage}   />
<Text style={styles.categoryText}>Computer</Text>
<Text style={styles.categoryText}>Science</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.categoryTouchableOpacity} onPress={this._handleCategoryText.bind(this,21)}>
<Image source={require('./assets/categories/images.jpg')} style={styles.categoryImage}   />
<Text style={styles.categoryText}>Sports</Text>
</TouchableOpacity>


<TouchableOpacity style={styles.categoryTouchableOpacity} onPress={this._handleCategoryText.bind(this,23)}>
<Image source={require('./assets/categories/download.jpg')} style={styles.categoryImage}   />
<Text style={styles.categoryText}>History</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.categoryTouchableOpacity} onPress={this._handleCategoryText.bind(this,24)}>
<Image source={require('./assets/categories/political-change-definition-and-explanation_107685.jpg')} style={styles.categoryImage}   />
<Text style={styles.categoryText}>Politics</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.categoryTouchableOpacity} onPress={this._handleCategoryText.bind(this,29)}>
<Image source={require('./assets/categories/entertainment-and-media.png')} style={styles.categoryImage}   />
<Text style={styles.categoryText}>Entertainmet</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.categoryTouchableOpacity} onPress={this._handleCategoryText.bind(this,32)}>
<Image source={require('./assets/categories/cartoons.jpg')} style={styles.categoryImage}   />
<Text style={styles.categoryText}>Cartoons</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.categoryTouchableOpacity} onPress={this._handleCategoryText.bind(this,22)}>
<Image source={require('./assets/categories/geo.jpg')} style={styles.categoryImage}   />
<Text style={styles.categoryText}>Geography</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.categoryTouchableOpacity} onPress={this._handleCategoryText.bind(this,19)}>
<Image source={require('./assets/categories/mathematics-936697_1920.jpg')} style={styles.categoryImage}   />
<Text style={styles.categoryText}>Mathematic</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.categoryTouchableOpacity} onPress={this._handleCategoryText.bind(this,25)}>
<Image source={require('./assets/categories/art.jpg')} style={styles.categoryImage}   />
<Text style={styles.categoryText}>Art</Text>
</TouchableOpacity>



          </View>
          
        </View>
      );
      }
    
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop:30,
    margin:8,
    // borderWidth:2,
  },
  category:{
    flex: 1,
        flexDirection: 'row',
         //  alignItems: 'center',
        flexWrap:'wrap',
        justifyContent: 'center',
  },
  categoryTouchableOpacity:{
    margin:8,
    alignItems:'center',
  },
  categoryImage:{
    width:70,
    height:70,
    borderRadius:15,
  },
  categoryText:{
    fontSize:10,
    fontWeight:'bold', 
  }

});
