import React, { Component } from "react"
/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons'



class SearchBar extends Component {
  state = {
    searchText: '',
    isSearching: false,
    coverVisible: true,
    placeholder: 'Search',
    clearBtnText: 'Clear'
  }

  componentDidMount () {
    if (this.props.autoFocus) {
      this.setState({
        coverVisible: false
      }, () => {
        this.searchBar.focus()
      })
    }

    if (this.props.placeholder) {
      this.setState({
        placeholder: this.props.placeholder
      })
    }

    if (this.props.value) {
      this.setState({
        searchText: this.props.value
      })
    }

    if (this.props.clearBtnText) {
      this.setState({
        clearBtnText: this.props.clearBtnText
      })
    }

  }

  componentWillMount () {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  handleClick = (e) => {
    if (this.node.contains(e.target)){
      return
    }
    else {
      this.setState({ coverVisible: true })
    }
  }
  
  handleCoverClick = () => {
    this.setState({
      coverVisible: false
    }, () => {
      this.searchBar.focus()
    })
  }

  clearInput = () => {
    this.setState({
      searchText: '',
      isSearching: false,
      coverVisible: true
    }, () => {
      if (this.props.onClear) this.props.onClear() 
    })
  }

  clearInputAndFocus = () => {
    this.setState({
      searchText: '',
      isSearching: false
    }, () => {
      this.searchBar.focus()
      if (this.props.onClear) this.props.onClear()
    })
  }
  
  inputHasChanged = text => {
    clearTimeout(this.delay)
    this.delay = setTimeout(() => {
      this.setState({
        isSearching: true
      }, () => {
        if(this.props.onChange) this.props.onChange(text)
      })

      // Default behavior: 
      // spin for a second to provide feedback
      // Override using the prop 'loading'
      // -----
      setTimeout(()=>{
        this.setState({
          isSearching: false
        })
      },1000)
      // ------

    }, 400)
  }


  handleFocus = () => {
    if(this.props.onFocus) this.props.onFocus()
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.searchBar.blur()
    }
  }

  handleChangedInput = (event) => {
    const text = event.target.value
    this.setState({
      searchText: text
    }, () => {
      this.inputHasChanged(text)
    })
  }

  render () {

    const sizes = {
      small: {
        container: {
          height: '25px'
        },
        icon: {
          fontSize: '10px',
        },
        searchBar:{
          fontSize: '12px'
        },
        searchBarPlaceholder: {
          fontSize: '12px'
        },
        cover: {
          fontSize: '14px'
        },
        coverIcon: {
          fontSize: '8px'
        },
        coverIconMobile: {
          fontSize: '10px'
        },
        clearInput: {
          fontSize: '12px'
        }

      },
      default: {
        container: {
          height: '35px'
        },
        icon: {
          fontSize: '12px',
        },
        searchBar: {
          fontSize: '16px'
        },
        searchBarPlaceholder: {
          fontSize: '16px'
        },
        cover: {
          fontSize: '18px'
        },
        coverIcon: {
          fontSize: '12px'
        },
        coverIconMobile: {
          fontSize: '16px'
        },
        clearInput: {
          fontSize: '16px'
        }
      },
      large: {
        container: {
          height: '45px'
        },
        icon: {
          fontSize: '14px',
        },
        searchBar: {
          fontSize: '18px'
        },
        searchBarPlaceholder: {
          fontSize: '18px'
        },
        cover: {
          fontSize: '20px'
        },
        coverIcon: {
          fontSize: '14px'
        },
        coverIconMobile: {
          fontSize: '18px'
        },
        clearInput: {
          fontSize: '18px'
        }
      }
    }

    let selectedSize = 'default'

    switch (this.props.size) {
      case 'small':
      case 'default':
      case 'large':
        selectedSize = this.props.size
    }

    // Switch button style

    let style = 'default'

    if (this.props.mobile) {
      style = 'mobile'
    }

    // Define Styles

    const styles={
      SearchBar_Container:
      {
        position: 'relative',
        overflow: 'hidden',
        width: this.props.width || (this.props.mobile?'100%':'280px'),
        height: '35px',
        background: '#ffffff',
        borderBottom: '1px solid #dbdbdb',
        border: style==='default'?'1px solid #dbdbdb':'',
        borderRadius: '3px',
        display: 'inline-flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 5px',
        paddingLeft: '10px',
        boxSizing: 'border-box',
        ...sizes[selectedSize].container
      },
      SearchIcon: {
        width: '30px',
        padding: '2px',
        fontSize: '12px',
        color: '#ccc',
        ...sizes[selectedSize].icon
      },
      SearchBar: {
        fontSize: '14px',
        flexGrow: 1,
        border: 0,
        '&:focus': {
          outline: 0
        },
        '&::placeholder': {
          fontSize: '16px',
          ...sizes[selectedSize].searchBarPlaceholder
        },
        ...sizes[selectedSize].searchBar
      },
      Cover: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
        background: '#fafafa',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#999',
        fontSize: '18px',
        zIndex: '10',
        ...sizes[selectedSize].cover
      },
      Cover_Mobile: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: this.state.coverVisible?'100%':'0',
        paddingRight: '10px',
        height: '100%',
        background: '#fff',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: '#07c',
        fontSize: '18px',
        zIndex: '10',
        transition: 'all 0.2s',
        ...sizes[selectedSize].cover
      },
      Cover_Icon: {
        fontSize: '12px',
        ...sizes[selectedSize].coverIcon
      },
      Cover_Icon_Mobile: {
        fontSize: '16px',
        opacity: this.state.coverVisible?'1':'0',
        transition: 'all 0.2s',
        ...sizes[selectedSize].coverIconMobile
      },
      ClearInput: {
        cursor: 'pointer',
        padding: '7px',
        fontSize: '16px',
        color: '#A0A0A0',
        ...sizes[selectedSize].clearInput
      },
      ClearInput_Mobile: {
        cursor: 'pointer',
        color: '#07c',
        padding: '7px',
        fontSize: '16px',
        ...sizes[selectedSize].clearInput
      }
    }

    let cover = null
    
    switch (style) {
      case 'mobile':
        cover = (
          <div css={styles.Cover_Mobile} onClick={this.handleCoverClick}>
            <FontAwesomeIcon icon={faSearch} css={styles.Cover_Icon_Mobile} />
          </div>
        )
      break

      default:
        if (this.state.coverVisible) {
        cover = (
          <div css={styles.Cover} onClick={this.handleCoverClick}>
            <FontAwesomeIcon icon={faSearch} css={styles.Cover_Icon} />
            <span>&nbsp;{this.state.placeholder}</span>
          </div>
        )
        }
        break
    }
    let rightIcon = (
      <div css={spinner}>
        <div className={"bar1"}></div>
        <div className={"bar2"}></div>
        <div className={"bar3"}></div>
        <div className={"bar4"}></div>
        <div className={"bar5"}></div>
        <div className={"bar6"}></div>
        <div className={"bar7"}></div>
        <div className={"bar8"}></div>
        <div className={"bar9"}></div>
        <div className={"bar10"}></div>
        <div className={"bar11"}></div>
        <div className={"bar12"}></div>
      </div>
    )
    if (!this.props.loading && !this.state.isSearching) {
      switch (style) {
        case 'mobile':
          rightIcon = (
            <div
              onClick={this.clearInputAndFocus}
              css={styles.ClearInput_Mobile}
            >
              {this.state.clearBtnText}
            </div>
          )
          break;
        default: 
          rightIcon = (
            <div
              onClick={this.clearInput}
              css={styles.ClearInput}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </div>
          )
          break;
      }
    }
    return (
    <div css={styles.SearchBar_Container} ref={node => this.node = node}>
      {cover}
      <span css={styles.SearchIcon}>
        <FontAwesomeIcon icon={faSearch} />
      </span>
      <input
        css={styles.SearchBar}
        type='text'
        alt={this.state.placeholder}
        placeholder={this.state.placeholder}
        onFocus={this.handleFocus}
        onKeyPress={this.handleKeyPress}
        onChange={(e) => this.handleChangedInput(e)} value={this.state.searchText}
        ref={(input) => { this.searchBar = input }} 
      />
      {rightIcon}
    </div>
    )
  }
}

const fade = keyframes`

  from {opacity: 1;}

  to {opacity: 0.25;}

  `

export const spinner = css`
  div& {
    position: relative;
    width: 30px;
    height: 30px;
    display: inline-block;
    padding: 10px;
  }
  div& div {
    width: 4%;
    height: 16%;
    background: #232323;
    position: absolute;
    left: 49%;
    top: 43%;
    opacity: 0;
    -webkit-animation: ${fade} 1s linear infinite;
  }
  div& div.bar1 {
    -webkit-transform: rotate(0deg) translate(0, -130%);
    -webkit-animation-delay: 0s;
  }
  div& div.bar2 {
    -webkit-transform: rotate(30deg) translate(0, -130%);
    -webkit-animation-delay: -0.9167s;
  }
  div& div.bar3 {
    -webkit-transform: rotate(60deg) translate(0, -130%);
    -webkit-animation-delay: -0.833s;
  }
  div& div.bar4 {
    -webkit-transform: rotate(90deg) translate(0, -130%);
    -webkit-animation-delay: -0.7497s;
  }
  div& div.bar5 {
    -webkit-transform: rotate(120deg) translate(0, -130%);
    -webkit-animation-delay: -0.667s;
  }
  div& div.bar6 {
    -webkit-transform: rotate(150deg) translate(0, -130%);
    -webkit-animation-delay: -0.5837s;
  }
  div& div.bar7 {
    -webkit-transform: rotate(180deg) translate(0, -130%);
    -webkit-animation-delay: -0.5s;
  }
  div& div.bar8 {
    -webkit-transform: rotate(210deg) translate(0, -130%);
    -webkit-animation-delay: -0.4167s;
  }
  div& div.bar9 {
    -webkit-transform: rotate(240deg) translate(0, -130%);
    -webkit-animation-delay: -0.333s;
  }
  div& div.bar10 {
    -webkit-transform: rotate(270deg) translate(0, -130%);
    -webkit-animation-delay: -0.2497s;
  }
  div& div.bar11 {
    -webkit-transform: rotate(300deg) translate(0, -130%);
    -webkit-animation-delay: -0.167s;
  }
  div& div.bar12 {
    -webkit-transform: rotate(330deg) translate(0, -130%);
    -webkit-animation-delay: -0.0833s;
  }
`

export default SearchBar