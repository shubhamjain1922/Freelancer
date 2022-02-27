import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import styles from './Nav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import NewJobModal from './NewJobModal';
import {Link} from '../routes';

class Nav extends Component {
  render() {
    return (
      <div>
        <link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css" />
        <Menu>
        <Menu.Item className={styles.headname}>
          <Link route='/'>
            <a>Freelancers</a>
          </Link>
          </Menu.Item>

          <Menu.Item className={styles.menui}>
          <Link route='/'>
            <a>All Jobs</a>
          </Link>
          </Menu.Item>

          <Menu.Menu position='right'>
            <button type="button" class="btn btn-primary" id={styles.menubut} data-bs-toggle="modal" data-bs-target="#exampleModal">
              Add Job +
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 className={styles.modaltitle} id="exampleModalLabel">Job Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <NewJobModal />
                  </div>
                </div>
              </div>
            </div>
          </Menu.Menu>
        </Menu>

      </div>
    );
  }
}

export default Nav;