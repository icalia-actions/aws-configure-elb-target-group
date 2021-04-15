# AWS ELB Configure Target Group

Finds or creates an AWS ELB Target Group

## Usage

```yaml
      - name: Configure AWS ELB Target Group
        uses: icalia-actions/aws-configure-elb-target-group@v0.0.1
        with:
          name: my-target-group
          port: "80"
          protocol: HTTP
          target-type: ip
          vpc-id: vpc-00000001
          health-check-path: /health
```
