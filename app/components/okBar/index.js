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

    let doneClass = 'success';
    if(this.state.done === false){
      doneClass = 'hintColor';
    }

    return (
      <View style={container}>
        <View style={section}>
          <RkButton rkType='clear' onPress={updateDone}>
            <RkText rkType={'awesome ' + doneClass} style={icon}>{FontAwesome.check}</RkText>
            <RkText rkType={'small ' + doneClass}> OK</RkText>
          </RkButton>
        </View>
      </View>
    )
  }
}