import 'prismjs/components/prism-jsx';
import axe from 'axe-core';
export type AttributesType = {
    name: string;
    control: 'select' | 'text' | 'none';
    options?: Array<string>;
    required?: boolean;
    defaultValue?: string;
    type?: string;
    onlyProperty?: boolean;
};
export type SlotType = {
    name: string;
    description: string;
};
export type EventType = {
    name: string;
    description: string;
    details: string | object;
};
export declare class ComponentDisplay {
    el: HTMLElement;
    private displayElement?;
    private htmlCodePreview?;
    private reactCodePreview?;
    private copyHTMLButton?;
    private copyReactButton?;
    private slotHistory;
    private attributeObject;
    private slotObject;
    private eventObject;
    attrs?: string | Array<AttributesType>;
    validateAttrs(): void;
    slots?: string | Array<SlotType>;
    validateSlots(): void;
    events?: string | Array<EventType>;
    validateEvents(): void;
    accessibility?: boolean;
    display: string;
    showCode: boolean;
    axeResults: axe.AxeResults | null;
    lang: string;
    private setDisplay;
    private handleAttrInput;
    private handleSlotInput;
    private getSlotValue;
    private convertToReact;
    private removeUnwantedAttributes;
    private formatCodePreview;
    private copyCode;
    private runA11yTest;
    renderAxeResultsTable(): any;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): Promise<void>;
    render(): any;
}
