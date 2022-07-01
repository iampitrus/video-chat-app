import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { StartButtons } from "./components/StartButtons";
import { useMeetings } from "./hooks/use-meetings";
import { Input } from "../../components/Input";
import { Button } from "./../../components/Button";
import { MeetingList } from "./components/MeetingList";
import { Modal } from "../../components/Modal";
import { useMeetingCode } from "../join-page/hooks/use-meeting-code";

//@ts-ignore
import linkImageSrc from "./../../assets/images/meeting-link.png";

const StartPage = () => {
  const { meetings, createNewMeeting, removeMeeting, isLoading } =
    useMeetings();
  const haveMeetings = useMemo(() => meetings.length > 0, [meetings]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetingName, setMeetingName] = useState("");
  const [showError, setShowError] = useState(false);
  const { saveMeetingCode } = useMeetingCode();
  const navigate = useNavigate();

  if (isLoading) {
    return null;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setShowError(false);
    setIsModalOpen(false);
  };

  const joinMeeting = () => {
    if (isMeetingCodeValid(meetingName)) {
      setShowError(false);
      saveMeetingCode(meetingName);
      navigate("/lobby");
    }
    setShowError(true);
  };

  return (
    <div className="start-page">
      <Modal
        isOpen={isModalOpen}
        title="Join with code"
        body={
          <div className="start-page__modal-body">
            <Input
              placeholder="Ej: abc-mnop-xyz"
              value={meetingName}
              onChange={(evt) => {
                const meetingCode = evt.target.value;
                setMeetingName(meetingCode);
                if (isMeetingCodeValid(meetingCode)) {
                  setShowError(false);
                }
              }}
            />
            {showError && <div className="error-message">Invalid code</div>}
          </div>
        }
        footer={
          <Button
            classNames="join-code-button"
            onClick={joinMeeting}
            text="Join"
          />
        }
        onClose={closeModal}
      />
      <StartButtons
        createMeeting={createNewMeeting}
        joinMeetingWithCode={openModal}
      />
      {haveMeetings ? (
        <MeetingList meetings={meetings} removeMeeting={removeMeeting} />
      ) : (
        <div className="info-message">
          <div className="info-message_image">
            <img src={linkImageSrc} alt="Link" />
          </div>
          <div className="info-message_title">Get a link you can share</div>
          <div className="info-message_subtitle">
            Tap <strong>New meeting</strong> to get a link you can send to
            people yo want to meet with
          </div>
        </div>
      )}
    </div>
  );
};

const isMeetingCodeValid = (meetingCode: string) => {
  return new RegExp(/^\w{3}-\w{3}-\w{3}$/i).test(meetingCode);
};

export { StartPage };
