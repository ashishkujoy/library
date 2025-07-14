import { CircleAlertIcon } from "lucide-react"

const Note = (props: { message: string }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', backgroundColor: '#f0f1f3', borderRadius: '4px', opacity: 0.7 }}>
            <CircleAlertIcon size={20} />
            <p style={{margin: 0}}>{props.message}</p>
        </div>
    );
}

export default Note;