/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>


namespace pxsim {
    /**
     * This function gets called each time the program restarts
     */
    initCurrentRuntime = () => {
        runtime.board = new Board();
    };
    

    /**
     * Gets the current 'board', eg. program state.
     */
    export function board() : Board {
        return runtime.board as Board;
    } 
    /**
     * Represents the entire state of the executing program.
     * Do not store state anywhere else!
     */
    export class Board extends pxsim.BaseBoard {
        public element : SVGSVGElement;
        public spriteElement: SVGCircleElement;
        public hareElement: SVGCircleElement;
        public sprite : Sprite;
        public hare: Sprite;
        public devices: any=[];
        private instructionsQueue: samlabs.SimulatorQueue;
        
        constructor() {
            super();
            this.element = <SVGSVGElement><any>document.getElementById('svgcanvas');
            this.spriteElement = <SVGCircleElement>this.element.getElementById('svgsprite');
            this.hareElement = <SVGCircleElement>this.element.getElementById('svgsprite2');
            this.sprite = new Sprite()
            this.hare = new Sprite();
            this.instructionsQueue = new samlabs.SimulatorQueue();
            console.log('running test')

        }
        this.builtinParts["microphone"] = this.microphoneState = new AnalogSensorState(DAL.DEVICE_ID_MICROPHONE, 0, 255, 86, 165);
        this.builtinParts["accelerometer"] = this.accelerometerState = new AccelerometerState(runtime);
        this.builtinParts["serial"] = this.serialState = new SerialState(runtime, this);
        this.builtinParts["thermometer"] = this.thermometerState = new ThermometerState();
        this.builtinParts["lightsensor"] = this.lightSensorState = new LightSensorState();
        this.builtinParts["compass"] = this.compassState = new CompassState();
        this.builtinParts["microservo"] = this.edgeConnectorState;
        this.builtinParts["logotouch"] = this.logoTouch = new Button(DAL.MICROBIT_ID_LOGO);

        this.builtinVisuals["buttonpair"] = () => new visuals.ButtonPairView();
        this.builtinVisuals["ledmatrix"] = () => new visuals.LedMatrixView();
        this.builtinVisuals["microservo"] = () => new visuals.MicroServoView();

        this.builtinParts["neopixel"] = (pin: Pin) => { return this.neopixelState(pin.id); };
        this.builtinVisuals["neopixel"] = () => new visuals.NeoPixelView(pxsim.parsePinString);
        this.builtinPartVisuals["neopixel"] = (xy: visuals.Coord) => visuals.mkNeoPixelPart(xy);

        this.builtinPartVisuals["buttonpair"] = (xy: visuals.Coord) => visuals.mkBtnSvg(xy);
        this.builtinPartVisuals["ledmatrix"] = (xy: visuals.Coord) => visuals.mkLedMatrixSvg(xy, 8, 8);
        this.builtinPartVisuals["microservo"] = (xy: visuals.Coord) => visuals.mkMicroServoPart(xy);
        
        
        // initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
        //     document.body.innerHTML = ''; // clear children
        //     document.body.appendChild(this.element);

        //     return Promise.resolve();
        // } 
        initAsync(msg: SimulatorRunMessage): Promise<void> {
            super.initAsync(msg);
            const boardDef = msg.boardDefinition;
            const cmpsList = msg.parts;
            const cmpDefs = msg.partDefinitions || {};
            const fnArgs = msg.fnArgs;

            const v2Parts: pxt.Map<boolean> = {
                "microphone": true,
                "logotouch": true,
                "builtinspeaker": true,
                "flashlog": true,
                "v2": true
            };

            // const opts: visuals.BoardHostOpts = {
            //     state: this,
            //     boardDef: boardDef,
            //     partsList: cmpsList,
            //     partDefs: cmpDefs,
            //     fnArgs: fnArgs,
            //     maxWidth: "100%",
            //     maxHeight: "100%",
            //     highContrast: msg.highContrast
            // };

            // this.viewHost = new visuals.BoardHost(pxsim.visuals.mkBoardView({
            //     visual: boardDef.visual,
            //     boardDef: boardDef,
            //     highContrast: msg.highContrast
            // }), opts);

            document.body.innerHTML = ""; // clear children
            // document.body.appendChild(this.view = this.viewHost.getView());

            return Promise.resolve();
        }      
        
        updateView() {
            console.log('updateView')
            // this.spriteElement.cx.baseVal.value = this.sprite.x;
            // this.spriteElement.cy.baseVal.value = this.sprite.y;

            // this.hareElement.cx.baseVal.value = this.hare.x;
            // this.hareElement.cy.baseVal.value = this.hare.y;
        }
    }
}