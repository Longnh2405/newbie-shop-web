import * as React from 'react';

const SvgComponent = (props) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m14.572 13.594 5.855-5.874c.366-.368.573-.871.573-1.396V4.6C21 3.52 20.142 3 19.084 3H4.916C3.858 3 3 3.52 3 4.601v1.754c0 .497.185.976.518 1.34l5.38 5.868c.1.111.242.174.392.175l4.902.014a.528.528 0 0 0 .38-.158Z"
      fill="#9dcbed"
    />
    <path
      opacity={0.4}
      d="M9.056 13.686v6.604c0 .24.121.468.32.597a.68.68 0 0 0 .664.05l3.966-1.848a.71.71 0 0 0 .407-.646v-4.757H9.056Z"
      fill="#9dcbed"
    />
  </svg>
);

export default SvgComponent;
