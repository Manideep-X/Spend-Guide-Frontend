export const errorClassFullW = "px-5 py-2 w-full border-2 border-red-300 outline-none rounded-lg bg-red-100";

export const errorClass = "px-5 py-2 border-2 border-red-300 outline-none rounded-lg bg-red-100";

export const ErrorText = (name) => {
    return (
        <p className="pl-2 font-medium error text-red-600 text-xs">
            {name} is required
        </p>
    )
}