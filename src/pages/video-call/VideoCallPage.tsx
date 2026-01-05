import { useParams } from "react-router-dom";
import { useState } from "react";
import { VideoPlayer } from "../../components/video/VideoPlayer";
import { CallControls } from "../../components/video/CallControls";
import { findUserById } from "../../data/users";

export function VideoCallPage() {
  const { userId } = useParams<{ userId: string }>();
  const partner = userId ? findUserById(userId) : null;

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [inCall, setInCall] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const startCall = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(mediaStream);
    setInCall(true);
  };

  const endCall = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setInCall(false);
  };

  const toggleAudio = () => {
    stream?.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
    setAudioEnabled((p) => !p);
  };

  const toggleVideo = () => {
    stream?.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
    setVideoEnabled((p) => !p);
  };

  const shareScreen = async () => {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    setStream(screenStream);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">
        Video Call {partner ? `with ${partner.name}` : ""}
      </h1>

      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        {stream ? (
          <VideoPlayer stream={stream} muted />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Call not started
          </div>
        )}
      </div>

      <CallControls
        inCall={inCall}
        audioEnabled={audioEnabled}
        videoEnabled={videoEnabled}
        onStart={startCall}
        onEnd={endCall}
        onToggleAudio={toggleAudio}
        onToggleVideo={toggleVideo}
        onScreenShare={shareScreen}
      />
    </div>
  );
}
