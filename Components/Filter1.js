import React, { Component } from  'react'
import { Image, View } from 'react-native'

function Filter1({
    face: {
        bounds: {
            size: { width: faceWidth, height: faceHeight }
        }, leftEyePosition, 
        rightEyePosition, 
        noseBasePosition
    }
}) {
    const transformAngle = (
        angleRad = Math.atan(
            (rightEyePosition.y - leftEyePosition) /
            (rightEyePosition.x - leftEyePosition.x)
        )
    ) => (angleRad * 180) / Math.PI;
    return (
        <Image
            source={require("../assets/crown-pic1.png")}
            style={{
                width: filterWidth,
                height: filterHeight,
                resizeMode: "contain",
                transform: [{ rotate: `${transformAngle()}deg` }]
            }} />
        
    );
}

export default Filter1;