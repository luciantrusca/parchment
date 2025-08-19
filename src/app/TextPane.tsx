type TextPaneProps = {
    text: string;
    className?: string;
};

export default function TextPane({ text, className }: TextPaneProps) {
    return (
        <div className={`bg-amber-100 text-black p-2 ${className ?? ''}`}>
            {text}
        </div>
    );
}