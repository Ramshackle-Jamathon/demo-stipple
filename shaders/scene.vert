precision lowp float;

attribute vec2 position;
const vec2 scale = vec2(0.5, 0.5);
varying vec2 uv;

void main() {
	vec2 tempPosition = position * scale + scale; // scale vertex attribute to [0,1] range
	uv = vec2(tempPosition.x, 1.0 - tempPosition.y);
	gl_Position = vec4(position, 0, 1);
}