import React, { Component } from 'react';
import { FaGithubAlt, FaSearch } from 'react-icons/fa';
import api from '../../services/Api';

import { Container, Form, SubmitButton, Avatar, Row } from './styles';

export default class Main extends Component {
    state = {
        newUser: '',
        userFound: null,
    };

    handleInputChange = evt => {
        this.setState({ newUser: evt.target.value });
    };

    handleSubmit = async evt => {
        evt.preventDefault();

        const { newUser } = this.state;

        const response = await api.get(`users/${newUser}`);
        console.log(response) // eslint-disable-line
        this.setState({
            userFound: response.data,
        });
    };

    render() {
        const { newUser, userFound } = this.state;

        return (
            <>
                <Container>
                    <h1>
                        <FaGithubAlt />
                        Usuários
                    </h1>
                    <Form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            value={newUser}
                            placeholder="Encontrar usuário"
                            onChange={this.handleInputChange}
                        />
                        <SubmitButton>
                            <FaSearch color="#FFF" size={14} />
                        </SubmitButton>
                    </Form>
                </Container>
                {userFound && (
                    <Container>
                        <Row>
                            <Avatar src={userFound.avatar_url} alt="Avatar" />
                            <div>
                                <h1>{userFound.name}</h1>
                                <a
                                    href={userFound.html_url}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {userFound.html_url}
                                </a>
                            </div>
                        </Row>
                    </Container>
                )}
            </>
        );
    }
}
