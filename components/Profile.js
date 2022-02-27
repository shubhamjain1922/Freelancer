import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import styles from './Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUserCircle } from '@fortawesome/free-solid-svg-icons';

class Profile extends Component {
    state = {
        login: false,
        acc: ''
    }
    async componentDidMount() {
        window.ethereum._metamask.isUnlocked().then(async function (result) {
            if (result) {
                await window.ethereum.enable();
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                window.ethereum.on('accountsChanged', function (accounts) {
                if(accounts.length==0)
                    this.setState({login:false,acc:''});
                else
                    this.setState({ login: true, acc: accounts[0] });

                });
                if(account==undefined)
                this.setState({login:false,acc:''});
                else
                this.setState({ login: true, acc: account });
            }
            else {
                this.setState({login:false,acc:''});
                window.ethereum.on('accountsChanged', function (accounts) {
                if(accounts.length==0)
                    this.setState({login:false,acc:''});
                else
                    this.setState({ login: true, acc: accounts[0] });
                });
            }
        });
    }
    render() {
        return (
            <div>
                <div className={styles.wrap}>
                    <div className={styles.cover} style={{ visibility: this.state.login ? 'hidden' : 'visible' }}>
                        <div className={styles.lockdiv}>
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        Login into Metamask
                    </div>
                    <div className={styles.infodiv}>
                    <FontAwesomeIcon icon={faUserCircle} className={styles.avaicon} />
                        <p className={styles.info}>
                            {this.state.acc}
                        </p>
                        {/* <div className={styles.but}>Your Projects</div>
                        <div className={styles.but}>Your Jobs</div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;