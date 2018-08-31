import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {RkStyleSheet, RkText, RkTextInput, RkButton} from 'react-native-ui-kitten';
import {FontAwesome} from '../assets/icons';

export class StoryPractice extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show_story: false,
      story: props.story,
    }

  }

  render() {

    let toggleShowStory = () => {
      this.setState((prevState, props) => {
         if(!prevState.show_story){
           return { show_story: true }
         }
         else {
           return { show_story: false }
         }
       });
     }

    let storyDetails
    if(this.state.show_story){
      storyDetails = <View>
        <RkText rkType='heading4'> </RkText>
        <RkText rkType='heading4'>Story</RkText>
        <RkText rkType='primary2 warning'>{this.state.story}</RkText>
        <RkText rkType='primary3'> </RkText>
      </View>
    }
    else {
      storyDetails = <View/>
    }

    return (

      <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
        <RkText rkType='heading4'>Type Story</RkText>
        <RkTextInput blurOnSubmit={true} placeholder={'Tap here to start typing...'}
            containerStyle={{marginTop: 15}}
            multiline = {true}
            inputStyle={{ height: 150 }}/>
          <View>
            <RkButton rkType='clear' onPress={toggleShowStory}>
              <RkText rkType={ (this.state.skip ? 'awesome hintColor' : 'awesome hintColor') } style={styles.icon}>{FontAwesome.slashEye}</RkText>
              <RkText rkType={ (this.state.skip ? 'hintColor small' : 'info small') }> { (this.state.show_story ? 'Hide Answer' : 'Show Answer') }</RkText>
            </RkButton>
          </View>
          { storyDetails }
      </TouchableOpacity>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 10
  },
  icon: {
    fontSize: 20,
    color: theme.colors.text.inverse,
  },  
}));