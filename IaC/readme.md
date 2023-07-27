eksctl create cluster -f eksctl.yaml
kubectl create namespace development-ns
kubectl apply -f techforlife-nginx.yaml
kubectl apply -f techforlife-producerapi.yaml

kubectl -n development-ns describe service techforlife-nginx-service

kubectl delete -f techforlife-nginx.yaml
eksctl delete cluster -f eksctl.yaml