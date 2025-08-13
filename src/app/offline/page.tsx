import StepIcon from "@/components/StepIcon";
import PrimaryButton from "@/components/PrimaryButton";
import "@/styles/OfflinePage.css";

export default function OfflinePage() {
  return (
    <div className="offline-container">
      <div className="offline-card">
        <div className="offline-icon-container">
          <div className="offline-icon-wrapper">
            <StepIcon />
          </div>
        </div>
        
        <h1 className="offline-title">
          You&apos;re Offline
        </h1>
        
        <p className="offline-description">
          It looks like you&apos;ve lost your internet connection. Don&apos;t worry - you can still browse previously loaded content.
        </p>
        
        <div className="offline-features">
          <div className="offline-feature-item books">
            <p className="offline-feature-text books">
              📚 Previously viewed books are still available
            </p>
          </div>
          
          <div className="offline-feature-item reading">
            <p className="offline-feature-text reading">
              💾 Your reading list is cached locally
            </p>
          </div>
          
          <div className="offline-feature-item sync">
            <p className="offline-feature-text sync">
              🔄 Changes will sync when you&apos;re back online
            </p>
          </div>
        </div>
        
        <PrimaryButton 
          onClick={() => window.history.back()}
          title="Go Back"
        />
        
        <button 
          onClick={() => window.location.reload()}
          className="offline-button-secondary"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
