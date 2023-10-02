interface Props {
  fill?: string;
}

export default function MonthRightIcon({ fill = '#D9D9D9' }: Props) {
  return <>
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.59356 2.96525C9.25377 3.30514 9.06289 3.76607 9.06289 4.24668C9.06289 4.72729 9.25377 5.18823 9.59356 5.52812L18.5654 14.5L9.59356 23.4719C9.2634 23.8137 9.08071 24.2716 9.08484 24.7468C9.08897 25.222 9.27959 25.6766 9.61564 26.0127C9.95169 26.3487 10.4063 26.5393 10.8815 26.5435C11.3568 26.5476 11.8146 26.3649 12.1564 26.0347L22.4098 15.7814C22.7495 15.4415 22.9404 14.9806 22.9404 14.5C22.9404 14.0194 22.7495 13.5585 22.4098 13.2186L12.1564 2.96525C11.8165 2.62545 11.3556 2.43457 10.875 2.43457C10.3944 2.43457 9.93346 2.62545 9.59356 2.96525Z"
        fill={fill} />
    </svg>
  </>
}
