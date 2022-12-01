This README is useful to understand how to build and run the Docker images for the Hike Tracker application.

# Build and run the Docker images separately

## Build the Docker images for the Hike Tracker application

### Server image

`cd server`
`sudo docker image build - t giulazzara/polito-se2-22-18-ht:server .`

### Client image

`cd client`
`sudo docker image build - t giulazzara/polito-se2-22-18-ht:client .`

## Run the Docker images for the Hike Tracker application

### Server image

`sudo docker run --name server-dev -p 3001:3001 giulazzara/polito-se2-22-18-ht:server`

### Client image

`sudo docker run --name client-dev -p 3000:3000 giulazzara/polito-se2-22-18-ht:client`

# Build and run the Docker images with docker-compose

`sudo docker-compose up`
`sudp docker-compose down`

# Use the Hike Tracker application

Open the browser and go to the following address: `http://localhost:3000`
