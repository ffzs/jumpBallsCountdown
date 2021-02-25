import React, { Component} from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Canvas } from '@tarojs/components'
import digitMap from './digit';
import Ball from './ball';
import Colors from './colors';
import './index.less'

export default class Balls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
    }
  }

  drawBalls = (balls: Ball[]): void => {
    balls.map(ball => ball.draw());
  }

  updateBalls = (balls: Ball[]): void => {
    balls.map(ball => ball.update());
  }

  drawDigit = (ctx, x1: number, x2: number, y1:number, width: number, height: number, digit: number): Ball[] => {
    const num: string = digit + "";
    const mat: number[][] = digitMap()[num];
    const row = mat.length;
    const col = mat[0].length;
    const h = (x2 - x1) / col;
    const r = h/2*0.8;
    const startX = x1 + h/2;
    const startY = y1 + h/2;
    let balls:Ball[] = [];
    for (let i = 0; i < row; i++) {
      const y = startY + i*h;
      for (let j = 0; j < col; j++) {
        const x = startX + j*h;
        if (mat[i][j] == 1)
          balls.push(new Ball(ctx, x, y, height, width, r, 20, Colors.getOne(digit), Math.random() > 0.5 ? 1 : -1))
      }
    }
    return balls;
  }

  createCanvas = (): void => {
    const width: number = this.state.width;
    const height: number = this.state.height;
    const ctx = Taro.createCanvasContext('myCanvas', this.$scope);
    let balls: Ball[] = [];

    let i = 0;
    let digitBalls: Ball[];

    setInterval(
      () => {
        if (i%20 === 0) {
          digitBalls = this.drawDigit(ctx, width/4, width/4*3, height/7, width, height, 9 - i/20%10)
          digitBalls.map(it => balls.push(it.copy()));
        }
        ctx.clearRect(0, 0, width, height);
        this.drawBalls(digitBalls);
        // 更新array将屏幕以外的小球去掉
        balls = balls.filter(ball => ball.X + ball.ballRadius >= 0 && width>= ball.X - ball.ballRadius);
        console.log(balls.length);
        this.drawBalls(balls);
        ctx.draw();
        this.updateBalls(balls);
        i++;
      },
      50
    )
  }

  componentWillMount() {
    const that = this;
    Taro.getSystemInfo({
      success: function(res) {
        that.setState({
          width: res.screenWidth,
          height: res.screenHeight*0.9
        })
      }
    })
  }

  componentDidMount() {
    this.createCanvas();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View>
        <Canvas canvasId="myCanvas" style={{ width: `${this.state.width}PX`, height: `${this.state.height}PX`}}/>
      </View >
    )
  }
}