//React imports
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	TextInput,
	Button,
	Modal,
	ScrollView,
	Keyboard
} from 'react-native';

import styles from '../modules/styles';
import Titlebar from './titlebar';

export default class EditWordTextModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: props.visible,
			error: '',
			text: props.text
		}
	}

	componentDidMount() {
		this._mounted = true;
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	componentWillReceiveProps(props) {
		this.setState({
			visible: props.visible,
			error: '',
			text: props.text
		});
	}

	setModalVisible(visible) {
		this.props.callback(this.props.parentState, this.props.text);
	}

	onPressButton() {
		Keyboard.dismiss();
		this.props.callback(this.props.parentState, this.state.text);
	}

	render() {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.state.visible}
				onRequestClose={() => {
					this.setModalVisible(false);
				}
				}>
				<View style={styles.containerModalEditTextBackground}>
					<Titlebar title={this.props.parentState.toUpperCase()} />
					<Text ref='error' style={styles.texterror}>
						{this.state.error}
					</Text>
					<Text>
						Use ',' ';' characters to insert new line.
					</Text>
					<View style={styles.containerModalContent}>
						<TextInput
							multiline={true}
							style={styles.textinputbigedit}
							value={this.state.text}
							onChangeText={(text) => this.setState({ text })}
							onSubmitEditing={this.onPressButton.bind(this)}
							returnKeyType='go'
						/>

						<View style={{ flexDirection: 'row' }}>
						<TouchableHighlight
								style={styles.buttonModal}
								onPress={() => {
									this.setModalVisible(false);
									Keyboard.dismiss();
								}}>
								<Text style={styles.textTranslate}>
									Back
								</Text>
							</TouchableHighlight>							
							<TouchableHighlight
								style={styles.buttonTranslate}
								underlayColor="black"
								onPress={this.onPressButton.bind(this)}>
								<Text style={styles.textTranslate}>
									Done
          						</Text>
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}