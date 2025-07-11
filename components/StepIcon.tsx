import { BookOpenIcon } from "lucide-react";

const StepIcon = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div>
        <BookOpenIcon color="#fff"/>
      </div>
      <div style={{ display: "flex", flexDirection: "column", color: "#fff", borderLeft: "1px solid #fff", paddingLeft: "8px" }}>
        <div style={{fontSize: "1.2rem"}}>STEP</div>
        <div style={{fontSize: "0.6rem"}}>Library</div>
      </div>
    </div>
  )
};

export default StepIcon;
