import { geoPath, geoEquirectangular, GeoPermissibleObjects } from 'd3-geo'
import { feature, bbox } from 'topojson-client'
import _world from '../data/land.json'

const mapRatio = 500 / 960 // g3-geo defaults

const world: any = _world
const land = feature(world, world.objects.land)
const water = bbox(world)

let center: [number, number]
let country: GeoPermissibleObjects

const mapResize = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  const width = canvas.parentElement!.offsetWidth
  const height = width * mapRatio
  canvas.width = width * devicePixelRatio
  canvas.height = height * devicePixelRatio
  ctx.scale(devicePixelRatio, devicePixelRatio)
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
}

const mapDraw = () => {
  const canvas = document.querySelector('canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  mapResize(canvas, ctx)
  const projection = geoEquirectangular()
    .fitSize([canvas.offsetWidth, canvas.offsetHeight], land)
    .center(center)
    .scale(300)
  const path = geoPath(projection).context(ctx)
  const water1 = projection([water[0], water[1]])
  const water2 = projection([water[2], water[3]])

  ctx.save()

  // water
  if (water1 && water2) {
    ctx.beginPath(),
      ctx.rect(water1[0], water1[1], water2[0] - water1[0], water2[1] - water1[1]),
      (ctx.fillStyle = 'hsla(220, 100%, 50%, 1)'),
      ctx.fill()
  }

  // land
  ctx.beginPath(),
    path(land),
    (ctx.fillStyle = 'hsla(140, 100%, 50%, 1)'),
    (ctx.shadowColor = 'hsla(0, 0%, 0%, 1)'),
    (ctx.shadowBlur = 16),
    ctx.fill()

  //country fill
  ctx.beginPath(), path(country), (ctx.fillStyle = 'hsla(0, 0%, 0%, 0.2)'), ctx.fill()

  //country outline
  ctx.beginPath(),
    path(country),
    (ctx.lineWidth = 3),
    (ctx.lineJoin = 'round'),
    (ctx.strokeStyle = 'hsla(300, 100%, 50%, 1)'),
    ctx.stroke()
  ctx.restore()
}

export const mapCountry = async (latlng: [number, number], geoJson: GeoPermissibleObjects) => {
  center = [latlng[1], latlng[0]]
  country = geoJson
  mapDraw()
}
