import { Loader2 } from "lucide-react";
import React from "react";

export default function LoadingScreen() {
  return (
    <div className="!h-screen !w-screen overflow-hidden flex justify-center items-center pb-[100px] z-50 absolute bg-main top-0 left-0 right-0 bottom-0">
      <div className="flex flex-col gap-2 w-full justify-center items-center bg-main">
        <span className="flex gap-2">
          <span>
            <svg
              width="48px"
              height="48px"
              viewBox="0 0 128 128"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="iconify iconify--noto"
              preserveAspectRatio="xMidYMid meet">
              <radialGradient
                id="IconifyId17ecdb2904d178eab13511"
                cx="75.424"
                cy="-61.613"
                r="183.963"
                gradientUnits="userSpaceOnUse">
                <stop offset=".532" stopColor="#f33a1f"></stop>
                <stop offset=".615" stopColor="#f86922"></stop>
                <stop offset=".696" stopColor="#fd9124"></stop>
                <stop offset=".739" stopColor="#ffa025"></stop>
                <stop offset=".793" stopColor="#fca025"></stop>
                <stop offset=".839" stopColor="#f1a124"></stop>
                <stop offset=".883" stopColor="#dfa222"></stop>
                <stop offset=".925" stopColor="#c7a41f"></stop>
                <stop offset=".962" stopColor="#aaa61c"></stop>
              </radialGradient>
              <path
                d="M4.03 89.43c-1.2 6.01 5.66 29.12 41.45 33.74c18.39 2.37 36.45-4.16 50.75-15.11S119.3 83 122.31 70.11c4.63-19.85-.69-49.82-40.06-51.59c-40.26-1.81-53.79 40.28-62.23 52.65C9.86 86.08 5.12 84 4.03 89.43z"
                fill="url(#IconifyId17ecdb2904d178eab13511)"></path>
              <path
                d="M41.89 36.33s13.57 6.9 34.61 5.44c17.03-1.18 23.73-9.54 23.73-9.54s7.49 2.06 12.46.74c1.99-.53 2.42-1.61-.01-4.13c-3.67-3.82-16.27-10.89-34.85-9.7c-23.25 1.51-35.94 17.19-35.94 17.19z"
                fill="#dc0d27"></path>
              <path
                d="M26.04 76.62c2.36 3.93 9.35-1.14 14.27-6.07c7.1-7.12 10.33-13.64 12.22-16.95c1.89-3.31 4.45-10.44-.71-11.59c-5.37-1.19-6.96 5.45-9.72 10.34s-6.6 10.71-9.68 14.5c-3.27 4.03-7.78 7.44-6.38 9.77z"
                fill="#ffebc9"></path>
              <path
                d="M102.36 24.98c-.68 2.97 2.05 5.05 3.94 6.54s6.15 2.05 7.57 1.02c1.42-1.02-.16-4.02.87-5.83c1.02-1.81 2.84-4.02.63-5.52c-1.85-1.26-4.34-1.73-6.62-1.26s-2.29 2.21-3.23 2.68c-.96.48-2.93 1.35-3.16 2.37z"
                fill="#6d4c41"></path>
              <path
                d="M100.14 25.88c-2.52 1.1-9.94 6.95-27.26 8.28c-19.1 1.47-41.53-.8-45.27-1.33c-3.74-.53-10.12-.78-10.03-2.38c.13-2.4 2.61-1.63 7.61-3.07c6.01-1.74 12.15-4.14 16.83-6.94c7.18-4.31 21.8-15.09 36.19-15.36c15.76-.29 20.83 4.67 24.7 8.81s3.93 8.48 2.86 10.22c-1.06 1.74-2.56.44-5.63 1.77z"
                fill="#518e30"></path>
              <path
                d="M50.46 24.92c.37.46 7.35.72 11.24.59c8.88-.29 15.91-2.65 24.66-3.63s16.38 0 16.67-.34c.53-.62-4.84-7.92-22.41-5.95c-6.47.73-14.79 4.02-20.53 6.31c-3.66 1.49-9.98 2.58-9.63 3.02z"
                fill="#366918"></path>
            </svg>
          </span>
          <span className="flex flex-col gap-2 text-main-orange dark:text-foreground">
            <h1 className="text-5xl font-bold text-main-oranger">Mangoes</h1>
          </span>
        </span>
        <Loader2 size={38} className="animate-spin text-main-oranger" />
      </div>
    </div>
  );
}
