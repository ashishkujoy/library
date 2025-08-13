import "../styles/LoadingSpinner.css";

type LoadingSpinnerProps = {
    size?: 'small' | 'medium' | 'large';
    message?: string;
    className?: string;
}

const LoadingSpinner = ({ size = 'medium', message, className = '' }: LoadingSpinnerProps) => {
    return (
        <div className={`loading-spinner-container ${className}`}>
            <div className={`loading-spinner loading-spinner-${size}`}></div>
            {message && <div className="loading-spinner-message">{message}</div>}
        </div>
    );
};

export default LoadingSpinner;
