import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import Util from '../../helper/Util';
import { Translate } from '../../localization';
import jwtService from '../../services/jwtService';
import { lSportsConfig } from '../../config/lsports.config.js';
import { betTypeConfig, defaultCurrency, REQUEST_TYPE } from '../../general.config.js'
import * as Actions from '../../store/actions/actionTypes';

function Betslip(props) {
    let { betslip, openBetslipModal, getCashoutData } = props;

    let dispatch = useDispatch();
    const { userData } = useSelector(state => state.user)
    
    let { cashoutTimer, betStatus } = lSportsConfig;
    cashoutTimer = cashoutTimer * 1000; // convert seconds to milliseconds

    let [ cashoutAmount, setCashoutAmount ] = useState(null);
    let [ cashoutExpired, setCashoutExpired ] = useState(false);
    let [ cashoutData, setCashoutData ] = useState(null);

    const handleClick = (e) => {
        e.preventDefault();
        openBetslipModal(betslip);
    };
    
    const openCashoutModal = (e) => {
        e.stopPropagation();
        if (!cashoutAmount) return null;
        getCashoutData(betslip);
        if(cashoutData) dispatch({ type:Actions.SET_CASHOUT_DATA, value: cashoutData || {} });
    };

    const getCashout = async () => {
        try {
            const { amount, multi_price, status } = betslip;
            if (status != betStatus.ingame) return null;
            jwtService
                .getCashoutData(betslip.id, multi_price, amount)
                .then((value) => {
                    setCashoutAmount(value.cashout_amount);
                    setCashoutExpired(false);
                    setCashoutData(value);
                })
                .catch((error) => {
                    console.error(error);
                    setCashoutAmount(null);
                    setCashoutExpired(false);
                    setCashoutData(null);
                    if (error && error.response && error.response.status && error.response.status === REQUEST_TYPE.UNAUTHORIZED) {
                        Util.handleRepeatedLogin(error.response);
                    }
                }); 
        } catch (error) {
            console.error(error);
        } 
    };

    const onRefreshClick = (e) => {
        if(e) e.stopPropagation();
        getCashout();
    };

    useEffect(() => {
        if (betslip?.status === betStatus.ingame) {
            getCashout();
        }
    }, []);

    useEffect(() => {
        if (!cashoutExpired) {
            setTimeout(() => setCashoutExpired(true), cashoutTimer);
        }
    }, [cashoutExpired]);

    let currency = userData?.currency || defaultCurrency;
    let statusText = Translate[betslip.status];
    let statusStyle = 'bl-darkgray-6';
    let possible_win = <span className="fs-18">-</span>;
    let win_amount = <span className="fs-18">-</span>;
    let statusTextStyle = '';
    let isInGame = false;

    let isDoubleBet = betslip.bettype == betTypeConfig.doubleBet;

    switch(betslip.status) {
        case betStatus.ingame: {
            statusStyle = 'bl-yellow-6';
            possible_win = Util.toFixedDecimal(betslip.possible_win) + ' ' + currency;
            isInGame=true;
            break;
        }
        case betStatus.lost: {
            statusStyle = 'bl-red-6';
            statusTextStyle = 'text-red-dark';
            win_amount = '0.00 ' + currency;
            break;
        }
        case betStatus.won: {
            statusStyle = 'bl-green-6';
            statusTextStyle = 'text-green';
            win_amount = Util.toFixedDecimal(betslip.possible_win) + ' ' + currency;
            break;
        }
        case betStatus.cashout: {
            statusStyle = 'bl-orange-6';
            possible_win = '-';
            win_amount = Util.toFixedDecimal(betslip.cashout_amount) + ' ' + currency;
            break;
        }
        case betStatus.refund: {
            statusStyle = 'bl-darkgray-6';
            break;
        }
        default: {}
    }

    return (
        <>
            <tr onClick={handleClick}>
                <td>
                    <div className={`mybet__date ${statusStyle}`}>
                        <div>
                            <time>{format(parseISO(betslip.created), 'dd/MM/yy')}</time>
                        </div>
                        <div>
                            <time>{format(parseISO(betslip.created), 'HH:mm')}</time>
                        </div>
                    </div>
                </td>
                <td>
                    {Util.toFixedDecimal(betslip.amount)} {currency}
                </td>
                <td className="text-black" onClick={(e) => e.stopPropagation() }>{possible_win}</td>
                <td className="win-amount" onClick={(e) => e.stopPropagation() }>
                    {isInGame && !isDoubleBet
                    ? !cashoutExpired
                        ? <button className="cashout-button font-weight-bold" onClick={ openCashoutModal }>{cashoutAmount}</button>
                        : <button className="cashout-button" ><i className='icon-my-bets fs-12 align-top' onClick={ onRefreshClick }/></button>
                    : win_amount}
                </td>
                <td className={`text-capitalize ${statusTextStyle}`} onClick={(e) => e.stopPropagation() }>{statusText}</td>
            </tr>
        </>
    );
}

Betslip.propTypes = {
    betslip: PropTypes.object,
    openBetslipModal: PropTypes.func,
    getCashoutData: PropTypes.func
};

export default Betslip;
