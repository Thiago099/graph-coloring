export interface point{
    x:number;
    y:number;
}

export function pointDistance(a:point, b:point)
{
  const {x:x1,y:y1} = a;
  const {x:x2,y:y2} = b;
  return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}