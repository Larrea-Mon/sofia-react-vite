import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import s from '../components/Sidebar/Sidebar.module.scss';
import sd from './Styles.module.scss';
import { LinksGroup } from './Components/LinksGroup/LinksGroup';
import { openSidebar, closeSidebar, changeActiveSidebarItem } from '../actions/navigation';
import isScreen from './Components/screenHelper/screenHelper';

function Sidebar(props) {
    const location = useLocation();

    function onMouseEnter() {
        if (!props.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
            const paths = location.pathname.split('/');
            paths.pop();
            props.dispatch(openSidebar());
            props.dispatch(changeActiveSidebarItem(paths.join('/')));
        }
    }

    function onMouseLeave() {
        if (!props.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
            props.dispatch(closeSidebar());
            props.dispatch(changeActiveSidebarItem(null));
        }
    }

    return (
        <Col xl={2} md={3}>
            <nav
                className={[s.root, sd.sidebar, props.width > 768 && s.staticSidebar].join(' ')}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <ul>
                    <LinksGroup
                        onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={props.activeItem}
                        header="Getting Started"
                        isHeader
                        link="/documentation/getting-started"
                        index="getting-started"
                        childrenLinks={[
                            {
                                header: 'Overview', link: '/documentation/getting-started/overview',
                            },
                            {
                                header: 'Licences', link: '/documentation/getting-started/licences',
                            },
                            {
                                header: 'Quick Start', link: '/documentation/getting-started/quick-start',
                            }
                        ]}
                    />
                    <LinksGroup
                        onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={props.activeItem}
                        header="Pages"
                        isHeader
                        link="/documentation/pages"
                        index="pages"
                    />
                    <LinksGroup
                        onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={props.activeItem}
                        header="Components"
                        isHeader
                        link="/documentation/components"
                        index="components"
                        childrenLinks={[
                            {
                                header: 'Alerts', link: '/documentation/components/alerts',
                            },
                            {
                                header: 'Badge', link: '/documentation/components/badge',
                            },
                            {
                                header: 'Buttons', link: '/documentation/components/buttons',
                            },
                            {
                                header: 'Card', link: '/documentation/components/card',
                            },
                            {
                                header: 'Carousel', link: '/documentation/components/carousel',
                            },
                            {
                                header: 'Modal', link: '/documentation/components/modal',
                            },
                            {
                                header: 'Nav', link: '/documentation/components/nav',
                            },
                            {
                                header: 'Navbar', link: '/documentation/components/navbar',
                            },
                            {
                                header: 'Popovers & Tooltips', link: '/documentation/components/popovers',
                            },
                            {
                                header: 'Progress', link: '/documentation/components/progress',
                            },
                            {
                                header: 'Lists', link: '/documentation/components/lists',
                            },
                        ]}
                    />
                    <LinksGroup
                        onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={props.activeItem}
                        header="Libs"
                        isHeader
                        link="/documentation/libs"
                        index="libs"
                    />
                    {/*<LinksGroup*/}
                    {/*onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}*/}
                    {/*activeItem={this.props.activeItem}*/}
                    {/*header="FAQ"*/}
                    {/*isHeader*/}
                    {/*link="/documentation/faq"*/}
                    {/*index="faq"*/}
                    {/*childrenLinks={[*/}
                    {/*{*/}
                    {/*header: 'Analytics', link: '/app/main/analytics',*/}
                    {/*}*/}
                    {/*]}*/}
                    {/*/>*/}
                </ul>

                <a className={classnames('d-md-down-none', sd.company)} href="http://flatlogic.com/" target="_blank"
                   rel="noopener noreferrer">
                    <img alt="..." src="https://cdn.dribbble.com/users/883507/avatars/small/7ca04141e335237d393ab41008adb46d.png?1509465697"/>
                    Proudly built and maintained by <br/> Flatlogic
                </a>
            </nav >
        </Col>
    );
}

Sidebar.propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
};

Sidebar.defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
    activeItem: '',
};

function mapStateToProps(store) {
    return {
        sidebarOpened: store.navigation.sidebarOpened,
        sidebarStatic: store.navigation.sidebarStatic,
        activeItem: store.navigation.activeItem
    };
}

export default connect(mapStateToProps)(Sidebar);
