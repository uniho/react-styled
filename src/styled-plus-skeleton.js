
import {keyframes} from 'modules/styled.js'

export const skeletonStyle = props => {
  const color = props?.color || 'var(--style-palette-surface-bright)';
  const animation = props?.animation;

  const style = {
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      position: 'absolute',
      content: '""',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,

      // https://cssgradient.io/
      background: animation === 'wave' ? `linear-gradient(90deg, transparent, ${color}, transparent)` : `linear-gradient(110deg, transparent 10%, ${color} 28%, transparent 46%)`,
      animation: animation === 'wave' ? `${wave} 1.6s linear 0.5s infinite` : `1.5s ${shine} linear infinite`,
      transform: animation === 'wave' ? 'translateX(-100%)' : 'none',
      backgroundSize: animation === 'wave' ? 'auto auto' : '200% 100%',
    }
  };

  return style;
};

const wave = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const shine = keyframes`
  to {
    background-position-x: -200%;
  }
`
