export default function TypingIndicator({ typingUser }) {

    if (!typingUser) return null;

    return (

        <div className="px-5 py-2 text-sm text-gray-500 italic animate-pulse">

            {typingUser} is typing...

        </div>

    );

}