import React from 'react';

import LeftBar from './LeftBar';
import Middle from './Middle';
import Right from './Right';




export default function Main() {
    return (
        <div className="flex flex-col md:flex-row">
        
            <Middle />
            <Right />
        </div>
    );
}
