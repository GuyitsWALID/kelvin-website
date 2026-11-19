import * as k from './kit/iso-kit.mjs'
import * as G from './kit/lathe.mjs'

const W = 600
const H = 380
const S = (part, tone = 'mid', lit = false) => k.solidSvg(part, { tone, lit })
const L = (path, tone = 'lo', free = false) => k.lineSvg(path, { tone, free })
const D = (points, tone = 'lo', size = .55) => k.dotsSvg(points, { tone, size })
const plan = (x, y, w, d, r = 2) => ({ x, y, w, d, r })
const path3 = (points, P, close = false) => k.pathOf(points.map(point => k.iso(point, P)), close)
const faceCircle = (cx, y, cz, r, P, count = 64) => path3(Array.from({ length: count }, (_, i) => [cx + r * Math.cos(i * Math.PI * 2 / count), y, cz + r * Math.sin(i * Math.PI * 2 / count)]), P, true)
const faceLine = (x1, z1, x2, z2, y, P) => path3([[x1, y, z1], [x2, y, z2]], P)
const box = (p, z, h, P, tone = 'mid') => S(k.slabOf(p, z, h, P, 6, .8), tone)
const cyl = (x, y, r, z, h, P, tone = 'mid') => S(k.cylinder(x, y, r, z, h, P, 32, .4), tone)
const stud = (x, y, z, P) => L(k.ring(x, y, 1.5, z, P, 16), 'mid') + D([k.iso([x, y, z], P)], 'hi', .45)
const frontStud = (x, y, z, P) => L(faceCircle(x, y, z, 1.6, P, 16), 'mid') + D([k.iso([x, y, z], P)], 'hi', .45)
const frontBand = (x, y, z, inner, outer, thickness, P, tone = 'hi') => k.solidSvg(G.ringBand(0, thickness, inner, outer, G.frameOf([x, y, z], [0, 1, 0], [1, 0, 0], [0, 0, 1]), P, { hole: [thickness, inner] }), { tone, className: 'anatomy-band' })
const frontDisc = (x, y, z, r, depth, P, tone = 'mid') => S(G.disc(0, depth, r, G.frameOf([x, y, z], [0, 1, 0], [1, 0, 0], [0, 0, 1]), P), tone)

function washer(P) {
  const body = []
  const base = plan(-83, -62, 166, 124, 5)
  const shell = plan(-78, -58, 156, 116, 4)
  const feet = k.corners(base, 13).sort((a, b) => k.depthOf([...a, 0], P) - k.depthOf([...b, 0], P))
  body.push(`<path class="iso-halo" d="${k.haloOf(base, -9, 9, P)}"/>`)
  for (const [x, y] of feet) body.push(cyl(x, y, 6, -11, 5, P, 'lo'), cyl(x, y, 4, -6, 6, P, 'mid'))
  body.push(box(base, -5, 8, P, 'lo'), box(shell, 3, 144, P, 'mid'))
  body.push(box(plan(-81, -61, 162, 122, 4), 147, 4, P, 'hi'))
  body.push(L(k.planOutline(k.insetPlan(base, 4), 3, P), 'faint'))
  for (const [x, y] of k.corners(base, 9)) body.push(stud(x, y, 3, P))
  body.push(L(faceLine(-74, 21, 74, 21, 58, P), 'faint'), L(faceLine(-74, 120, 74, 120, 58, P), 'faint'))
  body.push(L(faceLine(56, 21, 56, 120, 58, P), 'faint'))
  for (let i = 0; i < 11; i++) body.push(L(faceLine(-68 + i * 5.8, 10, -68 + i * 5.8, 15, 59, P), 'lo', true))
  for (const x of [-69, 69]) for (const z of [12, 28, 111, 135]) body.push(frontStud(x, 59, z, P))
  body.push(box(plan(-73, 53, 146, 5, 1), 122, 21, P, 'lo'))
  body.push(L(faceLine(-56, 129, -21, 129, 59, P), 'lit', true))
  body.push(frontDisc(50, 59, 132, 8, 2, P, 'hi'))
  body.push(frontBand(50, 61, 132, 5.8, 7.8, 1.8, P, 'lo'))
  body.push(frontDisc(-1, 60, 72, 51, 2, P, 'lo'))
  body.push(`<path d="${faceCircle(-1, 62, 72, 45, P)}" fill="#0073a5" fill-opacity=".08" stroke="#65c9ed" stroke-width="1.2"/>`)
  const clip = faceCircle(-1, 63, 72, 42, P)
  const center = k.iso([-1, 63, 72], P)
  body.push(`<defs><clipPath id="anatomy-washer-drum"><path d="${clip}"/></clipPath></defs>`)
  body.push(`<g data-part="mechanism" clip-path="url(#anatomy-washer-drum)" style="transform-origin:${center[0]}px ${center[1]}px">`)
  for (let i = 0; i < 3; i++) {
    const a = i * 2 * Math.PI / 3
    const c = [-1 + 26 * Math.cos(a), 63, 72 + 26 * Math.sin(a)]
    body.push(`<path d="${faceCircle(c[0], c[1], c[2], 13, P, 32)}" fill="#4bc5ee" fill-opacity=".09" stroke="#9de9ff" stroke-width=".9"/>`)
  }
  for (let i = 0; i < 3; i++) {
    const a = i * 2 * Math.PI / 3 + .3
    body.push(L(faceLine(-1 + 22 * Math.cos(a), 72 + 22 * Math.sin(a), -1 + 39 * Math.cos(a), 72 + 39 * Math.sin(a), 63, P), 'hi', true))
  }
  body.push('</g>')
  body.push(frontBand(-1, 63, 72, 45, 51, 4, P, 'hi'))
  body.push(L(faceCircle(-1, 68, 72, 47, P), 'faint'))
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6
    body.push(frontStud(-1 + 49 * Math.cos(a), 68, 72 + 49 * Math.sin(a), P))
  }
  body.push(frontStud(-64, 59, 131, P), frontStud(67, 59, 131, P))
  return k.figureSvg({ width: W, height: H, label: 'An Anatomy isometric commercial washer with a rotating loaded drum, control fascia and service details', body })
}

function dishwasher(P) {
  const body = []
  const base = plan(-88, -62, 176, 124, 5)
  body.push(`<path class="iso-halo" d="${k.haloOf(base, -11, 11, P)}"/>`)
  for (const [x, y] of k.corners(base, 11)) body.push(cyl(x, y, 5, -10, 10, P, 'lo'))
  body.push(box(base, 0, 8, P, 'mid'))
  body.push(box(plan(-83, -58, 166, 116, 3), 8, 26, P, 'mid'))
  body.push(box(plan(-83, -58, 166, 116, 3), 115, 34, P, 'mid'))
  body.push(box(plan(-86, -61, 172, 122, 4), 149, 4, P, 'hi'))
  for (const x of [-76, 76]) for (const y of [-52, 52]) body.push(cyl(x, y, 3.5, 34, 81, P, 'mid'))
  body.push(`<path d="${path3([[-73, 59, 37], [73, 59, 37], [73, 59, 113], [-73, 59, 113]], P, true)}" fill="#0779af" fill-opacity=".06" stroke="#80d4f3" stroke-width="1.2"/>`)
  for (const z of [42, 48, 105, 111]) body.push(L(faceLine(-73, z, 73, z, 59, P), 'lo'))
  for (const x of [-73, 73]) body.push(L(faceLine(x, 37, x, 113, 59, P), 'mid'))
  body.push(box(plan(-68, -42, 136, 98, 2), 47, 3, P, 'lo'))
  for (let i = 0; i < 7; i++) body.push(L(k.lineOnTop([-63 + i * 20, -42], [-63 + i * 20, 56], 50, P), 'lo'))
  for (let i = 0; i < 4; i++) {
    const x = -42 + i * 28
    body.push(frontDisc(x, 28, 79, 14, 1.4, P, 'hi'))
    body.push(frontBand(x, 30, 79, 11.5, 13.7, 1.2, P, 'mid'))
  }
  body.push(`<g data-part="mechanism">`)
  body.push(box(plan(-61, -8, 122, 5, 1), 57, 3, P, 'hi'))
  for (const x of [-48, -16, 16, 48]) body.push(cyl(x, 1, 2.2, 59, 2, P, 'hi'))
  for (let i = 0; i < 6; i++) body.push(L(k.segment([-48 + i * 19, 1, 60], [-52 + i * 19, 38, 102], P), 'blue', true))
  body.push('</g>')
  body.push(box(plan(-82, 53, 164, 7, 2), 115, 32, P, 'lo'))
  body.push(frontDisc(54, 61, 130, 8, 2, P, 'hi'))
  body.push(frontBand(54, 63, 130, 6, 8, 1.5, P, 'mid'))
  body.push(L(faceLine(-59, 133, -25, 133, 61, P), 'lit', true))
  for (const x of [-72, 72]) for (const z of [17, 123, 142]) body.push(frontStud(x, 61, z, P))
  for (let i = 0; i < 10; i++) body.push(L(faceLine(-60 + i * 11, 17, -60 + i * 11, 23, 61, P), 'faint', true))
  return k.figureSvg({ width: W, height: H, label: 'An Anatomy isometric commercial dishwasher showing a dish rack, plates and moving spray arm', body })
}

function scrubber(P) {
  const body = []
  const floor = plan(-125, -88, 250, 176, 2)
  body.push(`<path class="iso-halo" d="${k.haloOf(floor, -4, 4, P)}"/>`)
  body.push(box(floor, -4, 4, P, 'lo'))
  for (const x of [-65, 0, 65]) body.push(L(k.lineOnTop([x, -88], [x, 88], 0, P), 'faint'))
  for (const y of [-44, 0, 44]) body.push(L(k.lineOnTop([-125, y], [125, y], 0, P), 'faint'))
  body.push(S(k.slabOf(plan(-46, 20, 135, 35, 8), .5, .6, P), 'lo'))
  for (const x of [-65, 63]) body.push(cyl(x, 10, 17, 9, 8, P, 'lo'), cyl(x, 10, 6, 17, 2, P, 'mid'))
  body.push(box(plan(-77, -43, 153, 90, 18), 19, 30, P, 'mid'))
  body.push(box(plan(-54, -38, 106, 73, 12), 49, 48, P, 'hi'))
  body.push(box(plan(-42, -30, 82, 58, 8), 97, 4, P, 'mid'))
  body.push(L(k.planOutline(plan(-35, -23, 68, 44, 5), 101, P), 'faint'))
  body.push(cyl(10, 4, 8, 101, 3, P, 'lo'))
  body.push(cyl(10, 4, 5, 104, 2, P, 'hi'))
  for (const [x, y] of k.corners(plan(-52, -36, 104, 70), 7)) body.push(stud(x, y, 101, P))
  body.push(box(plan(28, -19, 8, 9, 2), 98, 81, P, 'mid'))
  body.push(box(plan(18, -32, 55, 8, 3), 177, 7, P, 'hi'))
  body.push(cyl(68, -28, 7, 177, 8, P, 'lo'))
  body.push(box(plan(17, -25, 47, 38, 5), 112, 11, P, 'lo'))
  body.push(L(k.lineOnTop([23, -19], [49, -19], 123, P), 'lit', true))
  body.push(cyl(55, 3, 5, 123, 4, P, 'mid'))
  body.push(`<g data-part="mechanism">`)
  body.push(cyl(-30, 23, 34, 2, 8, P, 'lo'))
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4
    body.push(L(k.lineOnTop([-30 + 7 * Math.cos(a), 23 + 7 * Math.sin(a)], [-30 + 29 * Math.cos(a), 23 + 29 * Math.sin(a)], 10, P), 'blue', true))
  }
  body.push('</g>')
  body.push(cyl(-30, 23, 10, 10, 3, P, 'hi'))
  body.push(box(plan(-85, 31, 170, 8, 3), 12, 7, P, 'mid'))
  body.push(L(k.lineOnTop([-82, 38], [82, 38], 19, P), 'lit'))
  for (const [x, y] of [[-64, 34], [64, 34], [-41, -29], [38, -29]]) body.push(stud(x, y, 49, P))
  return k.figureSvg({ width: W, height: H, label: 'An Anatomy isometric floor scrubber with rotating brush, water tanks, squeegee and cleaned tile track', body })
}

function sprayer(P) {
  const body = []
  const foot = plan(-116, -70, 232, 140, 5)
  body.push(`<path class="iso-halo" d="${k.haloOf(foot, -7, 7, P)}"/>`)
  for (const [x, y] of k.corners(foot, 14)) body.push(cyl(x, y, 5, -8, 8, P, 'lo'))
  body.push(box(foot, 0, 5, P, 'lo'))
  body.push(cyl(-45, 5, 43, 5, 7, P, 'mid'))
  body.push(S(G.solidOf([[0, 31, 1], [9, 38, 1], [82, 35, 1], [98, 24, 1], [105, 17, 1]], G.frameOf([-45, 5, 12], [0, 0, 1], [1, 0, 0], [0, 1, 0]), P), 'hi'))
  body.push(cyl(-45, 5, 17, 116, 8, P, 'mid'))
  body.push(cyl(-45, 5, 11, 124, 8, P, 'lo'))
  for (let i = 0; i < 18; i++) {
    const a = i * Math.PI / 9
    body.push(L(k.rise([-45 + 11 * Math.cos(a), 5 + 11 * Math.sin(a)], 124, 132, P), 'faint', true))
  }
  body.push(`<g data-part="piston">`)
  body.push(cyl(-45, 5, 4, 132, 36, P, 'mid'))
  body.push(box(plan(-65, -4, 40, 8, 3), 167, 7, P, 'hi'))
  body.push('</g>')
  body.push(frontBand(-45, 44, 67, 8, 12, 2, P, 'mid'))
  body.push(frontDisc(-45, 47, 67, 8, 1, P, 'hi'))
  body.push(L(faceLine(-45, 67, -42, 72, 49, P), 'lit'))
  for (let i = 0; i < 6; i++) body.push(L(faceLine(-51 + i * 2, 54, -51 + i * 2, 58, 45, P), 'faint'))
  body.push(box(plan(49, -56, 61, 32, 2), 5, 109, P, 'mid'))
  body.push(box(plan(47, -58, 65, 36, 2), 114, 3, P, 'hi'))
  body.push(frontDisc(80, -20, 72, 14, 1, P, 'lo'))
  body.push(frontBand(80, -19, 72, 11, 14, 1, P, 'mid'))
  for (const x of [55, 104]) for (const z of [13, 107]) body.push(frontStud(x, -20, z, P))
  body.push(L(k.segment([-10, 31, 92], [28, 20, 84], P), 'mid'))
  body.push(cyl(27, 20, 3, 81, 5, P, 'hi'))
  body.push(`<g data-part="mechanism">`)
  for (const end of [[78, -18, 86], [79, -18, 72], [78, -18, 58]]) body.push(L(k.segment([30, 19, 83], end, P), 'lit', true))
  for (let i = 0; i < 7; i++) body.push(D([k.iso([35 + i * 6, 15 - i * 5, 82 - i], P)], 'hi', 1.4))
  body.push('</g>')
  body.push(cyl(-13, 30, 4, 88, 8, P, 'lo'))
  body.push(box(plan(-18, 32, 19, 8, 2), 86, 10, P, 'mid'))
  for (const [x, y] of [[-68, 29], [-24, 30], [54, -49], [104, -49]]) body.push(stud(x, y, 117, P))
  return k.figureSvg({ width: W, height: H, label: 'An Anatomy isometric pump sprayer with moving piston, pressure gauge, directed mist and contact panel', body })
}

const builders = [washer, dishwasher, scrubber, sprayer]
const bounds = [
  plan(-92, -71, 184, 142, 6),
  plan(-94, -70, 188, 140, 6),
  plan(-135, -95, 270, 190, 4),
  plan(-125, -80, 250, 160, 5),
]
export function rangeFigure(index, azimuth = 42) {
  const P = k.fitProjection([...k.boxCorners(bounds[index], -15, index === 2 ? 193 : 185)], W, H, { pad: 24, azimuth, elevation: 30 })
  return builders[index](P).replace('viewBox="0 0 600 380"', 'viewBox="150 55 300 300"')
}
