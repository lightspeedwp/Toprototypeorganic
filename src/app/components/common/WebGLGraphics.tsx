import React, { useEffect, useRef } from 'react';

interface WebGLGraphicsProps {
  variant: 'dunes' | 'waves' | 'particles';
  className?: string;
  colorVar1?: string;
  colorVar2?: string;
}

export const WebGLGraphics: React.FC<WebGLGraphicsProps> = ({ 
  variant, 
  className = '',
  colorVar1 = '--organic-sunset-bg-primary',
  colorVar2 = '--organic-sunset-bg-secondary'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    // Helper to extract CSS variable colors and convert to RGB array [r, g, b]
    const getRGBFromVar = (varName: string): [number, number, number] => {
      const el = document.documentElement;
      let val = getComputedStyle(el).getPropertyValue(varName).trim();
      
      // Default fallback if variable isn't found
      if (!val) return [0.5, 0.5, 0.5];
      
      // Basic hex parsing
      if (val.startsWith('#')) {
        const hex = val.replace('#', '');
        if (hex.length === 3) {
          return [
            parseInt(hex[0]+hex[0], 16)/255, 
            parseInt(hex[1]+hex[1], 16)/255, 
            parseInt(hex[2]+hex[2], 16)/255
          ];
        }
        if (hex.length === 6) {
          return [
            parseInt(hex.substring(0,2), 16)/255, 
            parseInt(hex.substring(2,4), 16)/255, 
            parseInt(hex.substring(4,6), 16)/255
          ];
        }
      }
      
      // Basic rgb/rgba parsing
      if (val.startsWith('rgb')) {
        const match = val.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          return [parseInt(match[1])/255, parseInt(match[2])/255, parseInt(match[3])/255];
        }
      }
      
      // HSL parsing fallback to simple warm tones if it's HSL (complex to parse here)
      return [0.8, 0.6, 0.4]; 
    };

    const c1 = getRGBFromVar(colorVar1);
    const c2 = getRGBFromVar(colorVar2);

    // Resize handling
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Shaders
    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Dynamic fragment shader based on variant
    let fragmentShaderSource = '';

    if (variant === 'dunes') {
      fragmentShaderSource = `
        precision mediump float;
        varying vec2 vUv;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        
        // Simple 2D noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          st.x *= u_resolution.x / u_resolution.y;
          
          float n = snoise(vec2(st.x * 2.0, st.y * 2.0 + u_time * 0.2));
          n += 0.5 * snoise(vec2(st.x * 4.0 - u_time * 0.1, st.y * 4.0));
          
          // Organic mixing
          float mixVal = smoothstep(-1.0, 1.0, n);
          vec3 finalColor = mix(u_color1, u_color2, mixVal);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `;
    } else if (variant === 'waves') {
      fragmentShaderSource = `
        precision mediump float;
        varying vec2 vUv;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        
        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          
          // Sine waves
          float y = st.y;
          float wave1 = sin(st.x * 5.0 + u_time * 0.5) * 0.1 + 0.5;
          float wave2 = sin(st.x * 3.0 - u_time * 0.3) * 0.15 + 0.4;
          
          float mixVal = smoothstep(wave1 - 0.1, wave1 + 0.1, y) * smoothstep(wave2 + 0.1, wave2 - 0.1, y);
          vec3 finalColor = mix(u_color1, u_color2, mixVal);
          
          // Transparent background for waves
          gl_FragColor = vec4(finalColor, mixVal * 0.8);
        }
      `;
    } else {
      // Particles/Ambient effect
      fragmentShaderSource = `
        precision mediump float;
        varying vec2 vUv;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          
          // Simple particle simulation using a grid and distance
          st *= 10.0;
          vec2 i_st = floor(st);
          vec2 f_st = fract(st);
          
          float m_dist = 1.0;
          
          for (int y= -1; y <= 1; y++) {
            for (int x= -1; x <= 1; x++) {
                vec2 neighbor = vec2(float(x),float(y));
                vec2 point = vec2(random(i_st + neighbor), random(i_st + neighbor * 2.0));
                
                point = 0.5 + 0.5*sin(u_time + 6.2831*point);
                
                vec2 diff = neighbor + point - f_st;
                float dist = length(diff);
                
                m_dist = min(m_dist, dist);
            }
          }
          
          float glow = 1.0 - step(0.05, m_dist);
          glow += (1.0 - m_dist) * 0.2; // soft glow
          
          vec3 finalColor = mix(u_color1, u_color2, st.y / 10.0) + (glow * u_color1 * 2.0);
          
          gl_FragColor = vec4(finalColor, 0.8);
        }
      `;
    }

    // Compile Shader Function
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Set up geometry (full screen quad)
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const col1Loc = gl.getUniformLocation(program, 'u_color1');
    const col2Loc = gl.getUniformLocation(program, 'u_color2');

    // Animation loop
    let animationFrameId: number;
    const startTime = performance.now();

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const render = (time: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform1f(timeLoc, (time - startTime) * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform3f(col1Loc, c1[0], c1[1], c1[2]);
      gl.uniform3f(col2Loc, c2[0], c2[1], c2[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render(performance.now());

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
    };
  }, [variant, colorVar1, colorVar2]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`block w-full h-full pointer-events-none ${className || ''}`}
    />
  );
};
