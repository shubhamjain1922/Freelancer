import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import styles from './NewJobModal.module.css';
import Factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const options = [
    { key: '1', text: 'Devlopment & IT', value: 'Devlopment & IT' },
    { key: '2', text: 'Design & Creative', value: 'Design & Creative' },
    { key: '3', text: 'Sales & Marketing', value: 'Sales & Marketing' },
    { key: '4', text: 'Writing & Translation', value: 'Writing & Translation' },
    { key: '5', text: 'Account & Financing', value: 'Account & Financing' },
    { key: '6', text: 'Admin & Customer Support', value: 'Admin & Customer Support' },
]

class NewJobModal extends Component {
    state={
        title:'',
        budget:'',
        category:'',
        description:'',
        errmssg:'',
        loading:false
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({loading:true,errmssg:''});
        try {
        const accounts = await web3.eth.getAccounts();
        await Factory.methods
            .createProject(this.state.title,parseInt(this.state.budget),this.state.category,this.state.description)
            .send({
                from: accounts[0]
            })
            window.location.href="/";
        } catch(err) {
            this.setState({errmssg:err.message})
        }
        this.setState({loading:false});
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit} error={!!this.state.errmssg}>
                    <Form.Group widths='equal'>
                        <Form.Input className={styles.input} fluid label='Title' placeholder='Title' value={this.state.title} onChange={event=> this.setState({title:event.target.value})} required />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input className={styles.input} value={this.state.budget} onChange={event=> this.setState({budget:event.target.value})} icon='ethereum' type='number' fluid label='Budget (In wei)' placeholder='Budget in wei' required />
                        <Form.Select
                            className={styles.input}
                            fluid
                            label='Category'
                            options={options}
                            placeholder='Category'
                            value={this.state.category} onChange={event=> this.setState({category:event.target.innerText})}
                            required
                        />
                    </Form.Group>
                    <Form.TextArea className={styles.input} value={this.state.description} onChange={event=> this.setState({description:event.target.value})} label='Description' placeholder='' required />
                    <Message error header="Oops!" content={this.state.errmssg} />
                    <Form.Button loading={this.state.loading} className={styles.inputbut}>Submit</Form.Button>
                </Form>
            </div>
        );
    }
}

export default NewJobModal;