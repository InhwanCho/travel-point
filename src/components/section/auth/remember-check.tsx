
export default function RememberMeCheckbox() {
  return (
    <div className="flex items-center">
      <input
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        id="remember-me"
        name="remember-me"
        type="checkbox"
      />
      <label className="ml-2 block text-sm text-gray-900" htmlFor="remember-me">
        기억하기
      </label>
    </div>
  );
}
