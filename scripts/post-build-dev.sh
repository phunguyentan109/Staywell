printf '\nExecute post build script for DEV...\n'

cd fe && yarn && yarn run build;

mv build ../;

printf '\nBegin seeding...\n'

cd ../ && yarn seed;

printf '\nPost build dev successfully!'

