import React from 'react'
import {Button, StatusBar, StatusBarIOS, StyleSheet, Text, useWindowDimensions, View} from 'react-native'
import Player from './src/player/Player'

export default function App() {
	const setPlay = () => {
		Player.play()
	}
	const setPause = () => {
		Player.pause()
	}

	const  setNext =  async () => {
		await Player.setNextTrack()
	}
	const setPrev =async () => {
		await Player.setPrevTrack()
	}

	const {width, height} = useWindowDimensions()
	const btn_width = width * 0.8

	return (<View style={styles.container}>
		<StatusBar backgroundColor={'#40525a'} barStyle={'light-content'}/>
		{/*<Text>Open up App.tsx to start working on your app!</Text>*/}
		<View style={{width: btn_width}}>
			<Button color={'#2f42f1'} onPress={setPlay} title={'PLAY'}/>
		</View>
		<View style={{width: btn_width}}>
			<Button color={'#f19a2f'} onPress={setPause} title={'PAUSE'}/>
		</View>
		<View style={{
			width: btn_width,
			flexDirection: 'row',
			justifyContent: 'space-between'
		}}>
			<Button color={'#2f42f1'} onPress={setPrev} title={'<- PREV'}/>
			<Button color={'#2f42f1'} onPress={setNext} title={'NEXT ->'}/>
		</View>
	</View>)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#40525a',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
})
