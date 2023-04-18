const ZERO_VOLUME = 0.0001
const AudioContext = window.AudioContext || false
class Controller {
    private _volume: number;
    _wave: string;
    _context: AudioContext;
    _oscillator: any;
    _gain: any;
    _frequency: any;
    _on: boolean;

    constructor() {
        this._volume = 1;
        this._wave = 'sine';
        this._context = new AudioContext();
        this._oscillator = this._context.createOscillator();
        this._gain = this._context.createGain();
        this._oscillator.connect(this._gain);
        this._gain.connect(this._context.destination);
        this._gain.gain.value = ZERO_VOLUME;
        this._oscillator.start(0);
        this._on = false
    }

    _ramp = (value:number) => {
        this._gain.gain.setTargetAtTime(value, this._context.currentTime, 0.015)
    }

    start = () => {
        this._on = true
        this._ramp(this._volume)
    }

    stop = () => {
        this._on = false
        this._ramp(ZERO_VOLUME)
    }

    setPitch = (value: number) => {
        if(isNaN(value)) return
        if(value < 0) value = 0
        this._frequency = value
        this._oscillator.frequency.value = value
    }

    setNote = (octave: any, note: any) => {
        // todo
    }

    setVolume = (value: number) => {
        if(isNaN(value)) return
        if(value > 100) value = 100
        if(value < 0) value = 0

        if(value === 0) {
            this._volume = ZERO_VOLUME
        }
        else {
            this._volume = value / 100
        }

        if(this._on) this._ramp(this._volume)
    }

    setWave = (wave: any) => {
        switch(wave) {
        case 'sine':
            this._oscillator.type = 'sine'
            break
        case 'triangle':
            this._oscillator.type = 'triangle'
            break
        case 'square':
            this._oscillator.type = 'square'
            break
        }
    }

    reset = () => {
        this.stop()
    }

    disconnect = () => {
        this._oscillator.stop()
    }
}

export default Controller