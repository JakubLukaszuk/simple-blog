import React, { ReactNode, useEffect,  } from 'react';


interface IMainLayoutProps {
    children: ReactNode
}

const MainLatout: React.FC<IMainLayoutProps> = (props) => {
    const { children } = props;

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default MainLatout