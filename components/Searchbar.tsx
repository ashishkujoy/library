import { Search } from "lucide-react"
import "../styles/Searchbar.css"

const Searchbar = () => {
    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Search..." 
                className="search-input"
            />
            <Search className="search-icon" size={20} />
        </div>
    )
}

export default Searchbar;