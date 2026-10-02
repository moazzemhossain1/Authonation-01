import React, { Suspense } from 'react';
import Respwoser from '../forgot-pawosurs/Respwoser';

const Rsectepasword = () => {
    return (
        <div>
            <h3>Rese pasword</h3>
            <Suspense fallback={"loding..."}>
                <Respwoser></Respwoser>

            </Suspense>
            
        </div>
    );
};

export default Rsectepasword;