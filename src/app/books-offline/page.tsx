import { BookOpenIcon } from "lucide-react";
import PrimaryButton from "@/components/PrimaryButton";
import "@/styles/BooksOffline.css";

export default function BooksOfflinePage() {
  return (
    <div className="books-offline-container">
      <div className="books-offline-card">
        <div className="books-offline-icon">
          <BookOpenIcon size={32} color="#2563eb" />
        </div>
        
        <h1 className="books-offline-title">
          Books Unavailable Offline
        </h1>
        
        <p className="books-offline-description">
          You need an internet connection to browse and search for books. However, you can still access your reading list if it was previously loaded.
        </p>
        
        <div className="books-offline-info">
          <h3 className="books-offline-info-title">What you can do:</h3>
          <ul className="books-offline-info-list">
            <li>• Check your current reading list</li>
            <li>• View previously loaded book details</li>
            <li>• Return books you&apos;ve already borrowed</li>
          </ul>
        </div>
        
        <div className="books-offline-buttons">
          <PrimaryButton 
            onClick={() => window.location.href = '/reading'}
            title="Go to Reading List"
          />
          
          <button 
            onClick={() => window.history.back()}
            className="books-offline-button-secondary"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
