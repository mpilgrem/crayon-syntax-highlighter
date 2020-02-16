$BASEDIR=Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
Set-Location $BASEDIR

. ..\util\minify.ps1

$Common = "$INPUT_PATH\util.js",
          "$INPUT_PATH\jquery.popup.js",
          "$INPUT_PATH\crayon.js"

minify -Inputs $Common -Output "$OUTPUT_PATH\crayon.min.js"

minify -Inputs ($Common +
               "$TE_PATH\crayon_qt.js",
               "$COLORBOX_PATH\jquery.colorbox-min.js",
               "$TE_PATH\crayon_tag_editor.js") `
       -Output "$OUTPUT_PATH\crayon.te.min.js"
