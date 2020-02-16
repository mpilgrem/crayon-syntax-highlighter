$MINIFIER="$Env:HOME\Documents\Code\YUICompressor\yuicompressor-2.4.8.jar"
$INPUT_PATH='src'
$OUTPUT_PATH='min'
$TE_PATH='..\util\tag-editor'
$COLORBOX_PATH='..\util\tag-editor\colorbox'
$JS_PATH='..\js'

function Minify {
    Param(
        [Parameter(Mandatory=$True)]
        [String[]]
        $Inputs,
        [Parameter(Mandatory=$True)]
        [String]
        $Output
    )
    Get-Content $Inputs > $Output
    java -jar "$MINIFIER" "$Output" -o "$Output"
}
