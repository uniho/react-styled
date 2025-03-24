
import {styled, Styled, css, cx, keyframes} from 'modules/styled.js'
import {Sx} from 'modules/styled-plus.js'

//
export const SwitchWithLabel = props => {
  const [state, setState] = React.useState(props.checked ? true : false);
  const handleChange = e => {
    if (props.disabled || props.readonly) return;
    setState(prevState => !prevState);
  };

  const {children, ...others} = props;

  return html`
  <${Sx.div} className=${cx({disabled: props.disabled})} onClick=${handleChange} sx=${{
    display: 'flex',
    alignItems: 'center',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    '&:hover:not(&.disabled)': {
      '.track': state ? {} : {
        background: 'color-mix(in srgb, currentColor, #fff 25%)',
        border: 'none',
      },
    },
  }}>
    <${SwitchNode} ...${others} checked=${state} onChange=${handleChange} onClick=${e => e.stopPropagation()}/>
    <${Sx.div} sx=${{marginLeft: '8px', opacity: props.disabled ? 0.38 : 1}}>${children}<//>
  <//>
  `;
};

//
export const Switch = props => {
  const [state, setState] = React.useState(props.checked ? true : false);
  const handleChange = e => {
    if (props.disabled || props.readonly) return;
    setState(prevState => !prevState);
  };

  return html`
  <${SwitchNode} ...${props} checked=${state} onChange=${handleChange} />
  `;
};

const SwitchNode = props => {
  return React.createElement(SwitchStyle,
    {
      sx: props.sx,
      style: props.style, width: props.width, height: props.height, thumbSize: props.thumbSize,
      className: cx({checked: props.checked, disabled: props.disabled}),
    },
    React.createElement('div', {className: "track"}),
    React.createElement('div', {className: "thumb"}),
    React.createElement('input', {
      'type': "checkbox", 'aria-label': "switch",
      checked: props.checked, disabled: props.disabled, onChange: props.onChange, onClick: props.onClick,
      readOnly: props.readOnly || (!props.onChange && !props.onClick)
    })
  );
};

const SwitchStyle = Styled('div', props => {
  const width = props.width || 38, height = props.height || 24, thumbSize = props.thumbSize || 16;
  return [{
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    width: `${width}px`,
    height: `${height}px`,
    '&.disabled': {
      opacity: 0.38,
      cursor: 'not-allowed',
    },

    '.track': {
      display: 'block',
      color: 'var(--style-palette-surface-container-highest)',
      background: 'currentColor',
      border: '1px solid var(--style-palette-outline)',
      borderRadius: `${height}px`,
      height: '100%',
      width: '100%',
      position: 'absolute',
      transitionProperty: 'all',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '120ms',
    },
    '&.disabled .track': {
      border: 'none',
    },  
    '&.checked:not(&.disabled) .track': {
      color: 'var(--style-palette-primary)', 
      border: 'none',
    },
    '&:hover:not(&.disabled) .track': {
      background: 'color-mix(in srgb, currentColor, #fff 25%)',
    },

    '.thumb': {
      display: 'block',
      color: 'var(--style-palette-surface)', 
      backgroundColor: 'currentColor',
      border: '1px solid var(--style-palette-outline)',
      width: `${thumbSize}px`,
      height: `${thumbSize}px`,
      top: `${(height-thumbSize)/2}px`,
      left: `${(height-thumbSize)/2}px`,
      borderRadius: `${thumbSize}px`,
      position: 'relative',
      transitionProperty: 'all',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '120ms',
    },
    '&.disabled .thumb': {
      border: 'none',
    },  
    '&.checked .thumb': {
      left: `${width-(height-(height-thumbSize)/2)}px`,
      border: 'none',
    },
    
    'input': {
      cursor: 'inherit',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      opacity: 0,
      //z-index: 1;
      //margin: 0px;
    },
  }, props.style];
}, {shouldForwardProp: prop => prop != 'thumbSize'});
