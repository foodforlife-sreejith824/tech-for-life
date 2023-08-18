eksctl create cluster -f eksctl.yaml 
kubectl apply -f techforlife-namespace.yaml

## ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
kubectl -n argocd describe service argocd-server

### Get credential
admin
kubectl get secret argocd-initial-admin-secret -n argocd -o yaml
echo NnVYWUx6TldUZHkyWmplag== | base64 --decode

6uXYLzNWTdy2Zjej

## ArgoCD Image updater
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-image-updater/stable/manifests/install.yaml
kubectl apply -n argocd -f argocd-image-updater.yaml
kubectl -n argocd create secret generic git-creds \
  --from-literal=username=sreejith824 \
  --from-literal=password=glpat-cyEcJq4XSXCaSyP5uX86


## ECR
aws ecr create-repository --repository-name techforlife_producer_api
aws ecr create-repository --repository-name techforlife_inventory_api
aws ecr create-repository --repository-name techforlife_consumer_api

## Clean Up
eksctl delete cluster -f eksctl.yaml