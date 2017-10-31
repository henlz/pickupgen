import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Spinner} from '@shoutem/ui';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pickupLine: '',
      isLoading: false,
    };

    this.fetchPickupLine = this.fetchPickupLine.bind(this);
  }

  fetchPickupLine() {
    this.setState({isLoading: true});
    fetch('https://jsonplaceholder.typicode.com/posts/' + (Math.floor(Math.random() * 99) + 1))
      .then(response => response.json())
      .then(responseJson => {
        this.setState({pickupLine: responseJson.title});
        this.setState({isLoading: false});
      })
      .catch(error => this.setState({isLoading: false}));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.pickupLine}</Text>
        <Button title='Get Pickup Line' onPress={() => this.fetchPickupLine()} disabled={this.state.isLoading}/>
        {this.state.isLoading && <Spinner/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
