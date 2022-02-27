import React, { Component } from 'react';
import Project from '../../ethereum/project';
import web3 from '../../ethereum/web3';
import Nav from '../../components/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from '../../routes';
import ApplyJobModal from '../../components/ApplyJobModal';
import { Form, Message } from 'semantic-ui-react';
import Head from 'next/head';

class ShowJob extends Component {
    state = {
        projects: '',
        apps: [],
        dets: [],
        errmssg: '',
        loading: false
    }
    async componentDidMount() {
        const project = Project(window.location.pathname.split('/')[2]);
        const details = await project.methods.getSummary().call();
        this.setState({ projects: details });

        const apps = await project.methods.getApps().call();
        apps.map(async (value, index) => {
            const det = await project.methods.freelancersadd(value).call();
            det[3] = value;
            det[4] = index;
            this.setState(prevState => ({
                dets: [
                    ...prevState.dets,
                    det
                ]
            }))
        })

    }

    handlehire = async (e1, e2) => {
        this.setState({ loading: true, errmssg: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            const project = Project(window.location.pathname.split('/')[2]);

            await project.methods.hire(e1).send({
                from: accounts[0],
                value: parseInt(e2)
            })
            window.location.reload();
        } catch (err) {
            console.log(err.message)
            this.setState({ errmssg: err.message })
        }
        this.setState({ loading: false });
    }
    handlefinish = async () => {
        this.setState({ loading: true, errmssg: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            const project = Project(window.location.pathname.split('/')[2]);

            await project.methods.finish().send({
                from: accounts[0]
            })
            window.location.href='/';
        } catch (err) {
            console.log(err.message)
            this.setState({ errmssg: err.message })
        }
        this.setState({ loading: false });
    }
    render() {
        return (
            <div>
                <Head>
                    <title>Freelancers</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous" />
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
                <Nav />
                <div className='container-fluid'>
                    <div className='row justify-content-center'>
                        <Link route='/'>
                            <a className="showjobback"><FontAwesomeIcon icon={faArrowLeft} /> Back to Search</a>
                        </Link>
                        <div className='col-md-8 col-lg-7'>
                            <div className='showjobdiv'>
                                <p className='showjobname'>{this.state.projects[0]}</p>
                                <div>
                                    <p className='showjobcat'>{this.state.projects[2]}</p>
                                    <p className='showjobbudget'>Est. Budget: {this.state.projects[1]} wei</p>
                                </div>
                                {
                                    this.state.projects[5] == true ? <div id="showjobdecline">Already Hired</div> : <div>

                                        <button type="button" class="btn btn-primary" id="showjobacceptbut" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                            Apply for Job
                                        </button>
                                        <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 className="showjobmodaltitle" id="exampleModalLabel2">Apply for Job</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <ApplyJobModal />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <p className='showjobdesc'>{this.state.projects[3]}</p>
                                <p className='showjobproposals'>Client: {this.state.projects[4]}</p>
                                <div class="accordion" id="accordionExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="headingOne">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Proposals: {this.state.projects[7]}
                                            </button>
                                        </h2>
                                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                {
                                                    this.state.dets && this.state.dets.map((value) => (
                                                        <div id="showprocon">
                                                            <h4 id="showprotitle">Freelancer id - {value[3]}</h4>
                                                            <p>Bid: {value[1]} wei</p>
                                                            <p>{value[0]}</p>
                                                            {
                                                                this.state.projects[5] == false ?
                                                                    <Form onSubmit={() => this.handlehire(value[4], value[1])} error={!!this.state.errmssg}>
                                                                        <Message error header="Oops!" content={this.state.errmssg} />
                                                                        <Form.Button loading={this.state.loading} id="showjobacceptbut">Hire</Form.Button>
                                                                    </Form> :
                                                                    value[2] == true ? <p id="showprohiretext">You are Hired!!!</p> : <p id="showprohiretext">You are not hired.</p>
                                                            }
                                                            {
                                                                value[2] == true ?
                                                                    <Form onSubmit={() => this.handlefinish()} error={!!this.state.errmssg}>
                                                                        <Message error header="Oops!" content={this.state.errmssg} />
                                                                        <Form.Button loading={this.state.loading} id="showjobacceptbut">Project Completed</Form.Button>
                                                                    </Form> : <></>
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowJob;