printf '\nExecute post build script for STG...\n'

cd fe && yarn && yarn run build;

mv build ../;

printf '\nPost build stg successfully!'

