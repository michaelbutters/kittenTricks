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
      done: false
    }
  }

  render() {
    let {container, section, icon, label} = this.defineStyles();

    let updateDone = () => {
      this.setState((prevState, props) => {
        done = !prevState.done;
      });
    }


    return (
      <View style={container}>
        <View style={section}>
          <RkButton rkType='clear'>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.forward}</RkText>
            <RkText rkType='info small'> Skip</RkText>
          </RkButton>
        </View>
        <View style={section}>
          <RkButton rkType='clear' onPress={updateDone}>
            <RkText rkType='awesome success' style={icon}>{FontAwesome.check}</RkText>
            <RkText rkType='info small'> Done</RkText>
          </RkButton>
        </View>
      </View>
    )
  }
}