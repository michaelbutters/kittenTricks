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
      know: false,
      dontknow: false
    }
  }

  render() {
    let {container, section, icon, label} = this.defineStyles();

    let updateknow = () => {
      this.setState((prevState, props) => {
        if(prevState.know === false){
          return {
            know: true,
            dontknow: false,
          }
        }
        else {
          return {
            know: false,
          }
        }
      });
    }    

    let updatedontknow = () => {
      this.setState((prevState, props) => {
        if(prevState.dontknow === false){
          return {
            dontknow: true,
            know: false,
          }
        }
        else {
          return {
            dontknow: false,
          }
        }
      });
    }    


    return (
      <View style={container}>

        { this.state.know ? <View/> :
          <View style={section}>
            <RkButton rkType='clear' onPress={updatedontknow}>
              <RkText rkType={ (this.state.dontknow ? 'awesome hintColor' : 'awesome hintColor') } style={icon}>{FontAwesome.cross}</RkText>
              <RkText rkType={ (this.state.dontknow ? 'hintColor small' : 'info small') }> { (this.state.dontknow ? 'Dont know it' : ' No, I dont know it') }</RkText>
            </RkButton>
          </View>
        }

        { this.state.dontknow ? <View/> :
          <View style={section}>
          <RkButton onPress={(event) => {this.props.onPress(this.props.value)}}><RkText>PUSH ME</RkText></RkButton>
            <RkButton rkType='clear' onPress={updateknow}>
              <RkText rkType={ (this.state.know ? 'awesome success' : 'awesome hintColor') } style={icon}>{ (this.state.know ? FontAwesome.check : FontAwesome.plus) }</RkText>
              <RkText rkType={ (this.state.know ? 'success small' : 'info small') }> { (this.state.know ? 'Know it' : 'Yes, I know it') }</RkText>
            </RkButton>
          </View>
        }
      </View>
    )
  }
}