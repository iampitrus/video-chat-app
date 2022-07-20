import { useMemo } from "react";
import { useMeetingCode, useParticipants, useTracksSettings } from "../../hooks";
import { MeetingButtons, Participant } from "../../components";

import { MeetingTopActions } from "./components";
import { ShareButton } from "../../components";
import { useHasMultipleCameras } from "./hooks";

const MeetingPage = () => {
  const { participants } = useParticipants();
  const size = useMemo(() => participants.length, [participants]);
  const { hasMultipleCameras } = useHasMultipleCameras();
  const { getVideoSettings } = useTracksSettings();
  const isVideoEnabled = getVideoSettings();
  const { meetingCode } = useMeetingCode();

  return (
    <div className="meeting-page">
     
     <ShareButton meetCode={meetingCode} />
      {isVideoEnabled && hasMultipleCameras && <MeetingTopActions />}
      <div className={`grid grid--${size}`}>
        {participants.map((participant, index) => (
          <Participant
            key={participant.sid ?? index}
            participant={participant}
            index={index}
          />
        ))}
      </div>
      <MeetingButtons />
    </div>
  );
};

export { MeetingPage };
