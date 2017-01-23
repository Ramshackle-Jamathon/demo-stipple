precision mediump float;

uniform float uGlobalTime;
uniform vec2 uResolution;
uniform sampler2D uWebcamTexture;
uniform float uiOption;

varying vec2 uv;

#define s(x,y,vuv) dot( texture2D(uWebcamTexture, vec2(x,y)/R + vuv), vec4(0.3,0.6,0.1,0))

void main()
{
	vec2 R = uResolution;
	vec2 U = uv;
	
	float f0 = s(0,0, U),
		f =  s(-1,-1, U) + s(-1,0, U) + s(-1,1, U)
			+ s( 0,-1, U) + s( 0,1, U)
			+ s( 1,-1, U) + s( 1,0, U) + s( 1,1, U);
	f = ( 0.5*f + 2.0*f0 ) / 6.0;
	
	f = f0 - ( f-f0 ) * 40.0;

	gl_FragColor = vec4(vec3(step(uiOption, f)), 1.0);
}