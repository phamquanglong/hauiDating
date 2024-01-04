import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
// import {
//   RTCView,
//   RTCPeerConnection,
//   mediaDevices,
//   MediaStream,
// } from 'react-native-webrtc';
import {useSocketStore} from '~zustands/useSocketStore';

// const configuration = {
//   iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
// };
// const peerConnection = new RTCPeerConnection(configuration);

const VideoCallScreen = ({route}: any) => {
  // const {targetUser, offer} = route.params;
  // const {appSocket} = useSocketStore();
  // const [localStream, setLocalStream] = useState<MediaStream | null>();
  // const [remoteStream, setRemoteStream] = useState<MediaStream | null>();
  // const [isCalling, setIsCalling] = useState(false);

  // const receiveCallVideo = async () => {
  //   try {
  //     const answerSdp = offer;
  //     const answer = new RTCSessionDescription({
  //       type: 'answer',
  //       sdp: answerSdp,
  //     });
  //     const response = await peerConnection.setRemoteDescription(answer);
  //     console.log({response});

  //     // // Use the received offerDescription
  //     // const offerDescription = new RTCSessionDescription(offer);
  //     // await peerConnection.setRemoteDescription(offerDescription);

  //     // const answerDescription = await peerConnection.createAnswer();
  //     // await peerConnection.setLocalDescription(answerDescription);

  //     // // Send the answerDescription back as a response to the offerDescription.
  //     // appSocket?.sendCallVideo(targetUser?.conv?.id, answerDescription);
  //   } catch (err) {
  //     // Handle Errors
  //   }
  // };

  // useEffect(() => {
  //   offer && receiveCallVideo();
  // }, [appSocket]);

  // useEffect(() => {
  //   const startLocalStream = async () => {
  //     const stream = await mediaDevices.getUserMedia({
  //       audio: true,
  //       video: {
  //         frameRate: 30,
  //         facingMode: 'user',
  //       },
  //     });
  //     setLocalStream(stream);
  //   };

  //   startLocalStream();
  // }, []);

  // const startCall = async () => {
  //   // Add local stream to peer connection
  //   localStream?.getTracks().forEach(track => {
  //     peerConnection.addTrack(track, localStream);
  //   });

  //   let sessionConstraints = {
  //     mandatory: {
  //       OfferToReceiveAudio: true,
  //       OfferToReceiveVideo: true,
  //       VoiceActivityDetection: true,
  //     },
  //   };
  //   // Set up event handlers for the peer connection

  //   // Create offer
  //   const offerCreated = await peerConnection.createOffer(sessionConstraints);
  //   await peerConnection.setLocalDescription(offerCreated);
  //   // console.log({offer});
  //   appSocket?.sendCallVideo(
  //     targetUser?.conv?.id,
  //     peerConnection.localDescription?.sdp,
  //   );
  // };

  return (
    <View>
      <Text>Video Call Screen</Text>
      {/* <RTCView
        streamURL={localStream?.toURL()}
        style={{width: 200, height: 150}}
      />
      <RTCView
        streamURL={remoteStream?.toURL()}
        style={{width: 200, height: 150}}
      />
      <Button title="Start Call" onPress={startCall} disabled={isCalling} /> */}
    </View>
  );
};

export default VideoCallScreen;
