class Colors {

    private static colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];

    public static getAll(): string[] {
        return this.colors;
    }

    public static random(): string {
        return this.colors[Math.round(Math.random() * this.colors.length)];
    }

    public static getOne(i: number): string {
        return this.colors[i % this.colors.length];
    }
}

export default Colors;
