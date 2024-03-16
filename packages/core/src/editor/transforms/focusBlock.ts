import { Editor, Path, Point, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { FocusAt, SlateEditor, YooEditor, YooptaEditorTransformOptions } from '../types';

export type FocusBlockOptions = Pick<YooptaEditorTransformOptions, 'focusAt' | 'slate'> & {
  waitExecution?: boolean;
  waitExecutionMs?: number;
  shouldUpdateBlockSelection?: boolean;
};

function getSelectionPath(slate: SlateEditor, focusAt?: FocusAt): FocusAt {
  if (Point.isPoint(focusAt)) {
    return focusAt;
  }

  if (Path.isPath(focusAt)) {
    return { path: focusAt, offset: 0 };
  }

  const [, firstNodePath] = Editor.first(slate, [0]);
  const firstLeafPath = firstNodePath ? firstNodePath : [0, 0];

  return { path: firstLeafPath, offset: 0 };
}

// [TODO] - update editor.selection after focus
export function focusBlock(editor: YooEditor, blockId: string, options: FocusBlockOptions = {}) {
  const { focusAt, waitExecution = true, waitExecutionMs = 0, shouldUpdateBlockSelection = true } = options;

  const focusBlockEditor = () => {
    const slate = options.slate || editor.blockEditorsMap[blockId];
    const block = editor.children[blockId];

    if (!slate || !block) return;

    const selectionPath = getSelectionPath(slate, focusAt);

    ReactEditor.focus(slate);
    if (shouldUpdateBlockSelection) {
      setTimeout(() => {
        Transforms.select(slate, selectionPath);
        editor.setSelection([block.meta.order]);
      }, 0);
    }
  };

  if (waitExecution) {
    setTimeout(() => focusBlockEditor(), waitExecutionMs);
  } else {
    focusBlockEditor();
  }
}
