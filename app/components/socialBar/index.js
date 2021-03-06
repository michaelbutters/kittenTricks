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

export class SocialBar extends RkComponent {
  componentName = 'SocialBar';
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
      skip: false,
      isSaving: false,
    }
  }

  finishSaving(){
    setTimeout(() => {
      this.setState((prevState, props) => {
        if(prevState.isSaving === true){
          return {
            isSaving: false,
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
              skip: false,
            }
          }
        }
        else {
          if(prevState.isSaving === false){
            return {
              done: false,
              isSaving: true,
            }
          }
        }
      });
      this.finishSaving();
    }    

    let updateSkip = () => {
      this.setState((prevState, props) => {
        if(prevState.skip === false){
          if(prevState.isSaving === false){
            return {
              skip: true,
              done: false,
              isSaving: true,
            }
          }
        }
        else {
          if(prevState.isSaving === false){
            return {
              skip: false,
              isSaving: true,
            }
          }
        }
      });
      this.finishSaving();
    }    

    return (
      <View style={container}>

        { (this.state.done || this.state.isSaving) ? <View/> :
          <View style={section}>
            <RkButton rkType='clear' onPress={(event) => {updateSkip(); this.props.onPress(this.props.value)}}>
              <RkText rkType={ (this.state.skip ? 'awesome hintColor' : 'awesome hintColor') } style={icon}>{FontAwesome.forward}</RkText>
              <RkText rkType={ (this.state.skip ? 'hintColor small' : 'info small') }> { (this.state.isSaving ? 'Saving progress...' : (this.state.skip ? 'Already Knew It' : 'I Already Know This')) }</RkText>
            </RkButton>
          </View>
        }

        { (this.state.skip && !this.state.isSaving) ? <View/> :
          <View style={section}>
            <RkButton rkType='clear' onPress={(event) => {updateDone(); this.props.onPress(this.props.value)}}>
              <RkText rkType={ (this.state.done ? 'awesome success' : 'awesome hintColor') } style={icon}>{FontAwesome.check}</RkText>
              <RkText rkType={ (this.state.done ? 'success small' : 'info small') }> { (this.state.isSaving ? 'Saving progress...' : (this.state.done ? 'Done' : 'Mark as Done')) }</RkText>
            </RkButton>
          </View>
        }
      </View>
    )
  }
}