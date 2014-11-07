DIR=${PWD##*/}
if [ "$DIR" = "template" ]
then
    echo "You can't compile inside /template"
    echo "Use grunt copy --name=name-of-embed to create a new project"
else
    grunt --folderName=$DIR
fi