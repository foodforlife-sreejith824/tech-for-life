kubectl apply -f techforlife-producerapi.yaml
kubectl -n development-ns describe service techforlife-producerapi-service

a49b4af4611584106af58508133128ad-1956568138.eu-north-1.elb.amazonaws.com:8080/swagger-ui.html

kubectl get secret argocd-initial-admin-secret -n argocd -o yaml
apiVersion: v1
data:
  password: TnBYV2JabjVIVk14V0Fweg==
kind: Secret
metadata:
  creationTimestamp: "2023-07-28T11:23:50Z"
  name: argocd-initial-admin-secret
  namespace: argocd
  resourceVersion: "29657"
  uid: 8dd309cf-6d17-4156-914d-5278691aece8
type: Opaque

echo TnBYV2JabjVIVk14V0Fweg== | base64 --decode
NpXWbZn5HVMxWApz


aws ecr get-login-password | docker login --username AWS --password-stdin 157975149712.dkr.ecr.eu-north-1.amazonaws.com
docker build -t techforlife/producer/api .
docker tag techforlife/producer/api:latest 157975149712.dkr.ecr.eu-north-1.amazonaws.com/techforlife/producer/api:latest
docker push 157975149712.dkr.ecr.eu-north-1.amazonaws.com/techforlife/producer/api:latest
