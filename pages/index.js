import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Nav from '../components/Nav';
import Profile from '../components/Profile';
import Jobs from '../components/Jobs';
import Head from 'next/head'

class ProjectIndex extends Component {
    async componentDidMount() {
    }
    render() {
        const wrap = {
            backgroundColor: "#f2f4f7",
            marginTop: "0px",
            paddingTop: "20px"
        };
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

                <div className='container-fluid' style={wrap}>
                    <div className='row justify-content-center'>
                        <div className='col-xl-2 col-lg-3 col-md-4 prowrapper'>
                            <Profile />
                        </div>
                        <div className='col-lg-6 col-md-8'>
                            <Jobs />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectIndex;