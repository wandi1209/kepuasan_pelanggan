export default function ButtonMasukan({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center place-items-center w-64 h-24 items-center border-b-4 border-r-4 border-gray-700 mx-4 rounded-2xl font-semibold text-xl text-white uppercase tracking-widest hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
