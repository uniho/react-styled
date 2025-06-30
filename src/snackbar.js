import {styled, keyframes} from 'modules/styled.js'

export {singleton as controller}

export const showSnackbar = (content, props = {}) => {
  const showAnimeDuration = (props && props.showAnimeDuration) || 1000
  const hideAnimeDuration = (props && props.hideAnimeDuration) || 300

  const free = () => {
    if (!singleton.current) return;
    if (snackbarTimeId) {
      clearTimeout(snackbarTimeId)
      snackbarTimeId = false
    }
    singleton.current = false
    root.unmount()
    body.removeChild(subRoot)
  }

  const close = e => {
    root.render(React.createElement(Inner, {
      hide: true, style: props.style, styleHide: props.styleHide, showAnimeDuration, hideAnimeDuration 
    }, content))
    setTimeout(() => free(), hideAnimeDuration)
  }

  singleton.current && singleton.current.free();

  const subRoot = document.createElement('div')
  subRoot.style = 'position: fixed; display: flex; top: 10px; z-index: 1' + 
    'width: 90%; max-width: 320px; height: auto; min-height: 3em; ' +
    'right: 0; left: 0; margin-right: auto; margin-left: auto;' + // この４つの指定で横センタリングになる
    props.css
  const body = document.querySelector('body')
  body.appendChild(subRoot)
  const root = ReactDOMClient.createRoot(subRoot)
  root.render(React.createElement(Inner, {
    style: props.style, close, showAnimeDuration, hideAnimeDuration}, content))
  if (props.hideOnClick !== false) subRoot.onclick = close

  singleton.current = {close, free, root}

  if (!props.msec || props.msec < 1000 || props.msec > 180000) props.msec = 5000;

  snackbarTimeId = setTimeout(() => close(), props.msec)

  return singleton
}

const Inner = props => {
  const opacity = (props.style && props.style.opacity) || '0.9'
  const style = Object.assign({
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--style-palette-inverse-on-surface)',
    width: '100%',
    borderRadius: '4px',
    borderWidth: 0,
    boxShadow: '4px 4px 16px rgb(0 0 0/.5)',
    // padding: '1em',
    background: 'var(--style-palette-inverse-surface)',
    opacity,
    animationName: keyframes`
      0% { transform: translateY(calc(-100% - 16px)); opacity: 0; }
      100% { transform: translateY(0); opacity: ${opacity}; }
    `,
    animationDuration: `${props.showAnimeDuration}ms`,
    animationTimingFunction: 'cubic-bezier(.64,.09,.08,1)',
    whiteSpace: 'pre-wrap',
  }, props.style)

  if (props.hide) {
    Object.assign(style, {
      animationName: keyframes`
        0% { transform: translateX(0); opacity: ${opacity}; }
        100% { transform: translateX(calc(50vw + 50%)); opacity: 0; }
      `,
      animationDuration: `${props.hideAnimeDuration}ms`,
      animationTimingFunction: 'ease-in',
      animationFillMode: 'forwards', // keyframeアニメーション終了時に終了時の状態を維持する
    }, props.styleHide)
  }

  return React.createElement(styled('div')(style), {}, [
    React.createElement('div', {style:{display:'flex'}, key:'head'}, 
      React.createElement('div', {style:{
        marginLeft:'auto', padding:'4px', cursor: 'pointer', onClick: e => props.click(),
      }}, '✖')
    ),
    React.createElement('div', {style:{paddingLeft: '1rem', paddingRight: '1rem', paddingBottom: '1rem'}, key:'body'}, 
      props.children
    ),
  ])
}

let snackbarTimeId = false
const singleton = {current: false}
