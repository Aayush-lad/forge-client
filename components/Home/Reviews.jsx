import React from 'react'

const Reviews = () => {
  return (
    <div id="reviews">
        <section className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
      Read trusted reviews from our customers
    </h2>

    <div className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <img
              alt=""
              src="data:image/jpeg;base64,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"
              className="size-14 rounded-full object-cover"
            />

            <div>
              <div className="flex justify-center gap-0.5 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>

              <p className="mt-0.5 text-lg font-medium text-gray-900">Anonymous</p>
            </div>
          </div>

          <p className="mt-4 text-gray-700">
          Forge has revolutionized the way our team handles projects. The Kanban boards are intuitive and the integration of collaborative whiteboards has made brainstorming sessions seamless. The video meetings and chat features keep our team connected and on track. Highly recommend Forge for any team looking to enhance their project management workflow
          </p>
        </blockquote>
      </div>

      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <img
              alt=""
              src="data:image/jpeg;base64,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"
              className="size-14 rounded-full object-cover"
            />

            <div>
              <div className="flex justify-center gap-0.5 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>

              <p className="mt-0.5 text-lg font-medium text-gray-900">Anonymous</p>
            </div>
          </div>

          <p className="mt-4 text-gray-700">
          Using Forge has transformed how our marketing team manages campaigns. The Kanban boards and collaborative whiteboard facilitate seamless planning and execution. The ability to customize forms and gather real-time feedback has improved our campaign responsiveness. Forge’s intuitive interface and comprehensive features make it indispensable for any marketing team.
          </p>
        </blockquote>
      </div>

      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <img
              alt=""
              src="data:image/jpeg;base64,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"
              className="size-14 rounded-full object-cover"
            />

            <div>
              <div className="flex justify-center gap-0.5 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>

              <p className="mt-0.5 text-lg font-medium text-gray-900">Anonymous</p>
            </div>
          </div>

          <p className="mt-4 text-gray-700">
          Forge has exceeded our expectations in every way. The drag-and-drop form builder and the collaborative whiteboard have streamlined our workflow. The subscription management is transparent and flexible, catering to our specific needs. Forge’s powerful features and user-friendly interface make it the best project management tool we’ve ever used.
          </p>
        </blockquote>
      </div>

      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <img
              alt=""
              src="data:image/jpeg;base64,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"
              className="size-14 rounded-full object-cover"
            />

            <div>
              <div className="flex justify-center gap-0.5 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>

              <p className="mt-0.5 text-lg font-medium text-gray-900">Anonymous</p>
            </div>
          </div>

          <p className="mt-4 text-gray-700">
          Since adopting Forge, our project management has become more efficient and organized. The flexibility of the drag-and-drop form builder and the comprehensive analytics dashboard have provided us with invaluable insights. Forge’s subscription management is straightforward, and the customer support team is always ready to help. A game-changer for our business!
          </p>
        </blockquote>
      </div>

      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <img
              alt=""
              src="data:image/jpeg;base64,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"
              className="size-14 rounded-full object-cover"
            />

            <div>
              <div className="flex justify-center gap-0.5 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>

              <p className="mt-0.5 text-lg font-medium text-gray-900">Anonymous</p>
            </div>
          </div>

          <p className="mt-4 text-gray-700">
          Forge’s interface is sleek and user-friendly, making it easy to manage multiple projects simultaneously. The real-time collaboration features, such as the collaborative whiteboard and team chat, have significantly improved our productivity. The ability to customize our subscription plan according to our needs is a big plus. Forge is a must-have tool for any development team!
          </p>
        </blockquote>
      </div>

      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <img
              alt=""
              src="data:image/jpeg;base64,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"
              className="size-14 rounded-full object-cover"
            />

            <div>
              <div className="flex justify-center gap-0.5 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>

              <p className="mt-0.5 text-lg font-medium text-gray-900">Anonymous</p>
            </div>
          </div>

          <p className="mt-4 text-gray-700">
          Forge has made managing our projects so much easier. The unlimited project feature in the Basic and Business plans is perfect for our growing needs. The video meetings are reliable, and the integration with other tools is seamless. Forge’s intuitive design and robust features make it an essential tool for our product management.
          </p>
        </blockquote>
      </div>

      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <img
              alt=""
              src="data:image/jpeg;base64,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"
              className="size-14 rounded-full object-cover"
            />

            <div>
              <div className="flex justify-center gap-0.5 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>

              <p className="mt-0.5 text-lg font-medium text-gray-900">Anonymous</p>
            </div>
          </div>

          <p className="mt-4 text-gray-700">
          We switched to Forge a few months ago, and the impact on our project management has been profound. The platform is incredibly versatile, accommodating all our team’s needs from Kanban boards to video meetings. The analytics provide great insights, helping us make informed decisions. Forge is the ultimate project management tool!
          </p>
        </blockquote>
      </div>

      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <img
              alt=""
              src="data:image/jpeg;base64,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"
              className="size-14 rounded-full object-cover"
            />

            <div>
              <div className="flex justify-center gap-0.5 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>

              <p className="mt-0.5 text-lg font-medium text-gray-900">Anonymous</p>
            </div>
          </div>

          <p className="mt-4 text-gray-700">
          Forge has exceeded our expectations in every way. The drag-and-drop form builder and the collaborative whiteboard have streamlined our workflow. The subscription management is transparent and flexible, catering to our specific needs. Forge’s powerful features and user-friendly interface make it the best project management tool we’ve ever used.
          </p>
        </blockquote>
      </div>

      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <img
              alt=""
              src="data:image/jpeg;base64,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"
              className="size-14 rounded-full object-cover"
            />

            <div>
              <div className="flex justify-center gap-0.5 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>

              <p className="mt-0.5 text-lg font-medium text-gray-900">Anonymous</p>
            </div>
          </div>

          <p className="mt-4 text-gray-700">
          Forge has been a game-changer for our operations management. The unlimited teams and organizations in the Business plan perfectly suit our global operations. The integration of collaborative tools like the whiteboard and video meetings has enhanced our team &apos; efficiency and decision-making. Forge robust analytics dashboard provides actionable insights, making it an invaluable asset to our organization
          </p>
        </blockquote>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Reviews