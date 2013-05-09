name=$1
mp3Name=$name".mp3"
wavName=$name".wav"
rawName=$name".raw"
ffmpeg -i $mp3Name $wavName
sox -r 48k  -b 16 -L -c 1 $wavName $rawName