import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {
  RTCView,
  RTCPeerConnection,
  mediaDevices,
  MediaStream,
} from 'react-native-webrtc';

const VideoCallScreen = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>();
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>();
  const [isCalling, setIsCalling] = useState(false);

  useEffect(() => {
    const startLocalStream = async () => {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setLocalStream(stream);
    };

    startLocalStream();
  }, []);

  const startCall = async () => {
    const configuration = {
      iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
    };
    const peerConnection = new RTCPeerConnection(configuration);

    // Add local stream to peer connection
    localStream?.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });

    // Set up event handlers for the peer connection

    // Create offer
    const offer = await peerConnection.createOffer(undefined);
    await peerConnection.setLocalDescription(offer);
    console.log({offer});

    // Send offer to remote user (using signaling server, not implemented in this example)

    // Handle answer from remote user (not implemented in this example)
  };

  return (
    <View>
      <Text>Video Call Screen</Text>
      <RTCView
        streamURL={localStream?.toURL()}
        style={{width: 200, height: 150}}
      />
      <RTCView
        streamURL={remoteStream?.toURL()}
        style={{width: 200, height: 150}}
      />
      <Button title="Start Call" onPress={startCall} disabled={isCalling} />
    </View>
  );
};

export default VideoCallScreen;
