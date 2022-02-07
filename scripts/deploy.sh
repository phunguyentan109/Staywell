dev="dev"
stg="stg"

if [ "$1" = "$dev" ]
then
  git co develop;
  git pull;
  git push heroku-sw-dev develop:main -f;
fi

if [ "$1" = "$stg" ]
then
  git push heroku-sw-stg develop:main;
fi
