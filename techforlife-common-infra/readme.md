eksctl create cluster -f eksctl.yaml 
kubectl apply -f techforlife-namespace.yaml

## ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
kubectl -n argocd describe service argocd-server
### Get credential
admin
kubectl get secret argocd-initial-admin-secret -n argocd -o yaml
echo Wnd4aFhXSGxkdHgtbm9qTg== | base64 --decode

## ECR
aws ecr create-repository --repository-name techforlife-producer-api
aws ecr create-repository --repository-name techforlife-inventory-api
aws ecr create-repository --repository-name techforlife-consumer-api

## Clean Up
eksctl delete cluster -f eksctl.yaml