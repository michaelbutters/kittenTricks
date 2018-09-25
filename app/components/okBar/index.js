import React from 'react';
import {
  View
} from 'react-native';
import {
  RkText,
  RkButton,
  RkComponent
} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';

export class OkBar extends RkComponent {
  componentName = 'OkBar';
  typeMapping = {
    container: {},
    section: {},
    icon: {},
    label: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      done: false,
      isSaving: false,
      text: 'OK'
    }
  }

  finishSaving(){
    setTimeout(() => {
      this.setState((prevState, props) => {
        if(prevState.isSaving === true){
          return {
            isSaving: false,
            text: 'OK'
          }
        }
      })              
    }, 1000);
  }    

  render() {
    let {container, section, icon, label} = this.defineStyles();

    let updateDone = () => {
      this.setState((prevState, props) => {
        if(prevState.done === false){
          if(prevState.isSaving === false){
            return {
              done: true,
              isSaving: true,
              text: 'Saving progress...'
            }            
          }
        }
        else {
          if(prevState.isSaving === false){
            return {
              done: false,
              isSaving: true,
              text: 'Saving progress...'
            }
          }
        }
      });
      this.finishSaving();
    }

    return (
      <View style={container}>
        <View style={section}>
          <RkButton rkType='clear' onPress={(event) => {updateDone(); this.props.onPress(this.props.value)}}>
            <RkText rkType={ (this.state.done ? 'awesome success' : 'awesome hintColor') } style={icon}>{FontAwesome.check}</RkText>
            <RkText rkType={ (this.state.done ? 'success small' : 'info small') }> { this.state.text }</RkText>
          </RkButton>
        </View>
      </View>

    )
  }
}