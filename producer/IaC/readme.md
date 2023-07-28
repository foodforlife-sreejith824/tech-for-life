eksctl create cluster -f eksctl.yaml 
kubectl apply -f techforlife-namespace.yaml

aws ecr create-repository --repository-name techforlife-producer-api
aws ecr create-repository --repository-name techforlife-inventory-api
aws ecr create-repository --repository-name techforlife-consumer-api

aws ecr get-login-password | docker login --username AWS --password-stdin 157975149712.dkr.ecr.eu-north-1.amazonaws.com
docker build -t techforlife/producer/api .
docker tag techforlife/producer/api:latest 157975149712.dkr.ecr.eu-north-1.amazonaws.com/techforlife/producer/api:latest
docker push 157975149712.dkr.ecr.eu-north-1.amazonaws.com/techforlife/producer/api:latest

kubectl apply -f techforlife-producerapi.yaml

kubectl -n development-ns describe service techforlife-producerapi-service

kubectl delete -f techforlife-nginx.yaml
eksctl delete cluster -f eksctl.yaml

a49b4af4611584106af58508133128ad-1956568138.eu-north-1.elb.amazonaws.com:8080/swagger-ui.html