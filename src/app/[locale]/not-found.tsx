import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg text-foreground-light mb-8 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.<br />
        Please check the URL or return to the homepage.
      </p>
      <Link href="/" className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors">
        Go to Homepage
      </Link>
    </main>
  );
} 