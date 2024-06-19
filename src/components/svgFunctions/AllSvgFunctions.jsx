function PenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <g clipPath="url(#clip0_104_100)">
        <path
          d="M20.2324 12.2024C19.2582 12.2024 18.4683 12.9923 18.4683 13.9666V18.4716H3.53174V13.9666C3.53174 12.9923 2.74186 12.2024 1.76758 12.2024C0.793291 12.2024 0.00341797 12.9923 0.00341797 13.9666V20.2357C0.00341797 21.21 0.793291 21.9999 1.76758 21.9999H20.2324C21.2067 21.9999 21.9966 21.21 21.9966 20.2357V13.9666C21.9966 12.9923 21.2067 12.2024 20.2324 12.2024Z"
          fill="white"
        />
        <path
          d="M7.2666 7.99251L9.23587 6.02323V12.5962C9.23587 13.5705 10.0257 14.3604 11 14.3604C11.9743 14.3604 12.7642 13.5705 12.7642 12.5962V6.02318L14.7335 7.99245C15.0779 8.33693 15.5294 8.50917 15.9809 8.50917C16.4324 8.50917 16.8839 8.33693 17.2283 7.99245C17.9173 7.30348 17.9173 6.18654 17.2283 5.49757L12.2475 0.516766C11.5586 -0.172255 10.4415 -0.172255 9.75259 0.516766L4.77173 5.49763C4.08276 6.1866 4.08276 7.30354 4.77173 7.99251C5.46063 8.68147 6.5777 8.68147 7.2666 7.99251Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_104_100">
          <rect width="22" height="22" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function CancelIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="55"
      height="55"
      viewBox="0 0 55 55"
      fill="none"
    >
      <path
        d="M28.9872 42.1914C37.5838 41.4393 43.943 33.8607 43.1909 25.264C42.4388 16.6674 34.8602 10.3082 26.2635 11.0603C17.6669 11.8124 11.3077 19.391 12.0598 27.9877C12.8119 36.5843 20.3905 42.9435 28.9872 42.1914Z"
        stroke="url(#paint0_linear_104_210)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.8332 21.4165L22.4166 31.8332M32.8332 31.8332L22.4166 21.4165"
        stroke="url(#paint1_linear_104_210)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_104_210"
          x1="26.2635"
          y1="11.0603"
          x2="28.9872"
          y2="42.1914"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EB4D57" />
          <stop offset="1" stopColor="#FF9212" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_104_210"
          x1="27.6249"
          y1="21.4165"
          x2="27.6249"
          y2="31.8332"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EB4D57" />
          <stop offset="1" stopColor="#FF9212" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function RenameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M6.71434 1.13232C6.47765 1.13232 6.28577 1.32219 6.28577 1.5564C6.28577 1.79061 6.47765 1.98047 6.71434 1.98047H7.57148V13.8545H6.71434C6.47765 13.8545 6.28577 14.0444 6.28577 14.2786C6.28577 14.5128 6.47765 14.7027 6.71434 14.7027H9.28577C9.52245 14.7027 9.71434 14.5128 9.71434 14.2786C9.71434 14.0444 9.52245 13.8545 9.28577 13.8545H8.42862V1.98047H9.28577C9.52245 1.98047 9.71434 1.79061 9.71434 1.5564C9.71434 1.32219 9.52245 1.13232 9.28577 1.13232H6.71434Z"
        fill="white"
      />
      <path
        d="M3.57138 3.40503H6.99995V4.25318H3.57138C3.01909 4.25318 2.57138 4.69619 2.57138 5.24268V10.6143C2.57138 11.1608 3.01909 11.6038 3.57138 11.6038H6.99995V12.4519H3.57138C2.5457 12.4519 1.71423 11.6292 1.71423 10.6143V5.24268C1.71423 4.22777 2.5457 3.40503 3.57138 3.40503Z"
        fill="white"
      />
      <path
        d="M12.4286 11.6038H9V12.4519H12.4286C13.4542 12.4519 14.2857 11.6292 14.2857 10.6143V5.24268C14.2857 4.22777 13.4542 3.40503 12.4286 3.40503H9V4.25318H12.4286C12.9809 4.25318 13.4286 4.69619 13.4286 5.24268V10.6143C13.4286 11.1608 12.9809 11.6038 12.4286 11.6038Z"
        fill="white"
      />
    </svg>
  );
}

export { PenIcon, TrashIcon, XIcon, ExportIcon, CancelIcon, RenameIcon };
