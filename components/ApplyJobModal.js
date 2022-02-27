import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import styles from './ApplyJobModal.module.css';
import Project from '../ethereum/project';
import web3 from '../ethereum/web3';

class ApplyJobModal extends Component {
    state = {
        projects: '',
        budget: '',
        description: '',
        errmssg: '',
        loading: false
    }

    async componentDidMount() {
        const project = Project(window.location.pathname.split('/')[2]);
        const details = await project.methods.getSummary().call();
        this.setState({ projects: details });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true, errmssg: '' });
        let flag = true;
        if (this.state.budget > parseInt(this.state.projects[1])) {
            flag = false;
            this.setState({ errmssg: "Bid can't be higher than " + this.state.projects[1] + " wei" })
        }

        if (flag === true) {
            try {
                const project = Project(window.location.pathname.split('/')[2]);
                const accounts = await web3.eth.getAccounts();
                await project.methods
                    .apply(parseInt(this.state.budget), this.state.description)
                    .send({
                        from: accounts[0]
                    })
                window.location.href = "/";
            } catch (err) {
                this.setState({ errmssg: err.message })
            }
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit} error={!!this.state.errmssg}>
                    <Form.Input className={styles.input} value={this.state.budget} onChange={event => this.setState({ budget: event.target.value })} icon='ethereum' type='number' fluid label={"Bid <" + this.state.projects[1] + " wei"} placeholder='Bid in wei' required />
                    <Form.TextArea className={styles.input} value={this.state.description} onChange={event => this.setState({ description: event.target.value })} label='Cover Letter' placeholder='' required />
                    <Message error header="Oops!" content={this.state.errmssg} />
                    <Form.Button loading={this.state.loading} className={styles.inputbut}>Submit</Form.Button>
                </Form>
            </div>
        );
    }
}

export default ApplyJobModal;