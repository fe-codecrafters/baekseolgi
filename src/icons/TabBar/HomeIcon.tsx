import { IconType } from "@/types";

interface Props {
  type: IconType;
}

/**
 * 홈 텝바 아이콘 컴포넌트
 * @param {IconType} type 'desktop' | 'mobile'
 * - desktop 24px
 * - mobile 20px
 * - color primary-darkGray
 * - group-hover:color primary-black
 */
export default function HomeIcon({ type = 'desktop' }: Props) {
  const desktopCN = "h-6 w-6 text-primary-darkGray group-hover:text-primary-black"
  const mobileCN = "h-5 w-5 text-primary-darkGray group-hover:text-primary-black"
  const cn = type === 'desktop' ? desktopCN : mobileCN

  return <>
    <svg className={cn} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.2148 12.5114L13.1422 3.4762L12.534 2.87026C12.3955 2.73312 12.2083 2.65634 12.0133 2.65669C11.8184 2.65705 11.6315 2.7345 11.4934 2.87215L1.84761 12.5482C1.70614 12.6896 1.59444 12.858 1.5191 13.0433C1.44375 13.2286 1.4063 13.4271 1.40894 13.6271C1.4198 14.4521 2.10771 15.1094 2.93271 15.108L3.9288 15.1062L3.94261 22.7397L20.1566 22.7104L20.1428 15.0768L21.16 15.075C21.5608 15.0743 21.9379 14.9166 22.2209 14.6325C22.3603 14.493 22.4707 14.3273 22.5456 14.1449C22.6205 13.9625 22.6585 13.7671 22.6573 13.5699C22.6566 13.1715 22.4989 12.7944 22.2148 12.5114V12.5114ZM13.3591 21.0352L10.7341 21.04L10.7254 16.2587L13.3504 16.254L13.3591 21.0352ZM18.4523 13.3924L18.4661 21.026L14.8591 21.0325L14.8494 15.6888C14.8485 15.1708 14.4282 14.752 13.9102 14.753L10.1602 14.7597C9.64225 14.7607 9.22348 15.181 9.22441 15.6989L9.23408 21.0427L5.62705 21.0492L5.61325 13.4156L3.36325 13.4197L12.0194 4.73917L12.5618 5.27959L20.7046 13.3883L18.4523 13.3924Z" />
    </svg>
  </>
}