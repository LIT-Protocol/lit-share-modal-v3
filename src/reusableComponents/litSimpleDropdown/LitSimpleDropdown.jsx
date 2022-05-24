import React, { useEffect, useState } from 'react';
import chevronDown from '../../assets/chevronDown.svg';
// import './LitSimpleDropdown.css';

const LitSimpleDropdown = ({ label, options, selected, setSelected}) => {

  const [ showMenu, setShowMenu ] = useState(false);
  const [ dropdownStyle, setDropdownStyle ] = useState('')

  useEffect(() => {
    if (!showMenu) {
      setDropdownStyle("lsm-hidden");
    } else {
      setDropdownStyle("lsm-dropdown-menu lsm-border-gray");
    }
  }, [showMenu])

  return (
    <div className="lsm-w-full lsm-relative lsm-block">
      <button className={"lsm-w-full lsm-bg-white lsm-h-12 lsm-border lsm-border-brand-4 lsm-rounded hover:lsm-border-brand-5 lsm-flex lsm-flex-row lsm-items-center lsm-justify-between lsm-px-4 lsm-text-title-gray lsm-font-segoe lsm-text-sm lsm-font-light"}
        onClick={() => {
          setShowMenu(!showMenu)
        }}>
        {!selected ? (!label ? 'Select' : label) : selected.name}
        <img src={chevronDown}/>
        </button>
        <ul className={dropdownStyle}>
          { options.map((option, i) => {
                return (
                  <span key={i}
                    onClick={() => {
                      setSelected(option)
                      setShowMenu(false);
                    }
                  }
                  ><li className={"lsm-dropdown-item hover:lsm-bg-gray lsm-text-title-gray lsm-font-segoe lsm-text-sm lsm-font-light"}
                  >{option.name}</li>
                  </span>
                )
            })
          }
        </ul>
      {/* )} */}
    </div>
  )
}

export default LitSimpleDropdown;
