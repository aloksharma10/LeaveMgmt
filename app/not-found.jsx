import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section
      data-section-id="1"
      data-share=""
      data-category="http-codes"
      data-component-id="c311001c_02_awz"
      className="container relative pt-20 md:pt-24 lg:py-36 overflow-hidden"
    >
      <div className="bg-black/10 hidden lg:block absolute top-0 left-0 w-2/5 h-full"></div>
      <div className="relative container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap -mx-4 items-center">
            <div className="w-full lg:w-1/2 px-4 order-last lg:order-first -mb-52 lg:-mb-0">
              <Image
                className="w-full max-w-lg lg:max-w-none mx-auto rounded-3xl"
                src="/assets/dog-photo.png"
                alt="forbbidan-image"
                height={500}
                width={500}
                data-config-id="auto-img-2-2"
              />
            </div>
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <div className="relative max-w-sm mx-auto lg:ml-auto">
                <span
                  className="inline-block py-2 px-3 mb-5 text-sm bg-black/10 text-bg-black/95 font-semibold rounded-full"
                  data-config-id="auto-txt-1-2"
                >
                  Page not found
                </span>
                <h4
                  className="font-heading text-5xl md:text-7xl font-bold text-gray-900 mb-6"
                  data-config-id="auto-txt-2-2"
                >
                  Oh no! Error 404
                </h4>
                <div className="flex mb-14 items-start">
                  <span className="flex-shrink-0 mt-2 mr-3">
                    <svg
                      width="46"
                      height="10"
                      viewBox="0 0 46 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      data-config-id="auto-svg-1-2"
                    >
                      <path
                        d="M1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75L1 4.25ZM46 5L38.5 0.669876L38.5 9.33013L46 5ZM1 5.75L39.25 5.75L39.25 4.25L1 4.25L1 5.75Z"
                        fill="#1E254C"
                      ></path>
                    </svg>
                  </span>
                  <p
                    className="text-xl font-semibold text-gray-500"
                    data-config-id="auto-txt-3-2"
                  >
                    Something went wrong, so this page is broken.
                  </p>
                </div>
                <Link
                  href="/"
                  className="relative group inline-block py-3 px-5 text-center text-sm font-semibold text-white bg-black/95 rounded-full overflow-hidden"
                >
                  <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                  <span className="relative" data-config-id="auto-txt-4-2">
                    Take me home
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
