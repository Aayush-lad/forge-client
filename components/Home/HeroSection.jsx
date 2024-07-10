import React from 'react';

const HeroSection = () => {
  return (
    <>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Streamline Project Management.
              <strong className="font-extrabold text-green-700 sm:block"> Boost Team Productivity. </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Empower your team with our comprehensive project management tool. Manage tasks, collaborate seamlessly, and achieve your goals efficiently.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-green-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
                href="/auth"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
