$BASEDIR = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
Set-Location $BASEDIR

. ..\util\minify.ps1

minify -Inputs "$COLORBOX_PATH\colorbox.css",
               "$INPUT_PATH\admin_style.css",
               "$INPUT_PATH\crayon_style.css",
               "$INPUT_PATH\global_style.css" `
       -Output "$OUTPUT_PATH\crayon.min.css"
