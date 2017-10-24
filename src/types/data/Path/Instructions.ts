// https://www.dashingd3js.com/svg-paths-and-d3js

import * as Command from './Command'
import * as Coordinate from './Coordinate'

export type MoveTo = [
  Command.M | Command.m,
  Coordinate.x,
  Coordinate.y
]

export type LineTo = [
  Command.L | Command.l,
  Coordinate.x,
  Coordinate.y
]

export type HorizontalLineTo = [
  Command.H | Command.h,
  Coordinate.x
]

export type VerticalLineTo = [
  Command.V | Command.v,
  Coordinate.y
]

export type CurveTo = [
  Command.C | Command.c,
  Coordinate.x1,
  Coordinate.y1,
  Coordinate.x2,
  Coordinate.y2,
  Coordinate.x,
  Coordinate.y
]

export type SmoothCurveTo = [
  Command.S | Command.s,
  Coordinate.x2,
  Coordinate.y2,
  Coordinate.x,
  Coordinate.y
]

export type QuadraticBezierCurve = [
  Command.Q | Command.q,
  Coordinate.x1,
  Coordinate.y1,
  Coordinate.x,
  Coordinate.y
]

export type SmoothQuadraticBezierCurve = [
  Command.T | Command.t,
  Coordinate.x,
  Coordinate.y
]

export type EllipticalArc = [
  Command.A | Command.a,
  Coordinate.rx,
  Coordinate.ry,
  Coordinate.x_axis_rotation,
  Coordinate.large_arc_flag,
  Coordinate.sweep_flag,
  Coordinate.x,
  Coordinate.y
]

export type ClosePath = [
  Command.Z | Command.z
]

export type PathInstruction = (
  | MoveTo
  | LineTo
  | HorizontalLineTo
  | VerticalLineTo
  | CurveTo
  | SmoothCurveTo
  | QuadraticBezierCurve
  | SmoothQuadraticBezierCurve
  | EllipticalArc
  | ClosePath
)
