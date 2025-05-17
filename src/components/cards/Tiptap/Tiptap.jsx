'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ImageRezise from "tiptap-extension-resize-image"
import ToolBar from './ToolBar'

const Tiptap = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure(), 
            TextAlign.configure({
                types: ["heading", "paragraph"]
            }),
            Heading.configure({
                levels: [1, 2, 3]
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: "list-decimal ml-3",
                }
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-disc ml-3",
                }
            }),
            Highlight,
            Image,
            ImageRezise,
        ],
        content,
        onUpdate: ({ editor }) => {
            console.log(editor.getHTML());
            onChange(editor.getHTML);
        },
        editorProps: {
            attributes: {
                class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3"
            }
        }
    })

    return (
        <>
            <ToolBar editor={editor}/>
            <EditorContent editor={editor}/>
        </>
    )
}

export default Tiptap