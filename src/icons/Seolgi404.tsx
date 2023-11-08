interface Props {
  width?: number;
  height?: number;
  bgFill?: string;
  strokeFill?: string;
  blushFill?: string;
  className?: string;
}

export default function Seolgi404({
  bgFill = "#FFFFFF",
  strokeFill = "#000000",
  blushFill = "#FFE3E3",
  className,
}: Props) {
  return (
    <>
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect
          x="4.95898"
          y="4.24634"
          width="390.083"
          height="392.357"
          fill={bgFill}
        />
        <ellipse
          cx="57.0248"
          cy="215.287"
          rx="30.5785"
          ry="12.3142"
          fill="#FFEBF3"
        />
        <ellipse
          cx="314.049"
          cy="215.287"
          rx="30.5785"
          ry="12.3142"
          fill={blushFill}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.71322 2.23779L0 4.47559V200.391V396.307L1.91239 398.154L3.82562 400H200.116H396.406L398.203 398.035L400 396.069V200.272V4.47559L398.287 2.23779L396.574 0H200H3.42562L1.71322 2.23779ZM385.95 200V385.563L333.264 385.524L280.579 385.487L286.383 383.553C308.433 376.211 329.627 356.115 337.35 335.229C338.216 332.889 339.505 326.729 340.217 321.539C341.268 313.873 341.335 310.907 340.572 305.732C339.455 298.16 336.771 289.005 333.102 280.255C331.632 276.752 329.314 270.637 327.95 266.667C324.555 256.784 316.036 238.708 310.881 230.449C306.053 222.714 298.746 215.123 293.466 212.355C287.832 209.401 279.191 207.853 273.923 208.853C261.067 211.296 254.681 219.562 253.907 234.762C253.55 241.794 253.748 243.197 256.096 250.223C259.121 259.28 259.088 259.02 257.231 259.034C254.379 259.056 233.304 266.825 224.864 270.966C206.925 279.767 193.92 290.884 188.202 302.304L185.152 308.398L183.712 305.155C179.434 295.521 170.561 285.514 158.141 276.316C150.807 270.885 132.841 261.015 123.554 257.315C120.826 256.229 118.457 255.231 118.288 255.097C118.119 254.963 118.926 253.197 120.08 251.174C123.815 244.623 125.62 237.656 125.62 229.783C125.62 217.225 121.395 209.791 111.671 205.239C106.288 202.718 95.6802 202.827 89.0132 205.47C81.4198 208.481 72.2223 216.865 65.2033 227.176C59.438 235.645 52.5198 247.756 48.2248 256.9C45.8107 262.038 42.1529 269.299 40.0959 273.036C38.0388 276.773 35.1545 283.461 33.6859 287.898C31.1545 295.549 31.0207 296.58 31.0942 307.856C31.1595 317.722 31.4818 320.684 32.9909 325.265C43.2719 356.481 71.6099 380.678 99.4182 381.986C108.563 382.415 112.264 381.412 119.421 376.566C132.603 367.64 141.322 352.194 141.322 337.769C141.322 334.242 141.532 333.706 142.769 334.075C149.892 336.199 152.876 336.621 161.157 336.672C170.057 336.727 170.903 336.584 174.474 334.427C178.972 331.71 183.194 327.004 184.902 322.803L186.126 319.794L187.371 322.317C189.444 326.516 195.151 331.961 199.135 333.541C201.969 334.665 205.332 335.032 212.81 335.032C218.264 335.032 223.921 334.758 225.379 334.423L228.032 333.814L227.544 339.187C226.908 346.179 228.941 355.643 232.765 363.499C236.098 370.345 244.326 379.279 250.825 383.11L254.959 385.547L134.504 385.555L14.0496 385.563V200V14.4374H200H385.95V200ZM116.288 85.3749C103.469 99.7096 90.1066 110.893 75.2066 119.757C65.1124 125.762 63.6108 127.945 66.576 132.295C68.7066 135.421 72.2934 134.749 80.6884 129.651C96.1397 120.268 109.315 109.411 122.38 95.2951C131.63 85.3011 133.691 81.8021 132.126 78.749C130.864 76.2862 129.81 75.6127 127.191 75.5966C125.502 75.5864 123.174 77.6739 116.288 85.3749ZM260.331 77.2824C256.811 80.8994 258.512 83.9558 272.469 99.1023C283.479 111.047 308.13 129.694 317.947 133.502C321.461 134.865 324.923 133.62 325.949 130.624C327.032 127.457 324.963 124.538 319.684 121.79C306.17 114.753 286.433 98.5834 274.906 85.1057C270.876 80.3949 267.034 76.3253 266.367 76.062C264.081 75.1609 261.983 75.5847 260.331 77.2824ZM114.571 138.018C110.681 139.392 109.706 140.268 106.691 145.096C100.046 155.737 100.085 176.133 106.772 187.025C112.902 197.01 122.216 196.886 128.322 186.736C131.591 181.303 133.038 174.949 133.038 166.03C133.038 153.863 129.667 144.369 123.742 139.849C120.193 137.141 118.187 136.741 114.571 138.018ZM270.739 138.527C264.807 140.195 259.413 149.413 257.784 160.668C255.541 176.17 262.317 193.192 271.431 194.949C285.506 197.663 294.088 167.068 284.665 147.771C281.195 140.666 275.82 137.097 270.739 138.527ZM168.953 200.437C158.162 205.926 151.24 215.24 151.24 224.271C151.24 228.636 151.557 229.612 153.847 232.292C156.495 235.391 161.701 238.641 164.017 238.641C165.629 238.641 165.655 238.453 163.28 243.846C159.292 252.9 159.786 259.067 164.973 264.966C170.941 271.755 180.89 273.107 193.34 268.82C197.177 267.5 201.198 265.513 202.275 264.406C204.921 261.687 204.545 257.699 201.418 255.31L199.117 253.553L192.741 255.831C184.857 258.648 181.039 259.355 177.742 258.611C170.6 257 171.268 251.234 179.845 240.454C182.146 237.563 183.471 235.057 183.471 233.596C183.471 230.27 180.359 227.612 176.393 227.55C171.001 227.467 165.257 226.233 163.936 224.875C161.86 222.742 164.34 218.405 171.328 211.954C174.766 208.779 177.764 205.687 177.989 205.084C178.722 203.12 177.592 200.653 175.511 199.679C172.865 198.441 172.882 198.438 168.953 200.437ZM108.003 216.512C111.798 218.283 113.539 220.978 114.423 226.45C115.384 232.398 113.614 239.073 108.615 248.348C101.117 262.26 101.524 264.403 112.02 266.272C117.092 267.174 121.335 268.825 130.579 273.495C155.185 285.924 170.29 299.406 174.069 312.31C175.046 315.645 175.021 316.494 173.869 318.986C173.145 320.557 171.254 322.666 169.669 323.672C165.361 326.408 154.054 325.542 141.511 321.517C131.862 318.42 129.736 318.395 127.35 321.348C126.138 322.848 126.445 325.607 128.398 330.786C130.179 335.507 130.055 341.381 128.044 347.515C125.158 356.318 119.602 363.104 111.054 368.268C107.62 370.341 106.17 370.693 101.24 370.651C88.1645 370.537 72.5893 362.519 60.6901 349.777C53.2182 341.775 49.9851 336.849 46.0496 327.47C42.0256 317.879 41.1694 309.203 43.357 300.172C48.2182 280.104 74.0149 231.349 84.8265 221.795C92.1752 215.303 101.066 213.276 108.003 216.512ZM287.492 222.61C296.538 227.001 305.222 241.215 315.964 269.214C326.488 296.645 329.917 310.635 328.766 321.458C327.163 336.548 314.982 354.036 298.515 364.889C283.671 374.673 264.217 378.194 255.779 372.626C241.313 363.08 234.941 344.408 241.65 331.223C244.264 326.086 244.05 323.48 240.836 321.317C238.846 319.977 238.165 320.001 229.073 321.733C217.995 323.844 207.02 324.12 202.989 322.389C199.494 320.889 196.694 316.866 196.694 313.348C196.694 307.217 204.59 297.32 215.587 289.667C228.65 280.576 254.969 270.064 264.666 270.064C273.783 270.064 275.129 267.034 270.656 256.579C266.485 246.831 265.307 242.42 265.302 236.518C265.295 227.343 267.684 222.608 273.239 220.789C276.698 219.655 283.088 220.472 287.492 222.61Z"
          fill={strokeFill}
        />
        <path
          d="M320.661 45.4353C322.845 45.7158 322.103 54.4015 321.579 55.9567C320.536 59.0532 319.145 62.0524 317.562 64.9446C315.071 69.4954 310.423 78.0983 316.207 82.378C318.422 84.0163 319.975 84.0765 322.819 84.0765C323.693 84.0765 325.084 84.3412 325.849 83.8406C326.465 83.4377 327.087 83.4407 327.686 83.1329C328.203 82.8671 328.296 82.2151 328.742 81.9533C332.413 79.7978 330.742 73.9667 329.752 70.913"
          stroke="#D9D9D9"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M340.083 71.3375C341.839 71.5631 340.65 78.6193 340.519 79.8301C340.186 82.9121 338.719 85.2582 337.696 87.9924C336.156 92.1052 334.235 96.1939 336.364 100.024C338.388 103.663 344.912 103.695 347.934 101.698C349.647 100.567 350.827 99.3266 350.827 97.2399C350.827 96.1467 351.096 94.7051 350.804 93.6541C350.604 92.934 350 92.5645 350 91.7197"
          stroke="#D9D9D9"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}