import "@/styles/PrimaryButton.css";

type PrimaryButtonProps = {
    onClick: () => void;
    title: string;
    disabled?: boolean;
    children?: React.ReactNode;
};

const PrimaryButton = ({ onClick, title, disabled, children }: PrimaryButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="primary-button"
        >
            {children}
            {title}
        </button>
    );
};

export default PrimaryButton;
