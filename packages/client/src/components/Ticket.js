import React, { Component } from 'react'
import { Card, Icon, Label, Divider, Placeholder } from 'semantic-ui-react'

export default class Ticket extends Component {

    lableColor(isActive) {
        if (isActive) {
            return <Label className='right floated' color='teal'>
                Active
            </Label>
        } else {
            return <Label className='right floated' color='red'>
                Inactive
            </Label>
        }
    }

    render() {

        const loading = this.props.isLoading;

        if (loading) {
            return (
                <Card raised={true} color='grey'>
                    <Card.Content>
                        <Label className='right floated' />
                        <Card.Header>
                            <Placeholder>
                                <Placeholder.Header>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Header>
                            </Placeholder>
                        </Card.Header>
                        <Divider hidden />
                        <Card.Meta>
                            <Placeholder>
                                <Placeholder.Line />
                            </Placeholder>
                        </Card.Meta>
                        <Divider hidden />
                        <Card.Description>
                            <Placeholder>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        </Card.Description>
                        <Divider hidden />
                        <Card.Meta>
                            <Placeholder>
                                <Placeholder.Line />
                            </Placeholder>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <Placeholder>
                            <Placeholder.Line length='short' />
                        </Placeholder>
                        <Label.Group className='right floated'>
                            <Label />
                            <Label />
                            <Label />
                        </Label.Group>
                    </Card.Content>
                </Card>
            )
        } else {
            return (
                <Card raised={true} color='blue'>
                    <Card.Content>
                        {this.lableColor(this.props.children.isActive)}
                        <Card.Header>{this.props.children.title}</Card.Header>
                        <Divider hidden />
                        <Card.Meta>
                            <Icon name='building' />
                            {this.props.children.company}, {this.props.children.name}
                        </Card.Meta>
                        <Divider hidden />
                        <Card.Description>
                            {this.props.children.content}
                        </Card.Description>
                        <Divider hidden />
                        <Card.Meta>
                            <Icon name='envelope' />{this.props.children.email} | <Icon name='phone square' />{this.props.children.phone}
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        {this.props.children.creationTime}
                        <Label.Group className='right floated' color='blue'>
                            {this.props.children.lables.map((tag, index) => {
                                return (
                                    <Label key={index}>{tag}</Label>
                                );
                            })}
                        </Label.Group>
                    </Card.Content>
                </Card>
            )
        }
    }
}
