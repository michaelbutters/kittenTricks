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

export class MemoryGame extends RkComponent {
  componentName = 'MemoryGame';
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

    let handlePress = () => {
      this.setState((prevState, props) => {
        done = !prevState.done;
      });
    }


    return (
      <View style={container}>
        <View rkType='memorygame'>
          <RkButton rkType='memorycard basic square' onPress={handlePress}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.smile}</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.smile}</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.smile}</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.smile}</RkText>
          </RkButton>
        </View>
        <View rkType='memorygame'>
          <RkButton rkType='memorycard basic square' onPress={handlePress}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.smile}</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.smile}</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.smile}</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.smile}</RkText>
          </RkButton>
        </View>
        <View rkType='memorygame'>
          <RkButton rkType='memorycard basic square' onPress={handlePress}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.smile}</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.smile}</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.smile}</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.smile}</RkText>
          </RkButton>
        </View>
      </View>

    )
  }
}