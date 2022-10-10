import { StatusBar } from "expo-status-bar";
import React, {Component} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    Platform,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {Camera} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { isMap } from 'lodash';

import Filter1 from "../Components/Filter1";

let data = [
    { id: "crown-pic1", src: require("../assets/crown-pic1.png") },
    { id: "crown-pic2", src: require("../assets/crown-pic2.png") },
    { id: "crown-pic3", src: require("../assets/crown-pic3.png") },
    { id: "flower-pic1", src: require("../assets/flower-pic1.png") },
    { id: "folwer-pic2", src: require("../assets/flower-pic2.png") }
]

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            faces: []
        };
        
        this.onFaceDetected = this.onFaceDetected.bind(this);
    }

    async componentDidMount() {
        const { status } = await Camera.requesstPermissionAsync();
        this.setState({ hasCameraPermission: status === "granted"});
    }

    onFaceDetected({ faces }) {
        this.setState({ faces: faces });
    }

    render() {
        return(
            <><View style={styles.lowerContainer}>
                <View style={styles.lowerTopContainer}></View>
                <View style={styles.lowerBottomContainer}>
                    <ScrollView
                        contentContainerStyle={styles.filters}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {data.map(filter_data => {
                            return (
                                <TouchableOpacity
                                    key={`filter-button-${filter_data.id}`}
                                    style={[
                                        styles.filterButton,
                                        {
                                            borderColor: this.state.current_filter === filter_data.id
                                                ? "skyblue"
                                                : "white"
                                        }
                                    ]}
                                    onPress={() => this.setState({
                                        current_filter: `${filter_data.id}`
                                    })}
                                >
                                    <Image
                                        source={filter_data.src}
                                        style={styles.filterImage} />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            </View><View style={styles.middleContainer}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.Constants.Mode.fast,
                            detectLandmarks: FaceDetector.Constants.Landmarks.all,
                            runClassifications: FaceDetector.Constants.Classifications.all
                        }}
                        onFaceDetected={this.onFaceDetected}
                        onFaceDetectionError={this.onFaceDetectionError} />
                    {this.staye.faces.map(face => (
                        <Filter1 key={`face-id-${face.faceID}`} face={face} />
                    ))}
                </View></>
        )
    }
}

const styles = StyleSheet.create({
    middleContainer: {
        flex: 1
    },
    lowerContainer: {
        flex: 0.2,
        paddingLeft: RFValue(20),
        paddingRight: RFValue(20),
        paddingTop: RFValue(30),
        backgroundColor: "#6278e4" 
    },
    lowerBottomContainer: {
        height: RFPercentage(8),
        width: RFPercentage(15),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e4e7f8",
        borderRadius: 30,
        marginRight: 20
    },
    lowerTopContainer: {
        height: RFPercentage(8),
        width: RFPercentage(15),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e4e7f8",
        borderRadius: 30,
        marginRight: 20
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    },
    filterContainer: {},
    actionContainer: {}
})