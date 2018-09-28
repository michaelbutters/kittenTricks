import React from 'react';
import {
  View, TextInput, TouchableOpacity, Keyboard
} from 'react-native';
import {
  RkText,
  RkButton,
  RkComponent, RkTextInput
} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';

export class BlankGame extends RkComponent {
  componentName = 'BlankGame';
  typeMapping = {
    container: {},
    section: {},
    icon: {},
    label: {}
  };

  constructor(props) {
    super(props);

    // Build the full list
    var fullList = []
    for(let item of props.corrects){
      fullList.push(item)
    }
    for(let item of props.incorrects){
      fullList.push(item)
    }

    this.state = {
      list: this.arrayShuffle(fullList),
      selected: [],
      corrects: this.props.corrects,
      foundCorrects: [],
      allCorrect: true,
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

  isCorrect(value){
    return (this.state.corrects.includes(value))
  }

  isSelected(value){
    return (this.state.selected.includes(value)) 
  }

  gameComplete(){
    return (this.state.corrects.length === this.state.foundCorrects.length)
  }

  render() {
    let {container, section, icon, label} = this.defineStyles();

    handlePress = (id) => {
      cardValue = this.state.list[id]
      if(this.state.selected.includes(cardValue)){
        // Was already selected. Don't do anything more.
        return
      }

      this.setState((prevState, props) => {

        newSelected = prevState.selected.slice(0)
        newSelected.push(cardValue)

        newFoundCorrects = this.state.foundCorrects.slice(0)
        if(this.isCorrect(cardValue)){
          newFoundCorrects.push(cardValue)
        }
        return {
          foundCorrects: newFoundCorrects,
          selected: newSelected,
          allCorrect: (prevState.allCorrect && this.isCorrect(cardValue)),
        }
      });
    }

    let gameCompleteInner
    if(this.state.allCorrect){
      gameCompleteInner = 
        <View>
          <RkText rkType='success center'>{ this.gameComplete() ? "Complete!" : " " }</RkText>
          <RkText rkType='primary3'>{ }</RkText>
          <RkText rkType='primary3'>{ "You got all the components correct.\n\nIs the meaning you typed the same as the one shown?\n\nIf so, you should select 'Got It Right'.\n\nIf not, you should select 'Got It Wrong' so that you will get another opportunity to revise again." }</RkText>
        </View>
    }
    else {
      gameCompleteInner = 
        <View>
          <RkText rkType='danger center'>{ this.gameComplete() ? "Game Over" : " " }</RkText>
          <RkText rkType='primary3'>{ }</RkText>
          <RkText rkType='primary3'>{ "You made mistakes with the components.\n\nSelect 'Got It Wrong' below so that you will get another opportunity to revise again." }</RkText>
        </View>
    }
    gameCompleteBlock = 
        <View>
          { this.gameComplete() ? gameCompleteInner : <View/> }
          <RkText rkType='primary3'>{ }</RkText>
          <RkText rkType='success center'> </RkText>
        </View>


    return (
      <View>
        <View>
          <RkText rkType='heading4'>Story</RkText>
          <RkText rkType='primary2 warning'>{ this.props.story }</RkText>
          <RkText rkType='primary2 center'> </RkText>
          <RkText rkType='primary3'>{ "The blanks in the kanji story above are in place of the parts of the story that represent the components and the meaning of the kanji\n\nUsing the incomplete story above as a prompt, tap below and type the meaning of the kanji that this story is for. Then hit Return." }</RkText>
          <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
            <RkTextInput blurOnSubmit={true} placeholder={'Tap here to type the meaning'}/>
          </TouchableOpacity>
          <RkText rkType='primary3'>{ "Now select all of the components that make up the kanji." }</RkText>
        </View>
        <View style={container}>
          <View rkType='memorygame'>
            <RkButton rkType={ (this.isSelected(this.state.list[0]) ? (this.isCorrect(this.state.list[0]) ? 'memorycard basic square memorymatched' : 'memorycard basic square similarfail') : 'memorycard basic square') } onPress={() => handlePress(0)}>
              <RkText rkType={ 'info' }>{ this.state.list[0] }</RkText>
            </RkButton>
            <RkButton rkType={ (this.isSelected(this.state.list[1]) ? (this.isCorrect(this.state.list[1]) ? 'memorycard basic square memorymatched' : 'memorycard basic square similarfail') : 'memorycard basic square') } onPress={() => handlePress(1)}>
              <RkText rkType={ 'info' }>{ this.state.list[1] }</RkText>
            </RkButton>
            <RkButton rkType={ (this.isSelected(this.state.list[2]) ? (this.isCorrect(this.state.list[2]) ? 'memorycard basic square memorymatched' : 'memorycard basic square similarfail') : 'memorycard basic square') } onPress={() => handlePress(2)}>
              <RkText rkType={ 'info' }>{ this.state.list[2] }</RkText>
            </RkButton>
          </View>
          <View rkType='memorygame'>
            <RkButton rkType={ (this.isSelected(this.state.list[3]) ? (this.isCorrect(this.state.list[3]) ? 'memorycard basic square memorymatched' : 'memorycard basic square similarfail') : 'memorycard basic square') } onPress={() => handlePress(3)}>
              <RkText rkType={ 'info' }>{ this.state.list[3] }</RkText>
            </RkButton>
            <RkButton rkType={ (this.isSelected(this.state.list[4]) ? (this.isCorrect(this.state.list[4]) ? 'memorycard basic square memorymatched' : 'memorycard basic square similarfail') : 'memorycard basic square') } onPress={() => handlePress(4)}>
              <RkText rkType={ 'info' }>{ this.state.list[4] }</RkText>
            </RkButton>
            <RkButton rkType={ (this.isSelected(this.state.list[5]) ? (this.isCorrect(this.state.list[5]) ? 'memorycard basic square memorymatched' : 'memorycard basic square similarfail') : 'memorycard basic square') } onPress={() => handlePress(5)}>
              <RkText rkType={ 'info' }>{ this.state.list[5] }</RkText>
            </RkButton>
          </View>
          <View rkType='memorygame'>
            <RkButton rkType={ (this.isSelected(this.state.list[6]) ? (this.isCorrect(this.state.list[6]) ? 'memorycard basic square memorymatched' : 'memorycard basic square similarfail') : 'memorycard basic square') } onPress={() => handlePress(6)}>
              <RkText rkType={ 'info' }>{ this.state.list[6] }</RkText>
            </RkButton>
            <RkButton rkType={ (this.isSelected(this.state.list[7]) ? (this.isCorrect(this.state.list[7]) ? 'memorycard basic square memorymatched' : 'memorycard basic square similarfail') : 'memorycard basic square') } onPress={() => handlePress(7)}>
              <RkText rkType={ 'info' }>{ this.state.list[7] }</RkText>
            </RkButton>
            <RkButton rkType={ (this.isSelected(this.state.list[8]) ? (this.isCorrect(this.state.list[8]) ? 'memorycard basic square memorymatched' : 'memorycard basic square similarfail') : 'memorycard basic square') } onPress={() => handlePress(8)}>
              <RkText rkType={ 'info' }>{ this.state.list[8] }</RkText>
            </RkButton>
          </View>
        </View>
        <RkText rkType='primary2 center'> </RkText>
        { this.gameComplete() ? <View><RkText rkType='heading2 center'>Meaning</RkText><RkText rkType='heading1 center warning'>{ this.props.meaning }</RkText></View> : <View/>}
        <RkText rkType='primary2 center'> </RkText>
        <RkText rkType='primary2 center'> </RkText>
        { this.gameComplete() ? <RkText rkType='largekanji center warning'>{ this.props.kanji }</RkText>: <View/> }
        { gameCompleteBlock }
      </View>

    )
  }
}