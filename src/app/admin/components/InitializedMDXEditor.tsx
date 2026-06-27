'use client';

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  imagePlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  linkPlugin,
  linkDialogPlugin,
  ListsToggle,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  codeBlockPlugin,
  codeMirrorPlugin,
  InsertCodeBlock,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  theme?: string;
}

export default function InitializedMDXEditor({ value, onChange, theme = 'light' }: Props) {
  async function imageUploadHandler(image: File) {
    const formData = new FormData();
    formData.append('file', image);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    const data = await response.json();
    return data.url;
  }

  return (
    <div className={`mdx-editor-wrapper prose max-w-none h-[600px] overflow-y-auto ${theme === 'dark' ? 'dark-theme dark:prose-invert' : ''}`}>
      <MDXEditor
        markdown={value}
        onChange={onChange}
        className={theme === 'dark' ? 'dark-theme' : ''} 
        contentEditableClassName="prose max-w-none p-4 min-h-[500px] outline-none dark:prose-invert"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin({ imageUploadHandler }),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
          codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', ts: 'TypeScript', jsx: 'JSX', tsx: 'TSX', css: 'CSS', txt: 'Text', bash: 'Bash', json: 'JSON' } }),
          diffSourcePlugin({ diffMarkdown: 'calc', viewMode: 'rich-text' }),
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper>
                <div className="flex flex-wrap items-center gap-1 border-b pb-2 mb-2 w-full">
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <BlockTypeSelect />
                  <ListsToggle />
                  <CreateLink />
                  <InsertImage />
                  <InsertCodeBlock />
                </div>
              </DiffSourceToggleWrapper>
            )
          })
        ]}
      />
    </div>
  );
}
