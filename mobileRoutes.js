import React, { lazy } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../helper/PrivateRoute';
import PublicRoute from '../helper/PublicRoute';
import FullLayoutRoute from '../helper/FullLayoutRoute';
import DefaultRoute from '../helper/DefaultRoute';

import '../App.css';

import Home from '../Components/Home';
import Inplay from '../Components/Inplay';
import Betslip from '../Components/Betslip';
import Prematch from '../Components/Prematch';
import Upcoming from '../Components/Today';  // shows matches till next day EOD

const TermsAndCondition = lazy(() => import('../Components/MyAccount/TermsAndCondition'));
const MyAccount = lazy(() => import('../Components/MyAccount'));
const Transactions = lazy(() => import('../Components/Transactions'));
const MyBets = lazy(() => import('../Components/MyBets'));
const Payout = lazy(() => import('../Components/Payout'));
const Results = lazy(()=>import('../Components/Results'));
const ResultsSearch = lazy(()=>import('../Components/Results/Search'));
const UpcomingSearch = lazy(()=>import('../Components/Today/Search'));
const Favorites = lazy(()=>import('../Components/Favorites'));
const Tomorrow = lazy(()=>import('../Components/Tomorrow'));
const TomorrowSearch = lazy(()=>import('../Components/Tomorrow/Search'));
const PrematchSearch = lazy(()=>import('../Components/Prematch/Search'));
const ExtraOddsModal = lazy(()=>import('../Components/Inplay/ExtraOddsModal'));
const ExtraOddsModalPrematch = lazy(()=>import('../Components/Shared/ExtraOddsModal'));
const Casino= lazy(()=>import('../Components/Casino'));
const CasinoGame = lazy(()=>import('../Components/Casino/SingleGame'));
const LiveCasino = lazy(()=>import('../Components/LiveCasino'));
const InplaySearch = lazy(()=>import('../Components/Inplay/Search'));

function MobileRoutes(props) {

  return (
    <Switch>
        <PublicRoute exact path="/" component={Home} isMobileOnly={ props.isMobileOnly }/>
        <PrivateRoute exact path="/casino" component={Casino} isMobileOnly={ props.isMobileOnly } headerClass="header_transparent" title="casino" />
        <FullLayoutRoute exact path="/casino/game/:gameTitle" component={CasinoGame} />
        <PrivateRoute exact path="/live-casino" component={LiveCasino} isMobileOnly={ props.isMobileOnly } headerClass="header_transparent" title="liveCasino" />
        <PrivateRoute exact path="/my-account" component={MyAccount} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="myAccount" />
        <PrivateRoute exact path="/my-bets" component={MyBets} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="myBets" />
        <PublicRoute exact path="/betslip" component={Betslip} setSessionTimeout={props.setSessionTimeout} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="betslip" />
        <PrivateRoute exact path="/my-account/transactions" component={Transactions} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="transaction" />
        <PublicRoute exact path="/live" component={Inplay} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="inplay" />
        <PublicRoute exact path="/live/search" component={InplaySearch} isMobileOnly={ props.isMobileOnly } title="inplay" />
        <PublicRoute exact path="/sports" component={Prematch} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="sports" />
        <PublicRoute exact path="/sports/search" component={PrematchSearch} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="sports" />
        <PublicRoute exact path="/results" component={Results} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="results" />
        <PublicRoute exact path="/results/search" component={ResultsSearch} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="results" />
        <PublicRoute exact path="/upcoming" component={Upcoming} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="upcoming" />
        <PublicRoute exact path="/upcoming/search" component={UpcomingSearch} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="upcoming" />
        <PublicRoute exact path="/tomorrow" component={Tomorrow} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="tomorrow" />
        <PublicRoute exact path="/tomorrow/search" component={TomorrowSearch} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="tomorrow" />
        <PrivateRoute exact path="/favorites" component={Favorites} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="favorites" />
        <PublicRoute exact path="/terms-page" component={TermsAndCondition} isMobileOnly={ props.isMobileOnly } headerClass="header_white" title="Terms" />
        <PublicRoute exact path="/live/extra-market/:sportId/:fixtureId/:liveStreamAvailable" isMobileOnly={ props.isMobileOnly } isExtraMarket={true} headerClass="header_white" component={ExtraOddsModal} title="ExtraOddsModal" />
        <PublicRoute exact path="/extra-market/:sportId/:fixtureId" isMobileOnly={ props.isMobileOnly } isExtraMarket={true} headerClass="header_white" component={ExtraOddsModalPrematch} title="ExtraOddsModal" />
        <DefaultRoute />
    </Switch>
  );
}

export default MobileRoutes;
