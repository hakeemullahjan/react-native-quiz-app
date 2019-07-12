import React from 'react';
import { Text, View, TouchableOpacity ,Alert,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';



export default class CameraExample extends React.Component {
  constructor(props){
    super(props);
    this.state={
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      faces:[],
      isQuizStart:false,
      photo:null,
    };

    // this.handleFacesDetected=this.handleFacesDetected.bind(this);
    // this.snap=this.snap.bind(this);
    this._startQuiz=this._startQuiz.bind(this);
    this._cancelQuiz=this._cancelQuiz.bind(this);
    this.back=this.back.bind(this);
  }
  

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }



//   handleFacesDetected = ({ faces }) => {
//     // console.log('face detected')
//       // console.log(faces)
//       this.setState({ faces });
// };


async _capturePicture() {
  console.log(this.camera)
  console.log('taking picture=====>')
  const photo = await this.camera.takePictureAsync()
  console.log('photo *********', photo);
  this.setState({photo: photo.uri})


  //after getting image checking face(face detectio)!
  const options = { mode: FaceDetector.Constants.Mode.fast };
  let detected= await FaceDetector.detectFacesAsync(photo.uri, options);

  console.log('face detected======>',detected);
  
  
  if(detected.faces.length>0){
    Alert.alert(
      'START QUIZ',
      'Do you really want to start quiz?',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: this._cancelQuiz,
          style: 'cancel',
        },
        {text: 'OK', onPress: this._startQuiz},
      ],
      {cancelable: false},
    );
    // console.log(this.state.isQuizStart)
      }
      else{
        // Alert.alert('No face found!',[{text: 'OK', onPress:  this.setState({photo:null})}]);
        
        Alert.alert('Uh-oh!','No face found',[{text: 'OK', onPress: ()=>this.setState({photo:null})}]);
       
      }


}



// snap(){
//   // Alert.alert('snap')
//   if(this.state.faces.length>0){
    
// Alert.alert(
//   'START QUIZ',
//   'Do you really want to start the quiz?',
//   [
//     // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
//     {
//       text: 'Cancel',
//       onPress: this._cancelQuiz,
//       style: 'cancel',
//     },
//     {text: 'OK', onPress: this._startQuiz},
//   ],
//   {cancelable: false},
// );
// // console.log(this.state.isQuizStart)
//   }
//   else{
//     Alert.alert('No face found!');
//   }
// }



_startQuiz(){
  console.log('OK Pressed')
  this.setState({isQuizStart:true});
  let isQuizStart=this.state.isQuizStart;
  this.props._startTheQuiz(isQuizStart);
  let isCameraOpen=false
  this.props._backCamera(isCameraOpen)  
  
}


_cancelQuiz(){
  console.log('Cancel Pressed');
  this.setState({isQuizStart:false,photo:null})
}

back(){
  let isCameraOpen=false
  this.props._backCamera(isCameraOpen)  
}


render() {
    const { hasCameraPermission } = this.state;
    // console.log('render======>',this.state.isQuizStart);
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        this.state.photo
        ?
        <Image 
        source={{uri: this.state.photo}}
        style={{flex:1}}
         />
        :
        <View style={{ flex: 1 }}>
          <Camera 
          style={{ flex: 1 }} 
          type={this.state.type}

          ref={ref => { this.camera = ref; }}

          // onFacesDetected={this.handleFacesDetected}
          // faceDetectorSettings={{
          // mode: FaceDetector.Constants.Mode.fast,
          // detectLandmarks: FaceDetector.Constants.Landmarks.none,
          // runClassifications: FaceDetector.Constants.Classifications.none,
          //   }}

          >

            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent:'space-between',
                alignItems: 'flex-end',
              }}>


              <TouchableOpacity
              style={{marginBottom:10}}
              onPress={this.back}
              >
                <Image 
                source={require('../assets/Left_Arrow_-512.png')}
                style={{height:75,width:75}}
                />

              </TouchableOpacity>


              <TouchableOpacity
              
              // onPress={this.snap}
              onPress={()=>this._capturePicture()}
              >
                <Image 
                source={require('../assets/icon-02-512.png')}
                style={{height:100,width:100}}
                />

              </TouchableOpacity>
              

              <TouchableOpacity
               
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>

                {/* <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text> */}
              
              <Image 
                source={require('../assets/flip_camera-512.png')}
                style={{height:100,width:100}}
                />
              </TouchableOpacity>

              
            </View>
          </Camera>
        </View>
      );
    }
  }
}