import MusicControl from 'react-native-music-control'
import {Command} from 'react-native-music-control/lib/types'
import {Audio, AVPlaybackStatus} from 'expo-av'
import {AVPlaybackSource} from 'expo-av/build/AV'

const soundObject = new Audio.Sound()

class Player {
	constructor() {
		this.initializePlayer()
		soundObject.setOnPlaybackStatusUpdate((e: any) => {
			this.setPushTrackByData(e)
		})
	}

	current_index = 0

	musics: { id: number, track: AVPlaybackSource }[] = [{
		id: 0,
		track: require('../files/m3.mp3')
	}, {
		id: 1,
		track: require('../files/m1.mp3')
	}, {
		id: 2,
		track: require('../files/m2.mp3')
	}]

	getNextTrack(): AVPlaybackSource {
		const index: number = this.current_index + 1 < this.musics.length ? (++this.current_index) : (this.current_index = 0)
		console.log(index)
		return this.musics[index].track
	}

	getPrevTrack(): AVPlaybackSource {
		const index: number = this.current_index > 0 ? (--this.current_index) : (this.current_index = (this.musics.length - 1))
		console.log(index)
		return this.musics[index].track
	}

	getCurrentTrack(): AVPlaybackSource {
		return this.musics[this.current_index].track
	}

	async initializePlayer() {
		await Audio.requestPermissionsAsync()
		await soundObject.loadAsync(this.getCurrentTrack()) //set current start track
		MusicControl.enableControl('play', true)
		MusicControl.enableControl('pause', true)
		MusicControl.enableControl('nextTrack', true)
		MusicControl.enableControl('previousTrack', true)
		MusicControl.enableControl('changePlaybackPosition', true)
		MusicControl.enableControl('setRating', true)
		MusicControl.handleAudioInterruptions(true)
		// MusicControl.enableControl('stop', true)
		await Audio.setAudioModeAsync({
			staysActiveInBackground: true,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: false,
			allowsRecordingIOS: true
		})
		this.setHandler()
	}

	setHandler() {
		MusicControl.on(Command.play, () => {
			console.log('play pess')
			this.play()
		})
		MusicControl.on(Command.pause, () => {
			console.log('pause press')
			this.pause()
		})
		MusicControl.on(Command.nextTrack, () => {
			console.log('pause press')
			this.setNextTrack()
		})
		MusicControl.on(Command.previousTrack, () => {
			console.log('pause press')
			this.setPrevTrack()
		})

	}

	async setNextTrack() {
		await soundObject.unloadAsync()
		await soundObject.loadAsync(this.getNextTrack())
		await soundObject.playAsync()
		this.setCurrentPush()
	}

	async setPrevTrack() {
		await soundObject.unloadAsync()
		await soundObject.loadAsync(this.getPrevTrack())
		await soundObject.playAsync()
		this.setCurrentPush()
	}

	setCurrentPush() {
		return MusicControl.setNowPlaying({
			// title: '',
			// artwork: require('../files/NILETTO_-_Lyubimka_63911927.mp3'), // URL or RN's image require()
			artist: 'Artist name!!',
			album: 'music name track',
			genre: 'Post-ROCK, Dance-pop',
			duration: 10, // (Seconds)
			description: 'hello world', // Android Only
			color: 0xFDF3FF, // Android Only - Notification Color
			colorized: true, // Android 8+ Only - Notification Color extracted from the artwork. Set to false to use the color property instead
			date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
		})
	}

	setPushTrackByData(e: typeof data_type) {

		console.log(e)

		MusicControl.updatePlayback({
			state: e.isPlaying ? MusicControl.STATE_PLAYING : MusicControl.STATE_PAUSED, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
			speed: 1, // Playback Rate
			elapsedTime: e?.durationMillis || 0, // (Seconds)
			bufferedTime: e?.durationMillis || 0, // Android Only (Seconds)
			// volume: 10, // Android Only (Number from 0 to maxVolume) - Only used when remoteVolume is enabled
			maxVolume: 100, // Android Only (Number) - Only used when remoteVolume is enabled
			// rating: MusicControl.STATE_PLAYING, // Android Only (RATING_HEART, RATING_THUMBS_UP_DOWN, RATING_3_STARS, RATING_4_STARS, RATING_5_STARS, RATING_PERCENTAGE)
		})

	}

	// async setTrack() {
	// 	// await soundObject.unloadAsync()
	// 	// await soundObject.loadAsync(this.getCurrentTrack())
	//
	//
	// }

	async play() {
		// await this.setTrack()
		this.setCurrentPush()
		// await soundObject.setPositionAsync(7000)
		await soundObject.playAsync()
	}

	async pause() {
		await soundObject.pauseAsync()
		MusicControl.updatePlayback({})
	}
}

export default new Player()

const data_type = {
	'androidImplementation': 'SimpleExoPlayer',
	'didJustFinish': false,
	'durationMillis': 177658,
	'isBuffering': false,
	'isLoaded': true,
	'isLooping': false,
	'isMuted': false,
	'isPlaying': true,
	'playableDurationMillis': 104829,
	'positionMillis': 42078,
	'progressUpdateIntervalMillis': 500,
	'rate': 1,
	'shouldCorrectPitch': false,
	'shouldPlay': true,
	'uri': '/assets/src/files/m1.mp3',
	'volume': 1
}
