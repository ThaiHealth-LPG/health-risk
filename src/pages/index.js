import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Health-Risk App</title>
        <meta name="description" content="Health Risk Assessment Application" />
      </Head>

      <header className="bg-primary text-white py-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center">
            Welcome to Health-Risk App
          </h1>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <section className="bg-white shadow-md rounded p-8">
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Get Started
          </h2>
          <p className="text-gray-700 mb-6">
            Use this app to assess health risks quickly and efficiently. Follow
            the steps below to begin.
          </p>
          <button className="bg-accent text-white px-4 py-2 rounded hover:bg-yellow-500">
            Start Assessment
          </button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; 2024 Health-Risk App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
