import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Spinner} from '@shoutem/ui';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.apiUrl = 'https://pickupgen-backend.herokuapp.com/pickupLine';

    this.state = {
      pickupLine: '',
      isLoading: false,
    };

    this.fetchPickupLine = this.fetchPickupLine.bind(this);
    this.onButtonTouch = this.onButtonTouch.bind(this);
  }

  fetchPickupLine() {
    this.setState({isLoading: true});

    fetch(this.apiUrl)
      .then(httpResponse => {
        return httpResponse.json();
      })
      .then(pickupLine => {
        this.setState({pickupLine});
        this.setState({isLoading: false});
      })
      .catch(error => this.setState({isLoading: false}));
  }

  onButtonTouch() {
    this.fetchPickupLine();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.pickupLine}</Text>
        <View style={styles.buttonContainer}>
          <Button title='Get Cantada' onPress={this.onButtonTouch} disabled={this.state.isLoading}/>
        </View>
        <View style={styles.loaderContainer}>
          {this.state.isLoading && <Spinner/>}
        </View>
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
    margin: 20
  },
  buttonContainer: {
    marginTop: 10
  },
  loaderContainer: {
    position: 'absolute',
    bottom: '30%'
  }
});
