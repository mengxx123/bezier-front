<template>
    <my-page title="Canvas 贝塞尔曲线绘图">
        <ui-row gutter>
            <ui-col width="100" tablet="100" desktop="50">
                <section class="bezier-box">
                    <h1 id="title" style="float: left;">Canvas <span>{{ type === 2 ? '二次' : '三次' }}</span>贝塞尔曲线操作实例</h1>
                    <div class="content" style="clear: both;">
                        <canvas id="canvas" width="600" height="480" class="bezier"></canvas>
                    </div>
                </section>
            </ui-col>
            <ui-col width="100" tablet="100" desktop="50">
                <section class="bezier-box">
                    <ui-raised-button class="btn" :label="label" @click="changeType" />
                    <ui-code>{{ code }}</ui-code>
                </section>
            </ui-col>
        </ui-row>
    </my-page>
</template>

<script>
    /* eslint-disable */

    export default {
        data () {
            return {
                type: 2,
                title: '',
                code: ''
            }
        },
        computed: {
            label() {
                return this.type = 2 ? '切换成三次贝塞尔曲线生成工具' : '切换成二次贝塞尔曲线生成工具'
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let canvas = document.getElementById("canvas")
                let ctx = canvas.getContext("2d")

                let points
                let options
                let __g = null
                let __e
                let _this = this

                function drawBezier(isBezier2) {
                    points = {p1: {x: 100, y: 250}, p2: {x: 400, y: 250}};
                    if (isBezier2) {
                        points.cp1 = {x: 250, y: 100}
                    } else {
                        points.cp1 = {x: 150, y: 100};
                        points.cp2 = {x: 350, y: 100}
                    }
                    options = {
                        curve: {width: 6, color: "#0090D2"},
                        cpline: {width: 0.5, color: "#ff7a99"},
                        point: {
                            radius: 9,
                            width: 2,
                            color: "#ff7a99",
                            fill: "rgba(200,200,200,0.3)",
                            arc1: 0,
                            arc2: 2 * Math.PI
                        }
                    };
                    ctx.lineCap = "round";
                    ctx.lineJoin = "round";
                    canvas.onmousedown = down;
                    canvas.onmousemove = move;
                    canvas.onmouseup = canvas.onmouseout = up;
                    draw()
                }

                function draw() {
                    console.log('绘制')
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.lineWidth = options.cpline.width;
                    ctx.strokeStyle = options.cpline.color;
                    ctx.beginPath();
                    ctx.moveTo(points.p1.x, points.p1.y);
                    ctx.lineTo(points.cp1.x, points.cp1.y);
                    if (points.cp2) {
                        ctx.moveTo(points.p2.x, points.p2.y);
                        ctx.lineTo(points.cp2.x, points.cp2.y)
                    } else {
                        ctx.lineTo(points.p2.x, points.p2.y)
                    }
                    ctx.stroke();
                    ctx.lineWidth = options.curve.width;
                    ctx.strokeStyle = options.curve.color;
                    ctx.beginPath();
                    ctx.moveTo(points.p1.x, points.p1.y);
                    if (points.cp2) {
                        ctx.bezierCurveTo(points.cp1.x, points.cp1.y, points.cp2.x, points.cp2.y, points.p2.x, points.p2.y)
                    } else {
                        ctx.quadraticCurveTo(points.cp1.x, points.cp1.y, points.p2.x, points.p2.y)
                    }
                    ctx.stroke();
                    for (var q in points) {
                        ctx.lineWidth = options.point.width;
                        ctx.strokeStyle = options.point.color;
                        ctx.fillStyle = options.point.fill;
                        ctx.beginPath();
                        ctx.arc(points[q].x, points[q].y, options.point.radius, options.point.arc1, options.point.arc2, true);
                        ctx.fill();
                        ctx.stroke()
                    }
                    _this.code = 'let canvas = document.getElementById("canvas");\nctx = canvas.getContext("2d")\nctx.lineWidth = ' + options.curve.width + ';\nctx.strokeStyle = "' + options.curve.color + '";\nctx.beginPath();\nctx.moveTo(' + points.p1.x + ", " + points.p1.y + ");\n" + (points.cp2 ? "ctx.bezierCurveTo(" + points.cp1.x + ", " + points.cp1.y + ", " + points.cp2.x + ", " + points.cp2.y + ", " + points.p2.x + ", " + points.p2.y + ");" : "ctx.quadraticCurveTo(" + points.cp1.x + ", " + points.cp1.y + ", " + points.p2.x + ", " + points.p2.y + ");") + "\nctx.stroke();"
                }

                function down(t) {
                    t = dealPoint(t)
                    let x
                    let y;
                    console.log('down', t)
                    for (let s in points) {
                        x = points[s].x - t.x;
                        y = points[s].y - t.y;
                        console.log(points)
                        console.log(x, y)
//                        console.log(s, t)
                        console.log((x * x) + (y * y), options.point.radius * options.point.radius)
                        if ((x * x) + (y * y) < options.point.radius * options.point.radius) {
                            console.log('true')
                            __g = s;
                            __e = t;
                            canvas.style.cursor = "move";
                            return
                        }
                    }
                }

                function move(q) {
                    console.log('move')
                    if (__g) {
                        q = dealPoint(q);
                        points[__g].x += q.x - __e.x;
                        points[__g].y += q.y - __e.y;
                        __e = q;
                        draw()
                    }
                }

                function up(q) {
                    __g = null;
                    canvas.style.cursor = "default";
                    draw()
                }

                function dealPoint(q) {
                    q = (q ? q : window.event);
                    let box = canvas.getBoundingClientRect()
                    return {x: q.pageX - box.x, y: q.pageY - box.y}
                }

                this.drawBezier = drawBezier
                this.drawBezier(true)
            },
            changeType() {
                console.log('哈哈')
                this.type = this.type === 2 ? 3 : 2
                if (this.type === 2) {
                    this.drawBezier(false)
                } else {
                    this.drawBezier(true)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .btn {
        margin-bottom: 16px;
    }

    .bezier-box {
    }
    .bezier-box h1 {
        margin: 16px 0;
    }
    .bezier-box canvas {
        background-color: #fff;
        border-radius: 8px;
        border: 1px solid #ddd;
    }
    .bezier-box pre {
        height: 480px;
        font-size: 16px;
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #ddd;
        overflow: auto;
    }
    .bezier-box .btn {
        margin-top: 8px;
        margin-bottom: 16px;
    }
</style>
