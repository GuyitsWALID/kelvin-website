const vertexShader = `#version 300 es
in vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`

const fragmentShader = `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_time;
uniform float u_activity;
out vec4 outColor;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 field = vec2((uv.x - 0.5) * aspect, uv.y);
  float wave = 0.045 * sin(field.x * 5.2 + uv.y * 4.0 - u_time * 0.20)
             + 0.016 * sin(field.x * 10.5 - uv.y * 5.5 + u_time * 0.13);

  vec2 delta = vec2((uv.x - u_pointer.x) * aspect, uv.y - u_pointer.y);
  float distanceToPointer = length(delta);
  float influence = exp(-distanceToPointer * distanceToPointer * 17.0) * u_activity;
  vec2 grid = vec2(field.x * (52.0 + uv.y * 25.0), (uv.y + wave) * (53.0 + uv.y * 26.0));
  grid += delta * influence * 6.0;
  grid.y += sin(distanceToPointer * 31.0 - u_time * 2.4) * influence * 0.85;

  vec2 local = fract(grid) - 0.5;
  float radius = 0.29;
  float r = length(local);
  float edge = fwidth(r) * 1.35;
  float dome = 1.0 - smoothstep(radius - edge, radius + edge, r);
  float shadow = 1.0 - smoothstep(radius, radius + 0.12, length(local + vec2(-0.035, 0.055)));
  float height = sqrt(max(0.0, 1.0 - (r * r) / (radius * radius)));
  vec3 normal = normalize(vec3(local / radius, height * 0.9));
  vec3 light = normalize(vec3(-0.55, 0.7, 0.95));
  float diffuse = max(dot(normal, light), 0.0);
  float specular = pow(max(dot(reflect(-light, normal), vec3(0.0, 0.0, 1.0)), 0.0), 26.0);

  float sweep = exp(-pow((uv.y - 0.72 - 0.075 * sin(field.x * 3.0)) * 7.0, 2.0));
  float exposure = 0.47 + uv.y * 0.38 + sweep * 0.26;
  vec3 base = vec3(0.008, 0.016, 0.026) + sweep * vec3(0.015, 0.023, 0.031);
  vec3 metal = vec3(0.05, 0.075, 0.10) + diffuse * vec3(0.12, 0.16, 0.19) + specular * vec3(0.18, 0.22, 0.25);
  metal *= exposure + influence * 0.20;
  vec3 color = base - shadow * vec3(0.007) + dome * metal;
  color += influence * dome * vec3(0.009, 0.026, 0.04);
  outColor = vec4(color, 1.0);
}
`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(message)
  }
  return shader
}

export function startDotField(canvas, pointerX, pointerY, activity) {
  const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'low-power' })
  if (!gl) return () => {}

  let program
  let buffer
  let uniforms
  let frame = 0
  let stopped = false
  let lastDraw = 0
  const start = performance.now()
  const frameInterval = window.matchMedia('(pointer: coarse)').matches ? 1000 / 30 : 0

  const setup = () => {
    const vertex = compile(gl, gl.VERTEX_SHADER, vertexShader)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentShader)
    program = gl.createProgram()
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    gl.deleteShader(vertex)
    gl.deleteShader(fragment)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program))
    buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      pointer: gl.getUniformLocation(program, 'u_pointer'),
      time: gl.getUniformLocation(program, 'u_time'),
      activity: gl.getUniformLocation(program, 'u_activity'),
    }
    resize()
  }

  const resize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const scale = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(2_000_000 / (width * height)))
    canvas.width = Math.round(width * scale)
    canvas.height = Math.round(height * scale)
    gl.viewport(0, 0, canvas.width, canvas.height)
  }

  const draw = (now) => {
    if (stopped || document.hidden) return
    if (now - lastDraw < frameInterval) { frame = requestAnimationFrame(draw); return }
    lastDraw = now
    gl.useProgram(program)
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
    gl.uniform2f(uniforms.pointer, pointerX.get(), 1 - pointerY.get())
    gl.uniform1f(uniforms.time, (now - start) / 1000)
    gl.uniform1f(uniforms.activity, activity.get())
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    canvas.style.opacity = '1'
    frame = requestAnimationFrame(draw)
  }

  const visibility = () => {
    cancelAnimationFrame(frame)
    if (!document.hidden && !stopped) frame = requestAnimationFrame(draw)
  }
  const contextLost = (event) => {
    event.preventDefault()
    cancelAnimationFrame(frame)
    canvas.style.opacity = '0'
  }
  const contextRestored = () => {
    try { setup(); frame = requestAnimationFrame(draw) }
    catch (error) { console.warn('Kelvin background fallback:', error) }
  }

  try { setup(); frame = requestAnimationFrame(draw) }
  catch (error) { console.warn('Kelvin background fallback:', error); return () => {} }

  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', visibility)
  canvas.addEventListener('webglcontextlost', contextLost)
  canvas.addEventListener('webglcontextrestored', contextRestored)

  return () => {
    stopped = true
    cancelAnimationFrame(frame)
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', visibility)
    canvas.removeEventListener('webglcontextlost', contextLost)
    canvas.removeEventListener('webglcontextrestored', contextRestored)
    gl.deleteBuffer(buffer)
    gl.deleteProgram(program)
  }
}
