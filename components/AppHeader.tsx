import "../styles/AppHeader.css";
import StepIcon from "./StepIcon";

const AppHeader = () => {
    return <div className="app-header-container">
        <div className="app-header-children" style={{ height: "40px", width: "111px" }}>
            <StepIcon />
        </div>
    </div>
}

export default AppHeader;