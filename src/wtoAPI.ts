/* Following constants were extracted from WTO's api to infer their types  */

export type Period =  {
    "code": "A"|"S1" | "S2" | "Q1" | "Q2" | "Q3" | "Q4" | "M" | "M01" | "M02" | "M03" | "M04" | "M05" | "M06" | "M07" | "M08" | "M09" | "M10" | "M11" | "M12"
    "name":string
    "description":null
    "frequencyCode": "A" | "S" | "Q" | "M"
    "displayOrder":1|2|3|4|5|6|7|101 | 102| 103 | 104 | 105| 106| 107| 108 |109| 110| 111 | 112
}


export const periods:Array<Period> = [
    {"code":"A","name":"Annual","description":null,"frequencyCode":"A","displayOrder":1},
    {"code":"S1","name":"First Half","description":null,"frequencyCode":"S","displayOrder":2},
    {"code":"S2","name":"Second Half","description":null,"frequencyCode":"S","displayOrder":3},
    {"code":"Q1","name":"First Quarter","description":null,"frequencyCode":"Q","displayOrder":4},
    {"code":"Q2","name":"Second Quarter","description":null,"frequencyCode":"Q","displayOrder":5},
    {"code":"Q3","name":"Third Quarter","description":null,"frequencyCode":"Q","displayOrder":6},
    {"code":"Q4","name":"Fourth Quarter","description":null,"frequencyCode":"Q","displayOrder":7},
    {"code":"M01","name":"January","description":null,"frequencyCode":"M","displayOrder":101},
    {"code":"M02","name":"February","description":null,"frequencyCode":"M","displayOrder":102},
    {"code":"M03","name":"March","description":null,"frequencyCode":"M","displayOrder":103},
    {"code":"M04","name":"April","description":null,"frequencyCode":"M","displayOrder":104},
    {"code":"M05","name":"May","description":null,"frequencyCode":"M","displayOrder":105},
    {"code":"M06","name":"June","description":null,"frequencyCode":"M","displayOrder":106},
    {"code":"M07","name":"July","description":null,"frequencyCode":"M","displayOrder":107},
    {"code":"M08","name":"August","description":null,"frequencyCode":"M","displayOrder":108},
    {"code":"M09","name":"September","description":null,"frequencyCode":"M","displayOrder":109},
    {"code":"M10","name":"October","description":null,"frequencyCode":"M","displayOrder":110},
    {"code":"M11","name":"November","description":null,"frequencyCode":"M","displayOrder":111},
    {"code":"M12","name":"December","description":null,"frequencyCode":"M","displayOrder":112}]

  
export const DKProducts =[
  {ProductOrSectorCode:'AG', ProductOrSector:'Agricultural products'},
  {ProductOrSectorCode:'AGFO', ProductOrSector:'Food'},
  {ProductOrSectorCode:'MA', ProductOrSector:'Manufactures'},
  {ProductOrSectorCode:'MACH', ProductOrSector:'Chemicals'},
  {ProductOrSectorCode:'MACHPH', ProductOrSector:'Pharmaceuticals'},
  {ProductOrSectorCode:'MACL', ProductOrSector:'Clothing'},
  {ProductOrSectorCode:'MAIS', ProductOrSector:'Iron and steel'},
  {ProductOrSectorCode:'MAMT', ProductOrSector:'Machinery and transport equipment'},
  {ProductOrSectorCode:'MAMTAU', ProductOrSector:'Automotive products'},
  {ProductOrSectorCode:'MAMTOF', ProductOrSector:'Office and telecom equipment'},
  {ProductOrSectorCode:'MAMTOTEP', ProductOrSector:'Electronic data processing and office equipment'},
  {ProductOrSectorCode:'MAMTOTIC', ProductOrSector:'Integrated circuits and electronic components'},
  {ProductOrSectorCode:'MAMTOTTL', ProductOrSector:'Telecommunications equipment'},
  {ProductOrSectorCode:'MAMTTE', ProductOrSector:'Transport equipment'},
  {ProductOrSectorCode:'MATE', ProductOrSector:'Textiles'},
  {ProductOrSectorCode:'MI', ProductOrSector:'Fuels and mining products'},
  {ProductOrSectorCode:'MIFU', ProductOrSector:'Fuels'},
  {ProductOrSectorCode:'TO', ProductOrSector:'Total merchandise'}
];

export const productName = {
  'AG':'Agricultural products',
  'AGFO':'Food',
  'MA':'Manufactures',
  'MACH':'Chemicals',
  'MACHPH':'Pharmaceuticals',
  'MACL':'Clothing',
  'MAIS':'Iron and steel',
  'MAMT':'Machinery and transport equipment',
  'MAMTAU':'Automotive products',
  'MAMTOF':'Office and telecom equipment',
  'MAMTOTEP':'Electronic data processing and office equipment',
  'MAMTOTIC':'Integrated circuits and electronic components',
  'MAMTOTTL':'Telecommunications equipment',
  'MAMTTE':'Transport equipment',
  'MATE':'Textiles',
  'MI':'Fuels and mining products',
  'MIFU':'Fuels',
  'TO':'Total merchandise'
}