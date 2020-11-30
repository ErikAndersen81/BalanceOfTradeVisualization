export type Record = {
    Value:number
    PeriodeCode:periodeCode
    PartnerEconomyCode:CountryCodeKey
    PartnerEconomy:string
    ReportingEconomy:string
    ReportingEconomyCode:CountryCodeKey
    ProductOrSector:string
    Unit:string
    Year:Year
}

export type DoubleRecord = {
    importValue:number
    exportValue:number
    PeriodeCode:periodeCode
    PartnerEconomyCode:CountryCodeKey
    PartnerEconomy:string
    ReportingEconomy:string
    ReportingEconomyCode:CountryCodeKey
    ProductOrSector:string
    Unit:string
    Year?:Year
    Month?:number
}


type periodeCode = "A" | "M" ;

export type ChartProps = {
    title?:string
    xLabel?:string 
    yLabel?:string 
    records:Array<Record>
}


export type indicatorCode = "ITS_CS_AX6" | "ITS_CS_AM6";
export type Year = 
    1920|1921|1922|1923|1924|1925|1926|1927|1928|1929|1930|1931|1932|1933|1934|1935|1936|1937|1938|1939|1940|
    1941|1942|1943|1944|1945|1946|1947|1948|1949|1950|1951|1952|1953|1954|1955|1956|1957|1958|1959|1960|
    1961|1962|1963|1964|1965|1966|1967|1968|1969|1970|1971|1972|1973|1974|1975|1976|1977|1978|1979|1980|
    1981|1982|1983|1984|1985|1986|1987|1988|1989|1990|1991|1992|1993|1994|1995|1996|1997|1998|1999| 2000|
    2001|2002|2003|2004|2005|2006|2007|2008|2009|2010|2011|2012|2013|2014|2015|2016|2017|2018|2019|2020;



export type CountryCodeKey ="004"|"008"|"012"|"016"|"020"|"024"|"660"|"010"|"028"|"032"|"051"|"533"|"036"|"040"|"031"|"044"|"048"|"050"|"052"|"112"|"056"|"084"|"204"|"060"|"064"|
                            "068"|"535"|"070"|"072"|"074"|"076"|"086"|"096"|"100"|"854"|"108"|"132"|"116"|"120"|"124"|"136"|"140"|"148"|"152"|"156"|"162"|"166"|"170"|"174"|"180"|
                            "178"|"184"|"188"|"191"|"192"|"531"|"196"|"203"|"384"|"208"|"262"|"212"|"214"|"218"|"818"|"222"|"226"|"232"|"233"|"748"|"231"|"238"|"234"|"242"|"246"|
                            "250"|"254"|"258"|"260"|"266"|"270"|"268"|"276"|"288"|"292"|"300"|"304"|"308"|"312"|"316"|"320"|"831"|"324"|"624"|"328"|"332"|"334"|"336"|"340"|"344"|
                            "348"|"352"|"356"|"360"|"364"|"368"|"372"|"833"|"376"|"380"|"388"|"392"|"832"|"400"|"398"|"404"|"296"|"408"|"410"|"414"|"417"|"418"|"428"|"422"|"426"|
                            "430"|"434"|"438"|"440"|"442"|"446"|"450"|"454"|"458"|"462"|"466"|"470"|"584"|"474"|"478"|"480"|"175"|"484"|"583"|"498"|"492"|"496"|"499"|"500"|"504"|
                            "508"|"104"|"516"|"520"|"524"|"528"|"540"|"554"|"558"|"562"|"566"|"570"|"574"|"580"|"578"|"512"|"586"|"585"|"275"|"591"|"598"|"600"|"604"|"608"|"612"|
                            "616"|"620"|"630"|"634"|"807"|"642"|"643"|"646"|"638"|"652"|"654"|"659"|"662"|"663"|"666"|"670"|"882"|"674"|"678"|"682"|"686"|"688"|"690"|"694"|"702"|
                            "534"|"703"|"705"|"090"|"706"|"710"|"239"|"728"|"724"|"144"|"729"|"740"|"744"|"752"|"756"|"760"|"158"|"762"|"834"|"764"|"626"|"768"|"772"|"776"|"780"|
                            "788"|"792"|"795"|"796"|"798"|"800"|"804"|"784"|"826"|"581"|"840"|"858"|"860"|"548"|"862"|"704"|"092"|"850"|"876"|"732"|"887"|"894"|"716"|"248"|"928"|
                            "000"|"950"|"900"|"985"|"918" | "905"|"980"|"970";
    
export type CountryCodeSubField = {"004":string;"008":string;"012":string;"016":string;"020":string;"024":string;"660":string;
                        "010":string;"028":string;"032":string;"051":string;"533":string;"036":string;"040":string;
                        "031":string;"044":string;"048":string;"050":string;"052":string;"112":string;"056":string;
                        "084":string;"204":string;"060":string;"064":string;
                        "068":string;"535":string;"070":string;"072":string;"074":string;"076":string;"086":string;
                        "096":string;"100":string;"854":string;"108":string;"132":string;"116":string;"120":string;
                        "124":string;"136":string;"140":string;"148":string;"152":string;"156":string;"162":string;
                        "166":string;"170":string;"174":string;"180":string;
                        "178":string;"184":string;"188":string;"191":string;"192":string;"531":string;"196":string;
                        "203":string;"384":string;"208":string;"262":string;"212":string;"214":string;"218":string;
                        "818":string;"222":string;"226":string;"232":string;"233":string;"748":string;"231":string;
                        "238":string;"234":string;"242":string;"246":string;
                        "250":string;"254":string;"258":string;"260":string;"266":string;"270":string;"268":string;
                        "276":string;"288":string;"292":string;"300":string;"304":string;"308":string;"312":string;
                        "316":string;"320":string;"831":string;"324":string;"624":string;"328":string;"332":string;
                        "334":string;"336":string;"340":string;"344":string;
                        "348":string;"352":string;"356":string;"360":string;"364":string;"368":string;"372":string;
                        "833":string;"376":string;"380":string;"388":string;"392":string;"832":string;"400":string;
                        "398":string;"404":string;"296":string;"408":string;"410":string;"414":string;"417":string;
                        "418":string;"428":string;"422":string;"426":string;
                        "430":string;"434":string;"438":string;"440":string;"442":string;"446":string;"450":string;
                        "454":string;"458":string;"462":string;"466":string;"470":string;"584":string;"474":string;
                        "478":string;"480":string;"175":string;"484":string;"583":string;"498":string;"492":string;
                        "496":string;"499":string;"500":string;"504":string;
                        "508":string;"104":string;"516":string;"520":string;"524":string;"528":string;"540":string;
                        "554":string;"558":string;"562":string;"566":string;"570":string;"574":string;"580":string;
                        "578":string;"512":string;"586":string;"585":string;"275":string;"591":string;"598":string;
                        "600":string;"604":string;"608":string;"612":string;
                        "616":string;"620":string;"630":string;"634":string;"807":string;"642":string;"643":string;
                        "646":string;"638":string;"652":string;"654":string;"659":string;"662":string;"663":string;
                        "666":string;"670":string;"882":string;"674":string;"678":string;"682":string;"686":string;
                        "688":string;"690":string;"694":string;"702":string;
                        "534":string;"703":string;"705":string;"090":string;"706":string;"710":string;"239":string;
                        "728":string;"724":string;"144":string;"729":string;"740":string;"744":string;"752":string;
                        "756":string;"760":string;"158":string;"762":string;"834":string;"764":string;"626":string;
                        "768":string;"772":string;"776":string;"780":string;
                        "788":string;"792":string;"795":string;"796":string;"798":string;"800":string;"804":string;
                        "784":string;"826":string;"581":string;"840":string;"858":string;"860":string;"548":string;
                        "862":string;"704":string;"092":string;"850":string;"876":string;"732":string;"887":string;
                        "894":string;"716":string;"248":string;"928":string;"000":string;"950":string;"900":string;
                        "985":string;"918":string; "905":string;"980":string;"970":string;
}

export type CountryCodeI = {
    Country: CountryCodeSubField;
    Alpha2: CountryCodeSubField;
    Alpha3: CountryCodeSubField;
}

