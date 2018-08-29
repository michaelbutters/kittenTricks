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

export class YesNoBar extends RkComponent {
  componentName = 'YesNoBar';
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
      skip: false
    }
  }

  render() {
    let {container, section, icon, label} = this.defineStyles();

    let updateDone = () => {
      this.setState((prevState, props) => {
        if(prevState.done === false){
          return {
            done: true,
            skip: false,
          }
        }
        else {
          return {
            done: false,
          }
        }
      });
    }    

    let updateSkip = () => {
      this.setState((prevState, props) => {
        if(prevState.skip === false){
          return {
            skip: true,
            done: false,
          }
        }
        else {
          return {
            skip: false,
          }
        }
      });
    }    


    return (
      <View style={container}>

        { this.state.done ? <View/> :
          <View style={section}>
            <RkButton rkType='clear' onPress={updateSkip}>
              <RkText rkType={ (this.state.skip ? 'awesome hintColor' : 'awesome hintColor') } style={icon}>{FontAwesome.cross}</RkText>
              <RkText rkType={ (this.state.skip ? 'hintColor small' : 'info small') }> { (this.state.skip ? 'Dont know it' : ' No, I dont know it') }</RkText>
            </RkButton>
          </View>
        }

        { this.state.skip ? <View/> :
          <View style={section}>
            <RkButton rkType='clear' onPress={updateDone}>
              <RkText rkType={ (this.state.done ? 'awesome success' : 'awesome hintColor') } style={icon}>{ (this.state.done ? FontAwesome.check : FontAwesome.plus) }</RkText>
              <RkText rkType={ (this.state.done ? 'success small' : 'info small') }> { (this.state.done ? 'Know it' : 'Yes, I know it') }</RkText>
            </RkButton>
          </View>
        }
      </View>
    )
  }
}