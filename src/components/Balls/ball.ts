import Colors from './colors'

class Ball {
    private _ballRadius: number;
    private _X: number;
    private _Y: number;
    private _speed: number;
    private context2D: any;
    private _fillStyle: string | CanvasGradient | CanvasPattern;
    private vx: number = Math.random() * 4;
    private vy: number = Math.random() * 4;
    private directX: number;
    private directY: number = 1;
    private height: number;
    private width: number;

    constructor(context2D: any, X: number, Y: number, height: number, width: number, ballRadius: number = 10, speed: number = 10, fillStyle: string | CanvasGradient | CanvasPattern = 'red', directX: number = 1) {
        this.context2D = context2D;
        this._X = X;
        this._Y = Y;
        this.height = height;
        this.width = width;
        this._ballRadius = ballRadius;
        this._speed = speed;
        this._fillStyle = fillStyle;
        this.directX = directX;
    }

    public draw(): void {
        if (this.context2D === null) return;

        this.context2D.save();
        this.context2D.fillStyle = this._fillStyle;
        this.context2D.beginPath();
        this.context2D.arc(this._X, this._Y, this._ballRadius, 0, Math.PI * 2);
        this.context2D.fill();
        this.context2D.restore();
    }

    public update(): void {
        if (this.context2D !== null) {
            const cx = 0.1;
            const cy = 0.1;
            this.vy += this.directY * cy * this._speed;

            if (this._Y + this.directY * this.vy + this.ballRadius > this.height) {
                this.vy *= 0.7;  // 设置弹起动能损耗 30%
                this.directY = -this.directY;
                this._Y = this.height - this.ballRadius;
            }
            else if (this.vy < 0) {
                this.vy = 0;
                this.directY = -this.directY;
            }
            else {
                this._Y += this.directY * this.vy;
            }

            this.vx = cx * this._speed;
            this._X += this.directX * this.vx;
        }
    }

    public copy(): Ball {
        return new Ball(this.context2D, this.X, this.Y, this.height, this.width, this.ballRadius, this._speed, Colors.random(), this.directX)
    }

    get ballRadius(): number {
        return this._ballRadius;
    }

    get X(): number {
        return this._X;
    }

    set X(value: number) {
        this._X = value;
    }

    get Y(): number {
        return this._Y;
    }

    set Y(value: number) {
        this._Y = value;
    }
}


export default Ball;