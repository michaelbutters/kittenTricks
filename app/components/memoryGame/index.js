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
      text0: ''
    }
  }

  render() {
    let {container, section, icon, label} = this.defineStyles();

    let handlePress = () => {
      this.setState((prevState, props) => {
        done = !prevState.done;
      });
    }

    let handlePress0 = () => {
      this.setState((prevState, props) => {
        if(prevState.text0 === ''){
          return { text0: 'kanji' }
        }
        else {
          return { text0: '' }
        }
      });
    }


    return (
      <View style={container}>
        <View rkType='memorygame'>
          <RkButton rkType='memorycard basic square' onPress={handlePress0}>
            <RkText rkType='awesome hintColor'>{ this.state.text0 === '' ? FontAwesome.smile : this.state.text0 }</RkText>
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