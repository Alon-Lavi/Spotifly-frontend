

export function Tooltip({ text, children }) {
    return (
        <div className="tooltip-container">
            {children}
            <div className="tooltip">
                {text}
            </div>
        </div>
    );
}
