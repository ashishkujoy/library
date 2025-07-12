export const formatBorrowDate = (borrowedDate: string): string => {
    const borrowed = new Date(borrowedDate);
    const now = new Date();
    
    // Format the date as "Feb 17, 2025"
    const formattedDate = borrowed.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    
    // Calculate time difference
    const timeDiff = now.getTime() - borrowed.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    const monthsDiff = Math.floor(daysDiff / 30);
    const yearsDiff = Math.floor(daysDiff / 365);
    
    let timeAgo = '';
    if (yearsDiff > 0) {
        timeAgo = `${yearsDiff} yr${yearsDiff > 1 ? 's' : ''}.`;
    } else if (monthsDiff > 0) {
        timeAgo = `${monthsDiff} mo.`;
    } else if (daysDiff > 0) {
        timeAgo = `${daysDiff} day${daysDiff > 1 ? 's' : ''}`;
    } else {
        timeAgo = 'today';
    }
    
    return `${formattedDate} (${timeAgo} ago)`;
};

export const isOverdue = (dueDate?: string): boolean => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
};
