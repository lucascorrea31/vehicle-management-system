## LIST drivers
curl "http://localhost:3000/drivers" \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json'

## GET driver by ID
curl "http://localhost:3000/drivers/66eb72f88a92bc3ad1fa1c63" \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json'

## CREATE new driver
curl -X "POST" "http://localhost:3000/drivers" \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json' \
     -d $'{
  "name": "João César"
}'

## UPDATE driver
curl -X "PUT" "http://localhost:3000/drivers/66eb72f88a92bc3ad1fa1c63" \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json' \
     -d $'{
  "name": "João César da Silva"
}'

## DELETE driver
curl -X "DELETE" "http://localhost:3000/drivers/66eb72f88a92bc3ad1fa1c63" \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json' \
     -d $'{
  "color": "white",
  "licensePlate": "HKL2H64",
  "brand": "Honda Motos"
}'

## LIST usages
curl "http://localhost:3000/usages?name=Jos%C3%A9" \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json'

## INITIATE new usage
curl -X "POST" "http://localhost:3000/usages" \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json' \
     -d $'{
  "vehicle": "66eb72598a92bc3ad1fa1c5c",
  "reason": "Teste",
  "startDate": "2024-09-28T21:54:00",
  "driver": "66eb75b08a92bc3ad1fa1c75"
}'

## FINISH usage
curl -X "PUT" "http://localhost:3000/usages/66eb768d8a92bc3ad1fa1c85/end" \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json' \
     -d $'{
  "name": "João César da Silva"
}'

## LIST vehicles
curl "http://localhost:3000/vehicles" \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json'

## GET vehicle by ID
curl "http://localhost:3000/vehicles/66eb719c8a92bc3ad1fa1c52" \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json'

## CREATE new vehicle
curl -X "POST" "http://localhost:3000/vehicles" \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json' \
     -d $'{
  "color": "black",
  "licensePlate": "HKL2H64",
  "brand": "Honda"
}'

## UPDATE vehicle
curl -X "PUT" "http://localhost:3000/vehicles/66eb719c8a92bc3ad1fa1c52" \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json' \
     -d $'{
  "color": "white",
  "licensePlate": "HKL2H64",
  "brand": "Honda Motos"
}'

## DELETE vehicle
curl -X "DELETE" "http://localhost:3000/vehicles/66eb719c8a92bc3ad1fa1c52" \
     -H 'Content-Type: application/json' \
     -H 'Accept: application/json' \
     -d $'{
  "color": "white",
  "licensePlate": "HKL2H64",
  "brand": "Honda Motos"
}'
