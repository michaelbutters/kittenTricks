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
      // console.log(i + ": " + props.list[i])
      var pair = props.list[i];
      var value1 = pair[0];
      var value2 = pair[1];
      // console.log("value1: '" + value1 + "'")
      // console.log("value2: '" + value2 + "'")

      answer_map[value1] = value2;
      // console.log("answer_map[value1]: '" + answer_map[value1] + "'")
      answer_map[value2] = value1;
      // console.log("answer_map[value2]: '" + answer_map[value2] + "'")
      flat_list.push(value1);
      flat_list.push(value2);
      // console.log("flat_list: " + flat_list)
    }

    this.state = {
      list: ['', '', '', '', '', '', '', '', '', '', '', ''],
      master_list: this.arrayShuffle(flat_list),
      answers: answer_map,
      matched_cards: [],
    }
    // console.log("Starting with master_list: " + this.state.master_list)
    // console.log("Starting with list: " + this.state.list)
    // console.log("Starting with answer_map: " + this.state.answers.toString())
    // console.log("Starting with matched_cards: " + this.state.matched_cards)
    // console.log("matched_cards.length: " + this.state.matched_cards.length)
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

  isInMatchedList(card){
    // console.log("Inside isInMatchedList('" + card + "')")
    // for(matched_card in this.state.matched_cards){
    for(var i = 0; i < this.state.matched_cards.length; i++){
      var matched_card = this.state.matched_cards[i]
      // console.log("\t\t" + matched_card + "...")
      if(matched_card === card){
        // console.log("'" + matched_card + "' === '" + card + "'")
        return true
      }
    }
    // console.log("Didnt find '" + card + "' in matched list: " + this.state.matched_cards)
    return false
  }

  unmatchedShownCards(list){
    // console.log("Inside unmatchedShownCards('" + list + "')")
    var unMatchedShowingCards = []
    for(var i = 0; i < list.length; i++){
    // for(card in list){
      var card = list[i]
      // console.log("card: '" + card + "'")
      if(card !== ''){
        // console.log("'" + card + "' !== ''")
        if(!this.isInMatchedList(card)){
          unMatchedShowingCards.push(card)
        }
      }
    }
    return unMatchedShowingCards;
  }

  isMatch(pair){
    return (this.state.answers[pair[0]] === pair[1])
  }

  allCardsFaceDownExceptMatched(list, card_value){
    // console.log("Inside allCardsFaceDownExceptMatched('" + list + "')")
    var newList = []
    for(var i = 0; i < list.length; i++){
    // for(card in list){
      var card = list[i]
      if(card === card_value){
        // This is the one just added so leave it alone
      }
      else if(card === ''){
        // It's already face up so just leave it alone
      }
      else if(!this.isInMatchedList(card)){
        // It's face up, but isn't matched with anything so face it down again
        card = ''
      }
     newList.push(card) 
    }
    return newList
  }

  render() {
    let {container, section, icon, label} = this.defineStyles();

    handlePress = (id) => {
      card_value = this.state.master_list[id]
      // console.log("handlePress(" + id + "): " + card_value);

      if(this.isInMatchedList(card_value)){
        return {
        }
      }

      this.setState((prevState, props) => {

        // TODO - if the card is already in matched, don't do anything. Effectively lock the card.

        var newList = prevState.list.slice(0)

        // Toggles the value between it's actual value and '?'
        // console.log("Overwriting position " + id + " (value: " + newList[id] + ") with " + card_value)
        newList[id] = (prevState.list[id] === '' ? card_value : '')

        // Now using that, see what is showing (excluding already matched cards)
        // newList[id] = card_value
        // console.log("newList is now: " + newList)
        var unmatchedCardsShowing = this.unmatchedShownCards(newList)
        // console.log("unmatchedCardsShowing: " + unmatchedCardsShowing)

        var _matched_cards = prevState.matched_cards.slice(0)
        if(unmatchedCardsShowing.length === 3){
          // console.log("There are 3 unmatched cards showing")
          newList = this.allCardsFaceDownExceptMatched(newList, card_value)
        }
        // Only if there are exact 2 showing, see if they match
        else if(unmatchedCardsShowing.length === 2){
          // console.log("There are 2 unmatched cards showing")
          if(this.isMatch(unmatchedCardsShowing)){
            _matched_cards.push(unmatchedCardsShowing[0])
            _matched_cards.push(unmatchedCardsShowing[1])
          }
          else {
            // No match. Do nothing
            // console.log("No match. Do nothing")
          }
        }
        else {
          // console.log("There are " + unmatchedCardsShowing.length + " unmatched card showing. Do nothing")
        }

        return {
          list: newList,
          matched_cards: _matched_cards,
        }
      });
    }

    return (
      <View style={container}>
        <View rkType='memorygame'>
          <RkButton rkType={ (this.isInMatchedList(this.state.list[0]) ? 'memorycard basic square memorymatched' : 'memorycard basic square') } onPress={() => handlePress(0)}>
            <RkText rkType={ (this.state.list[0] === '' ? 'awesome warning' : 'info') }>{ this.state.list[0] === '' ? FontAwesome.question : this.state.list[0] }</RkText>
          </RkButton>
          <RkButton rkType={ (this.isInMatchedList(this.state.list[1]) ? 'memorycard basic square memorymatched' : 'memorycard basic square') } onPress={() => handlePress(1)}>
            <RkText rkType={ (this.state.list[1] === '' ? 'awesome warning' : 'info') }>{ this.state.list[1] === '' ? FontAwesome.question : this.state.list[1] }</RkText>
          </RkButton>
          <RkButton rkType={ (this.isInMatchedList(this.state.list[2]) ? 'memorycard basic square memorymatched' : 'memorycard basic square') } onPress={() => handlePress(2)}>
            <RkText rkType={ (this.state.list[2] === '' ? 'awesome warning' : 'info') }>{ this.state.list[2] === '' ? FontAwesome.question : this.state.list[2] }</RkText>
          </RkButton>
          <RkButton rkType={ (this.isInMatchedList(this.state.list[3]) ? 'memorycard basic square memorymatched' : 'memorycard basic square') } onPress={() => handlePress(3)}>
            <RkText rkType={ (this.state.list[3] === '' ? 'awesome warning' : 'info') }>{ this.state.list[3] === '' ? FontAwesome.question : this.state.list[3] }</RkText>
          </RkButton>
        </View>
        <View rkType='memorygame'>
          <RkButton rkType={ (this.isInMatchedList(this.state.list[4]) ? 'memorycard basic square memorymatched' : 'memorycard basic square') } onPress={() => handlePress(4)}>
            <RkText rkType={ (this.state.list[4] === '' ? 'awesome warning' : 'info') }>{ this.state.list[4] === '' ? FontAwesome.question : this.state.list[4] }</RkText>
          </RkButton>
          <RkButton rkType={ (this.isInMatchedList(this.state.list[5]) ? 'memorycard basic square memorymatched' : 'memorycard basic square') } onPress={() => handlePress(5)}>
            <RkText rkType={ (this.state.list[5] === '' ? 'awesome warning' : 'info') }>{ this.state.list[5] === '' ? FontAwesome.question : this.state.list[5] }</RkText>
          </RkButton>
          <RkButton rkType={ (this.isInMatchedList(this.state.list[6]) ? 'memorycard basic square memorymatched' : 'memorycard basic square') } onPress={() => handlePress(6)}>
            <RkText rkType={ (this.state.list[6] === '' ? 'awesome warning' : 'info') }>{ this.state.list[6] === '' ? FontAwesome.question : this.state.list[6] }</RkText>
          </RkButton>
          <RkButton rkType={ (this.isInMatchedList(this.state.list[7]) ? 'memorycard basic square memorymatched' : 'memorycard basic square') } onPress={() => handlePress(7)}>
            <RkText rkType={ (this.state.list[7] === '' ? 'awesome warning' : 'info') }>{ this.state.list[7] === '' ? FontAwesome.question : this.state.list[7] }</RkText>
          </RkButton>
        </View>
        <View rkType='memorygame'>
          <RkButton rkType={ (this.isInMatchedList(this.state.list[8]) ? 'memorycard basic square memorymatched' : 'memorycard basic square') } onPress={() => handlePress(8)}>
            <RkText rkType={ (this.state.list[8] === '' ? 'awesome warning' : 'info') }>{ this.state.list[8] === '' ? FontAwesome.question : this.state.list[8] }</RkText>
          </RkButton>
          <RkButton rkType={ (this.isInMatchedList(this.state.list[9]) ? 'memorycard basic square memorymatched' : 'memorycard basic square') } onPress={() => handlePress(9)}>
            <RkText rkType={ (this.state.list[9] === '' ? 'awesome warning' : 'info') }>{ this.state.list[9] === '' ? FontAwesome.question : this.state.list[9] }</RkText>
          </RkButton>
          <RkButton rkType={ (this.isInMatchedList(this.state.list[10]) ? 'memorycard basic square memorymatched' : 'memorycard basic square') } onPress={() => handlePress(10)}>
            <RkText rkType={ (this.state.list[10] === '' ? 'awesome warning' : 'info') }>{ this.state.list[10] === '' ? FontAwesome.question : this.state.list[10] }</RkText>
          </RkButton>
          <RkButton rkType={ (this.isInMatchedList(this.state.list[11]) ? 'memorycard basic square memorymatched' : 'memorycard basic square') } onPress={() => handlePress(11)}>
            <RkText rkType={ (this.state.list[11] === '' ? 'awesome warning' : 'info') }>{ this.state.list[11] === '' ? FontAwesome.question : this.state.list[11] }</RkText>
          </RkButton>
        </View>
      </View>

    )
  }
}