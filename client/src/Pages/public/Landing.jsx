
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Book Doctor Appointments Easily
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Find nearby doctors, check availability, and book appointments
          in minutes.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Find Doctors
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Search doctors by specialization and location.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Check Availability
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              View real-time slots before booking.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Book Instantly
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Confirm appointments in one click.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Get Started Today
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Join patients and doctors using our platform daily.
        </p>

        <Link
          to="/register"
          className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create Free Account
        </Link>
      </section>
    </div>
  );
};

export default Landing;
