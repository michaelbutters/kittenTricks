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

export class CheerNoBar extends RkComponent {
  componentName = 'CheerNoBar';
  typeMapping = {
    container: {},
    section: {},
    icon: {},
    label: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      know: false,
      dontknow: false,
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

    let updateSend = () => {
      this.setState((prevState, props) => {
        if(prevState.know === false){
          if(prevState.isSaving === false){
            return {
              know: true,
              dontknow: false,
              isSaving: true,
            }
          }
        }
        else {
          if(prevState.isSaving === false){
            return {
              know: false,
              isSaving: true,
            }
          }
        }
      });
      this.finishSaving();
    }    

    let updateDontSend = () => {
      this.setState((prevState, props) => {
        if(prevState.dontknow === false){
          if(prevState.isSaving === false){
            return {
              dontknow: true,
              know: false,
              isSaving: true,
            }
          }
        }
        else {
          if(prevState.isSaving === false){
            return {
              dontknow: false,
              isSaving: true,
            }
          }
        }
      });
      this.finishSaving();
    }    


    return (
      <View style={container}>

        { (this.state.know || this.state.isSaving) ? <View/> :
          <View style={section}>
            <RkButton rkType='clear' onPress={(event) => {updateDontSend(); this.props.onPress(this.props.value)}}>
              <RkText rkType={ (this.state.dontknow ? 'awesome hintColor' : 'awesome hintColor') } style={icon}>{FontAwesome.cross}</RkText>
              <RkText rkType={ (this.state.dontknow ? 'hintColor small' : 'info small') }> { (this.state.isSaving ? '...' : (this.state.dontknow ? "Back" : " No thanks")) }</RkText>
            </RkButton>
          </View>
        }

        { (this.state.dontknow && !this.state.isSaving) ? <View/> :
          <View style={section}>
            <RkButton rkType='clear' onPress={(event) => {updateSend(); this.props.onPress(this.props.value)}}>
              <RkText rkType={ (this.state.know ? 'awesome success' : 'awesome hintColor') } style={icon}>{ (this.state.know ? FontAwesome.check : FontAwesome.plus) }</RkText>
              <RkText rkType={ (this.state.know ? 'success small' : 'info small') }> { (this.state.isSaving ? '...' : (this.state.know ? 'Sent' : 'Send them a clap')) }</RkText>
            </RkButton>
          </View>
        }
      </View>
    )
  }
}