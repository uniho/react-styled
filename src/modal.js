import {styled, keyframes} from 'modules/styled.js'

export const showModal = (content, props = {}) => {
  const hideAnimeDuration = (props && props.hideAnimeDuration) || 300

  const close = async(e, btn) => {
    if (props.onModalClose) {
      const result = await props.onModalClose(e, btn);
      if (result === false) return;
    }

    root.render(
      content ?
        React.createElement(Inner, {
          hide: true, style: props.style, styleHide: props.styleHide, theme: props.theme, hideAnimeDuration,
        }, content) : null,
    );
    
    setTimeout(() => {
      scrollLock(false);
      root.unmount();
      body.removeChild(subRoot);
    }, hideAnimeDuration);
  }

  scrollLock(true)
  const subRoot = document.createElement('div')
  subRoot.style = 'position: fixed; z-index: 1; top: 0; left: 0; ' +
    'width:100vw; height:100vh; height:100dvh; ' + props.cssModal 
  const body = document.querySelector('body')
  body.appendChild(subRoot)
  const root = ReactDOMClient.createRoot(subRoot)
  root.render(
    content ? React.createElement(Inner, {style: props.style, theme: props.theme, close, hideAnimeDuration}, content)
      : null
  )
  if (props.hideOnClick !== false) subRoot.onclick = close
  return {close, root}
}

const Inner = props => {
  const ref = React.useRef()
  const refTabs = React.useRef()
  const refFocus = React.useRef(0)
  const refDefaultButton = React.useRef()

  const handleKeyDown = e => {
    if (e.target.tagName == 'TEXTAREA') return;

    switch (e.keyCode) {
      case 0x0d: // enter
        e.preventDefault()
        e.stopPropagation()
        // for (const item of refTabs.current) {
        //   if (document.activeElement == item) {
        //     item.click()
        //     break;
        //   }
        // }
        if (refDefaultButton.current) {
          refDefaultButton.current.click()
        }  
        break;

      case 0x1b: // esc
        e.preventDefault()
        e.stopPropagation()
        if (props.hideOnEsc !== false) props.close()
        break;
        
      case 0x09: // Tab
        e.preventDefault()
        e.stopPropagation()
        if (!refTabs.current.length) return;
        if (e.shiftKey) {
          if (refFocus.current > 0) {
            refFocus.current--
          } else {
            refFocus.current = refTabs.current.length - 1
          } 
        } else {
          if (refFocus.current < refTabs.current.length - 1) {
            refFocus.current++
          } else {
            refFocus.current = 0
          } 
        }
        refTabs.current[refFocus.current].focus()
        break;
    }
  }

  React.useEffect(() => {
    {
      const closers = ref.current.querySelectorAll('[data-modal-close]')
      if (closers) {
        closers.forEach(element => {
          element.addEventListener('click', e => {
            props.close(e, element.dataset.modalClose);
          })
        });
      }
    }

    refDefaultButton.current = ref.current.querySelector('[data-modal-default-button]')

    const tabs = ref.current.querySelectorAll('[tabindex]')
    refTabs.current = []
    if (tabs) {
      tabs.forEach(item => {
        if (parseInt(item.tabIndex) >= 0) {
          refTabs.current.push(item)
          IIRFilterNode.onFocus = e => refFocus.current = parseInt(item.tabIndex)
        }  
        if (parseInt(item.tabIndex) == 0) item.focus()
      })
      refTabs.current.sort((a, b) => parseInt(a.tabIndex) - parseInt(b.tabIndex))
    }
  }, [])

  const style = Object.assign({
    color: 'grey',
    background: 'white',
    width: '100px', height: '100px',
    animationName: keyframes({
      '0%': {
        opacity: 0,
        transform: 'scale3d(.7, .7, .7)',
      },
      '100%': { 
        opacity: 1, 
      }
    }),
    animationDuration: `${props.hideAnimeDuration}ms`,
    animationTimingFunction: 'cubic-bezier(.64,.09,.08,1)',
  }, props.style)

  if (props.hide) {
    Object.assign(style, {
      animationName: keyframes({
        '0%': {
          opacity: 1,
        },
        '100%': { 
          opacity: 0,
          transform: 'scale3d(.7, .7, .7)', 
        }
      }),
      animationDuration: `${props.hideAnimeDuration}ms`,
      // opacity: 0,
    }, props.styleHide)
  }

  const newChildren = React.isValidElement(props.children) ?
    React.cloneElement(props.children, {close: props.close}) : props.children;

  /* if (props.theme) {
    return React.createElement(MaterialUI.CssVarsProvider, Style.getColorScheme(props.theme), 
      React.createElement(MaterialUI.CssBaseline, {enableColorScheme: true}),
      React.createElement(MaterialUI.styled('div')(style), {ref, onKeyDown:handleKeyDown}, newChildren),
    );
  } */

  return React.createElement(styled('div')(style), {ref, onKeyDown:handleKeyDown}, newChildren);
}

//
export const scrollLock = lock => {
  if (lock) {
    const w = document.body.clientWidth
    document.body.style.overflow = 'hidden'
    if (document.body.clientWidth != w) {
      document.body.style.paddingRight = `${document.body.clientWidth - w}px` 
    }
  } else {
    document.body.style.overflow = ''   
    document.body.style.paddingRight = 0 
  }
}

//
export const showDialogBox = (content, props = {}) => {
  props.style = Object.assign({
    borderRadius: '5px',
    borderWidth: 0,
    width: '90%',
    maxWidth: '320px',
    height: 'auto',
    minHeight: '3em',
    boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.5)',
    padding: '1em',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word', // これがないと長い URL などがはみ出る
  }, (props && props.style) || {})
  props.cssModal = 'display:flex; justify-content:center; align-items:center; ' + props.cssModal
  return showModal(content, props)
}
