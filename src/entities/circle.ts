import { point } from "./point";

export interface circle{
    radius: number;
    border_radius: number;
    surface: HTMLCanvasElement;
}

export function bake_circle(props:any=null)
{
  const border_radius = props?.border_radius || 2;
  const radius = props?.radius || 12;
  const color = props?.color || '#ccc';
  const border_color = props?.border_color || '#fff';

  const surface = document.createElement('canvas');
  surface.width = radius * 2 + border_radius * 2;
  surface.height = radius * 2 + border_radius * 2;

  const ctx = surface.getContext('2d');
  ctx.fillStyle = color;
  ctx.strokeStyle = border_color;
  ctx.lineWidth = border_radius;
  ctx.beginPath();
  ctx.arc(radius + border_radius, radius + border_radius, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  return {surface,radius,border_radius} as circle;
}

export function draw_circle(ctx:CanvasRenderingContext2D,circle:circle, position:point)
{
  ctx.drawImage(circle.surface, position.x-circle.radius, position.y-circle.radius);
}