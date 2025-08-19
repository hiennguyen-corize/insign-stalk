"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="max-w-4xl mx-auto px-4 py-24">
          <h1 className="text-3xl font-bold mb-2">Lỗi hệ thống</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Có sự cố xảy ra. Vui lòng thử lại.
          </p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Thử lại
          </button>
        </main>
      </body>
    </html>
  );
}
