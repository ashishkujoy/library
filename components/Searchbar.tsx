import { Search } from "lucide-react";
import "../styles/Searchbar.css";

const Searchbar = (props: { value: string; onChange: (s: string) => void; onSearch: () => void; }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        props.onChange(value);
    }

    const onClick = () => {
        console.log("Search clicked");
        props.onSearch();
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={props.value}
                onChange={handleChange}
                className="search-input"
            />
            <Search className="search-icon" size={20} onClick={onClick} />
        </div>
    )
}

export default Searchbar;