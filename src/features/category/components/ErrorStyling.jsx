export const errorClassFullW = "px-5 py-2 w-full border-2 border-red-300 outline-none rounded-lg bg-red-200";

export const ErrorText = ({message}) => {
    return (
        <p className="pl-2 font-medium error text-red-600 text-sm">
            {message}
        </p>
    )
}