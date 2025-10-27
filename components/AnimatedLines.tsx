export const AnimatedLines = () => {
  return (
    <div className="lines fixed top-0 left-0 right-0 h-full m-auto pointer-events-none z-0" style={{ width: '90vw' }}>
      <div
        className="line line-anim line-1 absolute w-px h-full top-0 left-1/2"
        style={{ marginLeft: '-22.5vw', background: 'rgba(255,255,255,0.1)' }}
      />
      <div
        className="line line-anim line-2 absolute w-px h-full top-0 left-1/2"
        style={{ background: 'rgba(255,255,255,0.1)' }}
      />
      <div
        className="line line-anim line-3 absolute w-px h-full top-0 left-1/2"
        style={{ marginLeft: '22.5vw', background: 'rgba(255,255,255,0.1)' }}
      />
    </div>
  );
};
