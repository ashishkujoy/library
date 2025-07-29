import { BookOpenTextIcon, LibraryIcon, ListPlusIcon } from "lucide-react";
import Link from "next/link";
import "../styles/StickyFooter.css";

type FooterTab = 'books' | 'reading' | 'request' | 'manage';

interface StickyFooterProps {
    activeTab: FooterTab;
    allowManagement: boolean;
}

type TabItemProps = {
    label: string;
    icon: React.ReactNode;
    href: string;
    isActive: boolean;
}

const TabItem = (props: TabItemProps) => {
    return (
        <Link href={props.href} style={{ textDecoration: 'none' }}>
            <button
                className={`footer-tab ${props.isActive && 'active'}`}
            >
                <div className="footer-icon">
                    {props.icon}
                </div>
                <span className="footer-label">{props.label}</span>
            </button>
        </Link>
    )
}

const StickyFooter = ({ activeTab = 'books', allowManagement = false }: StickyFooterProps) =>
(
    <div className="sticky-footer">
        <div className="footer-container">
            <TabItem
                label="Books"
                icon={<LibraryIcon />}
                href="/"
                isActive={activeTab === 'books'}
            />
            <TabItem
                label="Reading"
                icon={<BookOpenTextIcon />}
                href="/reading"
                isActive={activeTab === 'reading'}
            />
            <TabItem
                label="Request"
                icon={<ListPlusIcon />}
                href="/request"
                isActive={activeTab === 'request'}
            />
            {
                allowManagement && (
                    <TabItem
                        label="Manage"
                        icon={<ListPlusIcon />}
                        href="/manage"
                        isActive={activeTab === 'manage'}
                    />
                )
            }
        </div>
    </div>
);


export default StickyFooter;
