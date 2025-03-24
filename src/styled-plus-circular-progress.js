
import {styled, Styled, css, cx, keyframes} from 'modules/styled.js'

// As MUI's CircularProgress 
export const CircularProgress = props => {
  const thickness = props.thickness || 3.6;
  return React.createElement(CircularProgressRoot, props,
    React.createElement('svg', {viewBox:"22 22 44 44"}, 
      React.createElement('circle', {
        cx:"44", cy:"44", r:"20.2", fill:"none", strokeWidth: thickness      
      })
    ) 
  )
};

const CircularProgressRoot = Styled('span', props => {
  const animation1 = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }    
  `;
  const animation2 = keyframes`
    0% {
      stroke-dasharray: 1px,200px;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 100px,200px;
      stroke-dashoffset: -15px;
    }
    100% {
      stroke-dasharray: 100px,200px;
      stroke-dashoffset: -125px;
    }
  `;

  const size = props.size ? (isNaN(props.size) ? props.size : props.size+'px') : '2.5rem';  

  const styleSub = props.value ? 
    {
      transform: `rotate(-90deg)`,
      'svg > *' : {
        stroke: `currentcolor`,
        strokeDasharray: 126.92,
        strokeDashoffset: 126.92 * ((100 - Number(props.value)) / 100),
        transition: `stroke-dashoffset 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`
      }
    } :
    {
      animation: `${animation1} 1.4s linear 0s infinite normal none running`,
      'svg > *' : {
        stroke: `currentcolor`,
        strokeDasharray: `80px, 200px`,
        strokeDashoffset: `0`,
        animation: `${animation2} 1.4s ease-in-out 0s infinite normal none running`,
      }
    };

  return [css`
    display: inline-block;
    color: var(--style-palette-primary);
    width: ${size};
    height: ${size};
    svg {
      display: block;
    }
  `, styleSub];
});
