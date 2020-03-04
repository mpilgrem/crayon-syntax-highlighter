$MINIFIER="$Env:HOME\Documents\Code\closure-compiler\compiler.jar"
$INPUT_PATH='src'
$OUTPUT_PATH='min'
$TE_PATH='..\util\tag-editor'
$COLORBOX_PATH='..\util\tag-editor\colorbox'

$Crayon_Min = "$OUTPUT_PATH\crayon.min.js"
$Crayon_TE_Min = "$OUTPUT_PATH\crayon.te.min.js"

$Common = "$INPUT_PATH\util.js", "$INPUT_PATH\jquery.popup.js", "$INPUT_PATH\crayon.js"
$TE = $Common + "$TE_PATH\crayon_qt.js", "$COLORBOX_PATH\jquery.colorbox-min.js", "$TE_PATH\crayon_tag_editor.js"
$Externs = "$OUTPUT_PATH\externs.js"

java -jar "$MINIFIER" --js $Common --js_output_file "$Crayon_Min" --externs "$Externs" -W VERBOSE
java -jar "$MINIFIER" --js $TE --js_output_file "$Crayon_TE_Min" --externs "$Externs" -W VERBOSE
