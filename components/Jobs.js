import React, { Component } from 'react';
import { Menu, Dropdown, Checkbox } from 'semantic-ui-react';
import styles from './Jobs.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import factory from '../ethereum/factory';
import Project from '../ethereum/project';
import { Link } from '../routes';

class Jobs extends Component {
    state = {
        projects: [],
        prourl: ''
    }
    async componentDidMount() {
        const temp = await factory.methods.getProjects().call();
        this.setState({ prourl: temp })
        temp.map(async (value) => {
            const project = Project(value)
            const details = await project.methods.getSummary().call()
            details[8]=value;
            this.setState(prevState => ({
                projects: [
                    ...prevState.projects,
                    details
                ]
            }))
        })
    }

    render() {
        return (
            <div className={styles.wrap}>
                {
                    this.state.projects && this.state.projects.map((value, key) => (

                        value[6] == true ? <></> :
                            <Link route={`/jobs/${value[8]}`}>
                                <a><div className={styles.jobdiv}>
                                    <p className={styles.proname}>{value[0]}</p>
                                    <div>
                                        <p className={styles.procat}>{value[2]}</p>
                                        <p className={styles.proprice}>Est. Budget: {value[1]} wei</p>
                                    </div>
                                    <p className={styles.prodesc}>{value[3]}</p>
                                    <p className={styles.promore}>more</p>
                                    <p className={styles.proproposals}>Proposals: {value[7]}</p>
                                </div></a>

                            </Link>

                    ))
                }
            </div>
        );
    }
}

export default Jobs;