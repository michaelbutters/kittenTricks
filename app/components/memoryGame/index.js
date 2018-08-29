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

    var answer_map = {}
    var flat_list = []

    for(var i = 0; i < props.list.length; i++){
      var pair = props.list[i];
      var value1 = pair[0];
      var value2 = pair[1];

      answer_map[value1] = value2;
      answer_map[value2] = value1;
      flat_list.push(value1);
      flat_list.push(value2);
    }

    this.state = {
      list: ['', '', '', '', '', '', '', '', '', '', '', ''],
      master_list: this.arrayShuffle(flat_list),
      answers: answer_map
    }
  }

  arrayShuffle(items: array): Array {
      var currentIndex = items.length,
          temporaryValue, randomIndex;

      while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          temporaryValue = items[currentIndex];
          items[currentIndex] = items[randomIndex];
          items[randomIndex] = temporaryValue;
      }

      return items;
  }

  render() {
    let {container, section, icon, label} = this.defineStyles();

    handlePress = (id) => {
      this.setState((prevState, props) => {
        prevState.list[id] = (prevState.list[id] === '' ? this.state.master_list[id] : '')
        return {
          list: prevState.list
        }
      });
    }

    return (
      <View style={container}>
        <View rkType='memorygame'>
          <RkButton rkType='memorycard basic square' onPress={() => handlePress(0)}>
            <RkText rkType={ (this.state.list[0] === '' ? 'awesome warning' : 'info') }>{ this.state.list[0] === '' ? FontAwesome.question : this.state.list[0] }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={() => handlePress(1)}>
            <RkText rkType={ (this.state.list[1] === '' ? 'awesome warning' : 'info') }>{ this.state.list[1] === '' ? FontAwesome.question : this.state.list[1] }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={() => handlePress(2)}>
            <RkText rkType={ (this.state.list[2] === '' ? 'awesome warning' : 'info') }>{ this.state.list[2] === '' ? FontAwesome.question : this.state.list[2] }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={() => handlePress(3)}>
            <RkText rkType={ (this.state.list[3] === '' ? 'awesome warning' : 'info') }>{ this.state.list[3] === '' ? FontAwesome.question : this.state.list[3] }</RkText>
          </RkButton>
        </View>
        <View rkType='memorygame'>
          <RkButton rkType='memorycard basic square' onPress={() => handlePress(4)}>
            <RkText rkType={ (this.state.list[4] === '' ? 'awesome warning' : 'info') }>{ this.state.list[4] === '' ? FontAwesome.question : this.state.list[4] }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={() => handlePress(5)}>
            <RkText rkType={ (this.state.list[5] === '' ? 'awesome warning' : 'info') }>{ this.state.list[5] === '' ? FontAwesome.question : this.state.list[5] }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={() => handlePress(6)}>
            <RkText rkType={ (this.state.list[6] === '' ? 'awesome warning' : 'info') }>{ this.state.list[6] === '' ? FontAwesome.question : this.state.list[6] }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={() => handlePress(7)}>
            <RkText rkType={ (this.state.list[7] === '' ? 'awesome warning' : 'info') }>{ this.state.list[7] === '' ? FontAwesome.question : this.state.list[7] }</RkText>
          </RkButton>
        </View>
        <View rkType='memorygame'>
          <RkButton rkType='memorycard basic square' onPress={() => handlePress(8)}>
            <RkText rkType={ (this.state.list[8] === '' ? 'awesome warning' : 'info') }>{ this.state.list[8] === '' ? FontAwesome.question : this.state.list[8] }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={() => handlePress(9)}>
            <RkText rkType={ (this.state.list[9] === '' ? 'awesome warning' : 'info') }>{ this.state.list[9] === '' ? FontAwesome.question : this.state.list[9] }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={() => handlePress(10)}>
            <RkText rkType={ (this.state.list[10] === '' ? 'awesome warning' : 'info') }>{ this.state.list[10] === '' ? FontAwesome.question : this.state.list[10] }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={() => handlePress(11)}>
            <RkText rkType={ (this.state.list[11] === '' ? 'awesome warning' : 'info') }>{ this.state.list[11] === '' ? FontAwesome.question : this.state.list[11] }</RkText>
          </RkButton>
        </View>
      </View>

    )
  }
}