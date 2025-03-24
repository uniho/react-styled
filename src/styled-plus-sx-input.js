
import {styled, Styled, css, cx, keyframes} from 'modules/styled.js'
import {Sx} from 'modules/styled-plus.js'

const cssBase = css`
  border: thin solid var(--style-palette-on-surface);
  border-radius: 0;
  overflow: auto;
  outline: none;
  box-shadow: none;
  font-family : inherit;
  font-size : 100%;
  color: var(--style-palette-on-surface);
  background-color: var(--style-palette-surface-container-lowest);
  /*letter-spacing: .04em;*/
  line-height: 1.4;
  &:focus {
    border-color: var(--style-palette-primary);
  }
  &:disabled {
    opacity: .38;
  }
`;

//
Sx.label = Styled('label', {
  color: 'var(--style-palette-on-surface)',
  lineHeight: 1,
  '&:focus-within': {color: 'var(--style-palette-primary)'},
  '& > *': {marginTop: '4px'},
  '&:has(:disabled)': {
    // color: 'color-mix(in srgb, var(--style-palette-on-surface) 38%, transparent)',
    color: 'rgb(var(--style-palette-on-surface-channel) / .38)',
  }
});

Sx.input = Styled('input', [
  cssBase,  
  {
    appearance: 'none',
    height: '2rem',
    padding: '0 .5rem',
  },
]);

Sx.select = Styled('select', [
  cssBase,  
  {
    height: '2rem',
    // padding: '0 .5rem',
  },
]);

Sx.textarea = Styled('textarea', [
  cssBase,
  {
    appearance: 'none',
    resize: 'none',  
    padding: '.5rem',
  }
]);
