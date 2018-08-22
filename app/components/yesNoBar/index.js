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
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.cross}</RkText>
            <RkText rkType='hintColor small'> No, I dont know it</RkText>
          </RkButton>
        </View>
        <View style={section}>
          <RkButton rkType='clear' onPress={updateDone}>
            <RkText rkType='awesome success' style={icon}>{FontAwesome.plus}</RkText>
            <RkText rkType='hintColor small'> Yes, I know it</RkText>
          </RkButton>
        </View>
      </View>
    )
  }
}