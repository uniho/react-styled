
import {styled, Styled, css, cx, keyframes} from 'modules/styled.js'

//
export const Skeleton = props => {
  const {loading} = props;
  return !(loading !== false && (typeof loading !== 'string' || loading.toLocaleLowerCase() !== 'false') && loading !== '' && loading !== 0) ?
    React.createElement(styled('div')(), props, props.children) : 
    React.createElement(SkeletonStyle, props, 
      props.children,
      React.createElement('div', {className: 'skeletons'})
    );
}

const SkeletonStyle = styled('div', {shouldForwardProp: prop => prop != 'loading'})(props => {
  const color1 = props.color1 || 'skyblue';
  const color2 = props.color2 || 'blue';

  const pulse = keyframes`
    0% {
      opacity: 1;
    }
    50% {
      //opacity: 0.8;
      background: ${color1};
    }
    100% {
      opacity: 1;
    }
  `;

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

  return [{
    position: 'relative',
    '& > .skeletons': {
      position: 'absolute',
      overflow: 'hidden',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: color1,
      borderRadius: '4px',
      '&::after': {
        position: 'absolute',
        content: '""',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: props.animation == 'wave' ? `linear-gradient(90deg, transparent, ${color2}, transparent)` : color2,
        animation: props.animation == 'wave' ? `${wave} 1.6s linear 0.5s infinite` : `${pulse} 2s ease-in-out 0.5s infinite`,
        transform: props.animation == 'wave' ? 'translateX(-100%)' : 'none',
      },
    },
  }, props.style];
});
