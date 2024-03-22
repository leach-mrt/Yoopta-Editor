import { ReactElement, ReactNode } from 'react';
import { Descendant, Editor, Editor as SlateEditor } from 'slate';
import { RenderElementProps as RenderSlateElementProps, RenderLeafProps } from 'slate-react';
import { YooEditor, YooptaBlockData } from '../editor/types';
import { YooptaMark } from '../marks';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS_TYPE } from '../utils/hotkeys';

export type RenderPluginProps<TKeys extends string, TProps, TOptions> = {
  id: string;
  elements: PluginReturn<TKeys, TProps, TOptions>['elements'];
  marks?: YooptaMark<unknown>[];
};

export type PluginOptions<T> = {
  display?: {
    title?: string;
    description?: string;
    icon?: string | ReactNode | ReactElement;
  };
  shortcuts?: string[];
  align?: 'left' | 'center' | 'right';
} & T;

export type PluginElementOptions = {
  draggable?: boolean;
};

export type PluginElementRenderProps = RenderSlateElementProps & {
  blockId: string;
};

export type PluginCustomEditorRenderProps = {
  blockId: string;
};

export type PluginDefaultProps = { nodeType?: 'block' | 'inline' | 'void' | 'inlineVoid' };
export type PluginElementProps<T> = PluginDefaultProps & T;

export type PluginElement<T, TPluginOptions = Record<string, unknown>> = {
  render: (props: PluginElementRenderProps) => JSX.Element;
  props?: PluginElementProps<T>;
  options?: PluginElementOptions;
  asRoot?: boolean;
  children?: string[];
};

export type PluginElementsMap<TKeys extends string = string, TProps = PluginDefaultProps> = {
  [key in TKeys]: PluginElement<TProps>;
};

export type EventHandlers = {
  [key in keyof EditorEventHandlers]: (
    editor: YooEditor,
    slate: Editor,
    options: PluginEventHandlerOptions,
  ) => EditorEventHandlers[key] | void;
};

export type PluginEventHandlerOptions = {
  hotkeys: HOTKEYS_TYPE;
  defaultBlock: YooptaBlockData;
  currentBlock: YooptaBlockData;
};

export type PluginParams<TKeys extends string = string, TProps = Descendant, TOptions = Record<string, unknown>> = {
  type: string;
  customEditor?: (props: PluginCustomEditorRenderProps) => JSX.Element;
  elements: PluginElementsMap<TKeys, TProps>;
  events?: EventHandlers;
  options?: PluginOptions<TOptions>;
};

// [TODO] - the same type as PluginParams
export type PluginReturn<TKeys extends string, TProps = Descendant, TOptions = Record<string, unknown>> = {
  type: string;
  elements: PluginParams<TKeys, TProps>['elements'];
  options?: PluginOptions<TOptions>;
  events?: EventHandlers;
  customEditor?: (props: PluginCustomEditorRenderProps) => JSX.Element;
};

export type LeafFormats<K extends string, V> = {
  [key in K]: V;
};

export type ExtendedLeaf<K extends string, V> = RenderLeafProps['leaf'] & LeafFormats<K, V>;
export type YooptaMarkProps<K extends string, V> = { children: RenderLeafProps['children']; leaf: ExtendedLeaf<K, V> };

export type ExtendedLeafProps<K extends string, V> = RenderLeafProps & {
  leaf: ExtendedLeaf<K, V>;
};
