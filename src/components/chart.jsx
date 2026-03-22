export default function Chart({ score = 0, total = 1 }) {
  // جلوگیری division by zero
  const safeTotal = total > 0 ? total : 1;

  // Calculate percentage safely
  const percentage = Math.min((score / safeTotal) * 100, 100);

  return (
    <div className="w-full text-center">
      {/* Progress Bar */}
      <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Percentage Text */}
      <p className="mt-2 text-sm text-gray-400">
        {Math.round(percentage)}% Performance
      </p>
    </div>
  );
}