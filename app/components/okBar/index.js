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
    }
  }

  render() {
    let {container, section, icon, label} = this.defineStyles();

    let updateDone = () => {
      this.setState((prevState, props) => {
        if(prevState.done === false){
          return {
            done: true,
          }
        }
        else {
          return {
            done: false,
          }
        }
      });
    }    

    return (
      <View style={container}>
        <View style={section}>
          <RkButton rkType='clear' onPress={(event) => {updateDone(); this.props.onPress(this.props.value)}}>
            <RkText rkType={ (this.state.done ? 'awesome success' : 'awesome hintColor') } style={icon}>{FontAwesome.check}</RkText>
            <RkText rkType={ (this.state.done ? 'success small' : 'info small') }> OK</RkText>
          </RkButton>
        </View>
      </View>

    )
  }
}