import React from "react";
import classes from './RevProgressbar.module.css';

function RevProgressBar(props) {

    // defaulted to 30s
    const animationDuration = props.animationDuration ? props.animationDuration : '30s';

    return (
        <div className={classes.outer}>
            <div className={classes.inner} style={{ animationPlayState: 'running', animationDuration: animationDuration }}>

            </div>
        </div>
    )
}

export default RevProgressBar;