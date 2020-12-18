import {CountryCodeI} from './types';

// we have excluded Canary Islands. They do not have a numeric code following ISO-3166 used by WTO's api. 

const CountryCodes:CountryCodeI = {
    Country : {
        "004":"Afghanistan","008":"Albania","012":"Algeria","016":"American Samoa","020":"Andorra","024":"Angola","660":"Anguilla",
        "010":"Antarctica","028":"Antigua and Barbuda","032":"Argentina","051":"Armenia","533":"Aruba","036":"Australia","040":"Austria",
        "031":"Azerbaijan","044":"Bahamas","048":"Bahrain","050":"Bangladesh","052":"Barbados","112":"Belarus","056":"Belgium",
        "084":"Belize","204":"Benin","060":"Bermuda","064":"Bhutan","068":"Bolivia","535":"Bonaire, Sint Eustatius and Saba",
        "070":"Bosnia and Herzegovina","072":"Botswana","074":"Bouvet Island","076":"Brazil","086":"British Indian Ocean Territory",
        "096":"Brunei Darussalam","100":"Bulgaria","854":"Burkina Faso","108":"Burundi","132":"Cabo Verde","116":"Cambodia","120":"Cameroon",
        "124":"Canada","136":"Cayman Islands","140":"Central African Republic","148":"Chad","152":"Chile","156":"China","162":"Christmas Island",
        "166":"Cocos Islands","170":"Colombia","174":"Comoros","180":"Congo","178":"Congo",
        "184":"Cook Islands","188":"Costa Rica","191":"Croatia","192":"Cuba","531":"Cura\u00e7ao","196":"Cyprus","203":"Czechia","384":"C\u00f4te d'Ivoire",
        "208":"Denmark","262":"Djibouti","212":"Dominica","214":"Dominican Republic","218":"Ecuador","818":"Egypt","222":"El Salvador",
        "226":"Equatorial Guinea","232":"Eritrea","233":"Estonia","748":"Eswatini","231":"Ethiopia","238":"Falkland Islands",
        "234":"Faroe Islands","242":"Fiji","246":"Finland","250":"France","254":"French Guiana","258":"French Polynesia","260":"French Southern Territories",
        "266":"Gabon","270":"Gambia","268":"Georgia","276":"Germany","288":"Ghana","292":"Gibraltar","300":"Greece","304":"Greenland","308":"Grenada",
        "312":"Guadeloupe","316":"Guam","320":"Guatemala","831":"Guernsey","324":"Guinea","624":"Guinea-Bissau","328":"Guyana","332":"Haiti",
        "334":"Heard Island and McDonald Islands","336":"Holy See (the)","340":"Honduras","344":"Hong Kong","348":"Hungary","352":"Iceland",
        "356":"India","360":"Indonesia","364":"Iran","368":"Iraq","372":"Ireland","833":"Isle of Man","376":"Israel",
        "380":"Italy","388":"Jamaica","392":"Japan","832":"Jersey","400":"Jordan","398":"Kazakhstan","404":"Kenya","296":"Kiribati",
        "408":"North Korea","410":"South Korea","414":"Kuwait","417":"Kyrgyzstan","418":"Lao People's Democratic Republic",
        "428":"Latvia","422":"Lebanon","426":"Lesotho","430":"Liberia","434":"Libya","438":"Liechtenstein","440":"Lithuania","442":"Luxembourg",
        "446":"Macao","450":"Madagascar","454":"Malawi","458":"Malaysia","462":"Maldives","466":"Mali","470":"Malta","584":"Marshall Islands",
        "474":"Martinique","478":"Mauritania","480":"Mauritius","175":"Mayotte","484":"Mexico","583":"Micronesia","498":"Moldova",
        "492":"Monaco","496":"Mongolia","499":"Montenegro","500":"Montserrat","504":"Morocco","508":"Mozambique","104":"Myanmar","516":"Namibia","520":"Nauru",
        "524":"Nepal","528":"Netherlands","540":"New Caledonia","554":"New Zealand","558":"Nicaragua","562":"Niger","566":"Nigeria",
        "570":"Niue","574":"Norfolk Island","580":"Northern Mariana Islands","578":"Norway","512":"Oman","586":"Pakistan","585":"Palau",
        "275":"Palestine, State of","591":"Panama","598":"Papua New Guinea","600":"Paraguay","604":"Peru","608":"Philippines","612":"Pitcairn",
        "616":"Poland","620":"Portugal","630":"Puerto Rico","634":"Qatar","807":"Republic of North Macedonia","642":"Romania","643":"Russian Federation",
        "646":"Rwanda","638":"R\u00e9union","652":"Saint Barth\u00e9lemy","654":"Saint Helena, Ascension and Tristan da Cunha","659":"Saint Kitts and Nevis",
        "662":"Saint Lucia","663":"Saint Martin","666":"Saint Pierre and Miquelon","670":"Saint Vincent and the Grenadines","882":"Samoa",
        "674":"San Marino","678":"Sao Tome and Principe","682":"Saudi Arabia","686":"Senegal","688":"Serbia","690":"Seychelles","694":"Sierra Leone",
        "702":"Singapore","534":"Sint Maarten","703":"Slovakia","705":"Slovenia","090":"Solomon Islands","706":"Somalia","710":"South Africa",
        "239":"South Georgia and the South Sandwich Islands","728":"South Sudan","724":"Spain","144":"Sri Lanka","729":"Sudan","740":"Suriname",
        "744":"Svalbard and Jan Mayen","752":"Sweden","756":"Switzerland","760":"Syrian Arab Republic","158":"Taiwan","762":"Tajikistan",
        "834":"Tanzania, United Republic of","764":"Thailand","626":"Timor-Leste","768":"Togo","772":"Tokelau","776":"Tonga","780":"Trinidad and Tobago",
        "788":"Tunisia","792":"Turkey","795":"Turkmenistan","796":"Turks and Caicos Islands","798":"Tuvalu","800":"Uganda","804":"Ukraine",
        "784":"United Arab Emirates","826":"United Kingdom","581":"United States Minor Outlying Islands",
        "840":"United States of America","858":"Uruguay","860":"Uzbekistan","548":"Vanuatu","862":"Venezuela","704":"Viet Nam",
        "092":"Virgin Islands (British)","850":"Virgin Islands (U.S.)","876":"Wallis and Futuna","732":"Western Sahara","887":"Yemen","894":"Zambia",
        "716":"Zimbabwe","248":"\u00c5land Islands","928":"European Union","000":"World","950":"Africa",  "900":"WTO Countries", "985":"G20", 
        "918":"European Union",  "905":"Europe","980":"APEC", "970":"Asia"
    },Alpha2 : {
        "004":"af","008":"al","012":"dz","016":"as","020":"ad","024":"ao","660":"ai","010":"aq","028":"ag","032":"ar","051":"am","533":"aw","036":"au",
        "040":"at","031":"az","044":"bs","048":"bh","050":"bd","052":"bb","112":"by","056":"be","084":"bz","204":"bj","060":"bm","064":"bt","068":"bo",
        "535":"bq","070":"ba","072":"bw","074":"bv","076":"br","086":"io","096":"bn","100":"bg","854":"bf","108":"bi","132":"cv","116":"kh","120":"cm",
        "124":"ca","136":"ky","140":"cf","148":"td","152":"cl","156":"cn","162":"cx","166":"cc","170":"co","174":"km","180":"cd","178":"cg","184":"ck",
        "188":"cr","191":"hr","192":"cu","531":"cw","196":"cy","203":"cz","384":"ci","208":"dk","262":"dj","212":"dm","214":"do","218":"ec","818":"eg",
        "222":"sv","226":"gq","232":"er","233":"ee","748":"sz","231":"et","238":"fk","234":"fo","242":"fj","246":"fi","250":"fr","254":"gf","258":"pf",
        "260":"tf","266":"ga","270":"gm","268":"ge","276":"de","288":"gh","292":"gi","300":"gr","304":"gl","308":"gd","312":"gp","316":"gu","320":"gt",
        "831":"gg","324":"gn","624":"gw","328":"gy","332":"ht","334":"hm","336":"va","340":"hn","344":"hk","348":"hu","352":"is","356":"in","360":"id",
        "364":"ir","368":"iq","372":"ie","833":"im","376":"il","380":"it","388":"jm","392":"jp","832":"je","400":"jo","398":"kz","404":"ke","296":"ki",
        "408":"kp","410":"kr","414":"kw","417":"kg","418":"la","428":"lv","422":"lb","426":"ls","430":"lr","434":"ly","438":"li","440":"lt","442":"lu",
        "446":"mo","450":"mg","454":"mw","458":"my","462":"mv","466":"ml","470":"mt","584":"mh","474":"mq","478":"mr","480":"mu","175":"yt","484":"mx",
        "583":"fm","498":"md","492":"mc","496":"mn","499":"me","500":"ms","504":"ma","508":"mz","104":"mm","516":"na","520":"nr","524":"np","528":"nl",
        "540":"nc","554":"nz","558":"ni","562":"ne","566":"ng","570":"nu","574":"nf","580":"mp","578":"no","512":"om","586":"pk","585":"pw","275":"ps",
        "591":"pa","598":"pg","600":"py","604":"pe","608":"ph","612":"pn","616":"pl","620":"pt","630":"pr","634":"qa","807":"mk","642":"ro","643":"ru",
        "646":"rw","638":"re","652":"bl","654":"sh","659":"kn","662":"lc","663":"mf","666":"pm","670":"vc","882":"ws","674":"sm","678":"st","682":"sa",
        "686":"sn","688":"rs","690":"sc","694":"sl","702":"sg","534":"sx","703":"sk","705":"si","090":"sb","706":"so","710":"za","239":"gs","728":"ss",
        "724":"es","144":"lk","729":"sd","740":"sr","744":"sj","752":"se","756":"ch","760":"sy","158":"tw","762":"tj","834":"tz","764":"th","626":"tl",
        "768":"tg","772":"tk","776":"to","780":"tt","788":"tn","792":"tr","795":"tm","796":"tc","798":"tv","800":"ug","804":"ua","784":"ae","826":"gb",
        "581":"um","840":"us","858":"uy","860":"uz","548":"vu","862":"ve","704":"vn","092":"vg","850":"vi","876":"wf","732":"eh","887":"ye","894":"zm",
        "716":"zw","248":"ax","928":"eu", "000":"un", "950":"AU", "900":"wt","985":"G20", "918":"EU", "905":"Europe","980":"APEC", "970":"Asia"
    }, Alpha3 : {
        "004":"AFG","008":"ALB","012":"DZA","016":"ASM","020":"AND","024":"AGO","660":"AIA","010":"ATA","028":"ATG","032":"ARG","051":"ARM","533":"ABW",
        "036":"AUS","040":"AUT","031":"AZE","044":"BHS","048":"BHR","050":"BGD","052":"BRB","112":"BLR","056":"BEL","084":"BLZ","204":"BEN","060":"BMU",
        "064":"BTN","068":"BOL","535":"BES","070":"BIH","072":"BWA","074":"BVT","076":"BRA","086":"IOT","096":"BRN","100":"BGR","854":"BFA","108":"BDI",
        "132":"CPV","116":"KHM","120":"CMR","124":"CAN","136":"CYM","140":"CAF","148":"TCD","152":"CHL","156":"CHN","162":"CXR","166":"CCK","170":"COL",
        "174":"COM","180":"COD","178":"COG","184":"COK","188":"CRI","191":"HRV","192":"CUB","531":"CUW","196":"CYP","203":"CZE","384":"CIV","208":"DNK",
        "262":"DJI","212":"DMA","214":"DOM","218":"ECU","818":"EGY","222":"SLV","226":"GNQ","232":"ERI","233":"EST","748":"SWZ","231":"ETH","238":"FLK",
        "234":"FRO","242":"FJI","246":"FIN","250":"FRA","254":"GUF","258":"PYF","260":"ATF","266":"GAB","270":"GMB","268":"GEO","276":"DEU","288":"GHA",
        "292":"GIB","300":"GRC","304":"GRL","308":"GRD","312":"GLP","316":"GUM","320":"GTM","831":"GGY","324":"GIN","624":"GNB","328":"GUY","332":"HTI",
        "334":"HMD","336":"VAT","340":"HND","344":"HKG","348":"HUN","352":"ISL","356":"IND","360":"IDN","364":"IRN","368":"IRQ","372":"IRL","833":"IMN",
        "376":"ISR","380":"ITA","388":"JAM","392":"JPN","832":"JEY","400":"JOR","398":"KAZ","404":"KEN","296":"KIR","408":"PRK","410":"KOR","414":"KWT",
        "417":"KGZ","418":"LAO","428":"LVA","422":"LBN","426":"LSO","430":"LBR","434":"LBY","438":"LIE","440":"LTU","442":"LUX","446":"MAC","450":"MDG",
        "454":"MWI","458":"MYS","462":"MDV","466":"MLI","470":"MLT","584":"MHL","474":"MTQ","478":"MRT","480":"MUS","175":"MYT","484":"MEX","583":"FSM",
        "498":"MDA","492":"MCO","496":"MNG","499":"MNE","500":"MSR","504":"MAR","508":"MOZ","104":"MMR","516":"NAM","520":"NRU","524":"NPL","528":"NLD",
        "540":"NCL","554":"NZL","558":"NIC","562":"NER","566":"NGA","570":"NIU","574":"NFK","580":"MNP","578":"NOR","512":"OMN","586":"PAK","585":"PLW",
        "275":"PSE","591":"PAN","598":"PNG","600":"PRY","604":"PER","608":"PHL","612":"PCN","616":"POL","620":"PRT","630":"PRI","634":"QAT","807":"MKD",
        "642":"ROU","643":"RUS","646":"RWA","638":"REU","652":"BLM","654":"SHN","659":"KNA","662":"LCA","663":"MAF","666":"SPM","670":"VCT","882":"WSM",
        "674":"SMR","678":"STP","682":"SAU","686":"SEN","688":"SRB","690":"SYC","694":"SLE","702":"SGP","534":"SXM","703":"SVK","705":"SVN","090":"SLB",
        "706":"SOM","710":"ZAF","239":"SGS","728":"SSD","724":"ESP","144":"LKA","729":"SDN","740":"SUR","744":"SJM","752":"SWE","756":"CHE","760":"SYR",
        "158":"TWN","762":"TJK","834":"TZA","764":"THA","626":"TLS","768":"TGO","772":"TKL","776":"TON","780":"TTO","788":"TUN","792":"TUR","795":"TKM",
        "796":"TCA","798":"TUV","800":"UGA","804":"UKR","784":"ARE","826":"GBR","581":"UMI","840":"USA","858":"URY","860":"UZB","548":"VUT","862":"VEN",
        "704":"VNM","092":"VGB","850":"VIR","876":"WLF","732":"ESH","887":"YEM","894":"ZMB","716":"ZWE","248":"ALA","928":"EUR","000":"WOR", "950":"AFU",
         "900":"WTO" ,"985":"G20", "918":"EUU","980":"APEC", "905":"Europe", "970":"Asia"
    }
}

export type Alpha2ToCC = {
    "af":"004","al":"008","dz":"012","as":"016","ad":"020","ao":"024","ai":"660","aq":"010","ag":"028","ar":"032","am":"051","aw":"533","au":"036","at":"040",
    "az":"031","bs":"044","bh":"048","bd":"050","bb":"052","by":"112","be":"056","bz":"084","bj":"204","bm":"060","bt":"064","bo":"068","bq":
        "535","ba":"070","bw":"072","bv":"074","br":"076","io":"086","bn":"096","bg":"100","bf":"854","bi":"108","cv":"132","kh":"116","cm":"120","ca":
        "124","ky":"136","cf":"140","td":"148","cl":"152","cn":"156","cx":"162","cc":"166","co":"170","km":"174","cd":"180","cg":"178","ck":"184","cr":
        "188","hr":"191","cu":"192","cw":"531","cy":"196","cz":"203","ci":"384","dk":"208","dj":"262","dm":"212","do":"214","ec":"218","eg":"818","sv":
        "222","gq":"226","er":"232","ee":"233","sz":"748","et":"231","fk":"238","fo":"234","fj":"242","fi":"246","fr":"250","gf":"254","pf":"258","tf":
        "260","ga":"266","gm":"270","ge":"268","de":"276","gh":"288","gi":"292","gr":"300","gl":"304","gd":"308","gp":"312","gu":"316","gt":"320","gg":
        "831","gn":"324","gw":"624","gy":"328","ht":"332","hm":"334","va":"336","hn":"340","hk":"344","hu":"348","is":"352","in":"356","id":"360","ir":
        "364","iq":"368","ie":"372","im":"833","il":"376","it":"380","jm":"388","jp":"392","je":"832","jo":"400","kz":"398","ke":"404","ki":"296","kp":
        "408","kr":"410","kw":"414","kg":"417","la":"418","lv":"428","lb":"422","ls":"426","lr":"430","ly":"434","li":"438","lt":"440","lu":"442","mo":
        "446","mg":"450","mw":"454","my":"458","mv":"462","ml":"466","mt":"470","mh":"584","mq":"474","mr":"478","mu":"480","yt":"175","mx":"484","fm":
        "583","md":"498","mc":"492","mn":"496","me":"499","ms":"500","ma":"504","mz":"508","mm":"104","na":"516","nr":"520","np":"524","nl":"528","nc":
        "540","nz":"554","ni":"558","ne":"562","ng":"566","nu":"570","nf":"574","mp":"580","no":"578","om":"512","pk":"586","pw":"585","ps":"275","pa":
        "591","pg":"598","py":"600","pe":"604","ph":"608","pn":"612","pl":"616","pt":"620","pr":"630","qa":"634","mk":"807","ro":"642","ru":"643","rw":
        "646","re":"638","bl":"652","sh":"654","kn":"659","lc":"662","mf":"663","pm":"666","vc":"670","ws":"882","sm":"674","st":"678","sa":"682","sn":
        "686","rs":"688","sc":"690","sl":"694","sg":"702","sx":"534","sk":"703","si":"705","sb":"090","so":"706","za":"710","gs":"239","ss":"728","es":
        "724","lk":"144","sd":"729","sr":"740","sj":"744","se":"752","ch":"756","sy":"760","tw":"158","tj":"762","tz":"834","th":"764","tl":"626","tg":
        "768","tk":"772","to":"776","tt":"780","tn":"788","tr":"792","tm":"795","tc":"796","tv":"798","ug":"800","ua":"804","ae":"784","gb":"826","um":
        "581","us":"840","uy":"858","uz":"860","vu":"548","ve":"862","vn":"704","vg":"092","vi":"850","wf":"876","eh":"732","ye":"887","zm":"894","zw":
        "716","ax":"248","eu":"928","un": "000","AU": "950"
}

export default CountryCodes;
