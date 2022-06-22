import { useMemo } from "react";

import { StartButtons } from "./components/StartButtons";
import { useMeetings } from "./hooks/use-meetings";
import { MeetingLinkItem } from "./components/MeetingLinkItem";

//@ts-ignore
import linkImageSrc from "./../../assets/images/meeting-link.png";

const StartPage = () => {
  const { meetings, createNewMeeting, isLoading } = useMeetings();
  const haveMeetings = useMemo(() => meetings.length > 0, [meetings]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="start-page">
      <StartButtons createMeeting={createNewMeeting} />
      {haveMeetings ? (
        <div className="meetings">
          <h5 className="title">Meetings</h5>
          <div className="meeting-list">
            {meetings.map((meeting) => (
              <MeetingLinkItem key={meeting.code} meeting={meeting} />
            ))}
          </div>
        </div>
      ) : (
        <div className="info-message">
          <div className="info-message_image">
            <img src={linkImageSrc} alt="Link" />
          </div>
          <div className="info-message_title">Get a lik you can share</div>
          <div className="info-message_subtitle">
            Tap <strong>New meeting</strong> to get a link you can send to
            people yo want to meet with
          </div>
        </div>
      )}
    </div>
  );
};

export { StartPage };
