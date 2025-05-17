"use client";
import { List } from "lucide-react";
import {
    Heading1,
    Heading2,
    Heading3,
    Code,
    Bold,
    Italic,
    Strikethrough,
    AlignCenter,
    AlignRight,
    AlignLeft,
    Highlighter,
    Upload,
    ListOrdered
} from "lucide-react"

export default function ToolBar({ editor }) {
    if(!editor) return null;

    const addImage = () => {
        if(url) {
            editor
        }
    }

    const Options = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({level: 1}).run(),
            pressed: editor.isActive("heading", { level: 1})
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({level: 2}).run(),
            pressed: editor.isActive("heading", { level: 2})
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({level: 3}).run(),
            pressed: editor.isActive("heading", { level: 3})
        },{
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive("bold")
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive("italic")
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive("strike")
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            pressed: editor.isActive({ textAlign: "left" })
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            pressed: editor.isActive({ textAlign: "center" })
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            pressed: editor.isActive({ textAlign: "right" })
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive("bulletList")
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive("orderedList")
        },
        {
            icon: <Code className="size-4" />,
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            pressed: editor.isActive("code")
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive("highlist")
        },
        {
            icon: <Upload className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive("image")
        }
    ]
    return <div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky top=1- z-50">
        {
            Options.map((option, i) => (
                <p key={i} size="sm" pressed={option.pressed} onPressedChange={option.onClick}>
                    {option.icon}
                </p>
            ))
        }
    </div>
}