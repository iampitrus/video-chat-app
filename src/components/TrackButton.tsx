import { BsCameraVideoOffFill } from "react-icons/bs";
import { BsCameraVideoFill } from "react-icons/bs";
import { BsMicFill } from "react-icons/bs";
import { BsMicMuteFill } from "react-icons/bs";

const TrackButton = ({ type, isActive, classNames, onClick }: IProps) => (
  <button
    className={`button ${!isActive ? "inactive" : ""} ${classNames}`}
    onClick={onClick}
  >
    {renderButtonIconByType(type, isActive)}
  </button>
);

const renderButtonIconByType = (type: IType, isActive: boolean) => {
  const buttonsMap = {
    camera: isActive ? (
      <BsCameraVideoFill size={18} />
    ) : (
      <BsCameraVideoOffFill size={18} />
    ),
    mic: isActive ? <BsMicFill size={18} /> : <BsMicMuteFill size={18} />,
  };

  return buttonsMap[type];
};

type IProps = {
  type: IType;
  isActive: boolean;
  classNames?: string;
  onClick: () => void;
};

export type IType = "mic" | "camera";

export { TrackButton };
