import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    loginUser,
    getDiamondAndHeart,
    updateDiamondsAndHearts,
    getAllUsersSCore,
} from '../actions/authActions';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './play.css';

import jump from '../media/jump.mp3';
import death from '../media/death.mp3';
import diam from '../media/diam.mp3';
import diam2 from '../media/diam2.mp3';
import roar from '../media/roar.mp3';
import fire from '../media/fire.wav';
import diampic from '../media/diam.png';
import main_run from '../media/main_run.gif';
import main_jump_up from '../media/main_jump_up.png';
import main_jump_down from '../media/main_jump_down.png';
import main_idle from '../media/main_idle.png';
import little1 from '../media/little1.png';

import big from '../media/big.png';
import little2 from '../media/little2.png';

import bullet from '../media/bullet.png';
import dragon from '../media/dragon.png';
import boss_idle from '../media/boss_idle.gif';
import boss_move from '../media/boss_move.png';
import boss_spit from '../media/boss_spit.png';
import firepic from '../media/fire.png';

class BitArcade extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {},
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        this.props.getDiamondAndHeart({ email: this.props.auth.user.email });
        this.props.getAllUsersSCore();
        window.getDiamonds(this.props.auth.user.email);
        console.log('window', window);

        // var test = window.getDiamonds();
        // test();
        // window.getDiamondsIndex(this.props.auth.user.email);
    }

    playButton = () => {
        window.playButton();
        this.render();
    };
    buyDiamond = () => {
        console.log(this.props.auth.diamonds);

        if (this.props.auth.diamonds >= 20) {
            let newData = {
                email: this.props.auth.user.email,
                hearts: this.props.auth.hearts + 1,
                diamonds: this.props.auth.diamonds - 20,
            };
            console.log('newData', newData);
            this.props.updateDiamondsAndHearts(newData);
        } else {
            //show some error
            console.log('diamonds are less');
        }
    };
    render() {
        // this.props.getDiamondAndHeart();

        console.log('scores', this.props.auth.allUsersScore);
        return (
            <div>
                <div id="sprites" style={{ display: 'none' }}>
                    <img src={main_run} alt="" />
                    <img src={main_jump_up} alt="" />
                    <img src={main_jump_down} alt="" />
                    <img src={main_idle} alt="" />
                    <img src={little1} alt="" />
                    <img src={big} alt="" />
                    <img src={little2} alt="" />
                    <img src={diampic} alt="" />
                    <img src={bullet} alt="" />
                    <img src={dragon} alt="" />
                    <img src={boss_idle} alt="" />
                    <img src={boss_move} alt="" />
                    <img src={boss_spit} alt="" />
                    <img src={firepic} alt="" />
                </div>
                <audio id="jump-audio">
                    <source src={jump} type="audio/mp3" /> {/* Button click */}
                </audio>
                <audio id="death-audio">
                    <source src={death} type="audio/mp3" /> {/* Button click */}
                </audio>
                <audio id="diam-audio">
                    <source src={diam} type="audio/mp3" /> {/* Button click */}
                </audio>
                <audio id="fire-audio">
                    <source src={fire} type="audio/mp3" /> {/* Button click */}
                </audio>
                <audio id="roar-audio">
                    <source src={roar} type="audio/mp3" /> {/* Button click */}
                </audio>
                <div id="full-area">
                    <div
                        id="speeding-msg"
                        style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            position: 'absolute',
                            top: '50%',
                            textAlign: 'center',
                            width: '100%',
                            marginTop: '140px',
                            userSelect: 'none',
                            display: 'none',
                        }}
                    >
                        SPEEDING UP...
                    </div>
                    <div
                        id="unsupported-browsers"
                        style={{ display: 'none', position: 'relative', top: '50%' }}
                    >
                        <h1>Sorry, Your browser is not supported!</h1>
                        <h3 style={{ userSelect: 'none', fontWeight: 'bold' }}>
                            Please try one of our supported browsers below:
                            <br /> (Google Chrome, Opera, Microsoft Edge)
                        </h3>
                        <div id="browsers-pictures" style={{ marginTop: '20px' }}>
                            <img
                                style={{ width: '60px' }}
                                src="../media/chrome.png"
                                alt=""
                            />
                            <img
                                style={{ width: '70px', marginLeft: '8px' }}
                                src="../media/opera.png"
                                alt=""
                            />
                            <img
                                style={{ width: '70px' }}
                                src="../media/edge.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div id="info">
                        <p>
                            {/* LOGGED AS:{" "} */}
                            <span>
                                {/*?php echo(strtoupper($_SESSION["username"]))?*/}
                            </span>
                        </p>
                    </div>
                    <div id="menu">
                        <h1>BEST SCORE : {this.props.auth.score}</h1>
                        <div className="btn" id="play-btn" onClick={this.playButton}>
                            PLAY
                            <span className="material-icons helper-text">help </span>
                            <div id="triangle-up" />
                            <p className="btn">
                                HOW TO PLAY:
                                <br />
                                - JUMP : SPACE BUTTON / ARROW TOP BUTTON
                                <br />
                                - ATTACK : S BUTTON / ARROW RIGHT BUTTON
                                <br />
                                INVENTORY:
                                <br />
                                - DIAMOND : USED ON THE SHOP
                                <br />- HEART : USED TO GET A NEW CHANCE AFTER DYING
                            </p>
                        </div>
                        <br />
                        <div
                            className="btn"
                            id="leaderboard-btn"
                            onClick={window['leaderboard_btn']}
                        >
                            LEADERBOARD
                        </div>
                        <br />
                        <div className="btn" id="shop-btn" onClick={window['shop_btn']}>
                            SHOP
                        </div>
                        <br />
                        {/* <div
              className="btn logout"
              //   onclick="location.href='secondryFiles/logout.php'"
            >
              LOGOUT
            </div> */}
                    </div>
                    <div id="gameplay">
                        <div id="shop-heart">
                            <p>
                                {this.props.auth && this.props.auth
                                    ? this.props.auth.hearts
                                    : null}
                            </p>
                            <span className="material-icons">favorite</span>
                        </div>
                        <div id="shop-diam">
                            <p>
                                {this.props.auth && this.props.auth
                                    ? this.props.auth.diamonds
                                    : 77}
                            </p>
                            <img src={diampic} alt="" />
                        </div>
                        <div id="gameplay-back" onClick={window['goBack']}>
                            <span className="material-icons">chevron_left </span>
                            <p>Back go</p>
                        </div>
                        <div id="gameplay-start">
                            <p>START</p>
                            <span className="material-icons" onClick={window['start']}>
                                play_arrow
                            </span>
                        </div>
                        <div id="game-over">
                            <p>GAME OVER</p>
                            <span className="material-icons" onClick={window['start']}>
                                repeat_on
                            </span>
                        </div>
                        <div id="gameplay-chance">
                            <p>DO YOU WANT TO USE ONE HEART TO CONTINUE?</p>
                            <div
                                id="gameplay-chance-yes"
                                className="btn"
                                onClick={window['gameplay_chance_yes']}
                            >
                                YES [1]
                            </div>
                            <div
                                id="gameplay-chance-no"
                                className="btn"
                                onClick={window['gameplay_chance_no']}
                            >
                                NO [2]
                            </div>
                        </div>
                        <div id="score">00000</div>
                        <div id="character" />
                        <div id="obstacles" />
                        <div id="boss-bar">
                            <div>BOSS HEALTH</div>
                        </div>
                        <div id="bullets" />
                    </div>

                    {/* LEADERBOARD */}
                    <div id="leaderboard" style={{ display: 'none' }}>
                        <div id="leaderboard-menu">
                            <p>LEADERBOARD</p>
                            <div id="leaderboard-close" className="material-icons">
                                close
                            </div>
                        </div>
                        {this.props.auth && this.props.auth.allUsersScore
                            ? this.props.auth.allUsersScore.map((data, index) => (
                                  <div id="player" style={{ display: 'flex' }}>
                                      <div id="player-rank">{index + 1}.</div>
                                      <div id="player-name">{data.email}</div>
                                      <div id="player-score">{data.score}</div>
                                  </div>
                              ))
                            : null}
                        {/* {this.props.auth && this.props.auth.allUsersScore
              ? Object.keys(this.props.auth.allUsersScore).map(
                  (value, value2, key) => (
                    <div id="player" style={{ display: "flex" }}>
                      <div id="player-rank">{key + 1}</div>
                      <div id="player-name">{value}</div>
                      <div id="player-score">{value}</div>
                    </div>
                  )
                )
              : null}{" "} */}
                    </div>
                    {/* LEADERBOARD */}
                    <div id="shop">
                        <div
                            id="shop-close"
                            className="material-icons"
                            onClick={window['shop_close']}
                        >
                            close
                        </div>
                        <div id="shop-heart">
                            <p>
                                {' '}
                                {this.props.auth && this.props.auth
                                    ? this.props.auth.hearts
                                    : null}
                            </p>
                            <span className="material-icons">favorite</span>
                        </div>
                        <div id="shop-diam">
                            <p>
                                {' '}
                                {this.props.auth && this.props.auth
                                    ? this.props.auth.diamonds
                                    : null}
                            </p>
                            <img src={diampic} alt="" />
                        </div>
                        <div id="shop-btns">
                            <div id="character-btn" className="btn">
                                Characters (Coming Soon)
                            </div>
                            <div
                                id="heart-btn"
                                className="btn"
                                onClick={window['heart_btn']}
                            >
                                Buy Heart
                                <br />
                                <span className="material-icons">favorite</span>
                                <div id="heart-price">
                                    <p>20</p>
                                    <img src={diampic} alt="" />
                                </div>
                            </div>
                        </div>
                        <div id="shop-text">You bought 1 Heart!</div>
                    </div>
                </div>
            </div>
        );
    }
}

BitArcade.propTypes = {
    getDiamondAndHeart: PropTypes.func.isRequired,
    updateDiamondsAndHearts: PropTypes.func.isRequired,
    getAllUsersSCore: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {
    getDiamondAndHeart,
    updateDiamondsAndHearts,
    getAllUsersSCore,
})(BitArcade);
