import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Monitor,
  Phone,
} from "lucide-react";

interface Props {
  inCall: boolean;
  audioEnabled: boolean;
  videoEnabled: boolean;
  onStart: () => void;
  onEnd: () => void;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onScreenShare: () => void;
}

export function CallControls({
  inCall,
  audioEnabled,
  videoEnabled,
  onStart,
  onEnd,
  onToggleAudio,
  onToggleVideo,
  onScreenShare,
}: Props) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      {!inCall ? (
        <button
          onClick={onStart}
          className="bg-green-500 text-white p-3 rounded-full"
        >
          <Phone />
        </button>
      ) : (
        <>
          <button
            onClick={onToggleAudio}
            className="bg-gray-200 p-3 rounded-full"
          >
            {audioEnabled ? <Mic /> : <MicOff />}
          </button>

          <button
            onClick={onToggleVideo}
            className="bg-gray-200 p-3 rounded-full"
          >
            {videoEnabled ? <Video /> : <VideoOff />}
          </button>

          <button
            onClick={onScreenShare}
            className="bg-gray-200 p-3 rounded-full"
          >
            <Monitor />
          </button>

          <button
            onClick={onEnd}
            className="bg-red-500 text-white p-3 rounded-full"
          >
            <PhoneOff />
          </button>
        </>
      )}
    </div>
  );
}
