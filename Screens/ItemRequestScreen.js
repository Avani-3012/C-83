import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
//import BellIconWithBadge from "../components/bellIcon";
//import BellIcon from "../components/bellIcon";


export default class BookRequestScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      itemName: "",
      reasonToRequest: "",
      value:""
    };
  }
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = (itemName, reasonToRequest) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection("requested_items").add({
      user_id: userId,
      item_name: itemName,
      reason_to_request: reasonToRequest,
      request_id: randomRequestId,
    });

    this.setState({
      bookName: "",
      reasonToRequest: "",
    });

    return Alert.alert("Book Requested Successfully");
  };



  render() {
    return (
      <View>
        <View style={styles.header}>
          <FontAwesome
            name="bars"
            color="black"
            size={30}
            style={{ marginLeft: -1300, marginBottom: -10 }}
            onPress={() => this.props.navigation.toggleDrawer()}
          ></FontAwesome>
         
          <Text style={{ color: "#90A5A9", fontSize: 20, fontWeight: "bold" }}>
            Request Books
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.keyBoardStyle}>
            <TextInput
              style={styles.formTextInput}
              placeholder={"enter item name"}
              onChangeText={(text) => {
                this.setState({
                  bookName: text,
                });
              }}
              value={this.state.bookName}
            />
            <TextInput
              style={[styles.formTextInput, { height: 300 }]}
              multiline
              numberOfLines={8}
              placeholder={"Why do you need the item"}
              onChangeText={(text) => {
                this.setState({
                  reasonToRequest: text,
                });
              }}
              value={this.state.reasonToRequest}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.addRequest(
                  this.state.bookName,
                  this.state.reasonToRequest
                );
              }}
            >
              <Text>Request</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "blue",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "purple",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  header: {
    flex: 1,
    backgroundColor: "#eaf8fe",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
});
