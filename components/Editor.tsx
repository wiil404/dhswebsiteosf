"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";


interface EditorProps {

    value:string;
    onChange:(value:string)=>void;

}



export default function Editor({
    value,
    onChange
}:EditorProps){


    const editor = useEditor({

        extensions:[

            StarterKit.configure({

                bulletList: {
                    keepMarks:true,
                    keepAttributes:false,
                },

                orderedList:{
                    keepMarks:true,
                    keepAttributes:false,
                },

            }),


            Link.configure({

                openOnClick:false,

                HTMLAttributes:{
                    class:"text-blue-600 underline"
                }

            })

        ],


        content:value,


        onUpdate({editor}){

            onChange(editor.getHTML());

        },


        editorProps:{

            attributes:{

                class:
                "min-h-[250px] p-4 focus:outline-none"

            }

        }

    });



    if(!editor){

        return null;

    }



    const buttonClass = (active:boolean)=>`

        px-3
        py-1
        border
        rounded
        text-sm
        transition

        ${
            active
            ? "bg-[#003B6F] text-white"
            : "bg-white hover:bg-gray-100"
        }

    `;



    function addLink(){

        const url = window.prompt(
            "Enter URL"
        );


        if(url){

            editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({
                href:url
            })
            .run();

        }

    }



    return (

        <div className="border rounded-lg p-3 mt-4">


            <div className="flex flex-wrap gap-2 mb-3">


                <button
                    type="button"
                    onMouseDown={(e)=>e.preventDefault()}
                    onClick={()=>editor.chain().focus().toggleBold().run()}
                    className={buttonClass(
                        editor.isActive("bold")
                    )}
                >
                    Bold
                </button>



                <button
                    type="button"
                    onMouseDown={(e)=>e.preventDefault()}
                    onClick={()=>editor.chain().focus().toggleItalic().run()}
                    className={buttonClass(
                        editor.isActive("italic")
                    )}
                >
                    Italic
                </button>



                <button
                    type="button"
                    onMouseDown={(e)=>e.preventDefault()}
                    onClick={()=>editor.chain().focus().toggleHeading({
                        level:1
                    }).run()}
                    className={buttonClass(
                        editor.isActive("heading",{level:1})
                    )}
                >
                    H1
                </button>



                <button
                    type="button"
                    onMouseDown={(e)=>e.preventDefault()}
                    onClick={()=>editor.chain().focus().toggleHeading({
                        level:2
                    }).run()}
                    className={buttonClass(
                        editor.isActive("heading",{level:2})
                    )}
                >
                    H2
                </button>



                <button
                    type="button"
                    onMouseDown={(e)=>e.preventDefault()}
                    onClick={()=>editor.chain().focus().toggleHeading({
                        level:3
                    }).run()}
                    className={buttonClass(
                        editor.isActive("heading",{level:3})
                    )}
                >
                    H3
                </button>



                <button
                    type="button"
                    onMouseDown={(e)=>e.preventDefault()}
                    onClick={()=>editor.chain().focus().toggleBulletList().run()}
                    className={buttonClass(
                        editor.isActive("bulletList")
                    )}
                >
                    • List
                </button>



                <button
                    type="button"
                    onMouseDown={(e)=>e.preventDefault()}
                    onClick={()=>editor.chain().focus().toggleOrderedList().run()}
                    className={buttonClass(
                        editor.isActive("orderedList")
                    )}
                >
                    1. List
                </button>



                <button
                    type="button"
                    onMouseDown={(e)=>e.preventDefault()}
                    onClick={()=>editor.chain().focus().toggleBlockquote().run()}
                    className={buttonClass(
                        editor.isActive("blockquote")
                    )}
                >
                    Quote
                </button>



                <button
                    type="button"
                    onMouseDown={(e)=>e.preventDefault()}
                    onClick={()=>editor.chain().focus().setHorizontalRule().run()}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                    Line
                </button>



                <button
                    type="button"
                    onMouseDown={(e)=>e.preventDefault()}
                    onClick={addLink}
                    className={buttonClass(
                        editor.isActive("link")
                    )}
                >
                    Link
                </button>



                <button
                    type="button"
                    onMouseDown={(e)=>e.preventDefault()}
                    onClick={()=>editor.chain().focus().undo().run()}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                    Undo
                </button>



                <button
                    type="button"
                    onMouseDown={(e)=>e.preventDefault()}
                    onClick={()=>editor.chain().focus().redo().run()}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                    Redo
                </button>


            </div>



            <EditorContent editor={editor}/>


        </div>

    );

}