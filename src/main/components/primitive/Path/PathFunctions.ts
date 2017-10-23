// https://www.dashingd3js.com/svg-paths-and-d3js

import {
  Command,
  Instructions,
} from '../../../../main'

export function moveTo(
  x: number,
  y: number,
  isRelative: boolean = false,
): Instructions.MoveTo {
  const command = isRelative
    ? Command.Of.m
    : Command.Of.M
  return [command, x, y]
}

export function lineTo(
  x: number,
  y: number,
  isRelative: boolean = false,
): Instructions.LineTo {
  const command = isRelative
    ? Command.Of.l
    : Command.Of.L
  return [command, x, y]
}

export function horizontalLineTo(
  x: number,
  isRelative: boolean = false,
): Instructions.HorizontalLineTo {
  const command = isRelative
    ? Command.Of.h
    : Command.Of.H
  return [command, x]
}

export function verticalLineTo(
  y: number,
  isRelative: boolean = false,
): Instructions.VerticalLineTo {
  const command = isRelative
    ? Command.Of.v
    : Command.Of.V
  return [command, y]
}

export function curveTo(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number,
  y: number,
  isRelative: boolean = false,
): Instructions.CurveTo {
  const command = isRelative
    ? Command.Of.c
    : Command.Of.C
  return [command, x1, y1, x2, y2, x, y]
}

export function smoothCurveTo(
  x2: number,
  y2: number,
  x: number,
  y: number,
  isRelative: boolean = false,
): Instructions.SmoothCurveTo {
  const command = isRelative
    ? Command.Of.s
    : Command.Of.S
  return [command, x2, y2, x, y]
}

export function quadraticBezierCurve(
  x1: number,
  y1: number,
  x: number,
  y: number,
  isRelative: boolean = false,
): Instructions.QuadraticBezierCurve {
  const command = isRelative
    ? Command.Of.q
    : Command.Of.Q
  return [command, x1, y1, x, y]
}

export function smoothQuadraticBezierCurve(
  x: number,
  y: number,
  isRelative: boolean = false,
): Instructions.SmoothQuadraticBezierCurve {
  const command = isRelative
    ? Command.Of.t
    : Command.Of.T
  return [command, x, y]
}

export function ellipticalArc(
  rx: number,
  ry: number,
  x_axis_rotation: number,
  large_arc_flag: boolean,
  sweep_flag: boolean,
  x: number,
  y: number,
  isRelative: boolean = false,
): Instructions.EllipticalArc {
  const command = isRelative
    ? Command.Of.a
    : Command.Of.A
  return [command, rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, x, y]
}

export function closePath(
  isRelative: boolean = false,
): Instructions.ClosePath {
  const command = isRelative
    ? Command.Of.z
    : Command.Of.Z
  return [command]
}
