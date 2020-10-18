import React from 'react';

class Footer extends React.Component {
    render() {
        return(
            <div className="container navbar-fixed-bottom">
                <p className="float-right">
                    <a href="#">Back to top</a>
                </p>
                <p>Album example is © Bootstrap, but please download and customize it for yourself!</p>
                <p>New to Bootstrap? 
                    <a href="https://getbootstrap.com/"> Visit the homepage</a> or read our 
                    <a href="/docs/4.5/getting-started/introduction/"> getting started guide</a>.
                </p>
            </div>
        );
    }
}

export default Footer;