import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function Editorr(props) {
    const editorRef = useRef(null);
    const [content, setContent] = useState(
      "This is the initial content of the editor."
    );
  
    const [text, setText] = useState();
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };
    const onEditorChange = function (a, editor) {
      // console.log(a);
      props.content(a);
      setContent(a);
      setText(editor.getContent({ format: "text" }));
      //console.log(editor);
    };

    return (
        <Editor
            onEditorChange={onEditorChange}
            //initialValue={content}
            //outputFormat="text"
            api-key="uk2g00la7gm187t8xyx4i0d0yt5a9q996yn1mdhu3gn7tn1h"

            value={content}
            onInit={(evt, editor) => (editorRef.current = editor)}
            // initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 300,
              width: "100%",
              selector: 'textarea',
            }}
      />
    )
}