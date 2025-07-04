import { TypingText } from "@/components/animate-ui/text/typing";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="text-center py-8 md:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Insights, simply delivered
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Short reads, big ideas
        </p>
      </div>
    </section>
  );
}
