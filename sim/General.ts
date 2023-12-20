namespace pxsim.general{
    //% blockId="on_prompt_input_display" block="prompt for text with message $word"
    export function onPromptInputDisplay(
        word: string
    ): string {
        return pxsim.samGeneral.promptInputDisplay(word);
    }
}

namespace pxsim {
    /**
     * General.
     */
    //%
    export class samGeneral {
        constructor() {
        }
        static promptInputDisplay( word: string) {
            return word;
        }
    }
}