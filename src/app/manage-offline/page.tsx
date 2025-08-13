import { SettingsIcon } from "lucide-react";
import PrimaryButton from "@/components/PrimaryButton";
import "@/styles/ManageOffline.css";

export default function ManageOfflinePage() {
  return (
    <div className="manage-offline-container">
      <div className="manage-offline-card">
        <div className="manage-offline-icon">
          <SettingsIcon size={32} color="#ea580c" />
        </div>
        
        <h1 className="manage-offline-title">
          Management Features Offline
        </h1>
        
        <p className="manage-offline-description">
          Management features require an internet connection to ensure data consistency and security. Please connect to the internet to continue.
        </p>
        
        <div className="manage-offline-limitations">
          <h3 className="manage-offline-limitations-title">Offline Limitations:</h3>
          <ul className="manage-offline-limitations-list">
            <li>• Cannot add new books</li>
            <li>• Cannot generate QR codes</li>
            <li>• Cannot view borrowed books status</li>
            <li>• Cannot process book returns</li>
          </ul>
        </div>
        
        <div className="manage-offline-sync-info">
          <p className="manage-offline-sync-text">
            💡 Changes will be saved and synced when you reconnect
          </p>
        </div>
        
        <div className="manage-offline-buttons">
          <button 
            onClick={() => window.location.reload()}
            className="manage-offline-reconnect-button"
          >
            Try Reconnecting
          </button>
          
          <PrimaryButton 
            onClick={() => window.location.href = '/'}
            title="Go to Home"
          />
        </div>
      </div>
    </div>
  );
}
