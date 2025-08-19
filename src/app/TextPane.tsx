export default function TextPane({text}: {text: string}) {
    return (
        <div className="bg-amber-100 text-black p-2">
            {text}
        </div>
    )
}