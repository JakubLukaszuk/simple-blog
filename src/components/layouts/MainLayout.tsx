import React, { ReactNode } from 'react';


interface IMainLayoutProps {
    children: ReactNode
}

const MainLayout: React.FC<IMainLayoutProps> = (props) => {
    const { children } = props;

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default MainLayout