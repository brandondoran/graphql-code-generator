import { GraphQLSchema, OperationDefinitionNode, typeFromAST, VariableDefinitionNode } from 'graphql';
import { Variable } from '../types';
import { resolveType } from '../schema/resolve-type';
import { debugLog } from '../debugging';

export function transformVariables(schema: GraphQLSchema, definitionNode: OperationDefinitionNode): Variable[] {
  return definitionNode.variableDefinitions.map<Variable>((variableDefinition: VariableDefinitionNode): Variable => {
    const typeFromSchema = typeFromAST(schema, variableDefinition.type);
    const resolvedType = resolveType(typeFromSchema);
    debugLog(`[transformVariables] transforming variable ${variableDefinition.variable.name.value} of type ${resolvedType.name}`);

    return {
      name: variableDefinition.variable.name.value,
      type: resolvedType.name,
      isArray: resolvedType.isArray,
      isRequired: resolvedType.isRequired,
    };
  });
}
