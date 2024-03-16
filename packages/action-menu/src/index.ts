import { SlateElement } from '@yoopta/editor';
import { ActionMenuList } from './components/ActionMenuList';
export { DefaultActionMenuRender } from './components/DefaultActionMenuRender';
export { ActionMenuRenderProps, ActionMenuToolProps } from './types';

import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: SlateElement<string>;
  }
}

export default ActionMenuList;
