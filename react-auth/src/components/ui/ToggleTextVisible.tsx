import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ToggleTextVisible({
  isVisible,
  toggleVisibility,
}: {
  isVisible: boolean;
  toggleVisibility: () => void;
}) {
  return (
    <button
      aria-label="toggle password visibility"
      className="focus:outline-solid outline-transparent"
      type="button"
      onClick={toggleVisibility}
    >
      {isVisible ? (
        <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
      ) : (
        <FaEye className="text-2xl text-default-400 pointer-events-none" />
      )}
    </button>
  );
}
