
import {styled, Styled, css, cx, keyframes} from 'modules/styled.js'
import {Sx} from 'modules/styled-plus.js'

//
Sx.a = Styled('a', props => {
  const color = (props.hover && props.hover.color) || 'var(--style-palette-on-surface)';
  const bgcolor = (props.hover && props.hover.bgcolor) || 'rgb(var(--style-palette-on-surface-channel) / .3)';

  return [css`
    color: inherit;
    background: linear-gradient(to top,${bgcolor} 50%,rgb(255 255 255/0) 50%);
    background-size: 100% 200%;
    background-position: 0 10%;
    background-repeat: no-repeat;
    text-decoration: none;
    transition: background-position .3s cubic-bezier(.64,.09,.08,1), color .3s cubic-bezier(.64,.09,.08,1);
    will-change: background-position, color;

    // タッチデバイスなら hover アニメーションはしないようにする
    // そうしないと、タッチ後に hover の状態で描画されたままてなってしまうため
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: ${color};
        background-position: 0 100%;
      }
    }
  `];
});
