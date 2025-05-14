#!/bin/bash

# Default values
ADMIN_USER="admin"
ADMIN_PASSWORD="admin123"

# Check if arguments are provided
if [ "$#" -ge 1 ]; then
  ADMIN_USER=$1
fi

if [ "$#" -ge 2 ]; then
  ADMIN_PASSWORD=$2
fi

echo "Creating admin user: $ADMIN_USER"

# Execute the create_admin.py script inside the backend container
docker-compose exec backend python create_admin.py $ADMIN_USER $ADMIN_PASSWORD

echo "Done!" 