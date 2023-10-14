import { IconType } from "@/types";

interface Props {
  type: IconType;
}

/**
 * 켈린더 텝바 아이콘
 * @param {IconType} type 'desktop' | 'mobile'
 * - desktop 24px
 * - mobile 20px
 * - color primary-darkGray
 * - group-hover:color primary-black
 */
export default function CalendarIcon({ type = "desktop" }: Props) {
  const isDesktop = type === "desktop";
  const desktopCN = "text-primary-darkGray group-hover:text-primary-black";
  const mobileCN = "text-primary-darkGray group-hover:text-primary-black";
  const cn = isDesktop ? desktopCN : mobileCN;
  const vb = `0 0 ${24} ${24}`;
  const w = isDesktop ? 24 : 20;
  const h = isDesktop ? 24 : 20;

  return (
    <>
      <svg
        width={w}
        height={h}
        className={cn}
        viewBox={vb}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.6453 4.47941L16.7078 4.48653L16.7051 2.98654C16.7049 2.88341 16.6204 2.79919 16.5173 2.79937L15.2048 2.80175C15.1016 2.80193 15.0174 2.88646 15.0176 2.98959L15.0203 4.48958L9.02031 4.50043L9.0176 3.00044C9.01742 2.89731 8.93289 2.81309 8.82976 2.81327L7.51727 2.81565C7.41414 2.81583 7.32992 2.90036 7.3301 3.00349L7.33282 4.50348L3.39532 4.5106C2.98048 4.51135 2.64593 4.84712 2.64668 5.26196L2.67482 20.8244C2.67557 21.2393 3.01133 21.5738 3.42618 21.5731L20.6761 21.5419C21.091 21.5411 21.4255 21.2054 21.4248 20.7905L21.3967 5.22806C21.3959 4.81321 21.0601 4.47866 20.6453 4.47941ZM19.7356 19.8561L4.36062 19.8839L4.34452 10.9776L19.7195 10.9498L19.7356 19.8561ZM4.34164 9.3839L4.33587 6.19641L7.33587 6.19098L7.3379 7.31598C7.33809 7.4191 7.42262 7.50333 7.52574 7.50314L8.83824 7.50077C8.94136 7.50058 9.02559 7.41605 9.0254 7.31293L9.02337 6.18793L15.0234 6.17708L15.0254 7.30208C15.0256 7.4052 15.1101 7.48943 15.2132 7.48924L16.5257 7.48687C16.6289 7.48668 16.7131 7.40215 16.7129 7.29903L16.7109 6.17403L19.7108 6.16861L19.7166 9.3561L4.34164 9.3839Z" />
      </svg>
    </>
  );
}
