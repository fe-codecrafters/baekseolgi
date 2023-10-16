import { IconType } from "@/types";

interface Props {
  type?: IconType;
  size?: number;
  stroke?: string;
}

export default function CloseIcon({ type = "desktop", size = 24 }: Props) {
  const isDesktop = type === "desktop";
  const desktopCN = "text-primary-darkGray group-hover:text-primary-black";
  const mobileCN = "text-primary-darkGray group-hover:text-primary-black";
  const cn = isDesktop ? desktopCN : mobileCN;
  const vb = `0 0 ${24} ${24}`;
  const w = size ? size : isDesktop ? 24 : 20;
  const h = size ? size : isDesktop ? 24 : 20;

  return (
    <>
      <svg
        className={cn}
        width={w}
        height={h}
        viewBox={vb}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.7143 12.5L19.8666 5.16641C19.9697 5.04453 19.883 4.85938 19.7236 4.85938H17.8533C17.7432 4.85938 17.6377 4.90859 17.565 4.99297L12.4908 11.0422L7.41659 4.99297C7.34628 4.90859 7.24081 4.85938 7.12831 4.85938H5.258C5.09863 4.85938 5.01191 5.04453 5.11503 5.16641L11.2674 12.5L5.11503 19.8336C5.09193 19.8608 5.07711 19.894 5.07233 19.9293C5.06755 19.9647 5.07301 20.0006 5.08806 20.033C5.10312 20.0653 5.12713 20.0926 5.15725 20.1117C5.18737 20.1308 5.22234 20.1408 5.258 20.1406H7.12831C7.23847 20.1406 7.34394 20.0914 7.41659 20.007L12.4908 13.9578L17.565 20.007C17.6353 20.0914 17.7408 20.1406 17.8533 20.1406H19.7236C19.883 20.1406 19.9697 19.9555 19.8666 19.8336L13.7143 12.5Z"
          fill="currentColor"
        />
      </svg>
    </>
  );
}
