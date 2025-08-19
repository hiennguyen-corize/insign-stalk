"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-2">Đã xảy ra lỗi</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Rất tiếc, đã có lỗi xảy ra khi tải trang.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
      >
        Thử lại
      </button>
    </main>
  );
}
