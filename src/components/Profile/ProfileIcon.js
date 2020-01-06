import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="pa4 tc">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle
                tag="span"
                onClick={this.toggle}
                data-toggle="dropdown"
                aria-expanded={this.state.dropdownOpen}
              >
                <img
                  src="https://image.flaticon.com/icons/svg/149/149071.svg"
                  style={{cursor:'pointer'}}
                  className="br-100 h3 w3 dib" alt="avatar" />
                  <p className="white">Profile</p>
              </DropdownToggle>
              <DropdownMenu className='b--transparent shadow-5' style={{marginTop: '20px', left:'-100%', backgroundColor: 'rgba(255, 255, 255, 0.6)'}}>
                <DropdownItem onClick={() => this.props.toggleModal()}>View Profile</DropdownItem>
                <DropdownItem onClick={() => this.props.onRouteChange('signout')}>Sign Out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
      </div>
    );
  }
}

export default ProfileIcon;