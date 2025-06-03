import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Col } from 'reactstrap';
import classnames from 'classnames';
import { Routes, Route, Navigate } from 'react-router-dom';
import Hammer from 'rc-hammerjs';

import Header from './DocumentationHeader';
import Sidebar from './DocumentationSidebar';
import { openSidebar, closeSidebar } from "../actions/navigation";
import s from '../components/Layout/Layout.module.scss';
import sd from './Styles.module.scss';
import Overview from './pages/getting-started/Overview';
import Licences from './pages/getting-started/Licences';
import QuickStart from './pages/getting-started/QuickStart';
import Pages from './pages/Pages';
import Alerts from './pages/components/Alerts';
import Badge from './pages/components/Badges';
import Buttons from './pages/components/Buttons';
import Card from './pages/components/Card';
import Carousel from './pages/components/Carousel';
import Modal from './pages/components/Modal';
import Nav from './pages/components/Nav';
import Navbar from './pages/components/Navbar';
import Popovers from './pages/components/Popovers';
import Progress from './pages/components/Progress';
import Lists from './pages/components/Lists';
import Libs from './pages/Libs';


class Layout extends React.Component {
    static propTypes = {
        sidebarStatic: PropTypes.bool,
        sidebarOpened: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
    };
    static defaultProps = {
        sidebarStatic: false,
        sidebarOpened: false,
    }

    constructor(props) {
        super(props);
        this.handleSwipe = this.handleSwipe.bind(this)

        this.state = {
                chatOpen: false,
                width: window.innerWidth,
        }
    }

    handleResize() {
        this.setState({
            width: window.innerWidth,
        })

        if(window.innerWidth < 768 && this.props.sidebarOpened){
            this.props.dispatch(closeSidebar())
        }
    }

    handleSwipe(e) {
        if('ontouchstart' in window) {
            if (e.direction === 4 && !this.state.chatOpen) {
                this.props.dispatch(openSidebar());
                return;
            }

            if (e.direction === 2 && this.props.sidebarOpened){
                this.props.dispatch(closeSidebar())
                return;
            }
        }
    }
    render() {
        return (
            <div
                className={[
                    s.root,
                    sd.root,
                    this.state.width > 768 && s.sidebarStatic,
                    this.state.width < 768 && !this.props.sidebarOpened ? s.sidebarClose : '',
                ].join(' ')}
            >
                <Header/>
                <div>
                    <Hammer onSwipe={this.handleSwipe}>
                        <main className={classnames(s.content, sd.content, 'documentationPage')}>
                            <div className="container">
                                <div className="row">
                                    <Sidebar width={this.state.width}/>
                                    <Col xl={10} md={9}>
                                        <Routes>
                                            <Route path="/documentation" element={<Navigate to="/documentation/overview" replace />} />
                                            <Route path="/documentation/overview" element={<Overview />} />
                                            <Route path="/documentation/licences" element={<Licences />} />
                                            <Route path="/documentation/quick-start" element={<QuickStart />} />
                                            <Route path="/documentation/pages" element={<Pages />} />
                                            <Route path="/documentation/components/alerts" element={<Alerts />} />
                                            <Route path="/documentation/components/badges" element={<Badge />} />
                                            <Route path="/documentation/components/buttons" element={<Buttons />} />
                                            <Route path="/documentation/components/card" element={<Card />} />
                                            <Route path="/documentation/components/carousel" element={<Carousel />} />
                                            <Route path="/documentation/components/modal" element={<Modal />} />
                                            <Route path="/documentation/components/nav" element={<Nav />} />
                                            <Route path="/documentation/components/navbar" element={<Navbar />} />
                                            <Route path="/documentation/components/popovers" element={<Popovers />} />
                                            <Route path="/documentation/components/progress" element={<Progress />} />
                                            <Route path="/documentation/components/lists" element={<Lists />} />
                                            <Route path="/documentation/libs" element={<Libs />} />
                                            <Route path="*" element={<Navigate to="/documentation/overview" replace />} />
                                        </Routes>
                                    </Col>
                                </div>
                            </div>
                        </main>
                    </Hammer>
                </div>
            </div>
        );
    }
}

function mapStateToProps(store){
    return {
        sidebarOpened: store.navigation.sidebarOpened,
    };
}

export default connect(mapStateToProps)(Layout);

