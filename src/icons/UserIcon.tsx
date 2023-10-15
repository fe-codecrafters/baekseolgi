import { IconType } from "@/types";

interface Props {
  type: IconType
  width?: number
  height?: number
  bgFill?: string;
}

export default function UserIcon({
    type = 'desktop',
    width,
    height,
    bgFill = '#7F7F7F'
  }: Props) {
    let svgProps = width && height ? { width, height } : null;
    /** color를 변경하면, 자식자손 엘리먼트 color가 currentColor인 경우 똑같이 적용되어 설기 눈, 입 컬러도 변경되는 구조 */
    const desktopCN = "text-primary-darkGray"
    const mobileCN = "text-primary-darkGray"
    const cn = type === 'desktop' ? desktopCN : mobileCN
  
    return <>
            <svg className={cn} width={`${width}px`} height={`${height}px`} {...svgProps} fill="none"><path fill={bgFill} d="M17.294 15.549a8.95 8.95 0 0 0-1.93-2.86 8.991 8.991 0 0 0-2.86-1.93c-.01-.005-.019-.007-.028-.012A5.935 5.935 0 0 0 9 0a5.935 5.935 0 0 0-3.476 10.75c-.01.004-.019.007-.028.012a8.913 8.913 0 0 0-2.86 1.929 8.99 8.99 0 0 0-1.93 2.86A8.897 8.897 0 0 0 0 18.857a.191.191 0 0 0 .192.196h1.436c.105 0 .189-.084.191-.187a7.136 7.136 0 0 1 2.102-4.89A7.134 7.134 0 0 1 9 11.872c1.92 0 3.722.747 5.08 2.104a7.136 7.136 0 0 1 2.1 4.89.19.19 0 0 0 .192.187h1.436a.19.19 0 0 0 .192-.196 8.92 8.92 0 0 0-.706-3.308ZM9 10.053a4.09 4.09 0 0 1-2.91-1.206 4.09 4.09 0 0 1-1.207-2.91 4.09 4.09 0 0 1 1.206-2.911A4.09 4.09 0 0 1 9 1.819a4.09 4.09 0 0 1 2.91 1.207 4.09 4.09 0 0 1 1.207 2.91 4.09 4.09 0 0 1-1.206 2.91A4.09 4.09 0 0 1 9 10.054Z"/></svg>
    </>
  }
  
  
