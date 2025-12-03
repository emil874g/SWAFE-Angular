interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  children?: React.ReactNode;
}

export default function EmptyState({
  icon,
  title,
  message,
  children,
}: EmptyStateProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {children}
    </div>
  );
}
