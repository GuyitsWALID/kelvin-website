import React from 'react'

const screws = (points) => points.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="3.2" fill="#122c43" stroke="#93bbd1" strokeWidth="1"/><path d={`M${x-1.5} ${y}h3`} stroke="#9dcce1" strokeWidth=".7"/></g>)
const vents = (x, y, count) => Array.from({ length: count }, (_, i) => <path key={i} d={`M${x+i*9} ${y}v8`} stroke="#85a8b9" strokeWidth="2" strokeLinecap="round"/>)

function Laundry() {
  return <svg className="range-figure" viewBox="0 0 520 385" role="img" aria-label="Isometric commercial washing machine with a slowly turning drum and tumbling textiles">
    <defs><linearGradient id="laundry-body" x2="1" y2="1"><stop stopColor="#f4fbff"/><stop offset=".55" stopColor="#b4cad9"/><stop offset="1" stopColor="#6c8fa6"/></linearGradient><linearGradient id="laundry-glass" x2="1" y2="1"><stop stopColor="#285a76" stopOpacity=".9"/><stop offset="1" stopColor="#041724"/></linearGradient><clipPath id="laundry-drum"><circle cx="288" cy="188" r="83"/></clipPath></defs>
    <ellipse cx="277" cy="344" rx="167" ry="19" fill="#00a5fa" opacity=".13"/>
    <path d="M136 60 202 34 423 67 362 91Z" fill="#e4f3fa" stroke="#b6d1df" strokeWidth="2"/><path d="M362 91 423 67 423 307 362 336Z" fill="#537b93" stroke="#a7c7d6" strokeWidth="2"/><path d="M136 60 362 91 362 336 136 306Z" fill="url(#laundry-body)" stroke="#d6edf7" strokeWidth="2"/>
    <path d="M148 75 349 102v49l-201-26Z" fill="#17334a" stroke="#8ab5ca" strokeWidth="2"/><path d="M148 126 349 153" stroke="#d7eafa" strokeWidth="2"/>
    <rect x="164" y="87" width="54" height="23" rx="3" fill="#0b2539" stroke="#6f9cb1"/><path d="M170 97h34" stroke="#19baff" strokeWidth="3"/><circle cx="320" cy="125" r="12" fill="#aac7d8" stroke="#f3fbff" strokeWidth="3"/><circle cx="320" cy="125" r="4" fill="#13527a"/>
    <g className="laundry-drum"><circle cx="288" cy="188" r="93" fill="#d7ebf3" stroke="#3c6078" strokeWidth="7"/><circle cx="288" cy="188" r="83" fill="url(#laundry-glass)" stroke="#e6f5fb" strokeWidth="4"/>
      <g clipPath="url(#laundry-drum)"><g className="laundry-tumble"><path d="M223 164q22-32 55-8l21 23q-13 18-39 19-40-7-37-34Z" fill="#e8f2f6"/><path d="M281 210q18-31 49-25l24 23q-11 29-41 32-25-4-32-30Z" fill="#82c5df"/><path d="M225 217q18-20 47-11l5 29q-22 21-48 8Z" fill="#a9d0dd"/>{Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return <circle key={i} cx={288+72*Math.cos(a)} cy={188+72*Math.sin(a)} r="2.2" fill="#8cbfd1"/>})}</g><path className="laundry-water" d="M203 241q50-18 88 0t84 0v50H203Z" fill="#19a9ec" opacity=".38"/></g><circle cx="288" cy="188" r="66" fill="none" stroke="#8cc7e1" strokeWidth="2" opacity=".4"/><path d="M215 143q30-43 77-40" fill="none" stroke="#fff" strokeWidth="5" opacity=".37" strokeLinecap="round"/></g>
    <path d="M148 283 350 310" stroke="#85a8ba"/><path d="M150 292 350 319" stroke="#eaf7fb" opacity=".7"/>{vents(166,290,7)}
    <path d="M154 304v23l20 3v-20M331 327v24l16-3v-19" fill="#17364d" stroke="#9ebfd0"/>{screws([[147,68],[351,97],[147,297],[351,325],[378,93],[409,77],[407,294],[376,317]])}
  </svg>
}

function Kitchen() {
  return <svg className="range-figure" viewBox="0 0 520 385" role="img" aria-label="Isometric commercial dishwasher with a turning wash arm inside its chamber">
    <defs><linearGradient id="kitchen-steel" x2="1" y2="1"><stop stopColor="#f5fbfd"/><stop offset=".48" stopColor="#a4bccb"/><stop offset="1" stopColor="#5d7d92"/></linearGradient><clipPath id="kitchen-bay"><path d="M172 117 359 138v138l-187-22Z"/></clipPath></defs>
    <ellipse cx="269" cy="344" rx="171" ry="20" fill="#0aa8f0" opacity=".14"/>
    <path d="M133 62 205 39 423 66 356 91Z" fill="#dceaf1" stroke="#c3d8e2" strokeWidth="2"/><path d="M356 91 423 66v239l-67 31Z" fill="#52758b" stroke="#9dbbcc" strokeWidth="2"/><path d="M133 62 356 91v245l-223-29Z" fill="url(#kitchen-steel)" stroke="#dceef5" strokeWidth="2"/>
    <path d="M156 102 372 128v160l-216-26Z" fill="#15364a" stroke="#d9eef4" strokeWidth="5"/><path d="M172 117 359 138v138l-187-22Z" fill="#092434" stroke="#6e9caf" strokeWidth="2"/>
    <g clipPath="url(#kitchen-bay)"><path d="M185 148 345 167M185 239l160 19" stroke="#7cb2ca" strokeWidth="3"/>{Array.from({length:9},(_,i)=><path key={i} d={`M${191+i*17} 165v71`} stroke="#456f84" strokeWidth="1"/>)}
      <g className="kitchen-rack"><path d="M191 225 343 243 327 256 176 237Z" fill="#9fb9c7" stroke="#dcf2f7" strokeWidth="2"/>{[0,1,2,3].map(i=><g key={i}><ellipse cx={214+i*31} cy={205+i*2} rx="12" ry="17" fill="#d7e8ee" stroke="#8ab2c4" strokeWidth="2"/><path d={`M${214+i*31} 190v27`} stroke="#fff" opacity=".6"/></g>)}</g>
      <g className="kitchen-arm"><path d="M216 264 329 277" stroke="#b7d4df" strokeWidth="11" strokeLinecap="round"/><circle cx="273" cy="270" r="8" fill="#25b8ee" stroke="#d8f6ff" strokeWidth="2"/>{[224,250,296,321].map(x=><circle key={x} cx={x} cy={265+(x-216)*.11} r="2" fill="#0e415d"/>)}</g>
      {[0,1,2,3,4].map(i=><path key={i} className="kitchen-spray" d={`M${218+i*26} 257q-15-50 ${-8+i*3}-88`} fill="none" stroke="#57c9f4" strokeWidth="2" strokeDasharray="4 7" opacity=".7"/>)}</g>
    <path d="M145 80 347 106v36l-202-25Z" fill="#18364b" stroke="#a4c5d2"/><circle cx="317" cy="122" r="9" fill="#8eb5c8" stroke="#e7f8ff" strokeWidth="2"/><rect x="164" y="91" width="44" height="13" rx="2" fill="#08243a"/><path d="M170 97h25" stroke="#11b7f3" strokeWidth="3"/>
    <path d="M155 265 365 290 351 332 134 307Z" fill="#a7bfcc" stroke="#e6f4fa" strokeWidth="2"/><path d="M161 274 350 297" stroke="#5c8195" strokeWidth="4"/><path d="M155 307v24l18 3v-25M329 332v18l18-5v-14" fill="#173b50" stroke="#a1bfcc"/>{screws([[146,68],[348,96],[145,299],[346,325],[379,90],[410,74],[407,293],[379,317]])}
  </svg>
}

function Surface() {
  return <svg className="range-figure" viewBox="0 0 520 385" role="img" aria-label="Isometric floor scrubber moving across commercial tiles with a rotating brush and trailing squeegee">
    <defs><linearGradient id="surface-body" x2="1" y2="1"><stop stopColor="#ecf8fb"/><stop offset=".55" stopColor="#93bbcc"/><stop offset="1" stopColor="#315a73"/></linearGradient></defs>
    <path d="M84 275 304 216 475 275 255 346Z" fill="#1b3d54" stroke="#6290a6" strokeWidth="2"/>{[0,1,2,3].map(i=><path key={i} d={`M${101+i*50} ${270-i*13}l171 59`} stroke="#537d94" strokeWidth="1"/>)}{[0,1,2].map(i=><path key={i} d={`M${91+i*78} ${278+i*20}l217-62`} stroke="#537d94" strokeWidth="1"/>)}<path className="surface-clean" d="M205 262 323 230 438 268 321 306Z" fill="#63bedf" opacity=".17"/>
    <g className="surface-machine"><ellipse cx="284" cy="302" rx="104" ry="21" fill="#0ac4fb" opacity=".12"/><circle cx="199" cy="284" r="28" fill="#102e43" stroke="#92b9c9" strokeWidth="6"/><circle cx="199" cy="284" r="11" fill="#37748f"/><circle cx="355" cy="281" r="27" fill="#102e43" stroke="#92b9c9" strokeWidth="6"/><circle cx="355" cy="281" r="10" fill="#37748f"/>
    <path d="M214 182 311 154 395 187 300 222Z" fill="#ebf6fa" stroke="#a6c9d7" strokeWidth="2"/><path d="M300 222 395 187v72l-95 34Z" fill="#57829a" stroke="#bad7e1" strokeWidth="2"/><path d="M214 182 300 222v71l-86-35Z" fill="url(#surface-body)" stroke="#d9eff6" strokeWidth="2"/>
    <path d="M237 181 298 163 360 188 300 211Z" fill="#0b4668" stroke="#64b4d0" strokeWidth="2"/><path d="M260 180 297 169 335 186 300 198Z" fill="#38b1d8" opacity=".55"/>
    <path d="M296 164 315 94 330 94 314 167" fill="#a5c8d8" stroke="#e5f7fa" strokeWidth="2"/><path d="M320 95 384 73" stroke="#d7eaf1" strokeWidth="10" strokeLinecap="round"/><path d="M375 71 396 65" stroke="#173f59" strokeWidth="12" strokeLinecap="round"/><path d="M309 119 352 132" stroke="#8cb8cb" strokeWidth="3"/>
    <g className="surface-brush"><ellipse cx="298" cy="290" rx="60" ry="19" fill="#0d3852" stroke="#9fc5d4" strokeWidth="4"/>{Array.from({length:16},(_,i)=>{const a=i*Math.PI/8;return <path key={i} d={`M${298+45*Math.cos(a)} ${290+14*Math.sin(a)}l${7*Math.cos(a)} ${4*Math.sin(a)}`} stroke="#28b6df" strokeWidth="3" strokeLinecap="round"/>})}</g><path d="M353 267 407 281 392 293 343 279" fill="#183f58" stroke="#b4d4e0" strokeWidth="3"/><path d="M397 289 419 293" stroke="#76c9e2" strokeWidth="4" strokeLinecap="round"/>{screws([[227,194],[286,219],[376,194],[309,166],[368,250],[248,257]])}</g>
  </svg>
}

function Disinfection() {
  return <svg className="range-figure" viewBox="0 0 520 385" role="img" aria-label="Isometric professional pump sprayer applying a fine mist to a stainless touchpoint panel">
    <defs><linearGradient id="disinfect-tank" x2="1" y2="1"><stop stopColor="#d9f2fa" stopOpacity=".95"/><stop offset="1" stopColor="#477b92" stopOpacity=".8"/></linearGradient></defs>
    <ellipse cx="264" cy="343" rx="172" ry="20" fill="#03baff" opacity=".11"/>
    <path d="M298 93 409 61 460 82 351 116Z" fill="#dceaf1" stroke="#b9d4df" strokeWidth="2"/><path d="M351 116 460 82v206l-109 38Z" fill="#658ca0" stroke="#bad5df" strokeWidth="2"/><path d="M298 93 351 116v210l-53-23Z" fill="#b7d0dc" stroke="#e6f5fa" strokeWidth="2"/><path d="M315 132 333 138v150l-18-8Z" fill="#446e84" stroke="#d2e9f1"/><path d="M360 150 400 138v74l-40 13Z" fill="#87a9b9" stroke="#eaf7fa" strokeWidth="2"/><path d="M372 166 388 161v26l-16 5Z" fill="#1c4258" stroke="#cae6ee"/>{screws([[309,102],[342,119],[309,288],[342,313],[371,118],[441,92],[442,271],[369,304]])}
    <path className="disinfect-mist" d="M260 191q28-25 67-23M260 191q32-11 72 6M260 191q40 4 75 41" fill="none" stroke="#8ae6ff" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" opacity=".7"/>
    <path d="M84 184q0-18 19-22l82-15q18-3 27 14l19 130q3 25-17 29l-106 5q-23 1-23-21Z" fill="url(#disinfect-tank)" stroke="#d9eff6" strokeWidth="3"/><path d="M92 255q62 14 129-3l6 37q2 22-17 24l-104 4q-16 0-17-18Z" fill="#08a5d7" opacity=".36"/><ellipse cx="153" cy="160" rx="54" ry="12" fill="#e3f2f7" stroke="#a7cad8" strokeWidth="3"/>
    <path d="M125 151v-17q0-9 9-10h42q9 0 9 10v17" fill="#214963" stroke="#b9d8e4" strokeWidth="3"/><path className="disinfect-pump" d="M150 125V78m-29-2h59" stroke="#d8f0f8" strokeWidth="9" strokeLinecap="round"/><path d="M132 167q-9 40-8 77" fill="none" stroke="#b6e2ef" strokeWidth="3" opacity=".6"/>
    <path d="M186 160q25-38 46-6l7 27" fill="none" stroke="#183d55" strokeWidth="12" strokeLinecap="round"/><path d="M238 181 253 187" stroke="#b9dbe7" strokeWidth="8" strokeLinecap="round"/><path d="M251 188 265 189" stroke="#1b425b" strokeWidth="12" strokeLinecap="round"/><circle cx="184" cy="162" r="7" fill="#0e3a54" stroke="#a6c9d9" strokeWidth="2"/>
    <path d="M98 285q60 8 121-9" stroke="#b6e7f5" strokeWidth="2" opacity=".65"/>{vents(124,294,6)}{screws([[105,184],[203,174],[104,300],[207,299]])}
  </svg>
}

const figures = [Laundry, Kitchen, Surface, Disinfection]
export default function RangeFigure({ index }) { const Figure = figures[index]; return <Figure /> }
