# Modes:

1. "development"-Mode: this mode enables you to run the services on your local machine without docker
2. "docker-network"-Mode: this mode enables you to run the services in a docker-network
3. "production"-Mode: this mode enables you to run the services in azure cloud

- To choose between the modes, go into each services .env file and change the MODE parameter to either "development" or "docker-network" or "production"

## Env Variables:

- Each service directory has a .env.example file
- You need to copy it and rename it to .env
- Then you have to set the parameters for the services to work properly

# Run services in "development"-Mode:

- To run the services in "development" mode, follow the instructions in the README-files provided in each service directory

# Run services in "docker-network"- Mode:

- To run the "docker-network"-Mode go run the command "docker compose up" in the directory of the docker-compose.yml file
