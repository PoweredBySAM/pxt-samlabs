namespace pxsim {
  /**
   * General.
   */
  //%
  export class samGeneral {
    promptIn: string;
    promptOut: string;
    promptNumIn: string;
    promptNumOut: number;

    constructor() {
      this.promptIn = "";
      this.promptOut = "";
      this.promptNumIn = "";
      this.promptNumOut = 0;

      window.addEventListener("message", (event: any) => {
        if (event.data.type === "PXT_STOPPED") {
          this.promptOut = "";
          this.promptIn = "";
          this.promptNumIn = "";
          this.promptNumOut = 0;
        }
      });
    }
    public async promptInputDisplay(word: string) {
      if (word === "" || this.promptIn !== word) {
        this.promptIn = word;
        this._dispatch(
          { prompt: word, type: "text" },
          samlabs.samSimEvents.TOSIM_EDITOR_GENERAL_STORE_CREATED
        );

        await new Promise<void>((resolve) => {
          samlabs.WindowEventService.getInstance().receiveEvent(
            samlabs.samSimEvents.FROMSIM_EDITOR_GOT_PROMOPT,
            (event: CustomEvent) => {
              this.promptOut = event.detail.name as string;
              resolve();
            }
          );
        });

        return this.promptOut;
      } else if (this.promptIn === word && this.promptOut !== "") {
        return this.promptOut;
      }
      return "";
    }
    public async promptNumberInputDisplay(numPrompt: string): Promise<number> {
      if (numPrompt === "" || this.promptIn !== numPrompt) {
        this.promptNumIn = numPrompt;
        this._dispatch(
          { prompt: numPrompt, type: "number" },
          samlabs.samSimEvents.TOSIM_EDITOR_GENERAL_STORE_CREATED
        );

        await new Promise<void>((resolve) => {
          samlabs.WindowEventService.getInstance().receiveEvent(
            samlabs.samSimEvents.FROMSIM_EDITOR_GOT_PROMOPT,
            (event: CustomEvent) => {
              this.promptNumOut = event.detail.name as number;
              resolve();
            }
          );
        });

        return this.promptNumOut;
      } else if (this.promptNumIn === numPrompt && this.promptNumOut !== 0) {
        return this.promptNumOut;
      }
      return 0;
    }
    _dispatch(payload: any, type: string) {
      samlabs.WindowEventService.getInstance().sendEvent(type, {
        ...payload,
      });
    }
  }
}

namespace pxsim.general {
  export let instance = new pxsim.samGeneral();
  //% blockId="on_prompt_input_display" block="Prompt for text with message $word"
  export function onPromptInputDisplayAsync(word: string): Promise<string> {
    return instance.promptInputDisplay(word);
  }
  //% blockId="on_prompt_input_number_display" block="Prompt for number with message $numPrompt"
  export function onPromptInputNumberDisplayAsync(
    numPrompt: string
  ): Promise<number> {
    return instance.promptNumberInputDisplay(numPrompt);
  }
}
