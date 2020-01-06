import React from 'react';
import './Rank.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Rank = ({ fail, celebrityNames, probabilities, name, entries }) => {
    return (
        <div className="Rank-container">
            <div className='entries-container white f3'>
                {`${name} , Images submitted: `}
                <div className='white f2'>
                    {entries}
                </div>
            </div>
            <Container className="outputForm br3">
                <Row className='form-header br3 br--top'>
                    <Col xs={6}>
                        <h5>PRIDICTED CELEBRITY</h5>
                    </Col>
                    <Col xs={6}>
                        <h5>PROBABILITY(%)</h5>
                    </Col>
                </Row>

                {fail ?
                    <h3 style={{ borderBottom: 0,paddingTop:'30px'}}>Invalid link! Please try another link.</h3>
                    :
                    <Row className='name-section'>
                        <Col xs={6} style={{ paddingRight: 0, paddingLeft: 0, textAlign: 'left' }}>
                            {celebrityNames.map(name =>
                                <p key={name.celebrityNames + Math.random()}
                                >{name.celebrityNames.toUpperCase()}</p>
                            )}
                        </Col>
                        <Col xs={6} style={{ paddingRight: 0, paddingLeft: 0, textAlign: 'center' }}>
                            {probabilities.map(prob =>
                                <p key={prob.probabilities}
                                >{(Number(prob.probabilities) * 100).toFixed(1)}</p>
                            )}
                        </Col>
                    </Row>
                }
            </Container>
        </div>
    );
}

export default Rank;