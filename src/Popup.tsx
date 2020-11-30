import React from 'react';
import {Record} from './types';
import CountryCodes from './CountryCodes';

type PopupProps = {
    active:boolean
    record:Record
}

const Popup = (props:PopupProps) => {
    if (!props.active) return null
    let country = CountryCodes.Country[props.record.PartnerEconomyCode];
    return (
        <svg viewBox="0 0 100 20" style={{strokeLinejoin: "miter", stroke:"#000", fill: "black"}}>
            <rect strokeWidth="1" stroke="black" x="0" y="0" width="100" height="20" fill="hsv(14,10%,10%)" fillOpacity=".2"/>
            <text x={50} y={2} textLength={95} fontSize="1em"  textAnchor="middle" dominantBaseline="text-before-edge">{country}</text> 
            <text x={5} y={40} fontSize="3" textAnchor="right" dominantBaseline="text-before-edge">Mio. ${props.record.Value}</text>
        </svg>
    )
}

export default Popup;