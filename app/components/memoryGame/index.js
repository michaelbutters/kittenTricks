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

      text00: '',
      text01: '',
      text02: '',
      text03: '',

      text10: '',
      text11: '',
      text12: '',
      text13: '',

      text20: '',
      text21: '',
      text22: '',
      text23: '',
    }
  }

  render() {
    let {container, section, icon, label} = this.defineStyles();

    let handlePress00 = () => {
      this.setState((prevState, props) => {
        if(prevState.text00 === ''){
          return { text00: props.list[0] }
        }
        else {
          return { text00: '' }
        }
      });
    }
    let handlePress01 = () => {
      this.setState((prevState, props) => {
        if(prevState.text01 === ''){
          return { text01: props.list[1] }
        }
        else {
          return { text01: '' }
        }
      });
    }
    let handlePress02 = () => {
      this.setState((prevState, props) => {
        if(prevState.text02 === ''){
          return { text02: props.list[2] }
        }
        else {
          return { text02: '' }
        }
      });
    }
    let handlePress03 = () => {
      this.setState((prevState, props) => {
        if(prevState.text03 === ''){
          return { text03: props.list[3] }
        }
        else {
          return { text03: '' }
        }
      });
    }



    let handlePress10 = () => {
      this.setState((prevState, props) => {
        if(prevState.text10 === ''){
          return { text10: props.list[4] }
        }
        else {
          return { text10: '' }
        }
      });
    }
    let handlePress11 = () => {
      this.setState((prevState, props) => {
        if(prevState.text11 === ''){
          return { text11: props.list[5] }
        }
        else {
          return { text11: '' }
        }
      });
    }
    let handlePress12 = () => {
      this.setState((prevState, props) => {
        if(prevState.text12 === ''){
          return { text12: props.list[6] }
        }
        else {
          return { text12: '' }
        }
      });
    }
    let handlePress13 = () => {
      this.setState((prevState, props) => {
        if(prevState.text13 === ''){
          return { text13: props.list[7] }
        }
        else {
          return { text13: '' }
        }
      });
    }



    let handlePress20 = () => {
      this.setState((prevState, props) => {
        if(prevState.text20 === ''){
          return { text20: props.list[8] }
        }
        else {
          return { text20: '' }
        }
      });
    }
    let handlePress21 = () => {
      this.setState((prevState, props) => {
        if(prevState.text21 === ''){
          return { text21: props.list[9] }
        }
        else {
          return { text21: '' }
        }
      });
    }
    let handlePress22 = () => {
      this.setState((prevState, props) => {
        if(prevState.text22 === ''){
          return { text22: props.list[10] }
        }
        else {
          return { text22: '' }
        }
      });
    }
    let handlePress23 = () => {
      this.setState((prevState, props) => {
        if(prevState.text23 === ''){
          return { text23: props.list[11] }
        }
        else {
          return { text23: '' }
        }
      });
    }


    return (
      <View style={container}>
        <View rkType='memorygame'>
          <RkButton rkType='memorycard basic square' onPress={handlePress00}>
            <RkText rkType={ (this.state.text00 === '' ? 'awesome warning' : 'info') }>{ this.state.text00 === '' ? FontAwesome.question : this.state.text00 }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress01}>
            <RkText rkType={ (this.state.text01 === '' ? 'awesome warning' : 'info') }>{ this.state.text01 === '' ? FontAwesome.question : this.state.text01 }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress02}>
            <RkText rkType={ (this.state.text02 === '' ? 'awesome warning' : 'info') }>{ this.state.text02 === '' ? FontAwesome.question : this.state.text02 }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress03}>
            <RkText rkType={ (this.state.text03 === '' ? 'awesome warning' : 'info') }>{ this.state.text03 === '' ? FontAwesome.question : this.state.text03 }</RkText>
          </RkButton>
        </View>
        <View rkType='memorygame'>
          <RkButton rkType='memorycard basic square' onPress={handlePress10}>
            <RkText rkType={ (this.state.text10 === '' ? 'awesome warning' : 'info') }>{ this.state.text10 === '' ? FontAwesome.question : this.state.text10 }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress11}>
            <RkText rkType={ (this.state.text11 === '' ? 'awesome warning' : 'info') }>{ this.state.text11 === '' ? FontAwesome.question : this.state.text11 }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress12}>
            <RkText rkType={ (this.state.text12 === '' ? 'awesome warning' : 'info') }>{ this.state.text12 === '' ? FontAwesome.question : this.state.text12 }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress13}>
            <RkText rkType={ (this.state.text13 === '' ? 'awesome warning' : 'info') }>{ this.state.text13 === '' ? FontAwesome.question : this.state.text13 }</RkText>
          </RkButton>
        </View>
        <View rkType='memorygame'>
          <RkButton rkType='memorycard basic square' onPress={handlePress20}>
            <RkText rkType={ (this.state.text20 === '' ? 'awesome warning' : 'info') }>{ this.state.text20 === '' ? FontAwesome.question : this.state.text20 }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress21}>
            <RkText rkType={ (this.state.text21 === '' ? 'awesome warning' : 'info') }>{ this.state.text21 === '' ? FontAwesome.question : this.state.text21 }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress22}>
            <RkText rkType={ (this.state.text22 === '' ? 'awesome warning' : 'info') }>{ this.state.text22 === '' ? FontAwesome.question : this.state.text22 }</RkText>
          </RkButton>
          <RkButton rkType='memorycard basic square' onPress={handlePress23}>
            <RkText rkType={ (this.state.text23 === '' ? 'awesome warning' : 'info') }>{ this.state.text23 === '' ? FontAwesome.question : this.state.text23 }</RkText>
          </RkButton>
        </View>
      </View>

    )
  }
}