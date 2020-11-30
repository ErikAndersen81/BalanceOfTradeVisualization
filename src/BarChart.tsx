import React, { useState } from 'react';
import {ChartProps, CountryCodeKey, Record} from './types'; 
import CountryCodes from './CountryCodes';
import getScale from './getScale';
import Popup from './Popup';

export const getFlagUrl = (code:CountryCodeKey) => {
    let country = CountryCodes.Alpha2[(code)];
    let url = "https://flagcdn.com/";
    if (code === "950") return "https://flagpedia.net/data/org/w580/au.webp"
    if (code === "000") return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8JlYgAj4EAjoAAkoQAk4UAjH4Aj4JXq6Jisqjy+vn5/f0Aj4Dv+Pfr9vXH4+BDp5zk8vGJxL2ezsi/39uq1M9Oq6GVysTc7uy329fS6eYwoZV8v7en085wubEenI91vLQ1pJmw2taDwLmPxLxouLChzMdUrqQdBfjMAAAOOElEQVR4nO2deXuisBbG4eQEyqLsOxgptXz/b3gTUCHR1nbuXHHuk99f1XHh9SRnS8gYhkaj0Wg0Go1Go9FoNBqNRqPRaDQajUaj0Wg0Go1Go9FoNBqNRqPRaDQajWYTPLcMqiz5iOPiM6uCvbf1Bf1VyqrNmU8IgI0cG4AQ2p+SeusL+ytEmUOJjdRUoch15km59QX+d+yTxge8EbeSCYQV0daX+cekI4JNWfidRI4Nebr1pf4RHSMI5vFUGt8LFJYkrNv6cn9NZwKSJvN2kBmJ/VCjCea/pbHi+qw84H+1zIi6xwIRKJj/zliNcoIkn0MBZoYDD/VZcWUiJeM/4nMKROiD+W8X00fTkMeRlv8auxF5sEy2vfQfsQuB+gU3pDs9LM3wNhRKnMCMRYLj7ROfm97d9vIfk/KUpSmNilqWWWXHdngUK6h7RMjnHK5sAGmwsYIHFISSmF+qb2JR1SfAR/ooBB5QDC/v5x642FTBAxyewHAbVJOwmD2YgVygk9u0ihjA6fwJZQ/26dvv2BIvBBhdY+8QPDTcQz4UaEJqOEgC4wjI9udPOcBl0L4cXo9WMQ00GlbWY3mTDVuHmhgZfDznl8+JCfYvKdFtECvuarg2bpWg/5lEUXRQ5hqhVV0/qSDYvKBL9Ro0Q14KJZZJQ+P4I30XhKMp4uWzHIrN61lRRAVK+mz33lhBR36l0ITD8kHRB/+tFu/6MjhAuetEkZecUp7W/E6hSc7JjNuFvFwG6iA42wpSiQnJmElPIxUyhSf9FRQtkXanjpDnv/Ep2RESP/zWJ1JxgTzYW8Gcov3Wgli0SNOB8gSBhN3sZA42qR586xOJKI/Y3sFJDr/VdjZh+IEmH9+ExUvbhiG+TqnRIDOMoM1/bbyrRORZED1IKWkJ2GwlSCUGv+ZFxJ1+2s8ZCgBlVHYEXmQq1tZ0JfGfGhAIIk/ZHEQlzI9ovUZHdRqjhvenFmyCsrDeDWPPfbD8wTsT+00UKSRAgmJIE+A+0f4DmU1ecMcpsiFCFJNlxH+Bon9PcfQQwTaRnZKe/n6soukZsYjvzY3JeKK0fYJ6QLIvRK9pitCB1T6uClXIWUVNiNJSLIl9fLYgFe7Tj4YYmzhOj48s+bUVsT1/mINUMdkRYeugKDxgx01IL7GL8nrv11npuXERgRofdlR1P88msnAwEjEw6zKoPovhnZl4eLcA4Tej9WKoA/qKEWOw9rdf+0RaEco8kY2K1UGw0pJnmJ5RVmVVjz93rHhuzURg3xhRfea5uMBNWJpXKeh6fMT2mfi34mGre4V1LniPN2E/Fr/YdoggGJorWzGRe1NokqP5g+WYhUsk3APIzUQ3A8g2UHahoUjlsTg7GbpyNpSXfPBowJJLTXFCtpgs6kYTRFNkM2qCXf/VRZ9FYZt+ZO8h+d6/XkapEfjnstBLj42Y2sDohgFjQJp/ZZ0+bM4K64Ff4b71v6k96JLMmKKtWCa5z+URcLLI8GG7LjgzzS+vGqp0djUIaBasMKKjZG7pjWRZOhzQPJrAow1phrlePNmb1Yn1t94SoqVbw80n3hAvfWLas2Xc4hQQqq5OTuI9vNg38+46NCvYrNgvvnWXtFnHfJjekV2eEolae/ZKYW1WdRrnaBOwufVM2qbrkLHHzbxp/8BDSm625ET7i9mxdt09u74MeL7A9RK/b7PYhp3yPfZGnUX3QUinb28rB0omrm8hlnXtGiN/noUN0ilkuBSUorAAuoU+7tgfKLSry0DkpaOQIRK72aw8QnKzEXOqJrm3FfPMNdPZVKM9Kl9EYJudUw8b2+y8zwRp5bm7XVQHaTU1VNHJ3tOgLs1Q/ASX4qne9dPwzGyQv2i39rXPxHmk0I4d0QIn+V5500VBGIiIQq/ramwSEhFf6Wb0GzXdHpdHPEgAOFIXdFJoXR9GZsN/hHNCU1pzfsbUiXjYaBHjJ+tLqO50UhQaZs1/hbPCLjxMf51AWefOgP0PdXxJ9KMVtKbv2dpNOJj3sEqlwzoDMo/iOgnqyXgdKEkMdzX/azX3qH+2RkiptQ7fju2k/Wm13usYUxMxfY8sAmQasAFBuSSMyCaF/qNgcR2o0hxybO5X3pb4FlgnCtzB8GifHJFaYtLuCZGjg+urvucppD+t4aWi3RGLu+GluVY4ZYM8SeeltIgZ5vkfLJCjg2eTLfYRVWD2PxEYfhbJlS6kLEmKovgQxCMgDyj01PC4aY/dePjkTw4t0nEYhvjjTPGBsEVAzHj1PfO9QgoXbHvKaWx7WgwX0LmKmj+C2nR60haNEFu8+Iqprks9S6HwlH3fsGkF/378t2cdjDX8tc1UT+EKe9XtmEtJ8drpDWvMTaoLrlB6vL8nEDqldfbGHY/nXV2lG0+zGW0w3cZudwN754lND638LraJwoooUeteFncTqd/wTXrsCeuFh6T4TC3LMyqLO56mwVZ50SYKU1Vhe6vwtk2mKjQyXmFMtUQWYmp4OZlS80F6jbfNPEwJk+Py8EcKRaCYkrSo3Isi6n3K1hWF2/jSgCjN6I8/U2gAjuuMJeaRQ1mOcf1N4mFJiNxt+LzTtnk4DzkhBcvqL7cHlSPl6SBKiqKb1eGn4FnK12Z3kpyb9sMdhSZ81kUIFhvmz3MDxPa0NmtAyCbdNgrv0uPqjkJLfdMdhf70OW6QfMxm/IxAmXYVkL954T+mV9a97hUbN7/9HYXk2qPIQtHd/myokmh/2pvUh7zyljtGO/+OQnX+3Cp0LV/YrqyN1KJWPMUPZZ30pHzTsyiUytu7nYXmjZe/VVj7wmOVvTX2dCq1RIdL9tIhDMYW8EJVqks9tXEDJ7SXSC3abWUdYl+lQR3tdq47y0iBR50dD/Tztsa+bqgSZFxTmfHPYg9KlFLujsHEoDjUVVa0p7e8Zyb6RGQsU6tUrESxJsxHh9dTkbdkfFT4Kzlbqrfql/J8WF72Osohvxne+LAjAEslIaonSs6IG4NtEJWHT5QKTN5ayrOep+paaEEeTYozpbYwBzeY5Zusfzsch6JLc8z3+30UlXUdpNy6zt2eJJWMONq5sQ2VmrcplxmeGhPfg3Kd+jigeJpb/zQZceWhvJuFjKexp/56IpaF7Gci4RbVcHGjMLjfsmuyqxcLYKtpKLz4JUOOqgMj0s5EFHO09tWf/0bhV7fQ2pAnc7pwwG3ivaCbsikvaJnFfQYh6z1Cc0WHqMRqx1YUjl80emxEnqrGfAj4uE00FOwRnY9eOEsgTZt6xkriPJMcVIpIVaHH8ODckYhdyweF6G6MuEmz9Mzb1B0j5nhedV96qOd9lNzK8hxSFYosW/SWbwxpiB0ZIfJoQrfc0J5yN8GG4JpFXtOa1W5DeSKqCjMALyUUQvle08v2k33l0A03mxhi94vcM4pRtATBui45MZRjmarQ4Ul12YiFw85aabSunacYyaabEwtbbtpHgENWZMtzBchb8RSFPNZdtaSnyxhH+5qH8qm+7S2lHrHlMfSm5B+lUs0qClMpex/myAGrvk2M1sannwwgGzFQWyqNbANF4UFK/Ob8Zr1Y5Zq4VcZ2YY+KEXslAsbyvgNFIYC0SNyBmMYrqyb2Jj0oiRhANqLly7cvEambKytMibzvMAWM31cf595kDBvgmYoryJUbsnppnMkKHVuqTlzRKa1WJhy336pviLaKPJAilENgsgr6nveGb8vCjKtEy4PIH6ylv1WRjdoXCqFitFiaSWIvuBNUyXAaw4bNqctc3B/aN4T1iA4InmJrNSIYZS9xw3NpKRt6VlHeDQpHrAva9rnIp9f1w7m8J8wpLjkR1+8a3aKpAOtFjqwpwJeuJJ1uyPLK7sgsnj2LVIUQQpv80CYhbdrj4eA4Yx7yFG/ab0ksduhqrwW5eVGDvfHdJAu9ckPriDiEYqOv2DLKHD7Y6vJsmrWnEc9n7djQaT83T76l0OcytS7ZkIhKFxOIDhQvqChzknTnCYdxnW4rhdwFzaZ3g2Ru19AmWWYwrys2D4ULlX+NW+XAfLGoz7r6erXhUqWvFJrSqQIj5bMVAZzzgD/BK9x7uBATW/j1qGgsm9eLwxHWByLVS+qyKOxgXdlmQOI9f7eoNsUN3QOB43Mu/ac4QLr3ngC/wOmW7IFYq3zsYNObeShlCiWZT6UpY3HKGwlb2DwfvSHkM4/Lc9KzlMPaM+7oJaBcFSbrHfh7c0lu6pYhxRc8+sNrkObrPfb5OpwncE6/LgpdcxVE3QbZOrk9ofz4RRDeXXJ+DHF5zM777S8KB1j2H/IfB9ZZUAXIlO36r4Hb2NY6ueG13dLKTf05ez0rXPmeSeC6yk2slzyARyDOiQpXxhDHLFznWm5PzaV5/dBjS/zYNXJ2eiIQvtwcvOLwXHOVwNU8Ll4klgjFxyg2tjVjMaJ9eVnEpM0yUQPkdc/6MkRcpGTVfathkdiYeL57TRwOdSlHuJ3X6XUH6L/0eW3TmXvQLLOqpOc7YSImLy7ifHxg4NPVMtM+J2i+UKp2n30PlCz5zL6xReFR3dxFOg3nzqK4DinoO687BRcKnl6GV0t4OZAivreERoaY4LKRP23ANrdZr/81ZUjQH68avzw9kRdX4SXupT1BcnjJKHiXd3o5g1Zw/Or2oeuSwKSvf/kZKFFwjYRl06y6s/F0Zt5E4oozlUn/Ig2Ln+MVJoizoGvP+PpWU2rsKocXhSR/8VNL7+NlPYhisfnmHm7RwSDm8d89mL0cTPLtmew2gbH6FwLEN9QfvUXw/rn6FmvTf1zejBcUToPyf42AzInTbc9l+dt40fm/t/gQ/71F9H9hOo1Go9FoNBqNRqPRaDQajUaj0Wg0Go1Go9FoNBqNRqPRaDQajUaj0Wg0mn+S/wBd58HTovNXHwAAAABJRU5ErkJggg=="
    url += "32x24/" + country + ".png"; 
    return url;
}

const BarChart = (props:ChartProps) => {
    const [active, setActive] = useState<number>(-1);
    let records = props.records.filter((record:Record) => record.PartnerEconomyCode !== "000" && record.PartnerEconomyCode !== "928")
    let scale = getScale(records.map( val => val.Value));
    let maxX:number = records.length;
    let scalarX = 100/maxX;
    let scalarY = 100/(scale[1]+scale[scale.length-1]);
    const bars = records.map((record,idx) => (
        <g key={"bar" + idx}>
        <rect width={1 * scalarX}
            strokeWidth="1"
            stroke="hsl(0,25%,25%)" 
            height={record.Value * scalarY} 
            y={100 - record.Value * scalarY} 
            x={idx * scalarX} 
            fill="hsl(0,50%,50%)"
            onMouseEnter={() => setActive(idx)} 
            onMouseLeave={() => setActive(-1)} 
            />
            <Popup active={active === idx} record={record}/>
        <image href={getFlagUrl(record.PartnerEconomyCode)} 
            width={scalarX*0.75} 
            x={(0.125+idx)*scalarX}
            y="101"
            onMouseEnter={() => setActive(idx)} 
            onMouseLeave={() => setActive(-1)}
            />
        </g>
        )
    );

    return (
        <>
            <div className="Chart">
                <svg viewBox="-15 -10 120 125"
                    preserveAspectRatio="none"
                    height="100%"
                    width="100%">
                    <g id={props.title} key={props.title}>
                    <text strokeWidth="0"
                            fontSize="6"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="text-after-edge"
                            x="50"
                            y="0">{props.title}</text>
                        <text strokeWidth="0"
                            fontSize="4"
                            textAnchor="middle"
                            dominantBaseline="text-after-edge"
                            x="-2"
                            y="0">{props.yLabel?props.yLabel : null}</text>
                        {bars}
                        <YAxis yValues={records.map( val => val.Value)} scalarY={scalarY} scale={scale}/>
                    </g>
                </svg>
            </div>
        </>
    )
  };


type yAxisProps = {
    yValues:Array<number>
    scalarY:number
    scale:Array<number>
}

const YAxis = (props:yAxisProps) => {
    let scale = props.scale
    let top = scale[scale.length-1] + scale[1];
    let yTicks = scale.map( (val,idx) => (
        <text key={"yTick"+idx} 
            x={-4.5} 
            y={(top - val)*props.scalarY} 
            dominantBaseline="middle" 
            textAnchor="end" 
            fontSize="3">{val}
        </text>
        )
    );
    let marks = scale.map( (val,idx) => {
        let offset = (top - val)*props.scalarY; 
        return "M-2," + offset + " L-4,"+ offset}
        ).reduce((a,b) => a+b)
    return (
        <g>
            <path d="M -2,100 L -2,0 M -3,3 L -2,0 M -1,3 L -2,0" 
                stroke="black" 
                fillOpacity="0" 
                strokeWidth=".5" 
                strokeLinecap="round"/>
            <path d={marks}
                stroke="black" 
                fillOpacity="0" 
                strokeWidth=".5" 
                strokeLinecap="round"/>
            {yTicks}
        </g>
    )
} 




export default BarChart