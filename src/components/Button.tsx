interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, loading = false, className = '', ...props }) => {
  return (
    <button
      className={`
        w-full text-white py-2.5 px-4 rounded-lg font-medium
        transition-all duration-200 ease-in-out
        hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 focus:outline-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600
        relative overflow-hidden
        ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};