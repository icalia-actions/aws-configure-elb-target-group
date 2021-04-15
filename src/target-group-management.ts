
import ECS, {
  TargetGroup,
  CreateTargetGroupInput,
  DescribeTargetGroupsInput
} from "aws-sdk/clients/elbv2";

export interface ConfigureTargetGroupInputs {
  name: string
  port?: number,
  vpcId?: string
  protocol?: string
  targetType?: string
  healthCheckPath?: string
  healthCheckProtocol?: string
}

function getClient(): ECS {
  return new ECS({
    customUserAgent: "icalia-actions/aws-action",
    region: process.env.AWS_DEFAULT_REGION,
  });
}

export async function describeTargetGroup(name: string): Promise<TargetGroup | undefined> {
  const ecs = getClient();

  try {
    const response = await ecs
      .describeTargetGroups({ Names: [name] } as DescribeTargetGroupsInput)
      .promise();
    
    return response.TargetGroups?.pop()
  } catch(error) { return }
}   
  

export async function createTargetGroup(inputs: ConfigureTargetGroupInputs): Promise<TargetGroup | undefined> {
  const ecs = getClient();
  const { TargetGroups } = await ecs.createTargetGroup({
    Name: inputs.name,
    Port: inputs.port,
    VpcId: inputs.vpcId,
    Protocol: inputs.protocol,
    TargetType: inputs.targetType,
    HealthCheckPath: inputs.healthCheckPath,
    HealthCheckProtocol: inputs.healthCheckProtocol
  } as CreateTargetGroupInput).promise()

  return TargetGroups?.pop()
}

export async function configureTargetGroup(inputs: ConfigureTargetGroupInputs): Promise<TargetGroup | undefined> {
  const { name } = inputs
  let targetGroup = await describeTargetGroup(name)
  if (!targetGroup) targetGroup = await createTargetGroup(inputs)
  return targetGroup
}