interface ErrorMessageProps {
  message: string;
  onBack?: () => void;
}

export default function ErrorMessage({ message, onBack }: ErrorMessageProps) {
  return (
    <div>
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {message}
      </div>
      {onBack && (
        <button onClick={onBack} className="mt-4 text-blue-600 hover:underline">
          ← Back
        </button>
      )}
    </div>
  );
}
