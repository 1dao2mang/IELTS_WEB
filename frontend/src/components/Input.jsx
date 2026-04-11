import clsx from 'clsx';

export const Input = ({ label, error, className, id, ...props }) => {
  const inputId = id || props.name;

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-foreground mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          'input w-full',
          error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  );
};
