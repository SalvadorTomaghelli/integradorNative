import { Component } from "react";
import { View } from "react-native";
import CommentForm from "../components/CommentForm";

export default class CraerPost extends Component {
  render() {
    return (
      <View>
        <CommentForm navigation={this.props.navigation} />
      </View>
    );
  }
}
