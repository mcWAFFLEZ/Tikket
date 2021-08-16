import React, { Component } from 'react'
import { Card, Container, Input, Divider, Pagination, Icon } from 'semantic-ui-react'
import Ticket from './Ticket'
import createApiClient from '../api'

const api = createApiClient();

export default class TicketList extends Component {

    state = {
        tickets: [],
        loading: true,
        pageNumber: 0,
        numberOfPages: 0,
    }

    async componentDidMount() {
        //note: last object in the data array is the object holding the number of pages
        const data = await api.getPage(1);
        const pages = data.pop().pages;
        this.setState({
            tickets: data,
            loading: false,
            numberOfPages: pages,
            pageNumber: 1,
        })
    }

    navClick = async () => {
        const data = await api.getPage(this.state.pageNumber);
        const pages = data.pop().pages;
        this.setState({
            tickets: data,
            loading: false,
            numberOfPages: pages,
        })
    }

    onNextItemClick = async () => {
        if (this.state.pageNumber !== this.state.numberOfPages) {
            this.setState({
                pageNumber: this.state.pageNumber + 1,
                loading: true,
            }, this.navClick)
        }
    }

    onPrevItemClick = async () => {
        if (this.state.pageNumber !== 1) {
            this.setState({
                pageNumber: this.state.pageNumber - 1,
                loading: true,
            }, this.navClick)
        }
    }

    onFirstItemClick = async () => {
        if (this.state.pageNumber !== 1) {
            this.setState({
                pageNumber: 1,
                loading: true,
            }, this.navClick)
        }
    }

    onLastItemClick = async () => {
        if (this.state.numberOfPages !== this.state.pageNumber) {
            this.setState({
                pageNumber: this.state.numberOfPages,
                loading: true,
            }, this.navClick)
        }
    }

    onPageItemClick = async (page) => {
        this.setState({
            pageNumber: page,
            loading: true,
        }, this.navClick)
    }

    render() {

        const tickets = this.state.tickets;
        const loading = this.state.loading;
        const numberOfPages = this.state.numberOfPages;


        if (loading) {
            return (
                <Container text>
                    <Divider hidden />
                    <Input disabled loading icon='user' placeholder='Search...' size='small' fluid style={{ margin: "7.5px" }} />
                    <Divider hidden />
                    <Pagination
                        disabled
                        ellipsisItem={false}
                        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                        prevItem={{ content: <Icon name='angle left' />, icon: true }}
                        nextItem={{ content: <Icon name='angle right' />, icon: true }}
                        totalPages={numberOfPages}
                        style={{ margin: "0 7.5px 0 7.5px" }}
                    />
                    <Card.Group itemsPerRow={1}>
                        {Array(25).fill().map((data, index) => {
                            return (
                                <Ticket key={index} isLoading={loading} />
                            )
                        })}
                    </Card.Group>
                </Container>)
        } else {
            return (
                <Container text>
                    <Divider hidden />
                    <Input icon='search' placeholder='Search...' size='small' fluid style={{ margin: "7.5px" }} />
                    <Divider hidden />
                    <Pagination
                        defaultActivePage={1}
                        ellipsisItem={false}
                        firstItem={{ onClick: this.onFirstItemClick, content: <Icon name='angle double left' />, icon: true }}
                        lastItem={{ onClick: this.onLastItemClick, content: <Icon name='angle double right' />, icon: true }}
                        prevItem={{ onClick: this.onPrevItemClick, content: <Icon name='angle left' />, icon: true }}
                        nextItem={{ onClick: this.onNextItemClick, content: <Icon name='angle right' />, icon: true }}
                        pageItem={{ onClick: (event, data) => { this.onPageItemClick(data.content) } }}
                        pointing
                        totalPages={numberOfPages}
                        style={{ margin: "0 7.5px 0 7.5px" }}
                    />
                    <Card.Group itemsPerRow={1}>
                        {tickets.map(ticketData => {
                            return (
                                <Ticket isLoading={loading} key={ticketData.id}>{ticketData}</Ticket>
                            )
                        })}
                    </Card.Group>
                </Container>
            )
        }

    }
}
