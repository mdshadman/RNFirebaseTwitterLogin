import React, { Component } from "react"
import {
  Button,
  StyleSheet,
  Text,
  View,
  NativeModules,
  Linking
} from "react-native"
import firebase from 'react-native-firebase';
const { RNTwitterSignIn } = NativeModules;
const { TwitterAuthProvider } = firebase.auth;
const TwitterKeys = {
  TWITTER_CONSUMER_KEY: 'enter your own api key',
  TWITTER_CONSUMER_SECRET: 'enter your own twitter app\'s secret key'
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }
  // Function to Login to twitter

  twitterLogin = async () => {
    try {
      await RNTwitterSignIn.init(TwitterKeys.TWITTER_CONSUMER_KEY, TwitterKeys.TWITTER_CONSUMER_SECRET);

      // also includes: name, userID & userName
      const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();

      const credential = TwitterAuthProvider.credential(authToken, authTokenSecret);

      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      if (firebaseUserCredential) {
        this.setState({
          isLoggedIn: true
        })
      }
      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
    } catch (e) {
      console.error(e);
    }
  }

  // Function to logout from twitter
  handleLogout = () => {
    console.log("logout")
    RNTwitterSignIn.logOut()
    this.setState({
      isLoggedIn: false
    })
  }
  goToEnappd = () => {
    Linking.openURL('https://store.enappd.com/product-category/ionic4/')
      .then((data) => console.log('working', data))
      .catch((error) => console.log(error));
  }
  render() {
    const { isLoggedIn } = this.state
    return (
      <View style={styles.container} padder>
        {isLoggedIn ?
          <Text style={styles.text1}>Yeahhh! You are now Logged In.</Text>
          : <Text style={styles.text}>A common misconception is that RNFirebase provides social login out of the box. This is somewhat true, it leaves the implementation of the login provider up to the user and only signs the user in once the provider data has been returned.Firebase allows a number of social providers to be used out of the box; Facebook, Google, Twitter and Github. You can however choose any provider you wish assuming they have an oAuth API.
          Here at enappd we have all the solution for the convenience you need?. Please do follow us at <Text onPress={this.goToEnappd} style={styles.enappd}>www.enappd.com .</Text>  </Text>

        }
        {isLoggedIn ? <Button onPress={this.handleLogout} style={styles.button} title="Logout">

        </Button> :
          <Button padder name="logo-twitter" style={styles.button} onPress={this.twitterLogin} title="Login with Twitter">
          </Button>
        }
      </View>
    )
  }
}
// styles for this page

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1b95e0',
    color: 'white',
    width: 200,
    height: 50,
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 32, backgroundColor: '#f7be16'
  },
  text: {
    textAlign: 'justify', paddingVertical: 32, color: 'white', fontSize: 16,
  },
  text1: {
    textAlign: 'justify', paddingVertical: 32, fontSize: 20, color: 'white'
  },
  enappd: { textDecorationLine: 'underline', fontWeight: 'bold', color: 'green' }
})