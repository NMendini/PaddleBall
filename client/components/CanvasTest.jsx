/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';

const CanvasTest = (props) => {
  const canvasRef = useRef();

  const { draw } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount += 1;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={canvasRef} />;
};

export default CanvasTest;
